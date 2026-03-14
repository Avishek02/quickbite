import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const newOrder = {
      orderId: body.orderId || `ORD-${Date.now()}`,
      items: sanitizedItems,
      totalAmount: serverTotalAmount,
      customerInfo: {
        firstName: body.customerInfo?.firstName || "",
        lastName: body.customerInfo?.lastName || "",
        email: session.user.email,
        mobile: body.customerInfo?.mobile || "",
        street: body.customerInfo?.street || "",
        city: body.customerInfo?.city || "",
        apartment: body.customerInfo?.apartment || "",
        note: body.customerInfo?.note || "",
      },
      email: session.user.email,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    const collection = await dbConnect("orders");

    const existingOrder = await collection.findOne({
      orderId: newOrder.orderId,
    });

    if (existingOrder && existingOrder.paymentStatus === "Paid") {
      return NextResponse.json(
        {
          success: false,
          message: "This order has already been paid and cannot be modified.",
        },
        { status: 400 },
      );
    }

    const result = await collection.updateOne(
      { orderId: newOrder.orderId },
      { $set: newOrder },
      { upsert: true },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: newOrder,
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const orders = await dbConnect("orders")
      .find({ email })
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    // Security: Only staff roles can update order statuses
    if (
      !session ||
      !["admin", "restaurant", "rider"].includes(session.user.role)
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { orderId, status, riderEmail, riderName } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status required" },
        { status: 400 },
      );
    }

    const collection = await dbConnect("orders");
    const existingOrder = await collection.findOne({ orderId: orderId });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    if (existingOrder.paymentStatus !== "Paid") {
      const allowedUnpaidStatuses = ["Pending", "Cancelled"];
      if (!allowedUnpaidStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            message: "Unpaid orders can only be set to Pending or Cancelled.",
          },
          { status: 400 },
        );
      }
    }

    // Build the update payload (supports linking a rider to the order)
    let updateFields = { status };
    if (riderEmail) updateFields.riderEmail = riderEmail;
    if (riderName) updateFields.riderName = riderName;

    const result = await collection.updateOne(
      { orderId: orderId },
      { $set: updateFields },
    );

    return NextResponse.json(
      { success: true, message: "Order updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 },
    );
  }
}

import { FaUser, FaShoppingBag, FaTicketAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-10">Dashboard</h2>

      <ul className="space-y-6">
        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
          <FaUser />
          My Profile
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
          <FaShoppingBag />
          Orders
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
          <FaTicketAlt />
          Vouchers
        </li>
      </ul>
    </div>
  );
}

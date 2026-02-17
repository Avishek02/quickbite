import ProfileCard from "./ProfileCard";

export default function DashboardContent() {
  return (
    <div className="flex-1 bg-gray-100 p-6 md:p-10">

      <h1 className="text-3xl text-black font-bold mb-8">Dashboard</h1>

      <div className="flex justify-center md:justify-start">
        <ProfileCard />
      </div>

    </div>
  );
}

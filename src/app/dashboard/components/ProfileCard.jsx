export default function ProfileCard() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src="https://i.pravatar.cc/150"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h3 className="text-xl text-black font-bold">John Doe</h3>
        <p className="text-gray-500">john@email.com</p>
      </div>

    </div>
  );
}

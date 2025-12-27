import { useState } from "react";
import { FaEllipsisV, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { SidebarProps } from "../types/Chat";


export default function Sidebar({
  users,
  search,
  setSearch,
  selectedUser,
  onlineUsers,
  selectUser,
  user,
  logout,
}: SidebarProps) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside
      className={`bg-[#111827] border-r border-white/5 p-4 flex flex-col
        ${window.innerWidth < 768 ? "w-full absolute z-20 h-full" : "w-1/4"}`}
    >
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <FaEllipsisV />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-800">
            <img
              src={user!.avatar}
              alt="avatar"
              className="w-12 h-12 p-2 rounded-full object-cover border-2 border-gray-950"
            />
            <p className="text-sm text-white font-semibold truncate">
              {user!.fullname}
            </p>
            <p className="text-xs text-gray-400 truncate">{user!.email}</p>
          </div>
          <button
            onClick={() => {
              navigate("/profile");
              setDropdownOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition"
          >
            <FaUserCircle />
            الملف الشخصي
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-950/40 transition"
          >
            <FaSignOutAlt />
            تسجيل الخروج
          </button>
        </div>
      )}

      <input
        className="w-full p-2 mb-4 rounded-xl bg-[#0b0f1a] border border-white/10
        focus:outline-none focus:border-indigo-500 placeholder-gray-400"
        placeholder="بحث عن مستخدم..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="scroll space-y-2 overflow-y-auto flex-1 pr-1">
        {users
          .filter((u) => u.fullname.toLowerCase().includes(search.toLowerCase()))
          .map((u) => {
            const isActive = selectedUser?._id === u._id;
            const isOnline = onlineUsers.includes(u._id);
            return (
              <div
                key={u._id}
                onClick={() => selectUser(u)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between
                  transition-all ${
                    isActive
                      ? "bg-indigo-600/20 border border-indigo-500/40"
                      : "hover:bg-white/5"
                  }`}
              >
                <img src={u.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                <span className="font-medium">{u.fullname}</span>
                {isOnline && (
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                )}
              </div>
            );
          })}
      </div>
    </aside>
  );
}

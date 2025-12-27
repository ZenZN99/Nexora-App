import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../images/logo.png";

const Navbar = () => {
  const { user, loadUser, logout } = useUserStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black  border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img
            src={logo}
            alt="Nexora Logo"
            className="w-[150px] md:w-[300px] h-12 md:h-24 p-2 object-cover"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-white border border-gray-700 hover:bg-gray-800 transition"
              >
                <FaSignInAlt />
                تسجيل الدخول
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-blue-500 text-black font-semibold hover:bg-blue-600 transition"
              >
                <FaUserPlus />
                إنشاء حساب
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                <img
                  src={user.avatar || "/avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500"
                />
                <FaChevronDown
                  className={`text-gray-300 transition ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm text-white font-semibold truncate">{user.fullname}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition"
                  >
                    <FaUserCircle />
                    الملف الشخصي
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-950/40 transition"
                  >
                    <FaSignOutAlt />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 text-xl"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden">
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 p-6 flex flex-col gap-4 animate-slide-in">
            <button
              className="self-end text-gray-300 text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>

            {!user ? (
              <>
                <button
                  onClick={() => { navigate("/login"); setSidebarOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-xl border border-gray-700 hover:bg-gray-800 transition"
                >
                  <FaSignInAlt />
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => { navigate("/signup"); setSidebarOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 text-black rounded-xl bg-blue-500 font-semibold hover:bg-blue-600 transition"
                >
                  <FaUserPlus />
                  إنشاء حساب
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm text-white font-semibold truncate">{user.fullname}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => { navigate("/profile"); setSidebarOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition rounded-xl"
                >
                  <FaUserCircle />
                  الملف الشخصي
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-950/40 transition rounded-xl"
                >
                  <FaSignOutAlt />
                  تسجيل الخروج
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

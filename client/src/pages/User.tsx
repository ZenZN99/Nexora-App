import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, blockUser } from "../api/user/request";
import { useUserStore } from "../stores/useUserStore";
import { FaUserShield, FaBan } from "react-icons/fa";
import toast from "react-hot-toast";

const UserView = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useUserStore(); // المستخدم الحالي
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (!id || !token) return;

    const fetchUser = async () => {
      setLoading(true);
      const data = await getUserById(token, id);
      if (!data.error) setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleBlock = async () => {
    if (!user?.email) return;
    const token = localStorage.getItem("token") || "";
    setBlocking(true);

    const res = await blockUser(token, user.email);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("تم حظر المستخدم بنجاح");
      setUser({ ...user, blocked: true }); // وضع حالة حظر مؤقتة للعرض
    }

    setBlocking(false);
  };

  if (loading) return <p className="text-white text-center mt-10">جاري التحميل...</p>;
  if (!user) return <p className="text-white text-center mt-10">المستخدم غير موجود</p>;

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Cover */}
      <div className="relative h-64">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative -mt-20 flex flex-col md:flex-row gap-6 items-center md:items-end">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-36 h-36 rounded-full border-4 border-gray-950 object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.fullname}</h1>
            <p className="text-gray-400">{user.email}</p>

            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
              <FaUserShield />
              {user.role}
            </div>

            {/* زر الحظر يظهر فقط للمسؤول */}
            {currentUser?.role === "مسؤول" && !user.blocked && (
              <button
                onClick={handleBlock}
                disabled={blocking}
                className="mt-4 mr-2 inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition"
              >
                <FaBan />
                حظر المستخدم
              </button>
            )}

            {user.blocked && (
              <span className="mt-4 mr-2 inline-block px-4 py-2 bg-red-700 rounded-xl text-white font-semibold">
                تم حظر هذا المستخدم
              </span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-10 bg-white/5 rounded-2xl p-6">
          <h2 className="font-bold mb-3">الحالة</h2>
          <p className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300">
            {user.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserView;

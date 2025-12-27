import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { editStatus, profile } from "../api/user/request";
import toast from "react-hot-toast";
import { FaCamera, FaUserShield } from "react-icons/fa";

const Profile = () => {
  const { user, loadUser } = useUserStore();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [status, setStatus] = useState(user?.status || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user?.status) setStatus(user.status);
  }, [user]);

  if (!user) return null;

  const token = localStorage.getItem("token")!;

  const handleImagesUpdate = async () => {
    if (!avatar && !cover) return;
    setLoading(true);

    const res = await profile(token, avatar as File, cover as File);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("تم تحديث الصور بنجاح");
      loadUser();
      setAvatar(null);
      setCover(null);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (!status.trim()) return;
    setLoading(true);

    const res = await editStatus(token, status);

    if (res?.error) toast.error(res.error);
    else {
      toast.success("تم تحديث الحالة");
      loadUser();
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Cover */}
      <div className="relative h-64">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <label className="absolute right-4 bottom-4 bg-black/60 px-4 py-2 rounded-full cursor-pointer flex items-center gap-2 text-sm">
          <FaCamera />
          تغيير الغلاف
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
          />
        </label>
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
            <label className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.fullname}</h1>
            <p className="text-gray-400">{user.email}</p>

            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
              <FaUserShield />
              {user.role}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">

          {/* Status */}
          <div className="bg-white/5 rounded-2xl p-6">
            <h2 className="font-bold mb-3">الحالة</h2>
            <textarea
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 resize-none focus:outline-none"
              rows={3}
            />
            <button
              onClick={handleStatusUpdate}
              disabled={loading}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-bold"
            >
              تحديث الحالة
            </button>
          </div>

          {/* Images */}
          <div className="bg-white/5 rounded-2xl p-6">
            <h2 className="font-bold mb-3">تعديل الصور</h2>

            <div className="text-sm text-gray-400 mb-4">
              يمكنك تغيير صورة الحساب أو الغلاف
            </div>

            <button
              onClick={handleImagesUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition"
            >
              حفظ التغييرات
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;


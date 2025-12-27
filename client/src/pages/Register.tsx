import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/user/request";
import toast from "react-hot-toast";
import logo from "../images/logo.jpg";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await register(fullname, email, password);
      if (data?.error) {
        setErrorMessage(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(`مرحباً ${data.user.fullname}`);
        navigate("/");
      }
    } catch {
      toast.error("حدث خطأ، حاول لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  return (
    <div dir="rtl" className="relative min-h-screen flex items-center justify-center">

      {/* BG Logo with Blur */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover blur-md scale-110"
        style={{ backgroundImage: `url(${logo})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className="
            bg-gray-900/90 backdrop-blur-xl
            border border-gray-800
            rounded-2xl shadow-2xl p-8
            animate-[fadeIn_0.6s_ease-out]
          "
        >
          {/* Logo + Title */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
            <img
              src="/icon.jpg"
              alt="Nexora Icon"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">
                إنشاء حساب
              </h2>
              <p className="text-sm text-gray-400">
                أنشئ حسابك وابدأ رحلتك معنا
              </p>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg p-3 text-center">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-black py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            لديك حساب بالفعل؟
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline mr-1"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;

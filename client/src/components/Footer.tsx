import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useUserStore } from "../stores/useUserStore";
import { AiOutlineGlobal } from "react-icons/ai";

const Footer = () => {
  const { user } = useUserStore();
  return (
    <footer className="relative bg-gray-950 border-t border-white/10 text-gray-400">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/icon.jpg"
              alt="Nexora"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <span className="text-white text-xl font-bold">Nexora</span>
          </div>
          <p className="text-sm leading-relaxed">
            منصة دردشة فورية وآمنة تتيح لك التواصل مع الأصدقاء والزملاء بسهولة،
            في أي وقت ومن أي جهاز.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">روابط</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                الرئيسية
              </Link>
            </li>

            {user ? (
              <li>
                <Link to="/profile" className="hover:text-white transition">
                  الملف الشخصي
                </Link>
              </li>
            ) : (
              <div className="flex flex-col gap-2">
                <li>
                  <Link to="/login" className="hover:text-white transition">
                    تسجيل الدخول
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-white transition">
                    إنشاء حساب
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">قانوني</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/policy">سياسة الخصوصية</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/terms"> الشروط والأحكام</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/support">الدعم</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
          <div className="flex gap-4">
            <a
              href="https://github.com/ZenZN99"
              target="_blank"
              className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579430121762"
              target="_blank"
              className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-white transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/zen-allaham-789907370/"
              target="_blank"
              className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www-zen-portfolio.netlify.app"
              target="_blank"
              className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-white transition"
            >
              <AiOutlineGlobal />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-sm">
        © {new Date().getFullYear()} Nexora. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { FaRocketchat, FaShieldAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { HiOutlineLogin } from "react-icons/hi";

const Welcome = () => {
  return (
   <div>
          <Navbar />
     <div className="relative bg-gray-950 flex flex-col items-center justify-center w-full min-h-screen px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      {/* Logo */}
      <img
        src="/icon.jpg"
        alt="Nexora Logo"
        className="w-20 h-20 mb-6 rounded-full shadow-lg ring-2 ring-blue-500 cursor-pointer"
      />

      {/* Title */}
      <h1 className="title text-white text-5xl sm:text-7xl md:text-[90px] font-extrabold tracking-wide cursor-pointer">
        Nexora
      </h1>

      {/* Description */}
      <p className="mt-6 text-gray-300 text-center text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed">
        انضم إلى آلاف المستخدمين حول العالم، وابدأ محادثات ممتعة وفورية مع
        أصدقائك وزملائك. استمتع بتجربة دردشة سلسة وآمنة مع{" "}
        <span className="font-semibold text-white">Nexora App</span>.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">

        {/* Main CTA */}
        <Link
          to="/signup"
          className="cursor-pointer flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold rounded-full hover:scale-105 transition"
        >
          <FaRocketchat size={20} />
          ابدأ المحادثة الآن
        </Link>

        <Link
          to="/login"
          className="cursor-pointer flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition"
        >
          <HiOutlineLogin />
         سجل دخولك الآن
        </Link>
      </div>

      {/* Features */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">

        <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full text-gray-300 hover:bg-white/10 transition">
          ⚡ دردشة فورية Realtime
        </div>

        <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full text-gray-300 hover:bg-white/10 transition">
          📱 يعمل على جميع الأجهزة
        </div>

        <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full text-gray-300 hover:bg-white/10 transition">
          <FaShieldAlt className="text-blue-400" />
          أمان وخصوصية
        </div>

      </div>
    </div>
    <Footer />
   </div>
  );
};

export default Welcome;

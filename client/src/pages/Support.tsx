import { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "هل Nexora مجاني؟",
    answer: "نعم، Nexora يوفر خطة مجانية مع ميزات أساسية، مع خطط مدفوعة مستقبلًا.",
  },
  {
    question: "هل يتم مراقبة الرسائل؟",
    answer:
      "يتم مراقبة المحتوى تلقائيًا لمنع أي محتوى مخالف للشروط والأحكام.",
  },
  {
    question: "ماذا يحدث عند مخالفة القوانين؟",
    answer:
      "أي مخالفة قد تؤدي إلى تحذير، إيقاف مؤقت، أو حظر دائم حسب نوع المخالفة.",
  },
  {
    question: "هل بياناتي آمنة؟",
    answer:
      "نعم، نستخدم تقنيات حديثة لحماية البيانات وعدم مشاركتها مع أطراف خارجية.",
  },
  {
    question: "كيف أتواصل مع الدعم؟",
    answer:
      "يمكنك التواصل معنا مباشرة عبر نموذج الدعم أسفل الصفحة.",
  },
];

const Support = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaq = faqData.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="bg-gray-950 min-h-screen px-4 py-20 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <FaQuestionCircle className="mx-auto text-blue-500 text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            مركز الدعم
          </h1>
          <p className="text-gray-400">
            الأسئلة الشائعة والتواصل مع فريق Nexora
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن سؤال..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 pr-12 pl-4 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* FAQ */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaq.length === 0 && (
            <p className="text-center text-gray-500">
              لا توجد نتائج مطابقة
            </p>
          )}

          {filteredFaq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-right"
                >
                  <span className="font-semibold">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3">
              تواصل مع الدعم
            </h2>
            <p className="text-gray-400">
              لم تجد إجابتك؟ أرسل لنا رسالتك
            </p>
          </div>

          <form className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-6">

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="الاسم الكامل"
                className="w-full py-4 pr-12 pl-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full py-4 pr-12 pl-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Message */}
            <textarea
              rows={5}
              placeholder="اكتب رسالتك هنا..."
              className="w-full p-4 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition"
            >
              <FaPaperPlane />
              إرسال الرسالة
            </button>
          </form>
        </div>

      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Support;

import {
  FaLock,
  FaUserShield,
  FaDatabase,
  FaImage,
  FaBalanceScale,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
<div>
  <Navbar />
      <div className="bg-gray-950 min-h-screen px-4 py-20 text-white">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center">
          <FaUserShield className="mx-auto text-blue-500 text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            في Nexora، نولي خصوصيتك أهمية قصوى ونعمل على حماية بياناتك بأعلى
            المعايير الأمنية.
          </p>
        </div>

        {/* Section 1 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/data-protection.jpg"
            alt="Data Protection"
            className="rounded-2xl shadow-lg border border-gray-800"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaDatabase className="text-blue-400" />
              جمع البيانات
            </h2>
            <p className="text-gray-400 leading-relaxed">
              نقوم بجمع الحد الأدنى من البيانات الضرورية لتقديم خدمة دردشة آمنة
              وفعالة، مثل الاسم، البريد الإلكتروني، وصورة الملف الشخصي. لا نقوم
              بجمع أي بيانات دون علم المستخدم.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaLock className="text-blue-400" />
              حماية المعلومات
            </h2>
            <p className="text-gray-400 leading-relaxed">
              يتم تخزين جميع البيانات باستخدام تقنيات تشفير حديثة، ويتم تأمين
              الاتصالات عبر بروتوكولات مشفرة لحماية المستخدم من أي اختراق أو
              تسريب.
            </p>
          </div>
          <img
            src="/security.jpg"
            alt="Security"
            className="rounded-2xl shadow-lg border border-gray-800"
          />
        </section>

        {/* Section 3 */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/content-control.jpg"
            alt="Content Control"
            className="rounded-2xl shadow-lg border border-gray-800"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaImage className="text-blue-400" />
              الصور والمحتوى
            </h2>
            <p className="text-gray-400 leading-relaxed">
              يُمنع رفع أو مشاركة أي صور إباحية أو مسيئة أو مخالفة للقوانين. أي
              محتوى مخالف سيتم حذفه فورًا وقد يؤدي إلى حظر الحساب.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaUserShield className="text-blue-400" />
              مشاركة البيانات
            </h2>
            <p className="text-gray-400 leading-relaxed">
              لا تقوم Nexora ببيع أو مشاركة بيانات المستخدمين مع أي طرف ثالث،
              باستثناء الحالات القانونية أو عند طلب الجهات الرسمية المختصة، وذلك
              ضمن الحدود التي يفرضها القانون فقط.
            </p>
          </div>
          <img
            src="/data-sharing.jpg"
            alt="Data Sharing"
            className="rounded-2xl shadow-lg border border-gray-800"
          />
        </section>

        {/* Section 5 */}
        <section className="bg-red-950/40 border border-red-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-400">
            <FaBalanceScale />
            الحقوق والعقوبات
          </h2>
          <p className="text-gray-300 leading-relaxed">
            تحتفظ Nexora بحق إيقاف أو حذف أي حساب يخالف سياسة الخصوصية أو الشروط
            والأحكام، دون إشعار مسبق، حفاظًا على سلامة المجتمع.
          </p>
        </section>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          آخر تحديث: {new Date().getFullYear()} © Nexora
        </div>
      </div>
    </div>
  <Footer />
</div>
  );
};

export default PrivacyPolicy;

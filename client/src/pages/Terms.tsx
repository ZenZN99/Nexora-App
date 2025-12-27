import { FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
   <div>
    <Navbar />
     <div className="bg-gray-950 min-h-screen px-4 py-20 text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <FaShieldAlt className="mx-auto text-blue-500 text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            الشروط والأحكام
          </h1>
          <p className="text-gray-400">
            يرجى قراءة هذه الشروط بعناية قبل استخدام Nexora، حيث إن استخدامك
            للتطبيق يعني موافقتك الكاملة عليها.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 leading-relaxed text-sm md:text-base">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1️⃣ السلوك المقبول
            </h2>
            <p className="mb-3">
              يلتزم جميع المستخدمين باستخدام Nexora بطريقة تحترم الآخرين
              وتحافظ على بيئة آمنة وإيجابية للجميع.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>يُمنع نشر أو مشاركة أي محتوى إباحي أو غير أخلاقي.</li>
              <li>يُمنع إرسال رسائل مسيئة، عنصرية، أو تحريضية.</li>
              <li>يُمنع التنمر، التهديد، أو المضايقة بأي شكل.</li>
              <li>يُمنع انتحال شخصية أي فرد أو جهة.</li>
              <li>يُمنع استخدام التطبيق لأغراض غير قانونية.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2️⃣ المحتوى والمسؤولية
            </h2>
            <p>
              يتحمل المستخدم المسؤولية الكاملة عن جميع الرسائل، الصور،
              والملفات التي يتم إرسالها أو مشاركتها عبر Nexora.
              لا تتحمل إدارة Nexora أي مسؤولية عن محتوى المستخدمين،
              لكنها تحتفظ بحق مراجعة أو حذف أي محتوى مخالف دون إشعار مسبق.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3️⃣ العقوبات
            </h2>
            <div className="bg-red-950/40 border border-red-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3 text-red-400">
                <FaExclamationTriangle />
                <span className="font-semibold">تنبيه هام</span>
              </div>
              <p>
                في حال مخالفة أي من الشروط المذكورة، يحق لإدارة Nexora
                اتخاذ الإجراءات المناسبة، والتي قد تشمل:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>إيقاف الحساب مؤقتًا.</li>
                <li>حظر الحساب نهائيًا دون سابق إنذار.</li>
                <li>حذف جميع الرسائل أو البيانات المرتبطة بالحساب.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4️⃣ الخصوصية
            </h2>
            <p>
              نلتزم في Nexora بحماية خصوصية المستخدمين وبياناتهم الشخصية.
              لن يتم مشاركة أي بيانات مع أطراف ثالثة إلا في الحالات
              التي يفرضها القانون أو لحماية حقوق المنصة والمستخدمين.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5️⃣ التعديلات على الشروط
            </h2>
            <p>
              تحتفظ Nexora بحق تعديل هذه الشروط والأحكام في أي وقت.
              سيتم نشر أي تحديث على هذه الصفحة، ويُعتبر استمرار استخدامك
              للتطبيق بعد التعديلات موافقة صريحة عليها.
            </p>
          </section>

        </div>
      </div>
    </div>
    <Footer />
   </div>
  );
};

export default Terms;

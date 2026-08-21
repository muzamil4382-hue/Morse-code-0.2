import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Disclaimer | Morse Code Translator",
  "Disclaimer for Morse Code Translator. Important information about the limitations and intended use of our Morse code tools and content.",
  "/disclaimer",
  ["disclaimer", "morse code translator disclaimer"]
);

export default function DisclaimerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Disclaimer", url: "/disclaimer" },
]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Disclaimer</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Disclaimer</h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p><strong>Last updated:</strong> August 15, 2026</p>

          <h2 className="text-xl font-bold text-slate-900">General Disclaimer</h2>
          <p>
            The information and Morse code translations provided on Morse Code Translator are for general informational
            and educational purposes only. While we strive for accuracy and follow the International Morse Code
            standard (ITU-R M.1677), we make no representations or warranties of any kind, express or implied,
            about the completeness, accuracy, reliability, or suitability of the information, tools, or related
            graphics contained on the website.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Emergency Use Disclaimer</h2>
          <p className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            <strong>⚠️ Important:</strong> The Morse code tools on this website are designed for educational and
            personal use. In genuine life-threatening emergencies, always use officially recognized communication
            methods and equipment. Do not rely solely on this website or any online tool for emergency signaling.
            Always have backup communication methods available.
          </p>
          <p>
            While we provide information about distress signals such as SOS, this information should be used as
            supplementary knowledge only. Professional emergency communication training and equipment should always
            be your primary resource in critical situations.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Educational Content</h2>
          <p>
            The articles, guides, and tutorials on our website are provided for educational purposes. They represent
            our best understanding of Morse code history, techniques, and applications as of the date of publication.
            Historical facts and technical details may evolve as new research becomes available.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Translation Accuracy</h2>
          <p>
            Our Morse code translator follows the International Morse Code standard. However, different regions,
            organizations, and historical periods have used variations of Morse code. For critical applications
            (military, aviation, maritime), always verify translations against the specific standard required by
            your organization or regulatory body.
          </p>

          <h2 className="text-xl font-bold text-slate-900">External Links</h2>
          <p>
            Our website may contain links to external websites. We do not control the content of these external
            sites and are not responsible for their accuracy, availability, or privacy practices. The inclusion
            of any link does not imply endorsement of the linked site.
          </p>

          <h2 className="text-xl font-bold text-slate-900">No Professional Advice</h2>
          <p>
            The content on Morse Code Translator does not constitute professional advice of any kind. For professional
            Morse code training, licensing requirements, or regulatory compliance, consult with appropriate
            authorities, certified instructors, or regulatory bodies in your jurisdiction.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p>
            If you have concerns about the accuracy of any information on our website, please{" "}
            <Link href="/contact" className="text-green-600 underline">contact us</Link> and we will
            investigate and correct any errors.
          </p>
        </div>
      </div>
    
        {/* Popular Tools */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Morse Code Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Translator
            </Link>
            <Link href="/morse-code-decoder" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔓 Decoder
            </Link>
            <Link href="/morse-code-alphabet" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Alphabet
            </Link>
            <Link href="/learn-morse-code" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learn
            </Link>
            <Link href="/morse-code-quiz" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🎯 Quiz
            </Link>
            <Link href="/contact" className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              ✉️ Contact Us
            </Link>
          </div>
        </section>
      </main>
  );
}

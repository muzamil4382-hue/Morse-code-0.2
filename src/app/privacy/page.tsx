import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMeta, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta(
  "Privacy Policy | Morse Code Translator",
  "Privacy policy for Morse Code Translator. Learn how we handle your data and protect your privacy.",
  "/privacy",
  ["privacy policy", "morse code translator privacy"]
);

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy" },
]);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p><strong>Last updated:</strong> December 15, 2024</p>

          <h2 className="text-xl font-bold text-slate-900">Introduction</h2>
          <p>
            Morse Code Translator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
            to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your
            information when you visit our website at www.morsecodetranslater.com (the &quot;Service&quot;).
          </p>

          <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
          <p>
            We collect minimal information to provide and improve our Service:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Usage Data:</strong> We may collect anonymous usage data such as pages visited, time spent on pages, and browser type. This data does not identify you personally.</li>
            <li><strong>Cookies:</strong> We use essential cookies for website functionality and optional analytics cookies to understand how visitors use our site. You can control cookie settings through your browser.</li>
            <li><strong>Voluntary Information:</strong> If you contact us through our contact form, we collect the information you provide (name, email, message content).</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide, maintain, and improve our Service</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure the security and integrity of our Service</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">Data Storage and Security</h2>
          <p>
            All Morse code translations are processed entirely in your browser. We do not store, transmit, or have
            access to any text you translate. Your translations stay on your device. We implement appropriate
            security measures to protect the limited data we do collect.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Third-Party Services</h2>
          <p>
            We may use third-party analytics services (such as Google Analytics) to understand website usage. These
            services may collect information sent by your browser as part of a web page request, such as cookies or
            your IP address. These services are subject to their own privacy policies.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Children&apos;s Privacy</h2>
          <p>
            Our Service is suitable for users of all ages. We do not knowingly collect personal information from
            children under 13. If you believe we have collected information from a child under 13, please contact us
            and we will promptly remove it.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete any personal information we hold about you. To exercise
            these rights, please contact us using the information below.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the
            new policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <Link href="/contact" className="text-green-600 underline">our contact page</Link>.
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

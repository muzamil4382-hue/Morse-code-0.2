"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
  Bug,
  Lightbulb,
  CircleHelp,
  ShieldCheck,
} from "lucide-react";

const inquiryTypes = [
  {
    value: "General Question",
    label: "General Question",
  },
  {
    value: "Bug Report",
    label: "Report a Bug",
  },
  {
    value: "Feature Request",
    label: "Suggest a Feature",
  },
  {
    value: "Content Correction",
    label: "Report Incorrect Content",
  },
  {
    value: "Feedback",
    label: "General Feedback",
  },
];

const faqs = [
  {
    q: "Do you offer a Morse code API?",
    a: "We do not currently offer a public Morse code API. If you have a specific use case or would like to see an API added in the future, you can contact the Morse Code Translator Team and share your requirements.",
  },
  {
    q: "Can I suggest a new feature?",
    a: "Yes. We welcome suggestions for new tools, improvements, learning resources, and features. Describe your idea in as much detail as possible so our team can understand how it could improve the website.",
  },
  {
    q: "How do I report an incorrect translation or technical problem?",
    a: "Select Bug Report or Content Correction as your inquiry type and include the page URL, the text or Morse code you entered, the result you received, and a short description of the issue.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-green-600 transition-colors"
          >
            Home
          </Link>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900 font-medium">
            Contact
          </span>
        </nav>

        {/* Hero */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700 mb-4">
            <MessageSquare className="w-4 h-4" />
            Contact the Morse Code Translator Team
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Have a question about Morse code, found an issue with one of our
            tools, or have an idea that could improve the website? Send us a
            message and the Morse Code Translator Team will review it.
          </p>
        </section>

        {/* Contact Information */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <div className="w-11 h-11 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <CircleHelp className="w-5 h-5" />
            </div>

            <h2 className="font-semibold text-slate-900 mb-2">
              Questions & Support
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Ask questions about our Morse code translator, decoder,
              alphabet charts, learning resources, or other tools.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <div className="w-11 h-11 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Bug className="w-5 h-5" />
            </div>

            <h2 className="font-semibold text-slate-900 mb-2">
              Report an Issue
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Found a broken page, incorrect translation, technical problem,
              or inaccurate information? Let us know.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <div className="w-11 h-11 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>

            <h2 className="font-semibold text-slate-900 mb-2">
              Suggestions
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Share ideas for new Morse code tools, educational content,
              features, or improvements to the website.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl p-6 text-white h-full">
              <Mail className="w-7 h-7 text-green-400 mb-5" />

              <h2 className="text-xl font-bold mb-3">
                Send Us a Message
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Please provide enough detail for us to understand your
                question, suggestion, or issue.
              </p>

              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Messages submitted through this form are used to respond
                    to your inquiry and help us improve Morse Code Translator.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-700">
                <Link
                  href="/privacy"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Read our Privacy Policy →
                </Link>
              </div>
            </div>
          </aside>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700 mb-2 block"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700 mb-2 block"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-700 mb-2 block"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  >
                    <option value="">Select an option</option>

                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700 mb-2 block"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    required
                    minLength={10}
                    className="w-full min-h-[180px] p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y transition-all"
                    placeholder="Please include as much relevant detail as possible..."
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />

                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center">
                <div className="text-5xl mb-5">✓</div>

                <h2 className="text-2xl font-bold text-green-900 mb-3">
                  Message Received
                </h2>

                <p className="text-green-800 max-w-md mx-auto mb-7 leading-relaxed">
                  Thank you for contacting the Morse Code Translator Team.
                  Your message has been submitted successfully.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setError("");
                  }}
                  className="text-green-700 font-semibold hover:text-green-800 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="max-w-3xl mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600 mb-2">
              Help Center
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === i ? null : i)
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-slate-900">
                    {faq.q}
                  </span>

                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="border-t border-slate-200 pt-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-600 mb-2">
                Explore the Website
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                Popular Morse Code Resources
              </h2>
            </div>

            <Link
              href="/about"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Learn about our team →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔤 Morse Code Translator
            </Link>

            <Link
              href="/morse-code-decoder"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔓 Morse Code Decoder
            </Link>

            <Link
              href="/morse-code-alphabet"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📋 Morse Code Alphabet
            </Link>

            <Link
              href="/morse-code-numbers"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔢 Morse Code Numbers
            </Link>

            <Link
              href="/learn-morse-code"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📖 Learn Morse Code
            </Link>

            <Link
              href="/morse-code-quiz"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🎯 Morse Code Quiz
            </Link>

            <Link
              href="/morse-code-timing"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              ⏱️ Morse Code Timing
            </Link>

            <Link
              href="/morse-code-sounds"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              🔊 Morse Code Sounds
            </Link>

            <Link
              href="/binary-code-translator"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              💻 Binary Code Translator
            </Link>

            <Link
              href="/blog"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📝 Morse Code Blog
            </Link>

            <Link
              href="/what-is-morse-code"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              📚 What Is Morse Code?
            </Link>

            <Link
              href="/about"
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors"
            >
              👥 About Our Team
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
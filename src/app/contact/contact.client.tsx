"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Contact</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a question, suggestion, or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-sm text-slate-600">hello@morsecode.world</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
              <p className="text-sm text-slate-600">We typically respond within 24-48 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[150px] p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y transition-all"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Do you offer a Morse code API?", a: "We don't currently offer a public API, but it's something we're considering for the future. If you're interested, let us know through the contact form." },
              { q: "Can I suggest a new feature?", a: "Absolutely! We love hearing from our users. Use the form above to submit your ideas and we'll consider them for future updates." },
              { q: "I found an error on the site. How do I report it?", a: "Please use the contact form above and select 'Bug Report' or similar in the subject line. We'll fix it as soon as possible." },
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Useful Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Useful Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔤 Morse Translator
            </Link>
            <Link href="/morse-code-alphabet" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📋 Alphabet Chart
            </Link>
            <Link href="/learn-morse-code" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📖 Learn Guide
            </Link>
            <Link href="/morse-code-quiz" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🎯 Take Quiz
            </Link>
            <Link href="/morse-code-decoder" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              🔓 Morse Decoder
            </Link>
            <Link href="/blog" className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors">
              📝 Read Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

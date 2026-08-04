"use client";

import { useState } from "react";
import {
  Radio, Volume2, Lightbulb, BookOpen, Zap,
  Settings, Trash2, Copy, Check, Download
} from "lucide-react";
import { textToMorse, playMorseAudio } from "@/lib/morse";
import TranslatorCore from "../translator-core";
import { MORSE_CODE } from "@/lib/morse";
import { motion } from "framer-motion";

// --- TOOLS SECTION ---
function ToolsSection() {
  const [activeTool, setActiveTool] = useState<string>("translator");

  const tools = [
    { id: "translator", icon: Radio, label: "Translator", desc: "Text ↔ Morse Code" },
    { id: "generator", icon: Zap, label: "Generator", desc: "Create Morse Messages" },
    { id: "decoder", icon: Settings, label: "Decoder", desc: "Morse → Text" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
              activeTool === tool.id
                ? "border-green-500 bg-green-50"
                : "border-slate-200 bg-white hover:border-green-200"
            }`}
          >
            <tool.icon className={`w-6 h-6 mb-2 ${activeTool === tool.id ? "text-green-600" : "text-slate-400"}`} />
            <h3 className={`font-semibold ${activeTool === tool.id ? "text-green-600" : "text-slate-900"}`}>
              {tool.label}
            </h3>
            <p className="text-xs text-slate-500">{tool.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {activeTool === "translator" && <TranslatorCore initialMode="text-to-morse" />}
        {activeTool === "generator" && <TranslatorCore initialMode="text-to-morse" />}
        {activeTool === "decoder" && <TranslatorCore initialMode="morse-to-text" />}
      </div>
    </div>
  );
}

// --- LEARN SECTION ---
function LearnSection() {
  const [activeTab, setActiveTab] = useState<string>("alphabet");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numbers = "0123456789".split("");

  const learnTabs = [
    { id: "alphabet", label: "Alphabet Chart" },
    { id: "howto", label: "How to Learn" },
    { id: "quickly", label: "Learn Quickly" },
    { id: "timing", label: "Rules & Timing" },
  ];

  const MorseSymbol = ({ code }: { code: string }) => (
    <div className="flex gap-1 items-center">
      {code.split("").map((char, i) => (
        <span
          key={i}
          className={
            char === "."
              ? "w-2 h-2 rounded-full bg-green-600"
              : char === "-"
              ? "w-5 h-2 rounded-full bg-green-600"
              : "w-3"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {learnTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "alphabet" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Letters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4">Letters A-Z</h3>
            <div className="grid grid-cols-4 gap-3">
              {letters.map((letter) => (
                <div key={letter} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-green-50 transition-colors">
                  <span className="font-bold text-green-600 w-5 text-center">{letter}</span>
                  <MorseSymbol code={MORSE_CODE[letter]} />
                </div>
              ))}
            </div>
          </div>

          {/* Numbers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4">Numbers 0-9</h3>
            <div className="grid grid-cols-2 gap-3">
              {numbers.map((num) => (
                <div key={num} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-green-50 transition-colors">
                  <span className="font-bold text-green-600 w-5 text-center">{num}</span>
                  <MorseSymbol code={MORSE_CODE[num]} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "howto" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4"
        >
          <h3 className="text-xl font-bold">How to Learn Morse Code</h3>
          <p className="text-slate-600">7 proven steps to master Morse code from beginner to expert.</p>
          {[
            { num: "01", title: "Start with the Alphabet", desc: "Familiarize yourself with the complete Morse code chart." },
            { num: "02", title: "Learn Common Letters First", desc: "Start with E (·), T (—), A (·−), I (··) — most frequent in English." },
            { num: "03", title: "Practice with Short Words", desc: "Try CAT, SOS, HELLO. Build muscle memory with common words." },
            { num: "04", title: "Use Mnemonic Devices", desc: 'Create memory aids: \'E = Elmer\' (single dot), \'T = Tall\' (single dash).' },
            { num: "05", title: "Listen to Morse Audio", desc: "Use the Translator with Sound to practice listening daily." },
            { num: "06", title: "Practice Daily", desc: "Spend 15 minutes daily. Consistency beats intensity!" },
            { num: "07", title: "Test Yourself", desc: "Use the Test & Trainer to track progress and identify weak areas." },
          ].map((step) => (
            <div key={step.num} className="flex gap-4 p-4 rounded-xl bg-slate-50">
              <div className="text-3xl font-bold text-green-200">{step.num}</div>
              <div>
                <h4 className="font-bold">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "quickly" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">The Koch Method</h3>
            <p className="text-slate-600 mb-2">
              Start with two letters at full speed (20 WPM). Master them, then add one more letter at a time.
            </p>
            <p className="text-slate-600">
              This method prevents the &quot;counting dots and dashes&quot; habit and builds instant recognition.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">Mnemonic Tricks</h3>
            <ul className="space-y-2 text-slate-600">
              <li><strong>E</strong> = &quot;Eh&quot; (single short dot)</li>
              <li><strong>T</strong> = &quot;Tall&quot; (single long dash)</li>
              <li><strong>A</strong> = &quot;A-bove&quot; (dot-dash: short-long)</li>
              <li><strong>N</strong> = &quot;N-ot&quot; (dash-dot: long-short)</li>
              <li><strong>SOS</strong> = &quot;Save Our Souls&quot; (··· −−− ···)</li>
            </ul>
          </div>
        </motion.div>
      )}

      {activeTab === "timing" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold mb-4">Morse Code Rules and Timing</h3>
          <p className="text-slate-600 mb-6">Understanding timing is essential for accurate Morse code transmission.</p>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Element</th>
                <th className="text-left py-2">Duration</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b"><td className="py-2">Dot (dit)</td><td>1 unit</td></tr>
              <tr className="border-b"><td className="py-2">Dash (dah)</td><td>3 units</td></tr>
              <tr className="border-b"><td className="py-2">Gap between elements</td><td>1 unit</td></tr>
              <tr className="border-b"><td className="py-2">Gap between letters</td><td>3 units</td></tr>
              <tr><td className="py-2">Gap between words</td><td>7 units</td></tr>
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

// --- INFO SECTION ---
function InfoSection() {
  const [activeTab, setActiveTab] = useState<string>("what-is");

  const infoTabs = [
    { id: "what-is", label: "What is Morse Code?" },
    { id: "sos", label: "SOS Signal" },
    { id: "facts", label: "Fun Facts" },
    { id: "famous", label: "Famous Messages" },
  ];

  const facts = [
    "First message: 'What hath God wrought' (1844)",
    "The letter E (single dot) is the shortest and most common",
    "SOS was chosen for simplicity, not as an acronym",
    "NATO still uses Morse code in training",
    "Morse code helps people with severe disabilities communicate",
    "The Titanic used both SOS and CQD signals",
    "Apollo astronauts used Morse code as backup",
    "Fastest operator: 75+ WPM",
    "Ham radio operators still use Morse code (CW mode)",
    "Numbers in Morse code follow a simple 5-signal pattern",
  ];

  const messages = [
    { year: "1844", message: "What hath God wrought", desc: "First official Morse code message by Samuel Morse." },
    { year: "1912", message: "CQD CQD SOS SOS", desc: "Titanic distress signals." },
    { year: "1937", message: "Sighted strange craft", desc: "Amelia Earhart's last confirmed transmissions." },
    { year: "1944", message: "D-Day coordinates", desc: "Morse code crucial for WWII military communication." },
    { year: "1970", message: "Apollo 13 backup", desc: "Morse code used as backup during Apollo 13 crisis." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {infoTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "what-is" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">The Birth of Morse Code</h3>
            <p className="text-slate-600 mb-3">
              Morse code was developed in the early 1830s and 1840s by <strong>Samuel Morse</strong> and <strong>Alfred Vail</strong>.
              First message sent on May 24, 1844: &quot;What hath God wrought&quot; between Washington, D.C. and Baltimore.
            </p>
            <p className="text-slate-600">
              It was the primary means of long-distance communication before the telephone, revolutionizing how the world connected.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <p className="text-slate-600 mb-3">Morse code uses two basic signals:</p>
            <ul className="space-y-2 text-slate-600">
              <li><strong>Dit (·)</strong>: Short signal — 1 unit duration</li>
              <li><strong>Dah (—)</strong>: Long signal — 3 units duration</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">Modern Applications</h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Amateur radio communication (CW mode)</li>
              <li>• Aviation NAVAID identifiers</li>
              <li>• Maritime communication and distress signals</li>
              <li>• Assistive technology for people with disabilities</li>
              <li>• Emergency signaling (SOS)</li>
            </ul>
          </div>
        </motion.div>
      )}

      {activeTab === "sos" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-8 text-center">
            <p className="text-green-400 text-5xl font-mono tracking-wider" dir="ltr">··· −−− ···</p>
            <p className="text-slate-400 mt-2">SOS — International Distress Signal</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">What Does SOS Mean?</h3>
            <p className="text-slate-600">
              SOS doesn&apos;t stand for anything. It was chosen because it&apos;s easy to transmit and recognize — three dots, three dashes, three dots.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">How to Signal SOS</h3>
            <ul className="space-y-2 text-slate-600">
              <li><strong>Flashlight</strong>: Three short, three long, three short flashes</li>
              <li><strong>Sound</strong>: Three short, three long, three short blasts</li>
              <li><strong>Visual</strong>: Draw SOS in sand or snow</li>
            </ul>
          </div>
        </motion.div>
      )}

      {activeTab === "facts" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {facts.map((fact, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4">
              <span className="text-2xl font-bold text-green-200">{i + 1}</span>
              <p className="text-slate-700">{fact}</p>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "famous" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
              <span className="text-3xl font-bold text-green-600">{msg.year}</span>
              <p className="text-lg font-mono mt-2 mb-2" dir="ltr">&quot;{msg.message}&quot;</p>
              <p className="text-slate-600">{msg.desc}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// --- BLOG SECTION ---
function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = [
    {
      slug: "what-is-morse-code-complete-history-guide",
      title: "What is Morse Code? Complete History & Guide",
      description: "Discover the fascinating history of Morse code from Samuel Morse's invention in 1836 to modern-day applications.",
      category: "History",
      date: "2024-12-15",
      readTime: "8 min",
      excerpt: "Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks. Developed by Samuel Morse and Alfred Vail in the 1830s-1840s, it revolutionized long-distance communication. The first official message was 'What hath God wrought' on May 24, 1844.",
    },
    {
      slug: "how-to-learn-morse-code-7-easy-steps",
      title: "How to Learn Morse Code: 7 Easy Steps",
      description: "A step-by-step guide to learning Morse code from scratch using proven methods.",
      category: "Learning",
      date: "2024-12-10",
      readTime: "6 min",
      excerpt: "Learning Morse code is easier than you might think. With the right approach and consistent practice, anyone can master it. Start with the most common letters E, T, A, I, N, O, S, H which make up 33% of English text.",
    },
    {
      slug: "sos-signal-in-morse-code",
      title: "SOS Signal: Everything You Need to Know",
      description: "Complete guide to the SOS distress signal in Morse code.",
      category: "Emergency",
      date: "2024-12-05",
      readTime: "5 min",
      excerpt: "The SOS signal is the most widely recognized distress call in the world. Established in 1906, it consists of three dots, three dashes, three dots. Contrary to popular belief, SOS doesn't stand for 'Save Our Souls.'",
    },
    {
      slug: "25-amazing-morse-code-facts",
      title: "25 Amazing Morse Code Facts You Didn't Know",
      description: "Fascinating facts about Morse code from WWII to modern applications.",
      category: "Facts",
      date: "2024-12-01",
      readTime: "7 min",
      excerpt: "The fastest Morse code operators can reach 75+ WPM. The Titanic used both SOS and CQD signals. Apollo astronauts used Morse code as backup. NATO still trains with Morse code today.",
    },
  ];

  if (selectedPost) {
    const post = posts.find((p) => p.slug === selectedPost);
    if (!post) return null;
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer"
        >
          ← Back to Blog
        </button>
        <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-3">
            {post.category}
          </span>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Morse code continues to play an important role in modern communication. From amateur radio operators to emergency signaling,
              this timeless encoding system remains relevant in our digital age. Whether you&apos;re a hobbyist, a student of history,
              or someone looking for a unique skill to master, Morse code offers a rewarding learning experience.
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <button
          key={post.slug}
          onClick={() => setSelectedPost(post.slug)}
          className="bg-white rounded-2xl border border-slate-200 p-6 text-left hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
        >
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-3">
            {post.category}
          </span>
          <h3 className="text-lg font-bold mb-2">{post.title}</h3>
          <p className="text-slate-600 text-sm mb-4">{post.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// --- MAIN SECTIONS COMPONENT ---
export default function Sections({ activeSection }: { activeSection: string }) {
  switch (activeSection) {
    case "tools":
      return <ToolsSection />;
    case "learn":
      return <LearnSection />;
    case "info":
      return <InfoSection />;
    case "blog":
      return <BlogSection />;
    default:
      return null;
  }
}

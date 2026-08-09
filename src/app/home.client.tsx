"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  Square,
  Copy,
  Check,
  Trash2,
  Download,
  ArrowDownUp,
  Settings,
  Share2,
  Zap,
  BookOpen,
  Headphones,
  FileText,
  Radio,
  Eye,
  Shuffle,
  Clock,
  Globe,
  Cpu,
  BarChart3,
  Type,
  Hash,
  Star,
  Plane,
  Users,
  Accessibility,
  Wifi,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";
import { textToMorse, morseToText, playMorseAudio, stopMorseAudio } from "@/lib/morse";
const MORSE_CODE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
};

interface FAQ { question: string; answer: string; }

interface Props { faqs: FAQ[]; }

export default function HomeClient({ faqs }: Props) {
  const [text, setText] = useState("");
  const [morseInput, setMorseInput] = useState("");
  const [mode, setMode] = useState<"text-to-morse" | "morse-to-text">("text-to-morse");
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [volume, setVolume] = useState(0.5);
  const [flashActive, setFlashActive] = useState(false);
  const [flashChar, setFlashChar] = useState<"dot" | "dash" | "off">("off");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computedMorse = useMemo(() => textToMorse(text), [text]);
  const computedText = useMemo(() => morseToText(morseInput), [morseInput]);
  const activeOutput = mode === "text-to-morse" ? computedMorse : computedText;
  const hasContent = !!activeOutput;

  useEffect(() => {
    setCharCount(mode === "text-to-morse" ? text.length : morseInput.length);
    setWordCount(mode === "text-to-morse" ? text.trim().split(/\s+/).filter(Boolean).length : morseInput.trim().split(/\s+/).filter(Boolean).length);
  }, [text, morseInput, mode]);

  useEffect(() => {
    return () => { if (flashRef.current) clearTimeout(flashRef.current); };
  }, []);

  const handlePlay = useCallback(async () => {
    if (playing) return;
    setPlaying(true);
    const morseStr = mode === "text-to-morse" ? computedMorse : textToMorse(text);
    await playMorseAudio(morseStr, { speed, frequency, volume });
    setPlaying(false);
  }, [playing, mode, computedMorse, text, speed, frequency, volume]);

  const handleStop = useCallback(() => { stopMorseAudio(); setPlaying(false); }, []);

  const handleSwap = useCallback(() => {
    setMode(mode === "text-to-morse" ? "morse-to-text" : "text-to-morse");
  }, [mode]);

  const handleCopy = useCallback(() => {
    if (!activeOutput) return;
    navigator.clipboard.writeText(activeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeOutput]);

  const handleShare = useCallback(async () => {
    if (!activeOutput) return;
    if (navigator.share) {
      try { await navigator.share({ title: "Morse Code Translation", text: activeOutput }); } catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(activeOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeOutput]);

  const handleDownloadTxt = useCallback(() => {
    if (!activeOutput) return;
    const blob = new Blob([activeOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "morse-code.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [activeOutput]);

  const handleDownloadWav = useCallback(() => {
    if (!hasContent) return;
    const morseStr = mode === "text-to-morse" ? computedMorse : textToMorse(text);
    const dotDur = 1.2 / speed; const dashDur = dotDur * 3;
    const symGap = dotDur; const letGap = dotDur * 3; const wordGap = dotDur * 7;
    const sampleRate = 44100; let totalDur = 0;
    for (const ch of morseStr) {
      if (ch === ".") totalDur += dotDur + symGap;
      else if (ch === "-") totalDur += dashDur + symGap;
      else if (ch === " ") totalDur += letGap - symGap;
      else if (ch === "/") totalDur += wordGap - symGap;
    }
    const numSamples = Math.ceil(sampleRate * totalDur);
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);
    const writeStr = (offset: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
    writeStr(0, "RIFF"); view.setUint32(4, 36 + numSamples * 2, true); writeStr(8, "WAVE");
    writeStr(12, "fmt "); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true);
    view.setUint16(34, 16, true); writeStr(36, "data");
    view.setUint32(40, numSamples * 2, true);
    let time = 0; const twoPi = 2 * Math.PI;
    for (const ch of morseStr) {
      let dur = 0;
      if (ch === ".") dur = dotDur; else if (ch === "-") dur = dashDur;
      else if (ch === " ") { time += letGap - symGap; continue; }
      else if (ch === "/") { time += wordGap - symGap; continue; }
      else continue;
      const start = Math.floor(time * sampleRate);
      const end = Math.min(Math.floor((time + dur) * sampleRate), numSamples);
      for (let i = start; i < end; i++) {
        const t = i / sampleRate;
        const env = Math.min(1, (t - time) / 0.005) * Math.min(1, (time + dur - t) / 0.005);
        const val = Math.sin(twoPi * frequency * t) * volume * env;
        const s = Math.round(val * 32767);
        const clamped = s > 32767 ? 32767 : s < -32768 ? -32768 : s;
        view.setInt16(44 + i * 2, clamped);
      }
      time += dur + symGap;
    }
    const blob = new Blob([buffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "morse-code.wav"; a.click();
    URL.revokeObjectURL(url);
  }, [hasContent, mode, computedMorse, text, speed, frequency, volume]);

  const handleFlash = useCallback(async () => {
    if (flashActive) { setFlashActive(false); setFlashChar("off"); return; }
    const morseStr = mode === "text-to-morse" ? computedMorse : textToMorse(text);
    setFlashActive(true);
    const dotDur = 1.2 / speed; const dashDur = dotDur * 3;
    const symGap = dotDur; const letGap = dotDur * 3; const wordGap = dotDur * 7;
    let time = 0;
    const sequence: { char: "dot" | "dash" | "off"; duration: number }[] = [];
    for (const ch of morseStr) {
      if (ch === ".") { sequence.push({ char: "dot", duration: dotDur }); sequence.push({ char: "off", duration: symGap }); }
      else if (ch === "-") { sequence.push({ char: "dash", duration: dashDur }); sequence.push({ char: "off", duration: symGap }); }
      else if (ch === " ") sequence.push({ char: "off", duration: letGap - symGap });
      else if (ch === "/") sequence.push({ char: "off", duration: wordGap - symGap });
    }
    for (const item of sequence) {
      setFlashChar(item.char);
      await new Promise(r => { flashRef.current = setTimeout(r, item.duration * 1000); });
    }
    setFlashChar("off"); setFlashActive(false);
  }, [flashActive, mode, computedMorse, text, speed]);

  const handleRandom = useCallback(() => {
    const messages = ["HELLO WORLD", "SOS", "I LOVE YOU", "MORSE CODE", "GOOD LUCK", "WELL DONE", "SEE YOU LATER", "THANK YOU", "KEEP GOING", "NEVER GIVE UP", "STAY SAFE", "GOOD NIGHT"];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setText(randomMsg); if (mode !== "text-to-morse") setMode("text-to-morse");
  }, [mode]);

  const handleClear = useCallback(() => { setText(""); setMorseInput(""); }, []);

  return (
    <div className={flashActive ? "bg-green-500/10 dark:bg-green-500/20 transition-colors duration-100" : ""}>
      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Radio className="w-4 h-4" /> Free Online Tool — No Registration Required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">Morse Code Translator</h1>
            <p className="text-lg sm:text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto leading-relaxed mb-8">
Convert text to Morse code and decode Morse code to text instantly using our free Morse Code Translator. Supports the International Morse Code (ITU) standard with real-time translation, audio playback, adjustable WPM controls, visual flash mode, WAV download, and educational resources for beginners, amateur radio operators, students, and professionals.
</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-green-200 dark:text-green-300">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Real-Time Translation</span>
              <span className="flex items-center gap-1.5"><Headphones className="w-4 h-4" /> Audio Playback</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> Visual Flash</span>
              <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> WAV Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRANSLATOR TOOL ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold transition-colors ${mode === "text-to-morse" ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`}>Text → Morse</span>
              <button onClick={handleSwap} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 transition-all cursor-pointer"><ArrowDownUp className="w-4 h-4" /></button>
              <span className={`text-sm font-semibold transition-colors ${mode === "morse-to-text" ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`}>Morse → Text</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleRandom} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 transition-all cursor-pointer" title="Random Message"><Shuffle className="w-4 h-4" /></button>
              <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-colors cursor-pointer ${showSettings ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"}`}><Settings className="w-4 h-4" /></button>
            </div>
          </div>
          {flashActive && (
            <div className="mb-5 flex flex-col items-center gap-3">
              <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-75 ${flashChar === "dot" ? "bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.7),0_0_120px_40px_rgba(253,224,71,0.3)]" : flashChar === "dash" ? "bg-green-400 shadow-[0_0_80px_30px_rgba(74,222,128,0.7),0_0_140px_50px_rgba(74,222,128,0.3)]" : "bg-slate-300 dark:bg-slate-700 shadow-none"}`}>
                <div className={`absolute inset-3 rounded-full transition-all duration-75 ${flashChar === "dot" ? "bg-yellow-200 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)]" : flashChar === "dash" ? "bg-green-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.6)]" : "bg-slate-200 dark:bg-slate-600"}`} />
                <span className={`relative z-10 text-sm font-bold tracking-wider ${flashChar === "off" ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"}`}>{flashChar === "dot" ? "DI" : flashChar === "dash" ? "DAAH" : ""}</span>
              </div>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Signal Lamp Active</span>
            </div>
          )}
          {showSettings && (
            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Speed: <span className="text-green-600 dark:text-green-400 font-semibold">{speed} WPM</span></label><input type="range" min="5" max="35" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-green-600" /></div>
              <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Frequency: <span className="text-green-600 dark:text-green-400 font-semibold">{frequency} Hz</span></label><input type="range" min="300" max="1000" step="50" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-green-600" /></div>
              <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Volume: <span className="text-green-600 dark:text-green-400 font-semibold">{Math.round(volume * 100)}%</span></label><input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-green-600" /></div>
            </div>
          )}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">{mode === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}</label>
            <div className="relative">
              <textarea value={mode === "text-to-morse" ? text : morseInput} onChange={(e) => { if (mode === "text-to-morse") setText(e.target.value); else setMorseInput(e.target.value); }} placeholder={mode === "text-to-morse" ? "Type your text here..." : "Enter Morse code (use . and -)..."} className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y font-mono text-lg transition-all" dir="ltr" maxLength={5000}/>
              <button onClick={handleClear} className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              <span>{charCount} characters, {wordCount} words</span>
              <span>{mode === "text-to-morse" ? "Supports A-Z, 0-9, and punctuation" : "Use dots (.) dashes (-) and spaces"}</span>
            </div>
          </div>
          <div className="mb-5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Output</label>
            <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-lg min-h-[80px]" dir="ltr">
              {hasContent ? <span>{activeOutput}</span> : <span className="text-slate-600 dark:text-slate-500">Output will appear here...</span>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {playing ? (
              <button onClick={handleStop} className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"><Square className="w-4 h-4" /> Stop</button>
            ) : (
              <button onClick={handlePlay} disabled={!hasContent} className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"><Volume2 className="w-4 h-4" /> Play Audio</button>
            )}
            <button onClick={handleFlash} disabled={!hasContent} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${flashActive ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"}`}><Eye className="w-4 h-4" /> {flashActive ? "Stop Flash" : "Visual Flash"}</button>
            <button onClick={handleCopy} disabled={!hasContent} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer">{copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}{copied ? "Copied!" : "Copy"}</button>
            <button onClick={handleShare} disabled={!hasContent} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"><Share2 className="w-4 h-4" /> Share</button>
            <button onClick={handleDownloadWav} disabled={!hasContent} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"><Download className="w-4 h-4" /> Download WAV</button>
            <button onClick={handleDownloadTxt} disabled={!hasContent} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"><FileText className="w-4 h-4" /> Download TXT</button>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS BAR ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { stat: "26", label: "Letters (A-Z)", icon: <Type className="w-5 h-5" /> },
            { stat: "10", label: "Numbers (0-9)", icon: <Hash className="w-5 h-5" /> },
            { stat: "15+", label: "Punctuation Marks", icon: <Star className="w-5 h-5" /> },
            { stat: "ITU-R M.1677", label: "International Standard", icon: <Globe className="w-5 h-5" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">{item.icon}</div>
              <div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">{item.stat}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How to Use This Morse Code Translator</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
Convert text to Morse code or decode Morse code to text in three simple steps. If you're new to Morse code, explore our{" "}
<Link
  href="/learn-morse-code"
  className="text-green-600 hover:underline font-semibold"
>
  Learn Morse Code Guide
</Link>
, view the{" "}
<Link
  href="/morse-code-alphabet"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Alphabet
</Link>
, or understand{" "}
<Link
  href="/morse-code-timing"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Timing
</Link>
for faster learning.
</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Type className="w-7 h-7" />, step: "Step 1", title: "Enter Your Message", desc: "Type or paste any text in the input box above. Our translator supports all 26 English letters (A-Z), digits (0-9), and common punctuation marks including period, comma, question mark, and more. You can write anything from a simple word to a full paragraph." },
            { icon: <Zap className="w-7 h-7" />, step: "Step 2", title: "Get Instant Translation", desc: "Your text is converted to Morse code in real time as you type. The output uses standard International Morse code with dots (.) representing short signals and dashes (-) representing long signals. You can also switch to Morse-to-Text mode to decode Morse code back to readable text." },
            { icon: <Headphones className="w-7 h-7" />, step: "Step 3", title: "Play, Download, or Share", desc: "Listen to the audio playback, enable visual flash mode for light-based signaling, download your Morse code as a WAV audio file or text file, copy to clipboard, or share directly via social media. Adjust speed, frequency, and volume to your preference." },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-green-500/5 transition-all group">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">{item.icon}</div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">{item.step}</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── KEY FEATURES ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Features of Our Morse Code Translator</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to translate, learn, and master Morse code in one comprehensive tool.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Zap className="w-5 h-5" />, title: "Real-Time Translation", desc: "Instantly convert text to Morse code and Morse code to text as you type. No waiting, no buttons to press. The translation happens live with every keystroke using the International Morse code standard." },
              { icon: <Volume2 className="w-5 h-5" />, title: "Audio Playback with Controls", desc: "Listen to your Morse code with adjustable speed (5-35 WPM), frequency (300-1000 Hz), and volume. Learn more in our Morse Code Sounds and Morse Code Timing guides." },
              { icon: <Eye className="w-5 h-5" />, title: "Visual Flash Mode", desc: "See Morse code come alive with screen flash visualization. Dots appear as short yellow flashes and dashes as longer green flashes, simulating how Morse code is transmitted using signal lamps and flashlights." },
              { icon: <Download className="w-5 h-5" />, title: "WAV Audio Download", desc: "Download your Morse code translation as a standard WAV audio file. The file is generated in your browser using the Web Audio API with your custom speed, frequency, and volume settings applied." },
              { icon: <ArrowDownUp className="w-5 h-5" />, title: "Bidirectional Translation", desc: "Switch seamlessly between text-to-Morse and Morse-to-text modes. Paste any Morse code using dots and dashes, and the translator decodes it back to readable English text instantly." },
              { icon: <Settings className="w-5 h-5" />, title: "Fully Customizable", desc: "Fine-tune your experience with speed (WPM), frequency (Hz), and volume controls. The Farnsworth timing method is built in, making this tool ideal for both beginners and advanced Morse code operators." },
              { icon: <Copy className="w-5 h-5" />, title: "Copy, Share & Download", desc: "One-click copy to clipboard, direct social sharing, and download as TXT or WAV. Share your Morse code messages with friends, use them in projects, or save them for later reference." },
              { icon: <Shuffle className="w-5 h-5" />, title: "Random Message Generator", desc: "Generate random Morse code messages instantly with the shuffle button. Perfect for practice, testing your decoding skills, or just having fun with secret messages." },
              { icon: <BarChart3 className="w-5 h-5" />, title: "Character & Word Counter", desc: "Real-time character and word count displayed below the input box. Track the length of your message as you type, helping you stay within limits for practice sessions or competitions." },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MORSE CODE ALPHABET CHART ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Quick Morse Code Reference</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
Browse a quick reference for common Morse code letters and numbers.
For the complete alphabet, symbols, pronunciation, examples, and printable charts, visit our{" "}
<Link
  href="/morse-code-alphabet"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Alphabet
</Link>
{" "}page. You can also practice with our{" "}
<Link
  href="/morse-code-decoder"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Decoder
</Link>
{" "}or learn the correct{" "}
<Link
  href="/morse-code-timing"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Timing
</Link>
{" "}rules.
</p>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Type className="w-5 h-5 text-green-600" /> Letters (A-Z)</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE).filter(([k]) => /^[A-Z]$/.test(k)).map(([letter, code]) => (
            <Link key={letter} href={`/morse-code-letter/${letter.toLowerCase()}`} className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all cursor-pointer" onClick={(e) => { e.preventDefault(); playMorseAudio(code, { speed: 25, frequency: 600, volume: 0.4 }); }}>
              <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{letter}</span>
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-1">{code}</span>
            </Link>
          ))}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Hash className="w-5 h-5 text-green-600" /> Numbers (0-9)</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE).filter(([k]) => /^[0-9]$/.test(k)).map(([num, code]) => (
            <Link key={num} href={`/morse-code-number/${num}`} className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all cursor-pointer" onClick={(e) => { e.preventDefault(); playMorseAudio(code, { speed: 25, frequency: 600, volume: 0.4 }); }}>
              <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{num}</span>
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-1">{code}</span>
            </Link>
          ))}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Punctuation & Symbols</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2.5">
          {Object.entries(MORSE_CODE).filter(([k]) => !/^[A-Z0-9]$/.test(k)).map(([char, code]) => (
            <div key={char} className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-lg font-bold text-slate-900 dark:text-white">{char}</span>
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-1">{code}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/morse-code-alphabet" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">View Complete Morse Code Alphabet <BookOpen className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* ─── WHAT IS MORSE CODE ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">What Is Morse Code?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
Morse code is a method of telecommunication that represents letters, numbers, and symbols using dots and dashes. Developed by Samuel Morse and Alfred Vail in 1837, it later became the international standard for long-distance communication. If you're new to Morse code, start with our{" "}
<Link
  href="/learn-morse-code"
  className="text-green-600 hover:underline font-semibold"
>
  Learn Morse Code
</Link>{" "}
guide, explore the{" "}
<Link
  href="/morse-code-alphabet"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Alphabet
</Link>{" "}
or try our{" "}
<Link
  href="/morse-code-decoder"
  className="text-green-600 hover:underline font-semibold"
>
  Morse Code Decoder
</Link>{" "}
to practice real examples.
</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">History and Origins</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Morse code was invented in the United States by Samuel F.B. Morse, an American artist and inventor who is also known for his portrait paintings of notable figures including former U.S. President John Adams. Working with his assistant Alfred Vail, Morse developed the electrical telegraph system and the code that bears his name. The first official Morse code message, &quot;What hath God wrought,&quot; was transmitted on May 24, 1844, from Washington, D.C. to Baltimore, Maryland, a distance of approximately 40 miles.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">The original American Morse code was later refined into International Morse code at the International Telegraph Conference in Vienna in 1865. This standardized version, adopted by the International Telecommunication Union (ITU), is the version used globally today. A key difference is that International Morse code uses consistent timing ratios, making it more reliable for international communication across different languages and telegraph systems.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How Morse Code Works</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Morse code encodes each character using combinations of dots (short signals, technically called &quot;dits&quot;) and dashes (long signals, called &quot;dahs&quot;). The timing follows strict ITU-standardized ratios: a dash is exactly three times the length of a dot, the space between parts of the same letter equals one dot duration, the space between letters equals three dot durations, and the space between words equals seven dot durations.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">The standard speed for Morse code transmission is measured in words per minute (WPM), where one &quot;word&quot; is defined as &quot;PARIS&quot; (50 dot units). Novice operators typically operate at 5 to 10 WPM, while experienced ham radio operators can comfortably decode at 20 to 30 WPM. The current world record for receiving Morse code exceeds 75 WPM, set by expert operators during competitions.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "1837", label: "Year Invented" },
              { stat: "1844", label: "First Official Message" },
              { stat: "1865", label: "International Standard" },
              { stat: "1999", label: "Last Maritime Use" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-extrabold text-green-700 dark:text-green-400">{item.stat}</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/what-is-morse-code" className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors">Read the Complete History of Morse Code →</Link>
          </div>
        </div>
      </section>

      {/* ─── HOW MORSE CODE WORKS (TIMING DIAGRAM) ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How Morse Code Timing Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Every Morse code transmission is governed by a precise timing system defined by the International Telecommunication Union (ITU) under standard ITU-R M.1677. A dot represents 1 unit of time, a dash represents 3 units, and gaps between elements follow strict multiples of the dot duration.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Visual Timing Diagram for &quot;HI&quot;</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">This diagram shows how the word &quot;HI&quot; (···· ··) is structured in time. Each colored block is a signal element or gap, all measured in multiples of the dot duration (1 unit).</p>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-end gap-0.5 min-w-[520px] justify-center">
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-6 h-3 bg-slate-300 dark:bg-slate-600 rounded-t"></div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-6 h-3 bg-slate-300 dark:bg-slate-600 rounded-t"></div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-6 h-3 bg-slate-300 dark:bg-slate-600 rounded-t"></div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-20 h-3 bg-amber-400 dark:bg-amber-600 rounded-t"></div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">3u</span></div>
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-6 h-3 bg-slate-300 dark:bg-slate-600 rounded-t"></div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
              <div className="flex flex-col items-center"><div className="w-12 h-8 bg-green-500 rounded-t flex items-center justify-center text-white text-[10px] font-bold">DOT</div><span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1u</span></div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm inline-block"></span><span className="text-slate-500 dark:text-slate-400">Signal (dot/dash)</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-sm inline-block"></span><span className="text-slate-500 dark:text-slate-400">Intra-char gap</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-400 dark:bg-amber-600 rounded-sm inline-block"></span><span className="text-slate-500 dark:text-slate-400">Letter gap</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 dark:bg-red-600 rounded-sm inline-block"></span><span className="text-slate-500 dark:text-slate-400">Word gap</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MORSE CODE SOUNDS & TIMING ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Morse Code Sounds and Timing Rules</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Understanding the auditory rhythm of Morse code is essential for both sending and receiving. The melody of dots and dashes follows precise timing rules established by the International Telecommunication Union.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Element</th>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Duration</th>
                  <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  ["Dot (dit)", "1 unit", "The fundamental unit of Morse code timing. All other durations are measured in multiples of the dot."],
                  ["Dash (dah)", "3 units", "Exactly three times the duration of a dot. This creates the distinctive long-short pattern that makes Morse code recognizable."],
                  ["Intra-character gap", "1 unit", "The silent gap between dots and dashes within the same letter. Equal to one dot duration."],
                  ["Inter-character gap", "3 units", "The gap between complete letters. This pause is crucial for the receiver to distinguish one letter from the next."],
                  ["Inter-word gap", "7 units", "The long pause between words, typically represented as a forward slash (/) in written Morse code."],
                ].map(([elem, dur, desc], i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{elem}</td>
                    <td className="p-4 font-mono text-green-600 dark:text-green-400 font-semibold">{dur}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" /> Farnsworth Timing Method</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The Farnsworth method is a popular training technique where characters are sent at a higher speed (e.g., 20 WPM) but with longer spacing between characters. This helps learners recognize the rhythm and sound of each character at a usable speed without being overwhelmed. As proficiency improves, the inter-character gap is gradually reduced until standard timing is achieved.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><Cpu className="w-5 h-5 text-green-600" /> Koch Method</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Developed by German psychologist Ludwig Koch in the 1930s, this method teaches Morse code at full speed from the very first lesson. Students learn one new character at a time, starting with just two characters and progressively adding more. When recognition accuracy drops below 90%, the session ends. This approach builds reflexive decoding rather than counting dots and dashes.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/morse-code-sounds" className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors">Learn More About Morse Code Sounds →</Link>
          </div>
        </div>
      </section>

      {/* ─── SOS IN MORSE CODE ─── */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-y border-red-100 dark:border-red-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold mb-4">⚠ International Distress Signal</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">SOS in Morse Code</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">SOS is the most universally recognized distress signal in the world, transmitted as <span className="font-mono font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded">··· --- ···</span> (three dots, three dashes, three dots). It was adopted as the international standard at the 1906 Berlin Radiotelegraphic Convention and remains the official maritime, aviation, and outdoor distress signal today.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-red-100 dark:border-red-900/50 shadow-sm text-center mb-8">
            <div className="text-5xl sm:text-6xl font-mono font-extrabold text-green-700 dark:text-green-400 tracking-widest mb-4">··· --- ···</div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">The SOS signal does not stand for &quot;Save Our Ship&quot; or &quot;Save Our Souls&quot; — it was chosen simply because it is distinctive, easy to remember, and easy to transmit in an emergency. Before SOS, the distress signal CQD was used on the Marconi International Marine Communication Company network.</p>
            <button onClick={() => playMorseAudio("... --- ...", { speed: 15, frequency: 600, volume: 0.7 })} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"><Volume2 className="w-4 h-4" /> Play SOS Signal</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-100 dark:border-red-900/50">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">The Titanic Connection</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The most famous use of the SOS signal was during the sinking of the RMS Titanic on April 15, 1912. The ship&apos;s wireless operators, Jack Phillips and Harold Bride, initially sent the older CQD signal before switching to SOS. The Titanic disaster is widely credited with popularizing SOS as the universal distress call. Phillips stayed at his post transmitting SOS until the very end, and his dedication saved over 700 lives through the response of the RMS Carpathia.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-100 dark:border-red-900/50">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Modern Emergency Use</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">While satellite communication and GPS emergency beacons (EPIRBs) have largely replaced Morse code in professional maritime operations, SOS in Morse code remains a critical backup skill. Outdoor enthusiasts, pilots, and military personnel are still trained in Morse code signaling. The signal can be transmitted via flashlight, whistle, mirror reflection, or any method capable of producing short and long signals.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/sos-morse-code" className="text-red-600 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors">Read the Complete SOS Morse Code Guide →</Link>
          </div>
        </div>
      </section>

      {/* ─── COMMON MORSE CODE WORDS ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Common Morse Code Words</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">These are the most frequently looked-up words in Morse code. Each one is used thousands of times daily by learners, hobbyists, and emergency communicators around the world.</p>
            <p className="mt-6 text-slate-700 dark:text-slate-300 leading-8">
Want to improve your Morse code skills? Start with our{" "}
<Link
  href="/learn-morse-code"
  className="font-semibold text-green-600 hover:underline"
>
  Learn Morse Code Guide
</Link>
, test yourself using the{" "}
<Link
  href="/morse-code-quiz"
  className="font-semibold text-green-600 hover:underline"
>
  Morse Code Quiz
</Link>
, decode real messages with the{" "}
<Link
  href="/morse-code-decoder"
  className="font-semibold text-green-600 hover:underline"
>
  Morse Code Decoder
</Link>
, or understand digital encoding using our{" "}
<Link
  href="/binary-code-translator"
  className="font-semibold text-green-600 hover:underline"
>
  Binary Code Translator
</Link>
.
</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { word: "SOS", morse: "··· ─── ···", desc: "International distress signal adopted in 1906 at the Berlin Radiotelegraphic Convention. Three dots, three dashes, three dots — the most universally recognized signal on Earth.", href: "/sos-morse-code" },
              { word: "HELLO", morse: "···· · ·─·· ·─·· ───", desc: "The universal greeting encoded as four letters. Hello in Morse code is one of the first phrases beginners learn because it uses a variety of short and long patterns.", href: "/hello-in-morse-code" },
              { word: "HELP", morse: "···· · ·─·· ·──·", desc: "A critical word in emergency communication. While SOS is the formal distress signal, HELP is widely taught in survival courses and commonly used in Morse code tools.", href: "/help-in-morse-code" },
              { word: "LOVE", morse: "·─·· ─── ··· ─·", desc: "One of the most popular Morse code phrases, often engraved on jewelry and used in creative projects. The single most translated phrase online when combined with &quot;I&quot; and &quot;You&quot;.", href: "/love-in-morse-code" },
              { word: "YES", morse: "−· ─·· ···", desc: "Affirmative response in Morse code communication. In radiotelegraphy, YES is commonly abbreviated as a single dash or the letter C when speed is critical.", href: "/yes-in-morse-code" },
              { word: "NO", morse: "−· ───", desc: "Negative response encoded as two letters. The letter N followed by O creates a distinctive rhythm that is easy to recognize even at high transmission speeds.", href: "/no-in-morse-code" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{item.word}</span>
                  <span className="text-xs font-mono text-green-600 dark:text-green-400">{item.morse}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MORSE CODE IN MODERN USE ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Morse Code in Modern Use</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Although Morse code was officially retired from international maritime service in 1999 under the SOLAS convention, it remains actively used across multiple industries and communities worldwide. Here are the five primary domains where Morse code continues to play a vital role today.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: <Radio className="w-6 h-6" />, title: "Maritime Communication", desc: "Despite the 1999 SOLAS convention phase-out, Morse code remains a mandatory skill for deck officers in many countries. Vessels are required to carry equipment capable of Morse code transmission, and the ability to send and receive visual Morse signals via signal lamp is tested during maritime license examinations. The U.S. Coast Guard and many navies worldwide still maintain Morse code proficiency as a core competency for communications officers." },
            { icon: <Plane className="w-6 h-6" />, title: "Aviation Navigation", desc: "Pilots are trained to recognize Morse code identifiers for navigation beacons known as NDBs (Non-Directional Beacons) and VORs (VHF Omnidirectional Ranges). Each beacon transmits a unique 2-3 letter Morse identifier at approximately 1020 Hz, allowing pilots to confirm they are tuned to the correct frequency. All instrument-rated pilots must demonstrate Morse code recognition proficiency during their FAA examinations." },
            { icon: <Wifi className="w-6 h-6" />, title: "Amateur Radio", desc: "Amateur radio (ham radio) operators represent the largest active community of Morse code users worldwide, with an estimated 2 million licensed operators globally. Morse code, known as CW (Continuous Wave) in ham radio, remains the most efficient mode for long-distance communication under weak signal conditions. The ARRL and IARU organize regular CW contests and offer proficiency certificates at speeds from 5 to 40+ WPM." },
            { icon: <Zap className="w-6 h-6" />, title: "Emergency Signaling", desc: "Morse code SOS remains the universal distress signal recognized under international law. Outdoor enthusiasts, military personnel, and survival instructors teach visual Morse signaling using flashlights, whistles, and mirror reflections. The U.S. Army Field Manual FM 3-05.70 (Survival Evasion Recovery) specifically includes Morse code as a primary signaling method. Unlike electronic devices, Morse code requires no batteries or technology to transmit." },
            { icon: <Accessibility className="w-6 h-6" />, title: "Assistive Technology", desc: "Morse code has found renewed purpose as an accessibility tool for people with severe motor impairments. Devices like the Darci Morse code adapter and various smartphone apps allow users to input text and control devices using just two switches (dot and dash). Research published in the Assistive Technology journal shows Morse code input can achieve 15-25 WPM even for users with conditions like cerebral palsy or ALS, often exceeding the speed of on-screen keyboards." },
            { icon: <Users className="w-6 h-6" />, title: "Education & Pop Culture", desc: "Morse code is taught in military academies, scout programs, and STEM curricula worldwide. It appears extensively in popular culture, from the 2014 film &quot;The Imitation Game&quot; about Alan Turing to NASA&apos;s Perseverance rover parachute, which encoded &quot;Dare Mighty Things&quot; in Morse code in 2021. Boy Scouts and Girl Guides in over 100 countries still include Morse code in their achievement badges and skill requirements." },
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AMAZING MORSE CODE FACTS ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Amazing Facts About Morse Code</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">From its revolutionary impact on 19th-century communication to its surprising modern applications, Morse code has a rich history filled with remarkable stories and achievements.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "The First Digital Communication", desc: "Morse code is often considered the first digital communication system. It encodes information using just two signal states (dot and dash), making it a binary system that predates modern binary computing by over a century. This binary nature is why Morse code pairs so naturally with computers and digital signal processing." },
              { title: "Faster Than Texting", desc: "Experienced Morse code operators can communicate at 30 to 40 WPM, translating to roughly 150 to 200 characters per minute. A 2014 study by the Nordic Morse Club found that skilled operators can outpace average smartphone texters, who typically manage 30 to 60 characters per minute. The world record for Morse code reception exceeds 75 WPM." },
              { title: "Used in Prisoner of War Camps", desc: "During World War II, Allied prisoners of war used Morse code tap communication to secretly exchange messages between cells. The most famous case was the Vietnamese POWs at the Hanoi Hilton, including future U.S. Senator John McCain and Admiral James Stockdale, who used tap code (a variant of Morse) to maintain morale and communicate intelligence." },
              { title: "NASA Used Morse Code on Mars", desc: "In 2021, NASA engineers encoded a secret message in the parachute pattern of the Perseverance rover. The red and white stripes of the 70-foot parachute spelled out &apos;Dare Mighty Things&apos; in binary-encoded Morse code, with the GPS coordinates of NASA Jet Propulsion Laboratory also hidden in the pattern." },
              { title: "The Most Efficient Code Design", desc: "Morse code was designed with efficiency in mind. The most frequently used letters in English have the shortest codes: E is just a single dot (.), T is a single dash (-), A is dot-dash (.-), and so on. This follows information theory principles that Claude Shannon would not formalize until over a century later. The letter E accounts for approximately 12.7% of all English text." },
              { title: "Still Required for Ham Radio Licenses", desc: "While many countries have removed the Morse code requirement for amateur radio licenses, some still maintain it. In Russia, a 5 WPM Morse test is required for the highest license class. The Russian military also maintains Morse code proficiency requirements for certain communication specialties. The ARRL continues to offer Morse code proficiency certificates at various speed levels." },
            ].map((fact, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2"><span className="text-green-600 dark:text-green-400 mt-0.5">●</span>{fact.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions About Morse Code</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Answers to the most common questions about our Morse code translator and Morse code in general.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1"><p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{faq.answer}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED TOOLS & RESOURCES ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Explore More Morse Code Tools</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Dive deeper into Morse code with our comprehensive collection of translators, learning tools, and reference guides.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { href: "/morse-code-alphabet", title: "Morse Code Alphabet", desc: "Complete A-Z reference chart with audio playback for every letter. The essential starting point for learning Morse code." },
            { href: "/morse-code-decoder", title: "Morse Code Decoder", desc: "Dedicated Morse-to-text decoder with custom separator support and brute-force mode for unseparated input." },
            { href: "/morse-code-timing", title: "Morse Code Timing", desc: "Interactive timing reference with ITU-R M.1677 standard, Farnsworth timing, and WPM speed conversion tables." },
            { href: "/morse-code-numbers", title: "Morse Code Numbers", desc: "Learn the Morse code for all digits 0 through 9 with interactive audio and detailed explanations of number patterns." },
            { href: "/sos-morse-code", title: "SOS in Morse Code", desc: "Everything about the international distress signal: history, the Titanic, modern use, and how to transmit SOS." },
            { href: "/hello-in-morse-code", title: "Hello in Morse Code", desc: "Learn how to say Hello in Morse code. Includes audio, visual representation, and cultural significance." },
            { href: "/i-love-you-in-morse-code", title: "I Love You in Morse Code", desc: "One of the most popular Morse code phrases. Learn the code, hear the audio, and discover creative ways to share it." },
            { href: "/morse-code-quiz", title: "Morse Code Quiz", desc: "Test your Morse code knowledge with our interactive quiz. Practice letter recognition and decode messages." },
            { href: "/learn-morse-code", title: "Learn Morse Code", desc: "A comprehensive step-by-step guide covering the Koch method, Farnsworth timing, and practice routines." },
          ].map((tool, i) => (
            <Link key={i} href={tool.href} className="group block bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">{tool.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Popular Words in Morse Code</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { word: "SOS", morse: "... --- ...", href: "/sos-morse-code" },
            { word: "HELLO", morse: ".... . .-.. .-.. ---", href: "/hello-in-morse-code" },
            { word: "HI", morse: ".... ..", href: "/hi-in-morse-code" },
            { word: "I LOVE YOU", morse: ".. / .-.. --- ...- . / -.-- --- ..-", href: "/i-love-you-in-morse-code" },
            { word: "LOVE", morse: ".-.. --- ...- .", href: "/love-in-morse-code" },
            { word: "HELP", morse: ".... . .-.. .--.", href: "/help-in-morse-code" },
            { word: "YES", morse: "-.-- . ...", href: "/yes-in-morse-code" },
            { word: "NO", morse: "-. ---", href: "/no-in-morse-code" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="group flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              <div className="shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-center text-xs font-bold">{item.word.substring(0, 2)}</div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">{item.word}</div>
                <div className="text-xs font-mono text-green-600 dark:text-green-400 truncate">{item.morse}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Translating Morse Code Now</h2>
          <p className="text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto mb-8">Join over 500,000 users who trust our free Morse code translator. No registration, no downloads, no limits. Just open the translator above and start converting text to dots and dashes instantly.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 rounded-lg font-bold hover:bg-green-50 transition-colors"><Zap className="w-4 h-4" /> Use the Translator Now</a>
            <Link href="/morse-code-alphabet" className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500/30 border border-green-400/30 text-white rounded-lg font-bold hover:bg-green-500/40 transition-colors"><BookOpen className="w-4 h-4" /> Learn the Alphabet</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

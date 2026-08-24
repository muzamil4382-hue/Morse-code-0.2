"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Volume2,
  Square,
  Pause,
  Repeat2,
  Music,
  Lightbulb,
  Vibrate,
  Copy,
  Check,
  Trash2,
  Download,
  ArrowDownUp,
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
  Settings,
  Plane,
  Users,
  Accessibility,
  Wifi,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  textToMorse,
  morseToText,
  playMorseAudio,
  stopMorseAudio,
} from "@/lib/morse";

const MORSE_CODE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",

  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",

  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
};

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function HomeClient({ faqs }: Props) {
  const [text, setText] = useState("");
  const [morseInput, setMorseInput] = useState("");

  const [mode, setMode] = useState<
    "text-to-morse" | "morse-to-text"
  >("text-to-morse");

  const [playing, setPlaying] = useState(false);
  const [copiedAction, setCopiedAction] = useState<"text" | "morse" | null>(null);
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [speed, setSpeed] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [volume, setVolume] = useState(0.5);

  const [flashActive, setFlashActive] = useState(false);

  const [flashChar, setFlashChar] = useState<
    "dot" | "dash" | "off"
  >("off");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const flashRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const repeatRef = useRef(false);
  const flashRunRef = useRef(false);

  const computedMorse = useMemo(
    () => textToMorse(text),
    [text]
  );

  const computedText = useMemo(
    () => morseToText(morseInput),
    [morseInput]
  );

  const activeOutput =
    mode === "text-to-morse"
      ? computedMorse
      : computedText;

  const hasContent = !!activeOutput;

  useEffect(() => {
    const activeInput =
      mode === "text-to-morse"
        ? text
        : morseInput;

    setCharCount(activeInput.length);

    setWordCount(
      activeInput
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    );
  }, [text, morseInput, mode]);

  useEffect(() => {
    repeatRef.current = repeatEnabled;
  }, [repeatEnabled]);

  useEffect(() => {
    return () => {
      if (flashRef.current) {
        clearTimeout(flashRef.current);
      }
    };
  }, []);

  const handleStop = useCallback(() => {
    repeatRef.current = false;
    setRepeatEnabled(false);
    stopMorseAudio();
    setPlaying(false);

    flashRunRef.current = false;
    if (flashRef.current) clearTimeout(flashRef.current);
    setFlashActive(false);
    setFlashChar("off");

    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(0);
    }
  }, []);

  const handleVibrate = useCallback(() => {
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
      return;
    }

    const morseStr =
      mode === "text-to-morse" ? computedMorse : textToMorse(text);

    if (!morseStr) {
      navigator.vibrate([120, 80, 120]);
      return;
    }

    const unit = Math.max(40, Math.round(1200 / speed));
    const pattern: number[] = [];

    for (const ch of morseStr) {
      if (ch === ".") pattern.push(unit, unit);
      else if (ch === "-") pattern.push(unit * 3, unit);
      else if (ch === " ") pattern.push(unit * 2);
      else if (ch === "/") pattern.push(unit * 6);
    }

    navigator.vibrate(pattern.length ? pattern : [120, 80, 120]);
  }, [mode, computedMorse, text, speed]);

  const handleSwap = useCallback(() => {
    setMode(
      mode === "text-to-morse"
        ? "morse-to-text"
        : "text-to-morse"
    );
  }, [mode]);

  const copyToClipboard = useCallback(async (value: string, type: "text" | "morse") => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedAction(type);
      window.setTimeout(() => setCopiedAction(null), 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setCopiedAction(type);
      window.setTimeout(() => setCopiedAction(null), 1800);
    }
  }, []);

  const handleClearAll = useCallback(() => {
    handleStop();
    setText("");
    setMorseInput("");
    setCopiedAction(null);
  }, [handleStop]);

  const handleCopyText = useCallback(() => {
    const value = mode === "text-to-morse" ? text : computedText;
    void copyToClipboard(value, "text");
  }, [mode, text, computedText, copyToClipboard]);

  const handleCopyMorse = useCallback(() => {
    const value = mode === "text-to-morse" ? computedMorse : morseInput;
    void copyToClipboard(value, "morse");
  }, [mode, computedMorse, morseInput, copyToClipboard]);

  const handleShare = useCallback(async () => {
    if (!activeOutput) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Morse Code Translation",
          text: activeOutput,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(activeOutput);

      setCopiedAction(mode === "text-to-morse" ? "morse" : "text");
      setTimeout(() => setCopiedAction(null), 1800);
    }
  }, [activeOutput]);

  const handleDownloadTxt = useCallback(() => {
    if (!activeOutput) return;

    const blob = new Blob([activeOutput], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "morse-code.txt";

    a.click();

    URL.revokeObjectURL(url);
  }, [activeOutput]);

  const handleDownloadWav = useCallback(() => {
    if (!hasContent) return;

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

    const dotDur = 1.2 / speed;
    const dashDur = dotDur * 3;

    const symGap = dotDur;
    const letGap = dotDur * 3;
    const wordGap = dotDur * 7;

    const sampleRate = 44100;

    let totalDur = 0;

    for (const ch of morseStr) {
      if (ch === ".") {
        totalDur += dotDur + symGap;
      } else if (ch === "-") {
        totalDur += dashDur + symGap;
      } else if (ch === " ") {
        totalDur += letGap - symGap;
      } else if (ch === "/") {
        totalDur += wordGap - symGap;
      }
    }

    const numSamples = Math.ceil(
      sampleRate * totalDur
    );

    const buffer = new ArrayBuffer(
      44 + numSamples * 2
    );

    const view = new DataView(buffer);

    const writeStr = (
      offset: number,
      str: string
    ) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(
          offset + i,
          str.charCodeAt(i)
        );
      }
    };

    writeStr(0, "RIFF");

    view.setUint32(
      4,
      36 + numSamples * 2,
      true
    );

    writeStr(8, "WAVE");

    writeStr(12, "fmt ");

    view.setUint32(16, 16, true);

    view.setUint16(20, 1, true);

    view.setUint16(22, 1, true);

    view.setUint32(
      24,
      sampleRate,
      true
    );

    view.setUint32(
      28,
      sampleRate * 2,
      true
    );

    view.setUint16(32, 2, true);

    view.setUint16(34, 16, true);

    writeStr(36, "data");

    view.setUint32(
      40,
      numSamples * 2,
      true
    );

    let time = 0;

    const twoPi = 2 * Math.PI;

    for (const ch of morseStr) {
      let dur = 0;

      if (ch === ".") {
        dur = dotDur;
      } else if (ch === "-") {
        dur = dashDur;
      } else if (ch === " ") {
        time += letGap - symGap;
        continue;
      } else if (ch === "/") {
        time += wordGap - symGap;
        continue;
      } else {
        continue;
      }

      const start = Math.floor(
        time * sampleRate
      );

      const end = Math.min(
        Math.floor(
          (time + dur) * sampleRate
        ),
        numSamples
      );

      for (let i = start; i < end; i++) {
        const t = i / sampleRate;

        const env =
          Math.min(
            1,
            (t - time) / 0.005
          ) *
          Math.min(
            1,
            (time + dur - t) / 0.005
          );

        const val =
          Math.sin(
            twoPi * frequency * t
          ) *
          volume *
          env;

        const s = Math.round(
          val * 32767
        );

        const clamped =
          s > 32767
            ? 32767
            : s < -32768
            ? -32768
            : s;

        view.setInt16(
          44 + i * 2,
          clamped,
          true
        );
      }

      time += dur + symGap;
    }

    const blob = new Blob([buffer], {
      type: "audio/wav",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "morse-code.wav";

    a.click();

    URL.revokeObjectURL(url);
  }, [
    hasContent,
    mode,
    computedMorse,
    text,
    speed,
    frequency,
    volume,
  ]);

  const handleFlash = useCallback(async () => {
    if (flashActive) {
      flashRunRef.current = false;
      if (flashRef.current) clearTimeout(flashRef.current);
      setFlashActive(false);
      setFlashChar("off");
      return;
    }

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

    flashRunRef.current = true;
    setFlashActive(true);

    const dotDur = 1.2 / speed;
    const dashDur = dotDur * 3;

    const symGap = dotDur;
    const letGap = dotDur * 3;
    const wordGap = dotDur * 7;

    const sequence: {
      char: "dot" | "dash" | "off";
      duration: number;
    }[] = [];

    for (const ch of morseStr) {
      if (ch === ".") {
        sequence.push({
          char: "dot",
          duration: dotDur,
        });

        sequence.push({
          char: "off",
          duration: symGap,
        });
      } else if (ch === "-") {
        sequence.push({
          char: "dash",
          duration: dashDur,
        });

        sequence.push({
          char: "off",
          duration: symGap,
        });
      } else if (ch === " ") {
        sequence.push({
          char: "off",
          duration:
            letGap - symGap,
        });
      } else if (ch === "/") {
        sequence.push({
          char: "off",
          duration:
            wordGap - symGap,
        });
      }
    }

    for (const item of sequence) {
      if (!flashRunRef.current) break;
      setFlashChar(item.char);

      await new Promise<void>((resolve) => {
        flashRef.current = setTimeout(
          resolve,
          item.duration * 1000
        );
      });
    }

    flashRunRef.current = false;
    setFlashChar("off");
    setFlashActive(false);
  }, [
    flashActive,
    mode,
    computedMorse,
    text,
    speed,
  ]);

  const handlePlay = useCallback(async () => {
    if (playing || !activeOutput) return;

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

    if (!morseStr) return;

    setPlaying(true);
    repeatRef.current = repeatEnabled;

    // Start light blinking at the same time as audio.
    if (!flashActive) {
      void handleFlash();
    }

    try {
      do {
        await playMorseAudio(morseStr, {
          speed,
          frequency,
          volume: soundEnabled ? volume : 0,
        });
      } while (repeatRef.current);
    } finally {
      setPlaying(false);
    }
  }, [
    playing,
    activeOutput,
    mode,
    computedMorse,
    text,
    speed,
    frequency,
    volume,
    soundEnabled,
    repeatEnabled,
    flashActive,
    handleFlash,
  ]);


  const handleRandom = useCallback(() => {
    const messages = [
      "HELLO WORLD",
      "SOS",
      "I LOVE YOU",
      "MORSE CODE",
      "GOOD LUCK",
      "WELL DONE",
      "SEE YOU LATER",
      "THANK YOU",
      "STAY SAFE",
      "GOOD NIGHT",
    ];

    const randomMsg =
      messages[
        Math.floor(
          Math.random() *
            messages.length
        )
      ];

    setText(randomMsg);

    if (mode !== "text-to-morse") {
      setMode("text-to-morse");
    }
  }, [mode]);

  const handleClear = useCallback(() => {
    setText("");
    setMorseInput("");
  }, []);

  return (
    <div>
      {/* ─── HERO / H1 SECTION ─── */}

      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0zNiAzNHYySDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7">
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-2">
              Morse Code Translator
            </h1>

            <p className="text-lg sm:text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto leading-relaxed mb-3">
              Convert text to Morse code or decode Morse code to text instantly.
              This free online Morse Code Translator supports International Morse Code,
              letters A–Z, numbers 0–9, and supported punctuation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-green-200 dark:text-green-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Real-Time Translation
              </span>

              <span className="flex items-center gap-1.5">
                <Headphones className="w-4 h-4" />
                Audio Playback
              </span>

              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                Visual Flash
              </span>

              <span className="flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                WAV Download
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* ─── TRANSLATOR TOOL ─── */}
      <section id="translator" className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.35)]">
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />
            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch mb-6">
                <div className="flex w-full items-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 p-1.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setMode("text-to-morse")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      mode === "text-to-morse"
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                        : "text-slate-500 hover:bg-white hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    <span className="hidden sm:inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/15 text-xs font-black">T</span>
                    Text <span className="opacity-70">→</span> Morse
                  </button>

                  <button
                    type="button"
                    onClick={handleSwap}
                    className="mx-1.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-green-300 hover:text-green-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    aria-label="Switch translation mode"
                    title="Swap input and output"
                  >
                    <ArrowDownUp className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("morse-to-text")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      mode === "morse-to-text"
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                        : "text-slate-500 hover:bg-white hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    Morse <span className="opacity-70">→</span> Text
                    <span className="hidden sm:inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/15 text-[10px] font-black">·−</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRandom}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-green-300 hover:text-green-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  title="Generate random message"
                >
                  <Shuffle className="w-4 h-4" /> Random
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3"><label htmlFor="morse-input" className="text-sm font-bold text-slate-700 dark:text-slate-200">{mode === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}</label><button onClick={handleClear} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" aria-label="Clear input"><Trash2 className="w-4 h-4" /></button></div>
                  <textarea id="morse-input" aria-describedby="morse-input-help" value={mode === "text-to-morse" ? text : morseInput} onChange={(e) => mode === "text-to-morse" ? setText(e.target.value) : setMorseInput(e.target.value)} placeholder={mode === "text-to-morse" ? "Type your message here..." : "Enter dots and dashes..."} className="w-full h-[150px] resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3.5 font-mono text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all focus:border-green-600 focus:ring-4 focus:ring-green-500/20" />
                   <p id="morse-input-help" className="sr-only">Enter text to encode or dots and dashes to decode, depending on the selected translation mode.</p>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3"><h2 id="translation-output-label" className="text-sm font-bold text-slate-700 dark:text-slate-200">Output</h2><span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400"><Zap className="w-3.5 h-3.5" /> Live</span></div>
                  <div
                    className={`w-full h-[150px] overflow-y-auto rounded-xl border px-4 py-3.5 font-mono text-base whitespace-pre-wrap break-words transition-colors duration-75 ${
                      flashActive && flashChar !== "off"
                        ? "border-green-400 bg-green-50 text-slate-900 shadow-[0_0_0_4px_rgba(34,197,94,0.10)] dark:bg-green-500/15 dark:text-green-50"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {hasContent ? activeOutput : <span className="text-slate-400">Your translation will appear here...</span>}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/70 dark:to-slate-900 p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div><label htmlFor="morse-speed" className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Speed</span><span className="text-green-800 dark:text-green-300">{speed} WPM</span></label><input id="morse-speed" aria-label="Morse code speed in words per minute" type="range" min="5" max="35" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-green-600" /></div>
                  <div><label htmlFor="morse-frequency" className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Frequency</span><span className="text-green-800 dark:text-green-300">{frequency} Hz</span></label><input id="morse-frequency" aria-label="Audio tone frequency in hertz" type="range" min="300" max="1000" step="50" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-green-600" /></div>
                  <div><label htmlFor="morse-volume" className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Volume</span><span className="text-green-800 dark:text-green-300">{Math.round(volume * 100)}%</span></label><input id="morse-volume" aria-label="Audio volume percentage" type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-green-600" /></div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <button onClick={handlePlay} disabled={!hasContent || playing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-40"><Volume2 className="w-4 h-4" />{playing ? "Playing..." : "Play"}</button>
                <button onClick={handleStop} disabled={!playing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-40"><Square className="w-4 h-4" />Stop</button>
                <button onClick={() => setRepeatEnabled(!repeatEnabled)} aria-pressed={repeatEnabled} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${repeatEnabled ? "bg-green-100 text-green-700 ring-1 ring-green-300 dark:bg-green-900/30 dark:text-green-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Repeat2 className="w-4 h-4" />Repeat</button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} aria-pressed={soundEnabled} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${soundEnabled ? "bg-green-100 text-green-700 ring-1 ring-green-300 dark:bg-green-900/30 dark:text-green-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Music className="w-4 h-4" />Sound</button>
                <button onClick={handleFlash} disabled={!hasContent} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${flashActive ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Lightbulb className="w-4 h-4" />Light</button>
                <button onClick={handleVibrate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200"><Vibrate className="w-4 h-4" />Vibrate</button>
                <button onClick={handleCopyText} disabled={mode === "text-to-morse" ? !text : !computedText} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 disabled:opacity-40">{copiedAction === "text" ? <Check className="w-4 h-4 text-green-800" /> : <Copy className="w-4 h-4" />}{copiedAction === "text" ? "Copied" : "Copy Text"}</button>
                <button onClick={handleCopyMorse} disabled={mode === "text-to-morse" ? !computedMorse : !morseInput} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 disabled:opacity-40">{copiedAction === "morse" ? <Check className="w-4 h-4 text-green-800" /> : <Copy className="w-4 h-4" />}{copiedAction === "morse" ? "Copied" : "Copy Morse"}</button>
                <button onClick={handleDownloadWav} disabled={!hasContent} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-40"><Download className="w-4 h-4" />Save Audio</button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={!text && !morseInput}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS BAR ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              stat: "26",
              label: "Letters (A-Z)",
              icon: (
                <Type className="w-5 h-5" />
              ),
            },
            {
              stat: "10",
              label: "Numbers (0-9)",
              icon: (
                <Hash className="w-5 h-5" />
              ),
            },
            {
              stat: "8",
              label: "Supported Punctuation",
              icon: (
                <Star className="w-5 h-5" />
              ),
            },
            {
              stat: "ITU-R M.1677",
              label: "International Standard",
              icon: (
                <Globe className="w-5 h-5" />
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {item.stat}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How to Use This Morse Code
            Translator
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Convert text to Morse code
            or decode Morse code to
            text in three simple
            steps. If you&apos;re new to
            Morse code, explore our{" "}
            <Link
              href="/learn-morse-code"
              className="text-green-800 hover:underline font-semibold"
            >
              Learn Morse Code Guide
            </Link>
            , view the{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-800 hover:underline font-semibold"
            >
              Morse Code Alphabet
            </Link>
            , or understand{" "}
            <Link
              href="/morse-code-timing"
              className="text-green-800 hover:underline font-semibold"
            >
              Morse Code Timing
            </Link>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <Type className="w-7 h-7" />
              ),
              step: "Step 1",
              title: "Enter Your Message",
              desc: "Type or paste your text into the translator. You can use English letters, numbers, spaces, and supported punctuation.",
            },
            {
              icon: (
                <Zap className="w-7 h-7" />
              ),
              step: "Step 2",
              title: "Get Instant Translation",
              desc: "Your message is converted in real time using dots and dashes. Switch modes at any time to decode Morse code back into readable text.",
            },
            {
              icon: (
                <Headphones className="w-7 h-7" />
              ),
              step: "Step 3",
              title: "Play, Save, or Share",
              desc: "Listen to the Morse code, activate visual flash mode, copy the result, or save your translation as a TXT or WAV file.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-green-500/5 transition-all group"
            >
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>

              <span className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-wider">
                {item.step}
              </span>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ─── MORSE CODE TRANSLATOR INFOGRAPHIC ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/morse-code-translator-guide.webp"
              alt="Morse code translator infographic showing how to convert text into dots and dashes and decode Morse code back into readable text"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Use the Morse Code Translator to encode normal text into dots and dashes or decode a Morse code message back into readable text.
          </figcaption>
        </figure>
      </section>

      {/* ─── KEY FEATURES ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Features of Our Morse Code
              Translator
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Translate, decode,
              listen, practice, and
              explore Morse code from
              one interactive tool.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <Zap className="w-5 h-5" />
                ),
                title:
                  "Real-Time Translation",
                desc: "Convert text to Morse code and decode Morse code to text as you type.",
              },
              {
                icon: (
                  <Volume2 className="w-5 h-5" />
                ),
                title:
                  "Audio Playback",
                desc: "Listen with adjustable speed, frequency, and volume controls.",
              },
              {
                icon: (
                  <Eye className="w-5 h-5" />
                ),
                title:
                  "Visual Flash Mode",
                desc: "Visualize dots and dashes as short and long light signals.",
              },
              {
                icon: (
                  <Download className="w-5 h-5" />
                ),
                title:
                  "WAV Audio Download",
                desc: "Save your Morse code as a WAV audio file using your selected settings.",
              },
              {
                icon: (
                  <ArrowDownUp className="w-5 h-5" />
                ),
                title:
                  "Text and Morse Decoder",
                desc: "Switch between encoding text and decoding Morse code.",
              },
              {
                icon: (
                  <Settings className="w-5 h-5" />
                ),
                title:
                  "Adjustable Controls",
                desc: "Customize WPM speed, tone frequency, and audio volume.",
              },
              {
                icon: (
                  <Copy className="w-5 h-5" />
                ),
                title:
                  "Copy and Share",
                desc: "Copy your translation or use your device sharing options.",
              },
              {
                icon: (
                  <Shuffle className="w-5 h-5" />
                ),
                title:
                  "Random Practice Messages",
                desc: "Generate sample messages for decoding and listening practice.",
              },
              {
                icon: (
                  <BarChart3 className="w-5 h-5" />
                ),
                title:
                  "Character Counter",
                desc: "Track characters and words while entering your message.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUICK MORSE REFERENCE ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Quick Morse Code Reference
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Browse common Morse code
            letters and numbers. For a
            complete reference, visit
            our{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-800 hover:underline font-semibold"
            >
              Morse Code Alphabet
            </Link>{" "}
            and explore the{" "}
            <Link
              href="/morse-code-decoder"
              className="text-green-800 hover:underline font-semibold"
            >
              Morse Code Decoder
            </Link>
            .
          </p>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Type className="w-5 h-5 text-green-800" />
          Letters (A-Z)
        </h3>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE)
            .filter(([key]) =>
              /^[A-Z]$/.test(key)
            )
            .map(([letter, code]) => (
              <Link
                key={letter}
                href={`/morse-code-alphabet#letter-${letter.toLowerCase()}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-800">
                  {letter}
                </span>

                <span className="text-xs font-mono text-green-800 dark:text-green-400 mt-1">
                  {code}
                </span>
              </Link>
            ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-green-800" />
          Numbers (0-9)
        </h3>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 mb-8">
          {Object.entries(MORSE_CODE)
            .filter(([key]) =>
              /^[0-9]$/.test(key)
            )
            .map(([number, code]) => (
              <Link
                key={number}
                href={`/morse-code-numbers#number-${number}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-800">
                  {number}
                </span>

                <span className="text-xs font-mono text-green-800 dark:text-green-400 mt-1">
                  {code}
                </span>
              </Link>
            ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/morse-code-alphabet"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            View Complete Morse Code
            Alphabet

            <BookOpen className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── WHAT IS MORSE CODE ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Is Morse Code?
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Morse code is a
              telecommunication system
              that represents
              characters with short and
              long signals. It is
              closely associated with
              Samuel F. B. Morse and
              Alfred Vail, whose work
              helped develop the
              electric telegraph in
              the nineteenth century.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                History and Origins
              </h3>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Morse code became
                historically important
                because the electric
                telegraph made it
                possible to transmit
                information across
                long distances much
                faster than physical
                transportation. The
                famous first public
                telegraph message,
                “What hath God
                wrought,” was sent in
                1844 between
                Washington, D.C. and
                Baltimore.
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                International Morse
                Code later provided a
                more standardized
                system for
                international
                communication. Today,
                the ITU publishes the
                Morse code standard
                used as the reference
                for modern
                International Morse
                Code.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                How Morse Code Works
              </h3>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                A dot represents one
                unit of time and a
                dash represents three
                units. The gap between
                elements of the same
                character is one unit,
                between characters is
                three units, and
                between words is seven
                units.
              </p>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Morse transmission
                speed is commonly
                measured in words per
                minute, or WPM. The
                word “PARIS” is
                traditionally used as
                the standard reference
                word for calculating
                Morse speed.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/what-is-morse-code"
              className="text-green-800 dark:text-green-400 font-medium hover:underline"
            >
              Read the Complete History
              of Morse Code →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MORSE TIMING ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Morse Code Timing Rules
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            International Morse Code
            uses a proportional timing
            system. Understanding
            these timing units is
            essential for accurate
            sending and receiving.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
           <caption className="sr-only">International Morse Code timing units and spacing rules</caption>
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold">
                  Element
                </th>

                <th className="text-left p-4 font-semibold">
                  Duration
                </th>

                <th className="text-left p-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[
                [
                  "Dot (dit)",
                  "1 unit",
                  "The basic unit of Morse code timing.",
                ],
                [
                  "Dash (dah)",
                  "3 units",
                  "Three times the duration of a dot.",
                ],
                [
                  "Intra-character gap",
                  "1 unit",
                  "Space between elements in one character.",
                ],
                [
                  "Inter-character gap",
                  "3 units",
                  "Space between complete characters.",
                ],
                [
                  "Inter-word gap",
                  "7 units",
                  "Space separating words.",
                ],
              ].map(
                (
                  [element, duration, description],
                  i
                ) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {element}
                    </td>

                    <td className="p-4 font-mono text-green-800 dark:text-green-400 font-semibold">
                      {duration}
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {description}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-800" />
              Farnsworth Method
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Farnsworth timing is a
              training method that
              sends characters at a
              relatively high character
              speed while increasing
              the spacing between them.
              This helps learners
              recognize the sound and
              rhythm of complete
              characters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-800" />
              Koch Method
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              The Koch method teaches
              Morse code by introducing
              a small number of
              characters and gradually
              adding more as recognition
              improves. The goal is to
              recognize the sound of
              each character rather
              than counting dots and
              dashes visually.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/morse-code-timing"
            className="text-green-800 dark:text-green-400 font-medium hover:underline"
          >
            Learn More About Morse
            Code Timing →
          </Link>
        </div>
      </section>


      {/* ─── MORSE CODE TIMING INFOGRAPHIC ─── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/morse-code-timing-rules.webp"
              alt="Morse code timing infographic showing dot and dash duration, character spacing, word spacing, and standard timing ratios"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Standard Morse code timing uses fixed ratios: one unit for a dot, three for a dash, three between characters, and seven between words.
          </figcaption>
        </figure>
      </section>

      {/* ─── SOS ─── */}

      <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-y border-red-100 dark:border-red-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
              ⚠ International Distress
              Signal
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              SOS in Morse Code
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              SOS is transmitted as{" "}
              <span className="font-mono font-bold text-green-700 dark:text-green-400">
                ··· --- ···
              </span>
              . Its distinctive pattern
              of three short signals,
              three long signals, and
              three short signals makes
              it easy to recognize and
              transmit in an emergency.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-red-100 dark:border-red-900/50 text-center">
            <div className="text-5xl sm:text-6xl font-mono font-extrabold text-green-700 dark:text-green-400 tracking-widest mb-4">
              ··· --- ···
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-6">
              SOS is a Morse code
              distress signal. It was
              selected because its
              pattern is simple,
              distinctive, and easy to
              send as a continuous
              sequence.
            </p>

            <button
              type="button"
              onClick={() =>
                playMorseAudio(
                  "... --- ...",
                  {
                    speed: 15,
                    frequency: 600,
                    volume: 0.7,
                  }
                )
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              Play SOS Signal
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/sos-morse-code"
              className="text-red-600 dark:text-red-400 font-medium hover:underline"
            >
              Read the Complete SOS
              Morse Code Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHERE MORSE CODE IS USED TODAY ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Where Is Morse Code Used Today?
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Although Morse code is no longer the primary method of global
            communication, it is still used and studied in amateur radio,
            maritime communication, aviation, emergency signaling, education,
            accessibility projects, and other signal-based communication systems.
          </p>
        </div>

        <figure>
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <Image
              src="/images/home/modern-uses-of-morse-code.webp"
              alt="Infographic showing modern uses of Morse code, including amateur radio, maritime communication, aviation, emergency signaling, education, and signal-based communication"
              width={1600}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <figcaption className="mt-4 text-center text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Morse code continues to have practical and educational applications
            where simple, reliable signal communication is useful.
          </figcaption>
        </figure>

        <div className="mt-8 text-center">
          <Link
            href="/what-is-morse-code"
            className="text-green-800 dark:text-green-400 font-medium hover:underline"
          >
            Learn More About Morse Code →
          </Link>
        </div>
      </section>

      {/* ─── FAQ ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
              About Morse Code
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Answers to common
              questions about Morse
              code translation,
              decoding, timing, and
              learning.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === i
                        ? null
                        : i
                    )
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>

                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED TOOLS ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore More Morse Code
            Tools
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Explore the Morse code alphabet, numbers, sounds, timing, decoding,
            learning guides, quizzes, and popular Morse code words and phrases.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              href: "/morse-code-alphabet",
              title:
                "Morse Code Alphabet",
              desc: "Complete A-Z Morse code reference.",
            },
            {
              href: "/morse-code-decoder",
              title:
                "Morse Code Decoder",
              desc: "Decode dots and dashes into readable text.",
            },
            {
              href: "/morse-code-timing",
              title:
                "Morse Code Timing",
              desc: "Learn standard timing rules and WPM.",
            },
            {
              href: "/morse-code-numbers",
              title:
                "Morse Code Numbers",
              desc: "Learn all numbers from 0 to 9.",
            },
            {
              href: "/sos-morse-code",
              title:
                "SOS in Morse Code",
              desc: "Learn the history and pattern of SOS.",
            },
            {
              href: "/hello-in-morse-code",
              title:
                "Hello in Morse Code",
              desc: "Learn how to write and send HELLO.",
            },
            {
              href: "/i-love-you-in-morse-code",
              title:
                "I Love You in Morse Code",
              desc: "Translate the popular phrase into Morse.",
            },
            {
              href: "/morse-code-quiz",
              title:
                "Morse Code Quiz",
              desc: "Test your Morse code knowledge.",
            },
            {
              href: "/learn-morse-code",
              title:
                "Learn Morse Code",
              desc: "Step-by-step learning resources for beginners.",
            },
            {
              href: "/morse-code-sounds",
              title: "Morse Code Sounds",
              desc: "Understand how dots and dashes sound in Morse code.",
            },
            {
              href: "/what-is-morse-code",
              title: "What Is Morse Code?",
              desc: "Learn what Morse code is and how the signaling system works.",
            },
            {
              href: "/binary-code-translator",
              title: "Binary Code Translator",
              desc: "Convert text and binary code with a separate online tool.",
            },
            {
              href: "/hi-in-morse-code",
              title: "Hi in Morse Code",
              desc: "See the Morse code pattern for the short greeting HI.",
            },
            {
              href: "/help-me-in-morse-code",
              title: "Help Me in Morse Code",
              desc: "Translate the emergency phrase HELP ME into Morse code.",
            },
            {
              href: "/yes-in-morse-code",
              title: "Yes in Morse Code",
              desc: "Learn how to write YES using dots and dashes.",
            },
            {
              href: "/no-in-morse-code",
              title: "No in Morse Code",
              desc: "Learn how to write NO using dots and dashes.",
            },
          ].map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group block bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors mb-1">
                {tool.title}
              </h3>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}

      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Translating Morse
            Code Now
          </h2>

          <p className="text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto mb-8">
            Use the free translator to
            encode text, decode Morse
            code, listen to audio,
            practice signal timing,
            and explore the complete
            Morse Code Alphabet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#translator"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Use the Translator
            </a>

            <Link
              href="/morse-code-alphabet"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500/30 border border-green-400/30 text-white rounded-lg font-bold hover:bg-green-500/40 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Learn the Alphabet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
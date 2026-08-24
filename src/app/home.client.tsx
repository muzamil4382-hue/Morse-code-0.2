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

export default function HomeClient() {
  const [text, setText] = useState("");
  const [morseInput, setMorseInput] = useState("");

  const [mode, setMode] = useState<"text-to-morse" | "morse-to-text">("text-to-morse");
  const [playing, setPlaying] = useState(false);
  const [copiedAction, setCopiedAction] = useState<"text" | "morse" | null>(null);
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [speed, setSpeed] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [volume, setVolume] = useState(0.5);

  const [flashActive, setFlashActive] = useState(false);
  const [flashChar, setFlashChar] = useState<"dot" | "dash" | "off">("off");

  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
                    onClick={handleSwap}
                    className="mx-1.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-green-300 hover:text-green-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    aria-label="Switch translation mode"
                    title="Swap input and output"
                  >
                    <ArrowDownUp className="w-4 h-4" />
                  </button>

                  <button
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
                  onClick={handleRandom}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-green-300 hover:text-green-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  title="Generate random message"
                >
                  <Shuffle className="w-4 h-4" /> Random
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3"><label className="text-sm font-bold text-slate-700 dark:text-slate-200">{mode === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}</label><button onClick={handleClear} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" aria-label="Clear input"><Trash2 className="w-4 h-4" /></button></div>
                  <textarea value={mode === "text-to-morse" ? text : morseInput} onChange={(e) => mode === "text-to-morse" ? setText(e.target.value) : setMorseInput(e.target.value)} placeholder={mode === "text-to-morse" ? "Type your message here..." : "Enter dots and dashes..."} className="w-full h-[150px] resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3.5 font-mono text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-500/10" />
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3"><label className="text-sm font-bold text-slate-700 dark:text-slate-200">Output</label><span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400"><Zap className="w-3.5 h-3.5" /> Live</span></div>
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
                  <div><label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Speed</span><span className="text-green-600">{speed} WPM</span></label><input type="range" min="5" max="35" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-green-600" /></div>
                  <div><label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Frequency</span><span className="text-green-600">{frequency} Hz</span></label><input type="range" min="300" max="1000" step="50" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-green-600" /></div>
                  <div><label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"><span>Volume</span><span className="text-green-600">{Math.round(volume * 100)}%</span></label><input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-green-600" /></div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <button onClick={handlePlay} disabled={!hasContent || playing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-40"><Volume2 className="w-4 h-4" />{playing ? "Playing..." : "Play"}</button>
                <button onClick={handleStop} disabled={!playing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-40"><Square className="w-4 h-4" />Stop</button>
                <button onClick={() => setRepeatEnabled(!repeatEnabled)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${repeatEnabled ? "bg-green-100 text-green-700 ring-1 ring-green-300 dark:bg-green-900/30 dark:text-green-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Repeat2 className="w-4 h-4" />Repeat</button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${soundEnabled ? "bg-green-100 text-green-700 ring-1 ring-green-300 dark:bg-green-900/30 dark:text-green-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Music className="w-4 h-4" />Sound</button>
                <button onClick={handleFlash} disabled={!hasContent} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${flashActive ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}><Lightbulb className="w-4 h-4" />Light</button>
                <button onClick={handleVibrate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200"><Vibrate className="w-4 h-4" />Vibrate</button>
                <button onClick={handleCopyText} disabled={mode === "text-to-morse" ? !text : !computedText} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 disabled:opacity-40">{copiedAction === "text" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}{copiedAction === "text" ? "Copied" : "Copy Text"}</button>
                <button onClick={handleCopyMorse} disabled={mode === "text-to-morse" ? !computedMorse : !morseInput} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 disabled:opacity-40">{copiedAction === "morse" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}{copiedAction === "morse" ? "Copied" : "Copy Morse"}</button>
                <button onClick={handleDownloadWav} disabled={!hasContent} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 dark:bg-slate-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-40"><Download className="w-4 h-4" />Save Audio</button>
                <button
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

    </div>
  );
}
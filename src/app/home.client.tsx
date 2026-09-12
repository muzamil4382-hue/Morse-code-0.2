"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

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

  const [mode, setMode] = useState<
    "text-to-morse" | "morse-to-text"
  >("text-to-morse");

  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [speed, setSpeed] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [volume, setVolume] = useState(0.5);

  const [flashActive, setFlashActive] = useState(false);

  const [flashChar, setFlashChar] = useState<
    "dot" | "dash" | "off"
  >("off");

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
    return () => {
      flashRunRef.current = false;
      if (flashRef.current) {
        clearTimeout(flashRef.current);
      }
    };
  }, []);

  useEffect(() => {
    repeatRef.current = repeatEnabled;
  }, [repeatEnabled]);

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

    if (!morseStr) return;

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
        sequence.push({ char: "dot", duration: dotDur });
        sequence.push({ char: "off", duration: symGap });
      } else if (ch === "-") {
        sequence.push({ char: "dash", duration: dashDur });
        sequence.push({ char: "off", duration: symGap });
      } else if (ch === " ") {
        sequence.push({ char: "off", duration: letGap - symGap });
      } else if (ch === "/") {
        sequence.push({ char: "off", duration: wordGap - symGap });
      }
    }

    for (const item of sequence) {
      if (!flashRunRef.current) break;
      setFlashChar(item.char);

      await new Promise<void>((resolve) => {
        flashRef.current = setTimeout(resolve, item.duration * 1000);
      });
    }

    flashRunRef.current = false;
    setFlashChar("off");
    setFlashActive(false);
  }, [flashActive, mode, computedMorse, text, speed]);

  const handlePlay = useCallback(async () => {
    if (playing || !activeOutput) return;

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

    if (!morseStr) return;

    setPlaying(true);
    repeatRef.current = repeatEnabled;

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

  const handleCopy = useCallback(() => {
    if (!activeOutput) return;

    navigator.clipboard.writeText(activeOutput);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [activeOutput]);

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

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
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
              Free Online Morse Code Translator
            </h1>

            <p className="text-lg sm:text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto leading-relaxed mb-3">
              Looking to turn text into code? Our Free Morse Code translator enables you to turn alphabets, numbers and punctuations into Morse Code. You can use audio or tapping to convert morse into text and vice versa.
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
      <section id="translator" className="bg-slate-50 dark:bg-slate-950 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6">
            {/* Mode switcher + random */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setMode("text-to-morse")}
                  className={`flex-1 h-12 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                    mode === "text-to-morse"
                      ? "bg-green-700 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className={`w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold ${mode === "text-to-morse" ? "bg-white/15" : "bg-slate-200 dark:bg-slate-700"}`}>T</span>
                    Text → Morse
                  </span>
                </button>

                <button
                  onClick={handleSwap}
                  className="shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:text-green-700 hover:border-green-400 transition-all cursor-pointer"
                  aria-label="Switch translation mode"
                  title="Switch translation mode"
                >
                  <ArrowDownUp className="w-4 h-4 mx-auto" />
                </button>

                <button
                  onClick={() => setMode("morse-to-text")}
                  className={`flex-1 h-12 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                    mode === "morse-to-text"
                      ? "bg-green-700 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Morse → Text
                  <span className="ml-2 text-xs opacity-70">·-</span>
                </button>
              </div>

              <button
                onClick={handleRandom}
                className="shrink-0 h-14 px-4 sm:px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-green-400 hover:text-green-700 transition-all cursor-pointer"
                title="Random Message"
                aria-label="Generate random message"
              >
                <span className="inline-flex items-center gap-2 font-semibold text-sm">
                  <Shuffle className="w-4 h-4" />
                  <span className="hidden sm:inline">Random</span>
                </span>
              </button>
            </div>

            {/* Input / output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  {mode === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}
                </label>
                <div className="relative">
                  <textarea
                    value={mode === "text-to-morse" ? text : morseInput}
                    onChange={(e) => {
                      if (mode === "text-to-morse") setText(e.target.value);
                      else setMorseInput(e.target.value);
                    }}
                    placeholder={mode === "text-to-morse" ? "Type your text here..." : "Enter Morse code (use . and -)..."}
                    className="w-full h-[148px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none font-mono text-lg transition-all"
                    dir="ltr"
                    maxLength={5000}
                  />
                  <button
                    onClick={handleClear}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                    aria-label="Clear input"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Output</label>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
                    <Zap className="w-3.5 h-3.5" /> Live
                  </span>
                </div>
                <div
                  className={`w-full h-[148px] p-4 rounded-xl border font-mono text-lg overflow-y-auto transition-all duration-75 ${
                    flashActive && flashChar !== "off"
                      ? flashChar === "dot"
                        ? "border-yellow-400 bg-yellow-100 text-slate-900 shadow-[0_0_35px_rgba(253,224,71,0.75)]"
                        : "border-green-400 bg-green-100 text-slate-900 shadow-[0_0_35px_rgba(74,222,128,0.65)]"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  }`}
                  dir="ltr"
                >
                  {hasContent ? <span>{activeOutput}</span> : <span className="text-slate-400">Output will appear here...</span>}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div id="morse-controls" className="w-full p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 mb-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Speed <span className="float-right text-green-700 dark:text-green-400 font-semibold">{speed} WPM</span>
                </label>
                <input type="range" min="5" max="35" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Frequency <span className="float-right text-green-700 dark:text-green-400 font-semibold">{frequency} Hz</span>
                </label>
                <input type="range" min="300" max="1000" step="50" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Volume <span className="float-right text-green-700 dark:text-green-400 font-semibold">{Math.round(volume * 100)}%</span>
                </label>
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button onClick={handlePlay} disabled={!hasContent || playing} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 text-white font-semibold disabled:opacity-40 hover:bg-green-800 transition-all cursor-pointer">
                <Volume2 className="w-4 h-4" /> Play
              </button>
              <button onClick={handleStop} disabled={!playing} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-400 dark:bg-slate-700 text-white font-semibold disabled:opacity-50 transition-all cursor-pointer">
                <Pause className="w-4 h-4" /> Pause
              </button>
              <button onClick={handleStop} disabled={!playing} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-400 dark:bg-slate-700 text-white font-semibold disabled:opacity-50 transition-all cursor-pointer">
                <Square className="w-4 h-4" /> Stop
              </button>
              <button onClick={() => setRepeatEnabled(!repeatEnabled)} className={`h-12 inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all cursor-pointer ${repeatEnabled ? "bg-green-700 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"}`}>
                <Repeat2 className="w-4 h-4" /> Repeat
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`h-12 inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all cursor-pointer ${soundEnabled ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"}`}>
                <Music className="w-4 h-4" /> Sound
              </button>
              <button onClick={handleFlash} disabled={!hasContent} className={`h-12 inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all cursor-pointer ${flashActive ? "bg-amber-400 text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"}`}>
                <Lightbulb className="w-4 h-4" /> Light
              </button>
              <button onClick={handleVibrate} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold transition-all cursor-pointer">
                <Vibrate className="w-4 h-4" /> Vibrate
              </button>
              <button onClick={handleDownloadWav} disabled={!hasContent} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 text-white font-semibold disabled:opacity-40 hover:bg-slate-900 transition-all cursor-pointer">
                <Download className="w-4 h-4" /> Save Audio
              </button>
              <button onClick={handleCopy} disabled={!hasContent} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold disabled:opacity-40 transition-all cursor-pointer">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={handleClear} className="h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold transition-all cursor-pointer">
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

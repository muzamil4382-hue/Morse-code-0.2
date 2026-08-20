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
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
      if (flashRef.current) {
        clearTimeout(flashRef.current);
      }
    };
  }, []);

  const handlePlay = useCallback(async () => {
    if (playing) return;

    setPlaying(true);

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

    await playMorseAudio(morseStr, {
      speed,
      frequency,
      volume,
    });

    setPlaying(false);
  }, [
    playing,
    mode,
    computedMorse,
    text,
    speed,
    frequency,
    volume,
  ]);

  const handleStop = useCallback(() => {
    stopMorseAudio();
    setPlaying(false);
  }, []);

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

  const handleFlash = useCallback(async () => {
    if (flashActive) {
      setFlashActive(false);
      setFlashChar("off");
      return;
    }

    const morseStr =
      mode === "text-to-morse"
        ? computedMorse
        : textToMorse(text);

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
      setFlashChar(item.char);

      await new Promise<void>((resolve) => {
        flashRef.current = setTimeout(
          resolve,
          item.duration * 1000
        );
      });
    }

    setFlashChar("off");
    setFlashActive(false);
  }, [
    flashActive,
    mode,
    computedMorse,
    text,
    speed,
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
    <div
      className={
        flashActive
          ? "bg-green-500/10 dark:bg-green-500/20 transition-colors duration-100"
          : ""
      }
    >
      {/* ─── HERO / H1 SECTION ─── */}

      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 dark:from-green-800 dark:via-green-900 dark:to-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0zNiAzNHYySDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
              <Radio className="w-4 h-4" />
              Free Online Tool — No Registration Required
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              Morse Code Translator
            </h1>

            <p className="text-lg sm:text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto leading-relaxed mb-5">
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

      <section
        id="translator"
        className="bg-slate-50 dark:bg-slate-950 py-8 sm:py-10"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    mode === "text-to-morse"
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  Text → Morse
                </span>

                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 transition-all cursor-pointer"
                  aria-label="Switch translation mode"
                >
                  <ArrowDownUp className="w-4 h-4" />
                </button>

                <span
                  className={`text-sm font-semibold transition-colors ${
                    mode === "morse-to-text"
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  Morse → Text
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandom}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 transition-all cursor-pointer"
                  title="Random Message"
                  aria-label="Generate random message"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    setShowSettings(
                      !showSettings
                    )
                  }
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    showSettings
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  aria-label="Translator settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {flashActive && (
              <div className="mb-5 flex flex-col items-center gap-3">
                <div
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-75 ${
                    flashChar === "dot"
                      ? "bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.7),0_0_120px_40px_rgba(253,224,71,0.3)]"
                      : flashChar === "dash"
                      ? "bg-green-400 shadow-[0_0_80px_30px_rgba(74,222,128,0.7),0_0_140px_50px_rgba(74,222,128,0.3)]"
                      : "bg-slate-300 dark:bg-slate-700 shadow-none"
                  }`}
                >
                  <div
                    className={`absolute inset-3 rounded-full transition-all duration-75 ${
                      flashChar === "dot"
                        ? "bg-yellow-200 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)]"
                        : flashChar ===
                          "dash"
                        ? "bg-green-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.6)]"
                        : "bg-slate-200 dark:bg-slate-600"
                    }`}
                  />

                  <span
                    className={`relative z-10 text-sm font-bold tracking-wider ${
                      flashChar === "off"
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {flashChar === "dot"
                      ? "DIT"
                      : flashChar === "dash"
                      ? "DAH"
                      : ""}
                  </span>
                </div>

                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  Signal Lamp Active
                </span>
              </div>
            )}

            {showSettings && (
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Speed:{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {speed} WPM
                    </span>
                  </label>

                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={speed}
                    onChange={(e) =>
                      setSpeed(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full accent-green-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Frequency:{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {frequency} Hz
                    </span>
                  </label>

                  <input
                    type="range"
                    min="300"
                    max="1000"
                    step="50"
                    value={frequency}
                    onChange={(e) =>
                      setFrequency(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full accent-green-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Volume:{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {Math.round(
                        volume * 100
                      )}
                      %
                    </span>
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) =>
                      setVolume(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full accent-green-600"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                {mode ===
                "text-to-morse"
                  ? "Enter Text"
                  : "Enter Morse Code"}
              </label>

              <div className="relative">
                <textarea
                  value={
                    mode === "text-to-morse"
                      ? text
                      : morseInput
                  }
                  onChange={(e) => {
                    if (
                      mode ===
                      "text-to-morse"
                    ) {
                      setText(
                        e.target.value
                      );
                    } else {
                      setMorseInput(
                        e.target.value
                      );
                    }
                  }}
                  placeholder={
                    mode ===
                    "text-to-morse"
                      ? "Type your text here..."
                      : "Enter Morse code (use . and -)..."
                  }
                  className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y font-mono text-lg transition-all"
                  dir="ltr"
                  maxLength={5000}
                />

                <button
                  onClick={
                    handleClear
                  }
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                  aria-label="Clear input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                <span>
                  {charCount} characters,{" "}
                  {wordCount} words
                </span>

                <span>
                  {mode ===
                  "text-to-morse"
                    ? "Supports A-Z, 0-9, and punctuation"
                    : "Use dots (.) dashes (-) and spaces"}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Output
              </label>

              <div
                className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-lg min-h-[80px]"
                dir="ltr"
              >
                {hasContent ? (
                  <span>
                    {activeOutput}
                  </span>
                ) : (
                  <span className="text-slate-600 dark:text-slate-500">
                    Output will appear
                    here...
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {playing ? (
                <button
                  onClick={
                    handleStop
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </button>
              ) : (
                <button
                  onClick={
                    handlePlay
                  }
                  disabled={
                    !hasContent
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  Play Audio
                </button>
              )}

              <button
                onClick={handleFlash}
                disabled={!hasContent}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                  flashActive
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <Eye className="w-4 h-4" />

                {flashActive
                  ? "Stop Flash"
                  : "Visual Flash"}
              </button>

              <button
                onClick={handleCopy}
                disabled={!hasContent}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}

                {copied
                  ? "Copied!"
                  : "Copy"}
              </button>

              <button
                onClick={handleShare}
                disabled={!hasContent}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <button
                onClick={
                  handleDownloadWav
                }
                disabled={
                  !hasContent
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download WAV
              </button>

              <button
                onClick={
                  handleDownloadTxt
                }
                disabled={
                  !hasContent
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Download TXT
              </button>
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
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {item.stat}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400">
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

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Convert text to Morse code
            or decode Morse code to
            text in three simple
            steps. If you&apos;re new to
            Morse code, explore our{" "}
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
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>

              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                {item.step}
              </span>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── KEY FEATURES ─── */}

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Features of Our Morse Code
              Translator
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse common Morse code
            letters and numbers. For a
            complete reference, visit
            our{" "}
            <Link
              href="/morse-code-alphabet"
              className="text-green-600 hover:underline font-semibold"
            >
              Morse Code Alphabet
            </Link>{" "}
            and explore the{" "}
            <Link
              href="/morse-code-decoder"
              className="text-green-600 hover:underline font-semibold"
            >
              Morse Code Decoder
            </Link>
            .
          </p>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Type className="w-5 h-5 text-green-600" />
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
                href={`/morse-code-letter/${letter.toLowerCase()}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600">
                  {letter}
                </span>

                <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-1">
                  {code}
                </span>
              </Link>
            ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-green-600" />
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
                href={`/morse-code-number/${number}`}
                className="group relative flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
              >
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600">
                  {number}
                </span>

                <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-1">
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

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
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

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
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

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
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

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
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

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
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

                    <td className="p-4 font-mono text-green-600 dark:text-green-400 font-semibold">
                      {duration}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-400">
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
              <Clock className="w-5 h-5 text-green-600" />
              Farnsworth Method
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
              <Cpu className="w-5 h-5 text-green-600" />
              Koch Method
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
            className="text-green-600 dark:text-green-400 font-medium hover:underline"
          >
            Learn More About Morse
            Code Timing →
          </Link>
        </div>
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

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
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

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              SOS is a Morse code
              distress signal. It was
              selected because its
              pattern is simple,
              distinctive, and easy to
              send as a continuous
              sequence.
            </p>

            <button
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

      {/* ─── MODERN USE ─── */}

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Morse Code in Modern Use
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Although Morse code is no
            longer the primary method
            of global communication,
            it remains relevant in
            amateur radio, aviation
            navigation, education,
            emergency signaling, and
            accessibility technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <Radio className="w-6 h-6" />
              ),
              title: "Amateur Radio",
              desc: "Morse code, commonly called CW in amateur radio, remains popular for long-distance communication and weak-signal operation.",
            },
            {
              icon: (
                <Plane className="w-6 h-6" />
              ),
              title: "Aviation",
              desc: "Morse identifiers have historically been used by radio navigation aids and remain relevant when interpreting certain navigation signals.",
            },
            {
              icon: (
                <Zap className="w-6 h-6" />
              ),
              title:
                "Emergency Signaling",
              desc: "Short and long signals can be transmitted using light, sound, tapping, or other simple methods when conventional communication is unavailable.",
            },
            {
              icon: (
                <Accessibility className="w-6 h-6" />
              ),
              title:
                "Assistive Technology",
              desc: "Morse-based input can allow communication through a small number of switches or simple repeated signals.",
            },
            {
              icon: (
                <Users className="w-6 h-6" />
              ),
              title: "Education",
              desc: "Morse code is used as a practical way to teach communication systems, signal timing, encoding, and the history of telecommunications.",
            },
            {
              icon: (
                <Wifi className="w-6 h-6" />
              ),
              title:
                "Digital Communication Concepts",
              desc: "Morse code demonstrates how information can be represented through distinct signal patterns, making it useful for introducing encoding concepts.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
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

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
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

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Continue learning with
            our Morse code alphabet,
            decoder, timing guide,
            quiz, numbers, and
            practical examples.
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
          ].map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group block bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
                {tool.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
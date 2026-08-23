"use client";

import { useState, useMemo } from "react";
import { Volume2, Square, Copy, Check, Trash2, Download, ArrowDownUp, Settings } from "lucide-react";
import { textToMorse, morseToText, playMorseAudio, stopMorseAudio, getIsPlaying } from "@/lib/morse";

export default function TranslatorCore({
  initialText = "",
  initialMode = "text-to-morse",
}: {
  initialText?: string;
  initialMode?: "text-to-morse" | "morse-to-text";
}) {
  const [text, setText] = useState(initialText);
  const [morse, setMorse] = useState("");
  const [mode, setMode] = useState(initialMode);
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [volume, setVolume] = useState(0.5);

  const computedMorse = useMemo(() => {
    if (mode === "text-to-morse") return textToMorse(text);
    return morse;
  }, [text, morse, mode]);

  const computedText = useMemo(() => {
    if (mode === "morse-to-text") return morseToText(morse);
    return text;
  }, [text, morse, mode]);

  const handlePlay = async () => {
    if (playing) return;
    setPlaying(true);
    const morseStr = mode === "text-to-morse" ? computedMorse : textToMorse(text);
    await playMorseAudio(morseStr, { speed, frequency, volume });
    setPlaying(false);
  };

  const handleStop = () => {
    stopMorseAudio();
    setPlaying(false);
  };

  const handleSwap = () => {
    setMode(mode === "text-to-morse" ? "morse-to-text" : "text-to-morse");
  };

  const handleCopy = () => {
    const output = mode === "text-to-morse" ? computedMorse : computedText;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const output = mode === "text-to-morse" ? computedMorse : computedText;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "morse-code.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setText("");
    setMorse("");
  };

  const hasContent = !!(computedMorse || computedText);

  return (
    <div className="space-y-5">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold transition-colors ${mode === "text-to-morse" ? "text-green-600" : "text-slate-400"}`}>
            Text → Morse
          </span>
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-slate-100 hover:bg-green-100 hover:text-green-600 transition-all cursor-pointer"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>
          <span className={`text-sm font-semibold transition-colors ${mode === "morse-to-text" ? "text-green-600" : "text-slate-400"}`}>
            Morse → Text
          </span>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${showSettings ? "bg-green-100 text-green-600" : "bg-slate-100 hover:bg-slate-200"}`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Speed: <span className="text-green-600 font-semibold">{speed} WPM</span></label>
            <input type="range" min="5" max="35" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-green-600" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Frequency: <span className="text-green-600 font-semibold">{frequency} Hz</span></label>
            <input type="range" min="300" max="1000" step="50" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-green-600" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Volume: <span className="text-green-600 font-semibold">{Math.round(volume * 100)}%</span></label>
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-green-600" />
          </div>
        </div>
      )}

      {/* Input */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          {mode === "text-to-morse" ? "Enter Text" : "Enter Morse Code"}
        </label>
        <div className="relative">
          <textarea
            value={mode === "text-to-morse" ? text : morse}
            onChange={(e) => {
              if (mode === "text-to-morse") setText(e.target.value);
              else setMorse(e.target.value);
            }}
            placeholder={mode === "text-to-morse" ? "Type your text here..." : "Enter Morse code (use . and -)..."}
            className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y font-mono text-lg transition-all"
            dir="ltr"
          />
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Output */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Output</label>
        <div className="p-4 rounded-xl bg-slate-900 text-green-400 font-mono text-lg min-h-[80px] relative" dir="ltr">
          {hasContent ? (
            <span>{mode === "text-to-morse" ? computedMorse : computedText}</span>
          ) : (
            <span className="text-slate-600">Output will appear here...</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {playing ? (
          <button
            onClick={handleStop}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer shadow-sm"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={!hasContent}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm shadow-green-600/20"
          >
            <Volume2 className="w-4 h-4" />
            Play Audio
          </button>
        )}
        <button
          onClick={handleCopy}
          disabled={!hasContent}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          disabled={!hasContent}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
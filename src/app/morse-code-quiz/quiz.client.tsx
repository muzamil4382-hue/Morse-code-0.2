"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MORSE_CODE, playMorseAudio } from "@/lib/morse";

const ALL_LETTERS: string[] = Object.entries(MORSE_CODE)
  .filter(([key]) => key.length === 1 && /[A-Z]/.test(key))
  .map(([key]) => key);

interface Question {
  letter: string;
  morse: string;
  options: string[];
}

function generateQuestions(count: number): Question[] {
  const letters = ALL_LETTERS.slice();
  const shuffled = letters.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((letter) => {
    const morse = MORSE_CODE[letter];
    const wrongOptions = letters
      .filter((l) => l !== letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [letter, ...wrongOptions].sort(() => Math.random() - 0.5);
    return { letter, morse, options };
  });
}

export default function MorseCodeQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [totalQuestions] = useState(15);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuestions(totalQuestions));
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizStarted(true);
  }, [totalQuestions]);

  const currentQ = questions[currentIdx];

  const handlePlay = useCallback(async () => {
    if (!currentQ || isPlaying) return;
    setIsPlaying(true);
    await playMorseAudio(currentQ.morse);
    setIsPlaying(false);
  }, [currentQ, isPlaying]);

  const handleSelect = useCallback(
    (option: string) => {
      if (selected) return;
      setSelected(option);
      if (option === currentQ.letter) {
        setScore((s) => s + 1);
      }
      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx((i) => i + 1);
          setSelected(null);
        } else {
          setShowResult(true);
        }
      }, 1200);
    },
    [selected, currentQ, currentIdx, questions.length]
  );

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Morse Code Quiz</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Morse Code Quiz</h1>
          <p className="text-lg text-slate-600">
            Test your Morse code knowledge! You&apos;ll see a Morse code pattern and need to pick the correct letter.
            Listen to the audio for an extra challenge.
          </p>
        </div>

        {!quizStarted ? (
          <div className="text-center bg-white border border-slate-200 rounded-2xl p-12">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Test Your Knowledge?</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              This quiz will show you {totalQuestions} Morse code patterns. For each one, choose the correct
              letter from four options. You can play the audio to hear the code.
            </p>
            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20 cursor-pointer"
            >
              Start Quiz
            </button>
          </div>
        ) : showResult ? (
          <div className="text-center bg-white border border-slate-200 rounded-2xl p-12">
            <div className="text-6xl mb-6">{percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪"}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
            <p className="text-slate-600 mb-4">
              You scored <span className="text-green-600 font-bold">{score}</span> out of{" "}
              <span className="font-bold">{questions.length}</span> ({percentage}%)
            </p>
            <div className="w-48 h-3 bg-slate-200 rounded-full mx-auto mb-8 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${percentage >= 80 ? "bg-green-500" : percentage >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            {percentage >= 80 && (
              <p className="text-green-600 font-medium mb-6">Excellent work! You really know your Morse code!</p>
            )}
            {percentage >= 50 && percentage < 80 && (
              <p className="text-yellow-600 font-medium mb-6">Good job! Keep practicing to improve.</p>
            )}
            {percentage < 50 && (
              <p className="text-red-600 font-medium mb-6">Keep studying! Review the alphabet chart and try again.</p>
            )}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <Link
                href="/morse-code-alphabet"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Review Alphabet
              </Link>
            </div>
          </div>
        ) : currentQ ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: <span className="text-green-600 font-semibold">{score}</span></span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
            </div>

            {/* Question */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-sm text-slate-500 mb-4">What letter does this Morse code represent?</p>
              <div className="bg-slate-900 rounded-xl p-6 mb-6">
                <p className="text-green-400 font-mono text-3xl tracking-wider">{currentQ.morse}</p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  {currentQ.morse.split("").map((char, i) => {
                    if (char === ".") return <span key={i} className="inline-block w-3 h-3 rounded-full bg-green-500" />;
                    if (char === "-") return <span key={i} className="inline-block w-7 h-3 rounded-full bg-green-500" />;
                    return null;
                  })}
                </div>
              </div>

              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer mb-6"
              >
                {isPlaying ? "Playing..." : "🔊 Play Audio"}
              </button>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {currentQ.options.map((option) => {
                  let btnClass = "bg-slate-50 border-slate-200 text-slate-900 hover:border-green-400 hover:bg-green-50";
                  if (selected) {
                    if (option === currentQ.letter) {
                      btnClass = "bg-green-100 border-green-500 text-green-700";
                    } else if (option === selected) {
                      btnClass = "bg-red-100 border-red-500 text-red-700";
                    } else {
                      btnClass = "bg-slate-50 border-slate-200 text-slate-400";
                    }
                  }
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      disabled={!!selected}
                      className={`p-4 rounded-xl border-2 font-bold text-xl transition-all cursor-pointer ${btnClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Explore More */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link href="/morse-code-alphabet" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">📋</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Alphabet</span>
            </Link>
            <Link href="/learn-morse-code" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">📖</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Learn</span>
            </Link>
            <Link href="/morse-code-sounds" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔊</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Sounds</span>
            </Link>
            <Link href="/morse-code-timing" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">⏱️</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Timing</span>
            </Link>
            <Link href="/what-is-morse-code" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">📖</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">History</span>
            </Link>
                      <Link href="/" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔤</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Translator</span>
            </Link>
            <Link href="/morse-code-numbers" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔢</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Numbers</span>
            </Link>
            <Link href="/morse-code-decoder" className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
              <span className="text-green-600">🔓</span>
              <span className="ml-1.5 text-sm font-medium text-slate-900 dark:text-white group-hover:text-green-600">Decoder</span>
            </Link>
          
</div>
        </section>
      </div>
    </main>
  );
}

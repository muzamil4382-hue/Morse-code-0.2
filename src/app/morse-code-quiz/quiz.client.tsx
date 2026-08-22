"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { MORSE_CODE, playMorseAudio } from "@/lib/morse";

const LEVELS = [
  { id: 1, name: "Level 1", title: "Easy Start", group: "Beginner", letters: ["E", "T", "A", "N"] },
  { id: 2, name: "Level 2", title: "Basic Letters", group: "Beginner", letters: ["E", "T", "A", "N", "I", "M", "S", "O"] },
  { id: 3, name: "Level 3", title: "More Characters", group: "Beginner", letters: ["E", "T", "A", "N", "I", "M", "S", "O", "H", "D", "U", "G"] },
  { id: 4, name: "Level 4", title: "Beginner Challenge", group: "Beginner", letters: ["E", "T", "A", "N", "I", "M", "S", "O", "H", "D", "U", "G", "V", "F", "R", "L"] },
  { id: 5, name: "Level 5", title: "New Patterns", group: "Intermediate", letters: ["E", "T", "A", "N", "I", "M", "S", "O", "H", "D", "U", "G", "V", "F", "R", "L", "P", "J", "B", "X"] },
  { id: 6, name: "Level 6", title: "Advanced Letters", group: "Intermediate", letters: ["E", "T", "A", "N", "I", "M", "S", "O", "H", "D", "U", "G", "V", "F", "R", "L", "P", "J", "B", "X", "C", "Y", "Z", "Q"] },
  { id: 7, name: "Level 7", title: "Full Alphabet Prep", group: "Intermediate", letters: ["E", "T", "A", "N", "I", "M", "S", "O", "H", "D", "U", "G", "V", "F", "R", "L", "P", "J", "B", "X", "C", "Y", "Z", "Q", "K", "W"] },
  { id: 8, name: "Level 8", title: "A–Z Challenge", group: "Advanced", letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") },
] as const;

interface Question {
  letter: string;
  morse: string;
  options: string[];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuestions(letters: readonly string[], count: number): Question[] {
  const questionLetters: string[] = [];
  let pool = shuffle([...letters]);

  while (questionLetters.length < count) {
    if (pool.length === 0) pool = shuffle([...letters]);
    questionLetters.push(pool.pop()!);
  }

  return questionLetters.map((letter) => {
    const wrongOptions = shuffle(letters.filter((item) => item !== letter)).slice(0, 3);
    return {
      letter,
      morse: MORSE_CODE[letter],
      options: shuffle([letter, ...wrongOptions]),
    };
  });
}

export default function MorseCodeQuizPage() {
  const [levelId, setLevelId] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLevel = Number(params.get("level"));
    if (LEVELS.some((level) => level.id === requestedLevel)) {
      setLevelId(requestedLevel);
    }
  }, []);

  const currentLevel = LEVELS.find((level) => level.id === levelId) ?? LEVELS[0];
  const totalQuestions = 15;

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizStarted(false);
  }, []);

  const selectLevel = useCallback((id: number) => {
    setLevelId(id);
    resetQuiz();
  }, [resetQuiz]);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuestions(currentLevel.letters, totalQuestions));
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizStarted(true);
  }, [currentLevel]);

  const currentQ = questions[currentIdx];

  const handlePlay = useCallback(async () => {
    if (!currentQ || isPlaying) return;
    setIsPlaying(true);
    await playMorseAudio(currentQ.morse);
    setIsPlaying(false);
  }, [currentQ, isPlaying]);

  const handleSelect = useCallback((option: string) => {
    if (!currentQ || selected) return;
    setSelected(option);

    if (option === currentQ.letter) {
      setScore((value) => value + 1);
    }

    window.setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((value) => value + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 900);
  }, [selected, currentQ, currentIdx, questions.length]);

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const nextLevel = LEVELS.find((level) => level.id === levelId + 1);

  return (
    <main className="min-h-screen">
      <section className="border-b border-green-900/40 bg-gradient-to-r from-[#075b2c] via-[#064d28] to-[#063b24]">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 md:py-14 lg:px-8">
          <nav className="mb-5 flex items-center justify-center gap-2 text-sm text-green-100/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Morse Code Quiz</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Morse Code Quiz
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-green-50/80">
            Learn Morse code progressively with level-based practice. Each level uses the same character pool, while question order and answer options are shuffled every time you start a new attempt.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-green-50/90">
            <span>🎯 8 Progressive Levels</span>
            <span>🔀 Fresh Questions Every Attempt</span>
            <span>🔊 Optional Audio Practice</span>
            <span>📊 Score & Accuracy Tracking</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        {!quizStarted && (
          <section className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Level</h2>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Start with a small character set and progress toward the complete A–Z alphabet.
                </p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {currentLevel.group}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LEVELS.map((level) => {
                const active = level.id === levelId;
                return (
                  <button
                    key={level.id}
                    onClick={() => selectLevel(level.id)}
                    className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      active
                        ? "border-green-500 bg-green-50 ring-1 ring-green-500 dark:bg-green-900/20"
                        : "border-slate-200 bg-white hover:border-green-400 dark:border-slate-700 dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{level.name}</span>
                      {active && <span className="text-green-600">✓</span>}
                    </div>
                    <p className="mt-1 text-sm font-medium text-green-700 dark:text-green-400">{level.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {level.letters.length} characters: {level.letters.join(" ")}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {!quizStarted ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
            <div className="mb-5 text-6xl">🎯</div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              {currentLevel.group} · {currentLevel.name}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {currentLevel.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              This attempt contains {totalQuestions} questions from {currentLevel.letters.length} learned characters. The characters, question sequence, and answer positions are randomized for every new attempt.
            </p>
            <div className="mx-auto mt-5 max-w-xl rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">Character pool:</strong>{" "}
              {currentLevel.letters.join(" · ")}
            </div>
            <button
              onClick={startQuiz}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-green-700 cursor-pointer"
            >
              Start {currentLevel.name}
            </button>
          </div>
        ) : showResult ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
            <div className="mb-5 text-6xl">{percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪"}</div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
              {currentLevel.name} Complete
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Your Result</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              You scored <span className="font-bold text-green-600">{score}</span> out of{" "}
              <span className="font-bold">{questions.length}</span> ({percentage}%)
            </p>
            <div className="mx-auto my-6 h-3 w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full rounded-full ${percentage >= 80 ? "bg-green-500" : percentage >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mb-7 text-slate-600 dark:text-slate-300">
              {percentage >= 80
                ? "Excellent. You are ready to reinforce this level or move forward."
                : "Try the level again. The next attempt will use a newly shuffled question sequence and answer order."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={startQuiz} className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 cursor-pointer">
                Try Again
              </button>
              {nextLevel && percentage >= 80 && (
                <button
                  onClick={() => selectLevel(nextLevel.id)}
                  className="rounded-lg border border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 cursor-pointer"
                >
                  Continue to {nextLevel.name}
                </button>
              )}
              <button onClick={resetQuiz} className="rounded-lg border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                Change Level
              </button>
            </div>
          </div>
        ) : currentQ ? (
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>{currentLevel.name} · Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: <strong className="text-green-600">{score}</strong></span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                What letter does this Morse code represent?
              </p>

              <div className="mb-6 rounded-xl bg-slate-900 p-6">
                <p className="font-mono text-3xl tracking-wider text-green-400">{currentQ.morse}</p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {currentQ.morse.split("").map((char, index) =>
                    char === "." ? (
                      <span key={index} className="inline-block h-3 w-3 rounded-full bg-green-500" />
                    ) : (
                      <span key={index} className="inline-block h-3 w-7 rounded-full bg-green-500" />
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="mb-6 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer"
              >
                {isPlaying ? "Playing..." : "🔊 Play Audio"}
              </button>

              <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
                {currentQ.options.map((option) => {
                  let buttonClass = "border-slate-200 bg-slate-50 text-slate-900 hover:border-green-400 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
                  if (selected) {
                    if (option === currentQ.letter) buttonClass = "border-green-500 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
                    else if (option === selected) buttonClass = "border-red-500 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                    else buttonClass = "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800";
                  }
                  return (
                    <button
                      key={`${currentIdx}-${option}`}
                      onClick={() => handleSelect(option)}
                      disabled={!!selected}
                      className={`rounded-xl border-2 p-4 text-xl font-bold transition-all cursor-pointer ${buttonClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        <section className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Practice Resources</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/morse-code-alphabet" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300">📋 Review Alphabet</Link>
            <Link href="/learn-morse-code" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300">📖 Learn Morse Code</Link>
            <Link href="/morse-code-sounds" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300">🔊 Practice Sounds</Link>
            <Link href="/morse-code-timing" className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-green-400 hover:text-green-700 dark:border-slate-700 dark:text-slate-300">⏱ Understand Timing</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

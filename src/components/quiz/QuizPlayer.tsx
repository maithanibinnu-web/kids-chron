"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button, ButtonLink } from "@/components/ui/primitives";
import type { Quiz } from "@/content";

/**
 * QUIZ PLAYER
 * ------------------------------------------------------------------
 * Design rules, in order of importance:
 *  1. A wrong answer is never a punishment. The explanation appears
 *     either way, and the wrong option is marked "not this one" rather
 *     than with a cross and a red slap.
 *  2. Nothing is stored and nothing is sent. The child can replay as
 *     often as they like without a record following them around.
 *  3. It works with a keyboard, and every state change is announced.
 */

type Phase = "intro" | "question" | "result";

const ENCOURAGEMENT_CORRECT = [
  "Great thinking!",
  "Exactly right.",
  "You had it.",
  "Spot on.",
];
const ENCOURAGEMENT_WRONG = [
  "Keep exploring!",
  "Good try — here is what is going on.",
  "Nearly. Have a read of this.",
  "Not this time — but now you know.",
];

export function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const liveRef = useRef<HTMLDivElement>(null);

  const q = quiz.questions[index];
  const total = quiz.questions.length;
  const answered = chosen !== null;
  const isCorrect = answered && chosen === q?.answerIndex;

  function start() {
    setPhase("question");
    setIndex(0);
    setChosen(null);
    setCorrectCount(0);
    setAnswers([]);
  }

  function choose(i: number) {
    if (answered) return;
    setChosen(i);
    if (i === q.answerIndex) setCorrectCount((c) => c + 1);
    setAnswers((a) => [...a, i]);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setChosen(null);
  }

  /* ---------------- Intro ---------------- */
  if (phase === "intro") {
    return (
      <div className="rounded-xl2 border border-line bg-paper p-7 sm:p-9">
        <h2 className="text-2xl">Ready to start?</h2>
        <p className="mt-2 max-w-xl text-ink-soft">
          {total} questions. There is no timer, no score kept anywhere, and you
          can play it as many times as you like. Every answer comes with an
          explanation — that is the part worth reading.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" onClick={start}>
            Start the quiz
          </Button>
          <ButtonLink href="/play/quizzes" variant="secondary" size="lg">
            Pick a different quiz
          </ButtonLink>
        </div>
      </div>
    );
  }

  /* ---------------- Result ---------------- */
  if (phase === "result") {
    const pct = Math.round((correctCount / total) * 100);
    const message =
      pct === 100
        ? "Every one. You clearly know this subject."
        : pct >= 60
          ? "Good going — and the ones you missed are the interesting ones."
          : "Plenty to discover here. Read the explanations and try again — that is how it works.";

    return (
      <div className="rounded-xl2 border border-line bg-paper p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sun-400 text-navy-900">
            <Icon name="trophy" className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-2xl">Quiz finished</h2>
            <p className="text-ink-mute">
              You got {correctCount} of {total} right.
            </p>
          </div>
        </div>

        <div
          className="mt-6 h-3 overflow-hidden rounded-full bg-navy-100"
          role="img"
          aria-label={`${correctCount} of ${total} correct`}
        >
          <div
            className="h-full rounded-full bg-leaf-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="mt-4 font-display text-xl text-navy-900">{message}</p>

        {/* Review every question, right or wrong */}
        <ol className="mt-8 space-y-4">
          {quiz.questions.map((question, i) => {
            const given = answers[i];
            const right = given === question.answerIndex;
            return (
              <li
                key={question.id}
                className={`rounded-xl border p-4 ${
                  right ? "border-leaf-200 bg-leaf-50" : "border-blue-200 bg-blue-50"
                }`}
              >
                <p className="font-semibold text-navy-900">
                  {i + 1}. {question.prompt}
                </p>
                <p className="mt-1.5 text-[0.9rem]">
                  <span className="font-semibold">Answer: </span>
                  {question.options[question.answerIndex]}
                  {!right && given != null && (
                    <span className="text-ink-mute">
                      {" "}
                      (you chose: {question.options[given]})
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                  {question.explanation}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={start}>
            Play again
          </Button>
          <ButtonLink href="/play/quizzes" variant="secondary" size="lg">
            Another quiz
          </ButtonLink>
          <ButtonLink href="/play/puzzles" variant="secondary" size="lg">
            Try the puzzles
          </ButtonLink>
        </div>

        <p className="mt-5 text-[0.85rem] text-ink-mute">
          Nothing about this attempt has been saved or sent anywhere.
        </p>
      </div>
    );
  }

  /* ---------------- Question ---------------- */
  return (
    <div className="rounded-xl2 border border-line bg-paper p-6 sm:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-ink-mute">
          Question {index + 1} of {total}
        </p>
        <button
          type="button"
          onClick={start}
          className="text-[0.82rem] font-semibold text-blue-700 underline underline-offset-4"
        >
          Start again
        </button>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-2xl leading-snug">{q.prompt}</h2>

      <ul className="mt-6 space-y-2.5">
        {q.options.map((option, i) => {
          const isAnswer = i === q.answerIndex;
          const isChosen = i === chosen;
          let cls =
            "border-navy-200 bg-paper hover:border-blue-400 hover:bg-blue-50";
          let tag: string | null = null;
          if (answered) {
            if (isAnswer) {
              cls = "border-leaf-500 bg-leaf-50";
              tag = "The answer";
            } else if (isChosen) {
              cls = "border-blue-300 bg-blue-50";
              tag = "Not this one";
            } else {
              cls = "border-line bg-paper opacity-60";
            }
          }
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                aria-pressed={isChosen}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all min-h-14 ${cls} ${
                  answered ? "cursor-default" : "motion-safe:hover:-translate-y-0.5"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.78rem] font-bold ${
                    answered && isAnswer
                      ? "bg-leaf-600 text-white"
                      : answered && isChosen
                        ? "bg-blue-600 text-white"
                        : "bg-navy-100 text-navy-700"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-[1.02rem] text-navy-900">{option}</span>
                {tag && (
                  <span className="shrink-0 self-center text-[0.72rem] font-bold uppercase tracking-wide text-ink-mute">
                    {tag}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Feedback */}
      <div ref={liveRef} aria-live="polite">
        {answered && (
          <div
            className={`mt-6 animate-pop rounded-xl2 p-5 ${
              isCorrect
                ? "bg-leaf-50 ring-1 ring-inset ring-leaf-200"
                : "bg-sun-50 ring-1 ring-inset ring-sun-200"
            }`}
          >
            <p
              className={`font-display text-xl ${
                isCorrect ? "text-leaf-900" : "text-sun-900"
              }`}
            >
              {isCorrect
                ? ENCOURAGEMENT_CORRECT[index % ENCOURAGEMENT_CORRECT.length]
                : ENCOURAGEMENT_WRONG[index % ENCOURAGEMENT_WRONG.length]}
            </p>
            <p className="mt-2 leading-relaxed text-ink-soft">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[0.85rem] text-ink-mute">
          {answered ? "Read the explanation, then carry on." : "Choose an answer."}
        </p>
        <Button size="lg" onClick={next} disabled={!answered}>
          {index + 1 >= total ? "See how you did" : "Next question"}
        </Button>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-[0.82rem] text-ink-mute">
        Quizzes like this one appear in every printed edition.{" "}
        <Link href="/subscribe" className="font-semibold text-blue-700 underline">
          Subscribe to KidsChron
        </Link>
        .
      </p>
    </div>
  );
}

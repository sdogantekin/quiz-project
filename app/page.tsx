"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/track";
import { personalities, questions, Question } from "@/lib/quiz-data";
import { selectQuizQuestions } from "@/lib/select-questions";
import { getWinningIndex } from "@/lib/scoring";
import QuizCard from "@/components/QuizCard";
import ResultCard from "@/components/ResultCard";

const QUIZ_LENGTH = 10;

export default function Home() {
  // Starts null so the server-rendered HTML and the client's first render
  // match exactly (both render nothing); the real, randomized question set
  // is picked client-side right after mount, avoiding a hydration mismatch
  // between two independently-randomized server vs. client selections.
  const [activeQuestions, setActiveQuestions] = useState<Question[] | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>(
    new Array(personalities.length).fill(0)
  );
  // Identifies one quiz attempt so events (started, completed, shared, ...)
  // can be correlated into a real funnel instead of just independent counts.
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    setActiveQuestions(selectQuizQuestions(questions, QUIZ_LENGTH));
  }, []);

  if (!activeQuestions) {
    return (
      <div className="min-h-screen bg-[var(--background)]" />
    );
  }

  const isFinished = currentQuestion >= activeQuestions.length;

  function handleAnswer(personalityIndex: number) {
    if (currentQuestion === 0) {
      trackEvent("quiz_started", sessionId);
    }
    setScores((prev) => {
      const next = [...prev];
      next[personalityIndex] += 1;
      return next;
    });
    setCurrentQuestion((prev) => prev + 1);
  }

  function handleRetake() {
    trackEvent("quiz_retaken", sessionId);
    setSessionId(crypto.randomUUID());
    setActiveQuestions(selectQuizQuestions(questions, QUIZ_LENGTH));
    setCurrentQuestion(0);
    setScores(new Array(personalities.length).fill(0));
  }

  const winningIndex = getWinningIndex(scores);
  const result = personalities[winningIndex];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      {isFinished ? (
        <ResultCard result={result} onRetake={handleRetake} sessionId={sessionId} />
      ) : (
        <QuizCard
          question={activeQuestions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={activeQuestions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

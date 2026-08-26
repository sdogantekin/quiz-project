"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { personalities, questions } from "@/lib/quiz-data";
import { getWinningIndex } from "@/lib/scoring";
import QuizCard from "@/components/QuizCard";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>(
    new Array(personalities.length).fill(0)
  );

  const isFinished = currentQuestion >= questions.length;

  function handleAnswer(personalityIndex: number) {
    if (currentQuestion === 0) {
      track("quiz_started");
    }
    setScores((prev) => {
      const next = [...prev];
      next[personalityIndex] += 1;
      return next;
    });
    setCurrentQuestion((prev) => prev + 1);
  }

  function handleRetake() {
    track("quiz_retaken");
    setCurrentQuestion(0);
    setScores(new Array(personalities.length).fill(0));
  }

  const winningIndex = getWinningIndex(scores);
  const result = personalities[winningIndex];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      {isFinished ? (
        <ResultCard result={result} onRetake={handleRetake} />
      ) : (
        <QuizCard
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

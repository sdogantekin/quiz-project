"use client";

import { personalities, Question } from "@/lib/quiz-data";

type QuizCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (personalityIndex: number) => void;
};

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizCardProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-16">
      <div className="mb-2 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
        Question {questionNumber} / {totalQuestions}
      </div>

      <div className="mb-10 h-[2px] w-full bg-[var(--border)]">
        <div
          className="h-[2px] bg-[var(--foreground)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h1 className="mb-10 text-2xl leading-snug font-medium text-[var(--foreground)]">
        {question.question}
      </h1>

      <div className="flex flex-col">
        {question.answers.map((answer, i) => (
          <button
            key={answer}
            data-testid="answer-button"
            onClick={() => onAnswer(i)}
            className="flex items-center gap-4 border-b border-[var(--border)] px-1 py-5 text-left text-base text-[var(--foreground)] transition-all duration-150 hover:pl-3 hover:text-[var(--accent-strong)]"
          >
            <span className="text-lg">{personalities[i].icon}</span>
            <span>{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

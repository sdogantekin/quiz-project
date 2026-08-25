"use client";

import { useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Personality } from "@/lib/quiz-data";
import { playChime } from "@/lib/chime";
import ShareButtons from "@/components/ShareButtons";

type ResultCardProps = {
  result: Personality;
  onRetake: () => void;
};

export default function ResultCard({ result, onRetake }: ResultCardProps) {
  useEffect(() => {
    const colors = ["#a87c4f", "#e3c9a3", "#4a3423", "#fff8ef"];

    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 45,
      origin: { y: 0.3 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.4 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.4 },
      colors,
    });

    try {
      playChime();
    } catch {
      // Audio isn't critical to the result - fail silently if it's blocked.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-16 text-center">
      <div className="animate-fade-in-up mb-2 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
        Your Result
      </div>

      <div
        className="animate-pop-in relative mx-auto mb-8 h-64 w-full overflow-hidden rounded-2xl"
        style={{ animationDelay: "0.1s" }}
      >
        <Image
          src={result.image}
          alt={result.coffee}
          fill
          sizes="(max-width: 640px) 100vw, 576px"
          className="object-cover"
          priority
        />
      </div>

      <div
        className="animate-pop-in mb-1 text-4xl"
        style={{ animationDelay: "0.25s" }}
      >
        {result.icon}
      </div>
      <h1
        className="animate-fade-in-up mb-2 text-3xl font-medium text-[var(--foreground)]"
        style={{ animationDelay: "0.3s" }}
      >
        {result.name}
      </h1>
      <p
        className="animate-fade-in-up mb-1 text-lg text-[var(--accent-strong)]"
        style={{ animationDelay: "0.4s" }}
      >
        {result.coffee}
      </p>
      <p
        className="animate-fade-in-up mb-8 text-base text-[var(--muted)] italic"
        style={{ animationDelay: "0.5s" }}
      >
        &ldquo;{result.tagline}&rdquo;
      </p>

      <ShareButtons result={result} />

      <button
        onClick={onRetake}
        className="animate-fade-in-up rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--border)]"
        style={{ animationDelay: "0.7s" }}
      >
        Take it again
      </button>
    </div>
  );
}

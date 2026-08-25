"use client";

import { useState } from "react";
import { Personality } from "@/lib/quiz-data";

type ShareButtonsProps = {
  result: Personality;
};

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I'm a ${result.name} - my coffee match is a ${result.coffee}! ${result.icon} What's your coffee personality?`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked - the button just won't confirm.
    }
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "What's Your Coffee Personality?",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled the share sheet - nothing to do.
      }
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  )}`;

  return (
    <div
      className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-center gap-3"
      style={{ animationDelay: "0.55s" }}
    >
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity duration-150 hover:opacity-90"
        >
          Share result
        </button>
      )}

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--border)]"
      >
        Share on X
      </a>

      <button
        onClick={handleCopyLink}
        className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--border)]"
      >
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
}

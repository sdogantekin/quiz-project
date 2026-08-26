"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/track";
import { Personality } from "@/lib/quiz-data";

type ShareButtonsProps = {
  result: Personality;
  sessionId: string;
};

export default function ShareButtons({ result, sessionId }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I'm a ${result.name} - my coffee match is a ${result.coffee}! ${result.icon} What's your coffee personality?`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/result/${result.id}`
      : "";

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent("share_clicked", sessionId, {
        method: "copy_link",
        personality: result.id,
      });
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
          url: shareUrl,
        });
        trackEvent("share_clicked", sessionId, {
          method: "native",
          personality: result.id,
        });
      } catch {
        // User cancelled the share sheet - nothing to do.
      }
    }
  }

  function handleTwitterClick() {
    trackEvent("share_clicked", sessionId, {
      method: "twitter",
      personality: result.id,
    });
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div
      className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-center gap-3"
      style={{ animationDelay: "0.7s" }}
    >
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--border)]"
        >
          Share result
        </button>
      )}

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTwitterClick}
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

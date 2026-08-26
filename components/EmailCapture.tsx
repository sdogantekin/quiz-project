"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { isValidEmail } from "@/lib/email";

type EmailCaptureProps = {
  personalityId: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({ personalityId }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setFormError("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setFormError("Please check the box to save your result.");
      return;
    }

    setFormError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, personality: personalityId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      track("email_submitted", { personality: personalityId });
    } catch (err) {
      setStatus("error");
      setFormError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <p
        className="animate-fade-in-up mb-8 text-sm text-[var(--accent-strong)]"
        style={{ animationDelay: "0.55s" }}
      >
        Saved! Thanks for sharing your email.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up mb-8 flex flex-col items-center gap-3"
      style={{ animationDelay: "0.55s" }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full max-w-xs rounded-full border border-[var(--border)] bg-transparent px-4 py-2.5 text-center text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
      />

      <label className="flex max-w-xs items-start gap-2 text-left text-xs text-[var(--muted)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        I agree to have my email and quiz result saved.
      </label>

      {formError && (
        <p className="text-xs text-red-600" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Saving…" : "Save my result"}
      </button>
    </form>
  );
}

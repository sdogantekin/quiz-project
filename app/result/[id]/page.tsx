import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { personalities } from "@/lib/quiz-data";

export function generateStaticParams() {
  return personalities.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = personalities.find((p) => p.id === id);
  if (!result) return {};

  return {
    title: `I'm a ${result.name}! - What's Your Coffee Personality?`,
    description: `My coffee match is a ${result.coffee}. "${result.tagline}" Take the quiz to find yours.`,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = personalities.find((p) => p.id === id);

  if (!result) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      <div className="mx-auto w-full max-w-xl px-6 py-16 text-center">
        <div className="mb-2 text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
          Coffee Personality Result
        </div>

        <div className="relative mx-auto mb-8 h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={result.image}
            alt={result.coffee}
            fill
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mb-1 text-4xl">{result.icon}</div>
        <h1 className="mb-2 text-3xl font-medium text-[var(--foreground)]">
          {result.name}
        </h1>
        <p className="mb-1 text-lg text-[var(--accent-strong)]">
          {result.coffee}
        </p>
        <p className="mb-10 text-base text-[var(--muted)] italic">
          &ldquo;{result.tagline}&rdquo;
        </p>

        <Link
          href="/"
          className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--border)]"
        >
          Take the quiz yourself
        </Link>
      </div>
    </div>
  );
}

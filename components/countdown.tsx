"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-02-10T10:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const now = Date.now();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="animate-pulse-glow relative flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-secondary/80 sm:h-28 sm:w-28 md:h-32 md:w-32">
        <span className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = getTimeLeft();
      if (!tl) {
        setIsComplete(true);
        clearInterval(interval);
      } else {
        setTimeLeft(tl);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-foreground">
              Quiz is Live
            </span>
          </div>
          <h2 className="text-balance text-center text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Induction Quiz Has Begun
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Click below to launch into the quiz. Good luck, future rocketeer.
          </p>
        </div>
        <a
          href="https://www.leanist.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-foreground/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-10deg]"
            aria-hidden="true"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
          Attempt Quiz
        </a>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        <CountdownBlock value={timeLeft.days} label="Days" />
        <div className="flex flex-col gap-2 pb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        </div>
        <CountdownBlock value={timeLeft.hours} label="Hours" />
        <div className="flex flex-col gap-2 pb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        </div>
        <CountdownBlock value={timeLeft.minutes} label="Minutes" />
        <div className="flex flex-col gap-2 pb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        </div>
        <CountdownBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

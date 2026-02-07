import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { Countdown } from "@/components/countdown";
import { RocketIllustration } from "@/components/rocket-illustration";
import { Rocket } from "lucide-react";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Starfield />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section - Full viewport centered */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 pb-12">
          {/* Top badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
            <Rocket className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Idea and Innovation Cell
            </span>
          </div>

          {/* Title */}
          <h1 className="text-balance mb-4 text-center text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            IIC 
          </h1>
          <p className="mb-2 text-center font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground sm:text-base">
            Induction Quiz 2026
          </p>
          <p className="mb-12 max-w-md text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Prepare for launch. The induction quiz opens on February 10th.
            Are you ready to join the mission?
          </p>

          {/* Rocket */}
          <div className="mb-12">
            <RocketIllustration />
          </div>

          {/* Countdown */}
          <div>
            <p className="mb-6 text-center text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
              Countdown to Launch
            </p>
            <Countdown />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                IIC 
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Idea and Innovation Cell. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

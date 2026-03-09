import React from "react";
import { Header } from "./components/layout/Header";
import "./global.css";
import { Button } from "./components/ui/button";

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  children?: React.ReactNode;
}> = ({ id, label, kicker, children }) => {
  return (
    <section
      id={id}
      className="scroll-mt-32 border-b border-border/40 bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:py-28">
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {kicker}
            </p>
          )}
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {label}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            {/* Placeholder text to be replaced later */}
            This is placeholder copy for the {label.toLowerCase()} section. You
            can replace this with your own content, visuals, and calls to
            action.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950">
        <section
          id="home"
          className="scroll-mt-32 border-b border-border/40 bg-gradient-to-b from-slate-950 via-slate-950/95 to-background"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:py-28">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                DIGITAL EXPERIENCE STUDIO
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                A clean, modern shell for your{" "}
                <span className="bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
                  future website
                </span>
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                This layout is designed as a starting point. Keep the structure,
                update the words, swap the visuals, and you&apos;re ready to go.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Primary action</Button>
                <Button variant="outline" size="lg">
                  Secondary action
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mx-auto max-w-md rounded-3xl border border-border/70 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-950/80 p-6 shadow-soft-xl">
                <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Preview layout</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
                    Shadcn-inspired
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-24 rounded-full bg-primary/60" />
                  <div className="flex gap-2">
                    <div className="h-24 flex-1 rounded-2xl bg-slate-900/70" />
                    <div className="flex w-24 flex-col gap-2">
                      <div className="h-6 rounded-xl bg-slate-900/70" />
                      <div className="h-6 rounded-xl bg-slate-900/70" />
                      <div className="h-6 rounded-xl bg-slate-900/70" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-800" />
                    <div className="h-2 w-16 rounded-full bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="services" label="Services" kicker="What you offer">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/60 bg-secondary/70 p-5 shadow-soft-xl"
              >
                <div className="mb-3 h-8 w-8 rounded-xl bg-primary/20" />
                <h3 className="mb-2 text-sm font-semibold">
                  Service placeholder
                </h3>
                <p className="text-xs text-muted-foreground">
                  Replace this with a short description of a key service or
                  capability.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="products" label="Products" kicker="What you build">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/70 p-5 shadow-soft-xl md:flex-row"
              >
                <div>
                  <h3 className="mb-2 text-sm font-semibold">
                    Product placeholder
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Use this card to highlight a product or solution. Add
                    benefits, outcomes, or key features here.
                  </p>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" size="sm">
                    Learn more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="clients" label="Clients" kicker="Who you work with">
          <div className="grid gap-4 text-xs text-muted-foreground md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-secondary/40 px-4 py-6"
              >
                Client logo / name
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" label="About us" kicker="Who you are">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm text-muted-foreground md:text-base">
              <p>
                This section is intended for your story, mission, and the people
                behind the brand. You can keep this layout and simply replace
                the paragraphs with your own copy.
              </p>
              <p>
                Consider talking about your values, how you work with clients,
                and what makes your approach different. Short, clear paragraphs
                work best.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/60 bg-secondary/60 p-5 text-xs text-muted-foreground shadow-soft-xl">
              <div className="flex items-center justify-between">
                <span>Quick facts</span>
                <span className="rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-primary">
                  Edit later
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Founded</span>
                  <span>Year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team size</span>
                  <span>Number</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Offices</span>
                  <span>Locations</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <footer className="border-t border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Your company name</span>
          <span>Built with React, TypeScript & Tailwind</span>
        </div>
      </footer>
    </div>
  );
};


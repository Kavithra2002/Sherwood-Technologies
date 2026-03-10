import React from "react";
import { Header } from "./components/layout/Header";
import "./global.css";
import { Button } from "./components/ui/button";

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ id, label, kicker, description, children }) => {
  return (
    <section
      id={id}
      className="scroll-mt-32 border-b border-border/40 bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {kicker}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {label}
          </h2>
          {description ? (
            description
          ) : (
            <p className="text-base text-muted-foreground md:text-lg">
              {/* Placeholder text to be replaced later */}
              This is placeholder copy for the {label.toLowerCase()} section.
              You can replace this with your own content, visuals, and calls to
              action.
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

const EmployeeCard: React.FC<{
  name: string;
  role: string;
}> = ({ name, role }) => {
  return (
    <div className="flex min-h-[230px] flex-col items-center gap-4 rounded-2xl border border-border/60 bg-secondary/60 p-7 text-center text-sm text-muted-foreground shadow-soft-xl">
      <div className="mb-3 h-16 w-16 rounded-full bg-primary/20" />
      <p className="text-base font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
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
            <div className="flex-1 space-y-7">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                DIGITAL EXPERIENCE STUDIO
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                A clean, modern shell for your{" "}
                <span className="bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
                  future website
                </span>
              </h1>
              <p className="max-w-xl text-base text-muted-foreground md:text-lg">
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
              <div className="relative mx-auto max-w-lg rounded-3xl border border-border/70 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-950/80 p-8 shadow-soft-xl">
                <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Preview layout</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1.5 text-xs uppercase tracking-[0.18em]">
                    Shadcn-inspired
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-32 rounded-full bg-primary/60" />
                  <div className="flex gap-3">
                    <div className="h-32 flex-1 rounded-2xl bg-slate-900/70" />
                    <div className="flex w-32 flex-col gap-3">
                      <div className="h-7 rounded-xl bg-slate-900/70" />
                      <div className="h-7 rounded-xl bg-slate-900/70" />
                      <div className="h-7 rounded-xl bg-slate-900/70" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-3 flex-1 rounded-full bg-slate-800" />
                    <div className="h-3 w-24 rounded-full bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section
          id="services"
          label="Services"
          kicker="What we offer"
          description={
            <p className="text-base text-muted-foreground md:text-lg">
              We provide a range of
              professional services designed to support organizations in
              building, optimizing, and managing their financial technology
              infrastructure.
            </p>
          }
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Software Development",
                description:
                  "We provide custom software development services tailored to meet the specific needs of businesses and financial institutions. Our solutions focus on building secure, scalable, and high-performance applications that improve operational efficiency and support business growth.",
              },
              {
                name: "Mobile Application Development",
                description:
                  "Our mobile development services focus on creating modern, user-friendly mobile applications for iOS and Android platforms. We design and build mobile solutions that help businesses deliver seamless digital experiences to their customers.",
              },
              {
                name: "Finance & Treasury Advisory",
                description:
                  "We offer expert guidance on financial management and treasury operations to help organizations optimize cash flow, manage financial risks, and improve investment strategies. Our advisory services combine financial expertise with practical technology solutions.",
              },
              {
                name: "Microsoft Package Reseller",
                description:
                  "We provide Microsoft software solutions, including Microsoft Office and Microsoft 365 packages, to support business productivity and collaboration. Our services include licensing consultation, setup, and support to ensure organizations get the most value from their Microsoft tools.",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="rounded-3xl border border-border/60 bg-secondary/70 p-7 shadow-soft-xl"
              >
                <div className="mb-4 h-10 w-10 rounded-2xl bg-primary/20" />
                <h3 className="mb-3 text-base font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="products"
          label="Products"
          kicker="What we build"
          description={
            <>
              
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
              In addition to our services, we also build products that help financial institutions,
                investment firms, and treasury departments manage financial
                operations efficiently, securely, and intelligently. Each
                solution is built with scalability, automation, and real-time
                data capabilities to support modern financial environments.
              </p>
            </>
          }
        >
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Wealth Management System",
                description:
                  "A comprehensive platform designed to help financial institutions and advisors manage client investments, portfolios, and financial planning activities efficiently. The system provides real-time insights, portfolio tracking, and reporting tools to support better wealth management and investment decisions.",
              },
              {
                name: "Equity Management System",
                description:
                  "A powerful solution for managing equity portfolios, tracking stock market transactions, and monitoring investment performance. It enables investment firms and financial professionals to analyze market data, manage trading activities, and maintain detailed records of equity investments.",
              },
              {
                name: "Internal Treasury Management System",
                description:
                  "An advanced system designed to help organizations manage internal treasury operations, including cash flow monitoring, liquidity management, and financial risk analysis. It provides centralized visibility into financial resources and supports effective treasury decision-making.",
              },
              {
                name: "Wealth Management Mobile App (Ongoing Product)",
                description:
                  "A mobile application currently under development that will allow users to access wealth management services directly from their smartphones. The app will provide real-time portfolio updates, investment tracking, and secure access to financial information anytime, anywhere.",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="flex flex-col justify-between gap-6 rounded-3xl border border-border/60 bg-secondary/70 p-7 shadow-soft-xl md:flex-row"
              >
                <div>
                  <h3 className="mb-3 text-base font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" size="lg">
                    Learn more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="clients" label="Clients" kicker="Who you work with">
          <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-3xl border border-dashed border-border/60 bg-secondary/40 px-6 py-8"
              >
                Client logo / name
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="about"
          label="About us"
          kicker="Who are we"
          description={
            <p className="text-base text-muted-foreground md:text-lg">
              At Sherwood Technologies, our people are the heart of everything we
              create. Led by experienced visionaries like our Lead Partner and
              Executive Director, we&apos;re a team of passionate innovators
              dedicated to transforming bold ideas into powerful digital
              realities. Together, we don&apos;t just build websites — we build
              lasting partnerships, one breakthrough at a time.
            </p>
          }
        >
          <div className="mt-10 space-y-10">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <EmployeeCard name="Lead Partner" role="Executive Director" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "Team Member 1", role: "Analyst" },
                { name: "Team Member 2", role: "Consultant" },
                { name: "Team Member 3", role: "Developer" },
                { name: "Team Member 4", role: "Designer" },
                { name: "Team Member 5", role: "Product Lead" },
                { name: "Team Member 6", role: "Support" },
              ].map((employee) => (
                <EmployeeCard
                  key={employee.name}
                  name={employee.name}
                  role={employee.role}
                />
              ))}
            </div>
          </div>
        </Section>
      </main>
      <footer className="border-t border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sherwood Technologies</span>
          <span>Built with React, TypeScript & Tailwind</span>
        </div>
      </footer>
    </div>
  );
};


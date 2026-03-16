import React, { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import "./global.css";
import { Button } from "./components/ui/button";
import { AnimatedOnScroll } from "./components/ui/AnimatedOnScroll";

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  description?: React.ReactNode;
  variant?: "default" | "white";
  children?: React.ReactNode;
}> = ({ id, label, kicker, description, variant = "default", children }) => {
  return (
    <section
      id={id}
      className={
        "scroll-mt-32 border-b border-border/40 bg-white" +
        (variant === "white" ? "" : "")
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 text-slate-800 md:py-32">
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

type ProductSlug =
  | "wealth-management"
  | "equity-management"
  | "treasury-management"
  | "mobile-app";

const PRODUCTS: Array<{
  slug: ProductSlug;
  name: string;
  description: string;
}> = [
  {
    slug: "wealth-management",
    name: "Wealth Management System",
    description:
      "A comprehensive platform designed to help financial institutions and advisors manage client investments, portfolios, and financial planning activities efficiently. The system provides real-time insights, portfolio tracking, and reporting tools to support better wealth management and investment decisions.",
  },
  {
    slug: "equity-management",
    name: "Equity Management System",
    description:
      "A powerful solution for managing equity portfolios, tracking stock market transactions, and monitoring investment performance. It enables investment firms and financial professionals to analyze market data, manage trading activities, and maintain detailed records of equity investments.",
  },
  {
    slug: "treasury-management",
    name: "Internal Treasury Management System",
    description:
      "An advanced system designed to help organizations manage internal treasury operations, including cash flow monitoring, liquidity management, and financial risk analysis. It provides centralized visibility into financial resources and supports effective treasury decision-making.",
  },
  {
    slug: "mobile-app",
    name: "Wealth Management Mobile App (Ongoing Product)",
    description:
      "A mobile application currently under development that will allow users to access wealth management services directly from their smartphones. The app will provide real-time portfolio updates, investment tracking, and secure access to financial information anytime, anywhere.",
  },
];

export const App: React.FC = () => {
  const [view, setView] = useState<
    "home" | "primary" | "secondary" | "contact" | "product-detail"
  >("home");
  const [productSlug, setProductSlug] = useState<ProductSlug | null>(null);
  const [backendStatus, setBackendStatus] = useState<
    "unknown" | "connected" | "not_connected"
  >("unknown");

  useEffect(() => {
    const scrollToTopViews = ["product-detail", "contact", "primary", "secondary"];
    if (scrollToTopViews.includes(view)) {
      window.scrollTo(0, 0);
    }
  }, [view, productSlug]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/health");
        if (!res.ok) {
          console.log("The backend is not connected");
          setBackendStatus("not_connected");
          return;
        }
        const data = await res.json();
        if (data && data.status === "ok") {
          console.log("The backend is connected");
          setBackendStatus("connected");
        } else {
          console.log("The backend is not connected");
          setBackendStatus("not_connected");
        }
      } catch (error) {
        console.log("The backend is not connected");
        setBackendStatus("not_connected");
      }
    };

    checkBackend();
  }, []);

  const renderHome = () => (
    <>
      <section
        id="home"
        className="scroll-mt-32 border-b border-border/40 bg-white"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:py-28">
          <div className="flex-1 space-y-7">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              DIGITAL EXPERIENCE 
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Building Smart Software for a{" "}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>
            <p className="max-w-xl text-base text-slate-700 md:text-lg">
              Sherwood Technologies builds innovative software solutions for financial institutions and businesses. Our expertise in fintech platforms, mobile applications, and enterprise systems helps organizations manage investments, optimize treasury operations, and deliver modern digital services.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setView("primary")}>
                Primary action
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setView("secondary")}
              >
                Secondary action
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            {/* Main hero visual – digital experience theme */}
            <div className="relative mx-auto max-w-lg">
              <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(121,199,44,0.12),transparent_50%)]" />
                <div className="relative aspect-[4/3] p-6">
                  <svg
                    viewBox="0 0 400 300"
                    className="h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Soft grid */}
                    <defs>
                      <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" />
                      </pattern>
                      <linearGradient id="hero-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#79C72C" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#4c9141" stopOpacity="0.7" />
                      </linearGradient>
                      <linearGradient id="hero-sky" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#79C72C" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="300" fill="url(#hero-grid)" />
                    {/* Abstract nodes and connections */}
                    <circle cx="120" cy="100" r="40" fill="url(#hero-accent)" opacity="0.5" />
                    <circle cx="280" cy="120" r="28" fill="url(#hero-sky)" opacity="0.6" />
                    <circle cx="200" cy="200" r="24" fill="rgba(121,199,44,0.25)" />
                    <path d="M 120 100 Q 200 80 280 120" stroke="rgba(121,199,44,0.35)" strokeWidth="2" fill="none" />
                    <path d="M 120 100 Q 160 180 200 200" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5" fill="none" />
                    <path d="M 280 120 Q 240 160 200 200" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" fill="none" />
                    {/* Window/dashboard hint */}
                    <rect x="40" y="220" width="320" height="50" rx="8" fill="rgba(15,23,42,0.8)" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
                    <rect x="55" y="232" width="60" height="8" rx="4" fill="rgba(121,199,44,0.4)" />
                    <rect x="130" y="232" width="80" height="8" rx="4" fill="rgba(148,163,184,0.15)" />
                  </svg>
                </div>
              </div>
              {/* Second image – complementary themed card */}
              <div className="absolute -bottom-4 -right-2 w-[45%] max-w-[220px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-slate-800/95 to-slate-950 shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_30%,rgba(121,199,44,0.08),transparent)]" />
                <div className="relative aspect-[3/2] p-4">
                  <svg viewBox="0 0 120 80" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="50" height="35" rx="4" fill="rgba(15,23,42,0.9)" stroke="rgba(121,199,44,0.2)" strokeWidth="1" />
                    <rect x="16" y="16" width="20" height="4" rx="2" fill="rgba(121,199,44,0.5)" />
                    <rect x="16" y="24" width="30" height="3" rx="1.5" fill="rgba(148,163,184,0.15)" />
                    <rect x="16" y="30" width="25" height="3" rx="1.5" fill="rgba(148,163,184,0.1)" />
                    <path d="M 70 25 L 95 25 L 95 55 L 70 55 Z" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" strokeDasharray="4 2" />
                    <circle cx="82" cy="40" r="8" fill="rgba(121,199,44,0.2)" />
                  </svg>
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
          ].map((service, index) => (
            <AnimatedOnScroll key={service.name} staggerIndex={index}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <div className="mb-4 h-10 w-10 rounded-2xl bg-primary/20" />
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {service.description}
                </p>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </Section>

      <Section
        id="products"
        label="Products"
        kicker="What we build"
        variant="white"
        description={
          <>
            
            <p className="mt-4 text-base text-slate-700 md:text-lg">
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
          {PRODUCTS.map((product, index) => (
            <AnimatedOnScroll key={product.slug} staggerIndex={index}>
              <div className="flex flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md md:flex-row">
                <div>
                  <h3 className="mb-3 text-base font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="product"
                    size="lg"
                    onClick={() => {
                      setProductSlug(product.slug);
                      setView("product-detail");
                    }}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </Section>

      <Section
        id="clients"
        label="Clients"
        kicker="Who we work with"
        description={
          <p className="text-base text-muted-foreground md:text-lg">
            We partner with businesses and financial organizations to create
            powerful digital solutions that improve efficiency, security, and
            performance.
          </p>
        }
      >
        <div className="grid gap-6 text-sm text-slate-600 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-slate-700"
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
        variant="white"
        description={
          <p className="text-base text-slate-700 md:text-lg">
            Great digital experiences start with great people. Meet the team
            behind Sherwood Technologies.
          </p>
        }
      >
        <div className="mt-10 flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-slate-50 px-6 text-center text-sm text-slate-700">
          Content for this About us section will be added here later.
        </div>
      </Section>
    </>
  );

  const renderPrimaryPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Primary Action
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Primary action details
          </h1>
          <p className="max-w-2xl text-base text-slate-700 md:text-lg">
            This page can be used to describe the main call to action from
            your hero section—such as getting in touch, starting a project, or
            exploring a flagship service. You can replace this copy with
            whatever best fits your workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                How we can engage
              </h3>
              <p className="text-sm text-slate-600">
                Add more structured content here – for example, steps in your
                onboarding process, what information you need from clients, or
                a breakdown of your core value proposition.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll staggerIndex={1}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Next steps
              </h3>
              <p className="text-sm text-slate-600">
                You can also surface links, documents, or forms here—anything
                that helps visitors complete the primary action you want them to
                take.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const renderSecondaryPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Secondary Action
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Secondary action details
          </h1>
          <p className="max-w-2xl text-base text-slate-700 md:text-lg">
            Use this page for an alternate path, such as learning more about
            your company, downloading resources, or exploring additional
            offerings that support the main journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Supporting information
              </h3>
              <p className="text-sm text-slate-600">
                Highlight complementary services, FAQs, or educational content
                here to help visitors understand the broader context of what you
                provide.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll staggerIndex={1}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Optional follow-ups
              </h3>
              <p className="text-sm text-slate-600">
                This area can be used for second-tier actions like subscribing
                to updates, exploring case studies, or reading more about your
                expertise.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const renderContactPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Get in touch
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Let’s talk about your next project
          </h1>
          <p className="max-w-2xl text-base text-slate-700 md:text-lg">
            Use this page to collect inquiries, discuss engagement details, or
            provide direct contact information for Sherwood Technologies. You
            can replace this content later with a full contact form or
            integrated CRM workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Contact details
              </h3>
              <p className="text-sm text-slate-600">
                Add your preferred contact channels here – such as email
                addresses, phone numbers, or office locations – so potential
                clients can reach the right team quickly.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll staggerIndex={1}>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Project information
              </h3>
              <p className="text-sm text-slate-600">
                Outline the information you typically need to evaluate a new
                engagement, such as project scope, timelines, budget ranges, and
                any existing systems or tools.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const handleBackToProducts = () => {
    setView("home");
    setProductSlug(null);
    setTimeout(
      () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const renderProductDetailPage = () => {
    const product = productSlug
      ? PRODUCTS.find((p) => p.slug === productSlug)
      : null;
    if (!product) return null;
    return (
      <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
          <div className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={handleBackToProducts}
            >
              ← Back to Products
            </Button>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Product
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {product.name}
            </h1>
            <p className="max-w-2xl text-base text-slate-700 md:text-lg">
              {product.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedOnScroll staggerIndex={0}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Key features
                </h3>
                <p className="text-sm text-slate-600">
                  This product is designed to deliver scalable, secure, and
                  real-time capabilities tailored for financial institutions and
                  treasury operations. Expand this section with specific features
                  and benefits.
                </p>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={1}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Get started
                </h3>
                <p className="text-sm text-slate-600">
                  Contact us to learn how this solution can support your
                  organization. We can provide a demo, discuss requirements, and
                  outline implementation options.
                </p>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </section>
    );
  };

  const handleNavigateSection = (id: string) => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header
        onGetInTouch={() => setView("contact")}
        onNavigateSection={handleNavigateSection}
      />
      <main className="bg-white">
        {view === "home" && renderHome()}
        {view === "primary" && renderPrimaryPage()}
        {view === "secondary" && renderSecondaryPage()}
        {view === "contact" && renderContactPage()}
        {view === "product-detail" && renderProductDetailPage()}
      </main>
      <footer className="border-t border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sherwood Technologies</span>
          <span>
            {backendStatus === "connected" && "The backend is connected"}
            {backendStatus === "not_connected" && "The backend is not connected"}
            {backendStatus === "unknown" && ""}
          </span>
        </div>
      </footer>
    </div>
  );
};



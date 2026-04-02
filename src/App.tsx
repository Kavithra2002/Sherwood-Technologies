import React, { useState, useEffect, useRef } from "react";
import { Header } from "./components/layout/Header";
import "./global.css";
import { Button } from "./components/ui/button";
import { AnimatedOnScroll } from "./components/ui/AnimatedOnScroll";
import { TechRail } from "./components/TechRail";
import { HomeHeroThreeBackground } from "./components/HomeHeroThreeBackground";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import ambeonHoldingsLogo from "../images/Ambeon_Holdings_logo.png";
import colomboCityHoldingsLogo from "../images/colombo city holding.png";

const CLIENT_LOGOS: Array<{ src: string; alt: string; logoClassName?: string }> = [
  { src: ambeonHoldingsLogo, alt: "Ambeon Holdings PLC" },
  {
    src: colomboCityHoldingsLogo,
    alt: "Colombo City Holdings PLC",
    logoClassName: "scale-[1.4]",
  },
];

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  description?: React.ReactNode;
  variant?: "default" | "white";
  backgroundImageSrc?: string;
  children?: React.ReactNode;
}> = ({
  id,
  label,
  kicker,
  description,
  variant = "default",
  backgroundImageSrc,
  children,
}) => {
  return (
    <section
      id={id}
      className={
        "scroll-mt-32 border-b border-border/40" +
        (backgroundImageSrc ? " relative overflow-hidden bg-transparent" : " bg-white") +
        (variant === "white" ? "" : "")
      }
    >
      {backgroundImageSrc && (
        <>
          <img
            src={backgroundImageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.08))",
            }}
          />
        </>
      )}
      <div className="mx-auto relative z-[1] flex max-w-6xl flex-col gap-10 px-6 py-24 text-slate-800 md:py-32">
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <AnimatedOnScroll staggerIndex={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {kicker}
              </p>
            </AnimatedOnScroll>
          )}
          <AnimatedOnScroll staggerIndex={kicker ? 1 : 0}>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {label}
            </h2>
          </AnimatedOnScroll>
          {description ? (
            <AnimatedOnScroll staggerIndex={kicker ? 2 : 1}>
              {description}
            </AnimatedOnScroll>
          ) : (
            <AnimatedOnScroll staggerIndex={kicker ? 2 : 1}>
              <p className="text-base text-muted-foreground md:text-lg">
                {/* Placeholder text to be replaced later */}
                This is placeholder copy for the {label.toLowerCase()} section.
                You can replace this with your own content, visuals, and calls to
                action.
              </p>
            </AnimatedOnScroll>
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
    name: "Wealth Management System and Mobile App",
    description:
      "A comprehensive platform designed to help financial institutions and advisors manage client investments, portfolios, and financial planning activities efficiently. It provides real-time insights, portfolio tracking, and reporting tools, while the integrated mobile app enables secure access to portfolio updates and investment information anytime, anywhere.",
  },
  {
    slug: "equity-management",
    name: "Equity Management System",
    description:
      "A powerful solution for managing equity portfolios, tracking stock market transactions, and monitoring investment performance. It enables investment firms and financial professionals to analyze market data, manage trading activities, and maintain detailed records of equity investments.",
  },
  {
    slug: "treasury-management",
    name: "Integrated Treasury Management System",
    description:
      "An advanced system designed to help organizations manage internal treasury operations, including cash flow monitoring, liquidity management, and financial risk analysis. It provides centralized visibility into financial resources and supports effective treasury decision-making.",
  },
  {
    slug: "mobile-app",
    name:
      "Financial Report Generating System (Profit and Loss Statement Generating and Other Reports)",
    description:
      "A reporting solution that automates financial report generation, including profit and loss statements and other key financial reports. It helps organizations produce accurate reports faster, improve visibility into performance, and support better financial decision-making.",
  },
];

/** Green gradient back nav — matches Book Consultation CTA on light subpages */
const backNavGreenButtonClassName =
  "mb-4 border-0 bg-gradient-to-r from-[#79C72C] to-[#4c9141] text-white shadow-[0_3px_14px_rgba(121,199,44,0.35)] transition-[filter,transform,box-shadow] hover:brightness-105 hover:bg-gradient-to-r hover:from-[#79C72C] hover:to-[#4c9141] hover:shadow-[0_6px_20px_rgba(121,199,44,0.4)] focus-visible:ring-primary/50 active:scale-[0.98] md:h-9";

export const App: React.FC = () => {
  const [view, setView] = useState<
    "home" | "primary" | "secondary" | "contact" | "product-detail"
  >("home");
  const [productSlug, setProductSlug] = useState<ProductSlug | null>(null);
  const [backendStatus, setBackendStatus] = useState<
    "unknown" | "connected" | "not_connected"
  >("unknown");
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] =
    useState(false);
  const [consultationForm, setConsultationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
  const [consultationSubmitting, setConsultationSubmitting] = useState(false);
  const [consultationResult, setConsultationResult] = useState<
    "none" | "success" | "invalid" | "duplicate"
  >("none");

  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [activeMobileScreenshotIndex, setActiveMobileScreenshotIndex] = useState(0);

  const lastScrollY = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const SCROLL_TOP_REVEAL_AFTER = 240;

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;
      if (y < SCROLL_TOP_REVEAL_AFTER) {
        setShowScrollTop(false);
        return;
      }
      if (y < prev) {
        setShowScrollTop(true);
      } else if (y > prev) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scrollToTopViews = ["product-detail", "contact", "primary", "secondary"];
    if (scrollToTopViews.includes(view)) {
      window.scrollTo(0, 0);
    }
  }, [view, productSlug]);

  // When switching between products, start the screenshot carousel from the first image.
  useEffect(() => {
    setActiveScreenshotIndex(0);
    setActiveMobileScreenshotIndex(0);
  }, [productSlug]);

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
        className="home-hero scroll-mt-32 flex min-h-screen flex-col border-b border-border/40 pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]"
      >
        <HomeHeroThreeBackground />
        <div className="home-hero__content mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-7 text-center md:text-left">
            <AnimatedOnScroll staggerIndex={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300/95">
                Digital experience
              </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={1}>
              <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-sm md:text-6xl md:leading-[1.08]">
                Building Smart Software for a{" "}
                <span className="bg-gradient-to-r from-emerald-200 via-primary to-lime-200 bg-clip-text text-transparent">
                  Digital Future
                </span>
              </h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={2}>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-300/95 md:mx-0 md:text-lg">
                Sherwood Technologies builds innovative software solutions for financial institutions and businesses. Our expertise in fintech platforms, mobile applications, and enterprise systems helps organizations manage investments, optimize treasury operations, and deliver modern digital services.
              </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={3}>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button size="lg" onClick={() => setView("primary")}>
                  Primary action
                </Button>
              </div>
            </AnimatedOnScroll>
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
              <div className="card-interactive group cursor-default rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <div className="mb-4 h-10 w-10 rounded-2xl bg-primary/20 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.08] group-hover:bg-primary/30" />
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
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <AnimatedOnScroll key={product.slug} staggerIndex={index}>
              <div className="group flex h-full cursor-default flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0 md:flex-row">
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

      <TechRail />

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
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {CLIENT_LOGOS.map((logo, index) => (
            <AnimatedOnScroll key={index} staggerIndex={index}>
              <div className="flex h-28 items-center justify-center rounded-2xl bg-slate-50/80 px-4 py-6 shadow-sm md:h-32">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={
                    "max-h-12 w-full max-w-[220px] object-contain md:max-h-14 " +
                    (logo.logoClassName ?? "")
                  }
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </Section>

      <Section
        id="about"
        label="About us"
        kicker="Who are we"
        variant="white"
        description={
          <p className="text-base text-muted-foreground md:text-lg">
            At Sherwood Technologies, our people are the heart of everything we
            create. Led by experienced visionaries like our Lead Partner and
            Executive Director, we&apos;re a team of passionate innovators
            dedicated to transforming bold ideas into powerful digital realities.
            Together, we don&apos;t just build websites — we build lasting
            partnerships, one breakthrough at a time.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="group relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/80 p-7 shadow-md backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-400/25 blur-2xl transition-opacity group-hover:opacity-80"
              />    
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-600/25" />
                  <h3 className="text-base font-semibold text-emerald-950">
                    Contact us
                  </h3>
                </div>
                <p className="text-sm text-emerald-950/80">
                  Reach out for consultations, project inquiries, or product
                  demos. We’ll connect you with the right team quickly.
                </p>
                <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-white/60 px-4 py-3">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setView("contact")}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={1}>
            <div className="group relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/80 p-7 shadow-md backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-2xl transition-opacity group-hover:opacity-80"
              />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-600/25" />
                  <h3 className="text-base font-semibold text-emerald-950">
                    Location
                  </h3>
                </div>
                <p className="text-sm text-emerald-950/80">
                  Visit our office or schedule a meeting. We also support remote
                  engagements across regions.
                </p>
                <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-white/60 px-4 py-3 text-sm text-emerald-950/80">
                  <p className="font-medium text-emerald-950">Head office</p>
                  <p className="mt-1">
                    Add your address here (street, city, country)
                  </p>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={2}>
            <div className="group relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/80 p-7 shadow-md backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-emerald-300/25 blur-2xl transition-opacity group-hover:opacity-80"
              />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-600/25" />
                  <h3 className="text-base font-semibold text-emerald-950">
                    Team members
                  </h3>
                </div>
                <p className="text-sm text-emerald-950/80">
                  A cross-functional group of engineers and finance specialists
                  building secure, scalable digital products.
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    { name: "Lead Partner", role: "Executive Director" },
                    { name: "Engineering", role: "Platform & Mobile" },
                    { name: "Advisory", role: "Finance & Treasury" },
                  ].map((person) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between rounded-2xl border border-emerald-200/70 bg-white/60 px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-emerald-950">
                        {person.name}
                      </span>
                      <span className="text-emerald-950/70">{person.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedOnScroll>
        </div>
      </Section>
    </>
  );

  const renderPrimaryPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
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
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
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
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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

  const handleConsultationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setConsultationResult("none");
    setConsultationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsultationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setConsultationResult("none");

    if (
      !consultationForm.firstName.trim() ||
      !consultationForm.lastName.trim() ||
      !consultationForm.email.trim() ||
      !consultationForm.contactNumber.trim()
    ) {
      setConsultationResult("invalid");
      return;
    }

    setConsultationSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: consultationForm.firstName.trim(),
          lastName: consultationForm.lastName.trim(),
          email: consultationForm.email.trim(),
          contactNumber: consultationForm.contactNumber.trim(),
        }),
      });

      if (res.ok) {
        setConsultationResult("success");
        setConsultationForm({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
        });
        return;
      }

      if (res.status === 409) {
        setConsultationResult("duplicate");
        return;
      }

      setConsultationResult("invalid");
    } catch {
      setConsultationResult("invalid");
    } finally {
      setConsultationSubmitting(false);
    }
  };

  const renderContactPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
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
          <div className="mt-6 max-w-2xl space-y-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              To book a free consultation session
            </p>
            <p className="text-sm text-slate-700">
              Share a few basic details so we can prepare for our discussion and
              connect you with the right team member.
            </p>
            <Dialog
              open={isConsultationDialogOpen}
              onOpenChange={(open) => {
                setIsConsultationDialogOpen(open);
                if (!open) {
                  setConsultationResult("none");
                }
              }}
            >
              <DialogTrigger asChild>
                <Button size="lg" className="mt-2 w-fit">
                  Sign in to book a consultation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a free consultation</DialogTitle>
                  <DialogDescription>
                    Please provide your contact details and we will reach out to
                    confirm a convenient time for your session.
                  </DialogDescription>
                  {consultationResult === "success" && (
                    <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      Thank you. Your details have been saved and we will contact
                      you shortly to schedule your consultation.
                    </div>
                  )}
                  {consultationResult === "invalid" && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      Please check that all fields are filled in correctly and
                      try again.
                    </div>
                  )}
                  {consultationResult === "duplicate" && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                      These details are already registered. If you need to update
                      your information, please contact us directly.
                    </div>
                  )}
                </DialogHeader>
                <form
                  className="mt-4 space-y-4"
                  onSubmit={handleConsultationSubmit}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="consultation-first-name"
                        className="text-sm font-medium text-slate-800"
                      >
                        First name
                      </label>
                      <input
                        id="consultation-first-name"
                        name="firstName"
                        type="text"
                        value={consultationForm.firstName}
                        onChange={handleConsultationChange}
                        className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="consultation-last-name"
                        className="text-sm font-medium text-slate-800"
                      >
                        Last name
                      </label>
                      <input
                        id="consultation-last-name"
                        name="lastName"
                        type="text"
                        value={consultationForm.lastName}
                        onChange={handleConsultationChange}
                        className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="consultation-email"
                      className="text-sm font-medium text-slate-800"
                    >
                      Email address
                    </label>
                    <input
                      id="consultation-email"
                      name="email"
                      type="email"
                      value={consultationForm.email}
                      onChange={handleConsultationChange}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="consultation-contact-number"
                      className="text-sm font-medium text-slate-800"
                    >
                      Contact number
                    </label>
                    <input
                      id="consultation-contact-number"
                      name="contactNumber"
                      type="tel"
                      value={consultationForm.contactNumber}
                      onChange={handleConsultationChange}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="Include country code if applicable"
                    />
                  </div>
                  <div className="mt-2 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsConsultationDialogOpen(false);
                        setConsultationResult("none");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={consultationSubmitting}
                    >
                      {consultationSubmitting
                        ? "Submitting..."
                        : "Confirm booking"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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

    const renderScreenshotsLayout = () => {
      const slideLabels = [
        "Screenshot 1",
        "Screenshot 2",
        "Screenshot 3",
        "Screenshot 4",
      ];

      const desktopSlideCount = slideLabels.length;
      const mobileSlideCount = slideLabels.length;
      const showMobileDevice = product.slug === "wealth-management";

      return (
        <div className="mt-4 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Screenshots
          </p>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            Explore a preview of the {product.name} interface inside a responsive desktop-style frame. These can be replaced later with real captures from your deployment.
          </p>

          <div className={"screenshot-devices " + (showMobileDevice ? "screenshot-devices--with-phone" : "")}>
            <div className="screenshot-laptop-wrapper">
              <div className="screenshot-laptop-body">
                <div className="screenshot-laptop-bezel">
                  <div className="screenshot-laptop-notch">
                    <div className="screenshot-laptop-notch-camera" />
                  </div>
                  <div className="screenshot-laptop-screen">
                    <div
                      className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transform: `translateX(-${(activeScreenshotIndex % desktopSlideCount) * 100}%)`,
                      }}
                    >
                      {slideLabels.map((label, index) => (
                        <div key={label + index} className="min-w-full h-full">
                          <div className="flex h-full w-full flex-col items-center justify-center bg-white px-6 text-center text-slate-900">
                            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                              {label}
                            </div>
                            <div className="mt-2 text-lg font-semibold text-slate-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="screenshot-laptop-base" />
              </div>

              <button
                type="button"
                className="screenshot-nav-btn screenshot-nav-btn-left"
                onClick={() =>
                  setActiveScreenshotIndex((prev) =>
                    prev === 0 ? desktopSlideCount - 1 : prev - 1,
                  )
                }
              >
                <span className="sr-only">Previous screenshot</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                className="screenshot-nav-btn screenshot-nav-btn-right"
                onClick={() =>
                  setActiveScreenshotIndex((prev) =>
                    prev === desktopSlideCount - 1 ? 0 : prev + 1,
                  )
                }
              >
                <span className="sr-only">Next screenshot</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="pointer-events-none mt-4 flex justify-center gap-2">
                {Array.from({ length: desktopSlideCount }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      "h-1.5 w-3 rounded-full transition-colors " +
                      (index === (activeScreenshotIndex % desktopSlideCount)
                        ? "bg-primary"
                        : "bg-slate-400/60")
                    }
                  />
                ))}
              </div>
            </div>

            {showMobileDevice && (
              <div className="screenshot-phone-wrapper" aria-label="Mobile screenshots preview">
                <div className="screenshot-phone-body">
                  <div className="screenshot-phone-notch" aria-hidden="true">
                    <div className="screenshot-phone-notch-camera" />
                  </div>
                  <div className="screenshot-phone-screen">
                    <div
                      className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transform: `translateX(-${(activeMobileScreenshotIndex % mobileSlideCount) * 100}%)`,
                      }}
                    >
                      {slideLabels.map((label, index) => (
                        <div key={label + index} className="min-w-full h-full">
                          <div className="flex h-full w-full flex-col items-center justify-center bg-white px-5 text-center text-slate-900">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                              {label}
                            </div>
                            <div className="mt-2 text-base font-semibold text-slate-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="screenshot-phone-nav-btn screenshot-phone-nav-btn-left"
                    onClick={() =>
                      setActiveMobileScreenshotIndex((prev) =>
                        prev === 0 ? mobileSlideCount - 1 : prev - 1,
                      )
                    }
                  >
                    <span className="sr-only">Previous mobile screenshot</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="screenshot-phone-nav-btn screenshot-phone-nav-btn-right"
                    onClick={() =>
                      setActiveMobileScreenshotIndex((prev) =>
                        prev === mobileSlideCount - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    <span className="sr-only">Next mobile screenshot</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
          <div className="space-y-4">
            <Button
              variant="default"
              size="sm"
              className={backNavGreenButtonClassName}
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
              <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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
              <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
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

          {renderScreenshotsLayout()}
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
    <div className="min-h-screen bg-background text-slate-900">
      <Header
        variant={view === "home" ? "default" : "light"}
        onBookConsultation={() => setView("contact")}
        onNavigateSection={handleNavigateSection}
      />
      <main className="relative">
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

      <div
        className={
          "fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 " +
          "transition-all duration-300 ease-out motion-reduce:transition-none " +
          (showScrollTop
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0")
        }
        aria-hidden={!showScrollTop}
      >
        <Button
          type="button"
          variant="default"
          className="h-12 w-12 min-w-[3rem] rounded-full p-0 shadow-lg shadow-primary/25 ring-2 ring-primary/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};



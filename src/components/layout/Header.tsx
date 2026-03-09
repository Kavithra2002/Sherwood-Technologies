import React from "react";
import { Button } from "../ui/button";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "clients", label: "Clients" },
  { id: "about", label: "About us" },
];

export const Header: React.FC = () => {
  const [active, setActive] = React.useState<string>("home");

  React.useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = section.id;
          break;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold shadow-soft-xl">
            AM
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium tracking-wide text-muted-foreground">
              AMBEON
            </span>
            <span className="text-xs text-muted-foreground">
              Modern digital experiences
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-2 py-1 text-xs font-medium text-muted-foreground shadow-soft-xl md:flex">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={[
                "relative rounded-full px-4 py-1.5 transition-colors",
                active === item.id
                  ? "bg-primary/90 text-primary-foreground"
                  : "hover:bg-secondary/90 hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get in touch</Button>
        </div>
      </div>
    </header>
  );
};


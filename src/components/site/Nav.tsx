import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { LocaleBar } from "./LocaleBar";
import { ThemeToggle } from "./ThemeToggle";
import lssIconBlack from "@/assets/lss-icon-black.png.asset.json";
import lssIconWhite from "@/assets/lss-icon-white.png.asset.json";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "About" },
  { to: "/stockists", label: "Stockists" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-background/80 backdrop-blur-md md:bg-background/0 md:backdrop-blur-none">
      <div className="flex items-center justify-between gap-4 px-6 py-6 md:px-10 md:py-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 text-eyebrow link-melt text-foreground"
          aria-label="Lost Souls Society"
        >
          <img
            src={lssIconBlack.url}
            alt=""
            className="h-9 w-auto block dark:hidden"
            aria-hidden="true"
          />
          <img
            src={lssIconWhite.url}
            alt=""
            className="h-9 w-auto hidden dark:block"
            aria-hidden="true"
          />
          <span className="whitespace-pre-line">LSS</span>
        </Link>

        <div className="hidden gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-eyebrow link-melt text-foreground"
              activeProps={{ className: "text-eyebrow link-melt text-foreground underline underline-offset-4" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:flex md:items-center md:gap-5">
            <LocaleBar />
            <ThemeToggle />
          </div>
          <button
            onClick={open}
            className="text-eyebrow link-melt text-foreground"
            aria-label="Cart"
          >
            Cart ({count})
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-eyebrow link-melt text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-eyebrow link-melt text-foreground"
                activeProps={{ className: "text-eyebrow link-melt text-foreground underline underline-offset-4" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-5 pt-4 border-t border-border">
              <LocaleBar />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

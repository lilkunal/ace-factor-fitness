import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BRAND, phoneLink, whatsappLink } from "../data/site";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/plans", label: "Plans", end: false },
  { to: "/coaches", label: "Coaches", end: false },
  { to: "/gallery", label: "Gallery", end: false },
  { to: "/wellness", label: "Wellness", end: false },
  { to: "/contact", label: "Contact", end: false },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link text-xs font-semibold tracking-wide uppercase transition-colors ${
    isActive ? "nav-link-active text-volt" : "text-zinc-400 hover:text-volt"
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link block min-h-[44px] py-3 font-semibold tracking-wide uppercase ${
    isActive ? "nav-link-active text-volt" : "text-zinc-400 hover:text-volt"
  }`;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full border-b-2 border-volt/15 bg-charcoal/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/assets/logo.svg" alt="" className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-display text-xl leading-tight text-white sm:text-2xl">
              ACE FACTOR
            </p>
            <p className="truncate text-[10px] font-bold tracking-[0.3em] text-volt uppercase sm:text-xs">
              Fitness
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={phoneLink()}
            className="btn-ghost hidden min-h-[44px] items-center rounded-sm border-2 border-volt/40 px-5 py-2 text-sm font-bold tracking-wide text-volt uppercase sm:inline-flex"
          >
            Call Now
          </a>
          <Link
            to="/plans"
            className="btn-power btn-sm hidden min-h-[44px] items-center md:inline-flex"
          >
            Join Now
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-white xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t-2 border-volt/15 bg-charcoal-light px-4 py-4 xl:hidden" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={mobileNavClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={phoneLink()}
              className="btn-ghost flex min-h-[48px] items-center justify-center text-sm font-bold tracking-wide text-volt uppercase"
            >
              {BRAND.phone}
            </a>
            <a
              href={whatsappLink("Hi! I'd like to join Ace Factor Fitness.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-power flex min-h-[48px] items-center justify-center text-sm font-bold tracking-wide uppercase"
            >
              Join via WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

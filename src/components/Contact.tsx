import { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND, phoneLink, whatsappLink } from "../data/site";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const message = String(form.get("message") ?? "");
    window.open(whatsappLink(`Hi! I'm ${name}. ${message}`), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative border-t border-volt/10 bg-charcoal-light py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="reveal font-display text-6xl text-white md:text-7xl">TALK TO US</h2>

            <ul className="reveal mt-8 space-y-4">
              <li>
                <a href={phoneLink()} className="flex items-center gap-3 text-zinc-300 hover:text-volt">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-volt/30 bg-volt/10 text-volt">
                    📞
                  </span>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-volt"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-volt/30 bg-volt/10 text-volt">
                    📷
                  </span>
                  {BRAND.instagramHandle}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-volt/30 bg-volt/10 text-volt">
                  📍
                </span>
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="reveal glass-card rounded-sm p-6 md:p-8">
            <input
              name="name"
              required
              className="w-full rounded-sm border border-volt/20 bg-charcoal px-4 py-3 text-white outline-none focus:border-volt"
              placeholder="Name"
            />
            <textarea
              name="message"
              required
              rows={3}
              className="mt-4 w-full resize-none rounded-sm border border-volt/20 bg-charcoal px-4 py-3 text-white outline-none focus:border-volt"
              placeholder="Message"
            />
            <button type="submit" className="btn-power mt-6 w-full">
              WhatsApp →
            </button>
            {submitted && (
              <p className="mt-3 text-center text-xs text-volt">Opened WhatsApp — hit send!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Plans" },
  { to: "/coaches", label: "Coaches" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/wellness", label: "Wellness" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-volt/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-6 md:text-left">
        <p className="font-display text-lg text-white">ACE FACTOR FITNESS</p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-zinc-500">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-volt">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 text-sm text-zinc-500">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
            Instagram
          </a>
          <a href={BRAND.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
            Maps
          </a>
          <a href={phoneLink()} className="hover:text-volt">
            {BRAND.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi! I want to join Ace Factor Fitness.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl shadow-lg transition hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 sm:text-2xl"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}

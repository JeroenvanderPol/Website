"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
const links = [
  ["/#diensten", "Diensten"],
  ["/#portfolio", "Ons werk"],
  ["/#reviews", "Reviews"],
  ["/#over-ons", "Over ons"],
];
export function Header() {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Naar de inhoud
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <div className="shell header-row ">
          <Link
            href="/"
            className="brand-logo"
            aria-label="Van de Voort Tuinen — home"
          >
            <Image
              src="/images/original-site/logo.png"
              alt="Van de Voort Tuinen"
              fill
              priority
              sizes="220px"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            {links.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a
              href="tel:+31683259762"
              className="header-phone"
              aria-label="Bel direct: 06 83 25 97 62"
            >
              <Phone size={19} />
            </a>
            <Button asChild>
              <Link href="/#contact">Offerte aanvragen</Link>
            </Button>
            <button
              ref={toggleRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav shell"
            aria-label="Mobiele navigatie"
          >
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

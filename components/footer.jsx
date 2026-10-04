"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SocialLinks from "@/components/social-links";

const footerLinks = [
  { label: "About us", href: "/#aboutUs" },
  { label: "The movie", href: "/#aboutthemovie" },
  { label: "Cast", href: "/#cast" },
  { label: "Behind the scenes", href: "/bts" },
  { label: "Donate", href: "/donate" },
  { label: "Get tickets", href: "/payments" },
];

export default function Footer() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm font-black uppercase tracking-[0.2em] text-white">
            Beautiful Feet <span className="text-yellow-400">/</span> CAP Studios
          </Link>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60 sm:justify-end">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-yellow-300">
                  {link.label}
                </Link>
              ))}
            </nav>

            <SocialLinks className="flex items-center gap-2" />
          </div>
        </div>

        <p className="mt-6 border-t border-white/10 pt-5 text-xs text-white/40">
          © <span suppressHydrationWarning>{year}</span> CAP Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
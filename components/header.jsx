"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { LuTicket } from "react-icons/lu";

import SocialLinks from "@/components/social-links";
import logo from "@/public/assets/beautiful feet logo resized.jpg";

const links = [
  { label: "About us", path: "#aboutUs" },
  { label: "About The Movie", path: "#aboutthemovie" },
  { label: "Cast", path: "#cast" },
  { label: "BTS", path: "/bts" },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className={`w-full px-4 pt-4 transition-all duration-700 sm:px-6 lg:px-8 ${isVisible ? "bg-black/30 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="flex w-full items-center justify-between py-3">
          <Link href="/" className="relative z-10 flex items-center" aria-label="Beautiful Feet home">
            <Image src={logo} alt="Beautiful Feet" width={120} height={52} className="h-auto w-20 sm:w-24" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
            {links.map((link) => (
              <Link key={link.label} href={link.path} className="transition hover:text-yellow-400">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 border border-yellow-500/40 bg-yellow-500/10 px-4 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20"
            >
              Give to missions
            </Link>

            <Link
              href="/payments"
              className="inline-flex items-center gap-2 bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-yellow-400"
            >
              Get Tickets
              <LuTicket size={18} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        <SocialLinks className="flex items-center justify-end gap-2 pb-2" />

        {menuOpen && (
          <div className="mt-3 border border-white/10 bg-black/65 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium text-white/90">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/donate"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 border border-yellow-500/40 bg-yellow-500/10 px-4 py-2.5 font-semibold text-yellow-300"
              >
                Donate
              </Link>

              <Link
                href="/payments"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-4 py-2.5 font-semibold text-[#111111]"
              >
                Get Tickets
                <LuTicket size={18} />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import Header from "@/components/header";

const stills = [
  "IMG-20260204-WA0075.jpg",
  "IMG-20260207-WA0055.jpg",
  "IMG-20260215-WA0076.jpg",
  "IMG-20260309-WA0006.jpg",
  "IMG-20260309-WA0012.jpg",
  "IMG-20260309-WA0015.jpg",
  "IMG-20260309-WA0025.jpg",
  "IMG-20260309-WA0026.jpg",
  "IMG-20260309-WA0030.jpg",
  "IMG-20260309-WA0033.jpg",
  "IMG-20260309-WA0040.jpg",
  "IMG_20260204_140112.jpg",
  "IMG_20260204_163148.jpg",
  "IMG_20260204_163158.jpg",
  "IMG_20260205_094412.jpg",
  "IMG_20260205_105232.jpg",
  "IMG_20260205_124643.jpg",
  "IMG_20260205_124727.jpg",
  "IMG_20260205_125252.jpg",
  "IMG_20260205_131443.jpg",
  "IMG_20260206_160401.jpg",
  "IMG_20260206_160905.jpg",
  "IMG_20260206_165032.jpg",
  "IMG_20260207_095410.jpg",
  "IMG_20260207_104500.jpg",
  "IMG_20260207_112047.jpg",
  "IMG_20260207_112339.jpg",
  "IMG_20260207_112752.jpg",
  "IMG_20260208_100503.jpg",
  "IMG_20260208_113537.jpg",
  "IMG_20260208_132814.jpg",
  "IMG_20260209_221029.jpg",
  "IMG_20260209_221038.jpg",
  "IMG_20260209_221040.jpg",
  "IMG_20260211_063231.jpg",
  "IMG_20260211_095636.jpg",
  "IMG_20260211_121917.jpg",
  "IMG_20260211_152353.jpg",
  "IMG_20260213_103559.jpg",
  "IMG_20260213_112122.jpg",
].map((filename, index) => ({
  filename,
  src: `/assets/bts/${encodeURIComponent(filename)}`,
  frame: String(index + 1).padStart(2, "0"),
  alt: `Behind-the-scenes production still ${index + 1} from Beautiful Feet`,
}));

const crew = [
  { role: "Producer", names: ["Austin Awulonu"] },
  { role: "Director of Photography", names: ["KUNLE ADEPOJU"] },
  { role: "Camera Operators", names: ["KUNLE ADEPOJU", "ISREAL ADESOYE"] },
  { role: "Drone Pilot", names: ["ISREAL ADESOYE"] },
  { role: "Assistant Director", names: ["FRANCIS OKOLIE"] },
  { role: "Production Manager", names: ["IFEOLUWA OYEDUNMADE"] },
  { role: "Editor", names: ["CHIDOZIE NNODIM"] },
  { role: "Music Supervisor & Scoring", names: ["GLORY WILLIAMS"] },
];

export default function BtsPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % stills.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + stills.length) % stills.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + stills.length) % stills.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % stills.length);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
      <Header />

      <section className="relative border-b border-white/10 px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.12)_4px)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-14 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:text-yellow-400"
          >
            <FiArrowLeft aria-hidden="true" /> Back to Beautiful Feet
          </Link>

          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">
                <span className="h-px w-8 bg-yellow-500" /> Production journal
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                The Journey
                <br />
                <span className="text-yellow-400">Behind Beautiful Feet</span>
              </h1>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300 sm:text-sm">
                A 30-Year Vision
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                Birthed in 1996 while writer/director Chim Onyebilanma was serving as a missionary in Northern Nigeria,
                <em> Beautiful Feet</em> is inspired by the gripping real-life stories of pioneer missionaries. The movie’s
                journey is further blessed by the gracious partnership of Pastor Nathaniel Bassey.
              </p>
            </div>

            <a
              href="#journey"
              className="group inline-flex w-fit items-center gap-3 border-b border-yellow-500/50 pb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300 transition hover:border-yellow-300"
            >
              Read the journey
              <FiArrowDown className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="journey" aria-labelledby="faith-title" className="border-b border-white/10 bg-[#111111] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
          <div className="border-l border-yellow-500/60 pl-5 sm:pl-7">
            <h2 id="faith-title" className="mb-3 text-lg font-bold uppercase tracking-wide text-white sm:text-xl">Faith Through Fire</h2>
              <p>
                To authentically capture the Northern landscape amid regional insecurity, the team filmed in the Sahel
                region of Northern Togo. Production faced extreme trials when local military mistook a controlled
                burning-hut scene for a security threat, resulting in the cast and crew being detained for three days.
              </p>
          </div>

          <p>
            Emerging with deeper faith and supernatural unity, the team finished filming in record time.
            <em> Beautiful Feet</em> is a testimony of resilience, faith, and a crew dedicated to sharing this story
            with the world.
          </p>
        </div>
      </section>

      <section id="stills" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-yellow-500">On set</p>
              <h2 className="text-2xl font-bold uppercase text-white sm:text-3xl">The production, in frames</h2>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {stills.length} stills <span className="px-2 text-yellow-500">/</span> Beautiful Feet
            </p>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {stills.map((still, index) => (
              <figure
                key={still.filename}
                className="bts-still-reveal mb-4 break-inside-avoid"
                style={{ animationDelay: `${(index % 9) * 75}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open production still ${still.frame}`}
                  className="group relative block w-full overflow-hidden border border-white/10 bg-[#141414] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                >
                  <img
                    src={still.src}
                    alt={still.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/80">
                    <span>Beautiful Feet</span>
                    <span className="text-yellow-300">BTS {still.frame}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:p-4">
                    <span>Behind the scenes</span>
                    <span className="h-5 w-5 border border-white/50 text-center leading-[18px] transition group-hover:border-yellow-400 group-hover:text-yellow-300">+</span>
                  </span>
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111111] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">The people behind the picture</p>
              <h2 className="text-3xl font-black uppercase leading-tight sm:text-4xl">Meet the crew</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 md:justify-self-end">
              Every frame is a team effort. These are the crew members who helped shape the world of Beautiful Feet.
            </p>
          </div>

          <div className="border-t border-white/15">
            {crew.map((member, index) => (
              <div
                key={member.role}
                className="bts-credit-reveal grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-center sm:py-6"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-yellow-500 sm:text-xs">
                  {member.role}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {member.names.map((name) => (
                    <p key={name} className="text-lg font-bold uppercase tracking-[0.04em] text-white sm:text-xl">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Production still viewer"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/20 text-white transition hover:border-yellow-400 hover:text-yellow-300 sm:right-8 sm:top-8"
          >
            <FiX size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/40 text-white transition hover:border-yellow-400 hover:text-yellow-300 sm:left-8"
          >
            <FiArrowLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex max-h-full max-w-6xl flex-col items-center gap-4">
            <img
              src={stills[activeIndex].src}
              alt={stills[activeIndex].alt}
              className="max-h-[78vh] max-w-full object-contain"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Beautiful Feet <span className="px-2 text-yellow-500">/</span> BTS {stills[activeIndex].frame} of {stills.length}
            </p>
          </div>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/40 text-white transition hover:border-yellow-400 hover:text-yellow-300 sm:right-8"
          >
            <FiArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </main>
  );
}
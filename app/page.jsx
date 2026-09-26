"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import chim from "@/public/assets/chim.jpg"

const galleryImages = [
  "/assets/BF14.png",
  "/assets/BF15.png",
  "/assets/BF16.png",
  "/assets/BF17.png",
  "/assets/BF18.png",
  "/assets/BF19.png",
];

export default function Home() {
  const aboutHeadingRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const node = aboutHeadingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <Header />
      <Hero />

      <section id="aboutUs" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1.9fr] md:items-start">
          <div ref={aboutHeadingRef} className="overflow-hidden">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">About us</p>
            <h2
              className={`text-3xl font-bold uppercase tracking-tight text-white transition-all duration-700 ease-out sm:text-4xl ${
                isAboutVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Produced by CAP Studios.
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <img
                src="/assets/BF21.png"
                alt="CAP Studios production still"
                className="h-[22rem] w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-lg text-white/75">
            <p>
              Beautiful Feet is produced by CAP Studios, a creative production company committed to telling powerful, culturally rooted stories with authenticity, purpose, and cinematic quality.
            </p>
            <p>
              CAP Studios brings together vision, craft, and storytelling discipline to create experiences that resonate beyond the screen. From concept development to final production, the studio focuses on narratives that speak to faith, identity, resilience, and the human journey.
            </p>
            <p>
              Through Beautiful Feet, CAP Studios continues its mission of delivering memorable storytelling that inspires audiences and celebrates the depth of African creativity.
            </p>
          </div>
        </div>
      </section>

      <section id="aboutthemovie" className="bg-[#111111] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">About the film</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">When a life is shaped by pain, what does it take to heal?</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5 text-lg text-white/75">
              <p>
                A polished doctor abandons a life of comfort and prestige to serve a remote village in Northern Nigeria, driven by a calling that goes beyond ambition and status. What begins as a quiet act of service soon becomes a test of character as she is forced to confront the brutal realities of power, survival, and sacrifice in a place where healing is often harder than simply treating the sick.
              </p>
              <p>
                As she settles into the village, she discovers that the community is locked in a tense and dangerous struggle against a corrupt local “big man” who rules through fear and manipulation, and a ruthless gang of kidnappers who prey on the vulnerable. In the middle of this storm, she must navigate treacherous politics, social pressure, and the moral cost of choosing to help those who need her most.
              </p>
              <p>
                Beautiful Feet is a gripping drama about purpose, resilience, and the human cost of doing good in a broken system. It asks a difficult question: how far is one willing to go when her calling demands more than compassion—it demands courage, conviction, and sometimes, a willingness to risk everything.
              </p>
              <p className="border-l border-yellow-500/60 pl-5 text-white/90 italic">
                “She must decide how far she’s willing to go in pursuit of her calling.”
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Content note</p>
                <p className="mt-4 text-base leading-relaxed text-white/80">
                  The film explores themes of sacrifice, corruption, community, and the moral burden of service in the face of danger.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <img
                  key={galleryImages[activeImageIndex]}
                  src={galleryImages[activeImageIndex]}
                  alt="Beautiful Feet visual"
                  className="h-72 w-full object-cover transition-opacity duration-700 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cast" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">The crew</p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              name: "Toke Morgan",
              intro: "A creative force behind the project, bringing vision, energy, and cultural perspective to the story.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/Tuke-Morgan-2.jpeg",
            },
            {
              name: "Nathaniel Bassey",
              intro: "Pastor Nathaniel Bassey, celebrated worship leader and gospel singer whose music carries spiritual depth and conviction.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/NATHANIEL-BASSEY-afrocharts-scaled.jpg",
            },
            {
              name: "Chidinma Umeh",
              intro: "A committed creative and storyteller known for her eye for detail, performance, and production excellence.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/CHIDINMA-UMEH.jpeg",
            },
            {
              name: "Seun Adejumobi",
              intro: "Bringing artistic direction, discipline, and strong creative instincts to the heart of the production.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/SEUN-ADEJUMOBI.jpeg",
            },
            {
              name: "Moromotikeitike",
              intro: "A creative contributor helping shape the production with intention, passion, and visual storytelling awareness.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/MOROMOTIKEITIKE.png",
            },
            {
              name: "Timmy Adesola",
              intro: "Adding vibrant creative energy and technical perspective to strengthen the film’s artistic expression.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/Timmy-Adesola-scaled.jpg",
            },
           
          ].map((person) => (
            <div key={person.name} className="group h-[22rem] perspective-[1200px]">
              <div className="relative h-full w-full rounded-2xl border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                  <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xl font-bold uppercase tracking-wide text-white">{person.name}</p>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-2xl border border-yellow-500/40 bg-[#111111]/95 p-5 text-left"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Profile</p>
                  <h4 className="text-xl font-bold uppercase tracking-wide text-white">{person.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{person.intro}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="missions" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_rgba(17,17,17,0.98),_rgba(27,27,27,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Give to missions</p>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                  Partner with the mission behind the story.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Your support helps bring this vision to life and empower the communities, stories, and values it represents. Every contribution helps advance a project rooted in purpose, impact, and transformation.
                </p>
                <p className="mt-8 text-yellow-400">50% of ticket sales are used to fund missions</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Mission impact</span>
                  <span className="rounded-full border border-yellow-400/40 bg-yellow-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-white/75">
                      <span>Community outreach</span>
                      <span>78%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-white/75">
                      <span>Storytelling support</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />
                    </div>
                  </div>
                </div>

                <a
                  href="/payments"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-[10px] text-center bg-yellow-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-yellow-400"
                >
                  Support the mission
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <img
              src="https://beautifulfeetmovie.com/wp-content/uploads/2026/07/IMG-20260309-WA0061.jpg"
              alt="Chim Onyebilanma"
              className="h-[28rem] w-full object-cover object-center"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Director spotlight</p>
            <h3 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Chim Onyebilanma</h3>

            <div className="mt-5 space-y-4 text-lg text-white/75">
              <p>
                Chim Onyebilanma is the host of <span className="font-semibold text-white">Chim’s Talk Africa</span>, a weekly television and radio platform created to help Christians across Africa engage current issues through a biblical, Christ-centered lens.
              </p>
              <p>
                A visionary producer, missionary, and media host, Chim is married to Ibi Onyebilanma, and together they have carried a long-running passion to see the vision of this platform come to life. After abandoning a career in engineering in 1995, he devoted himself to full-time cross-cultural missions and leadership with CAPRO Missions, with a strong focus on evangelism and social transformation across Africa.
              </p>
              <p>
                Through his teaching, commentary, and media work, Chim brings a rare blend of faith, leadership, and Pan-African awareness to conversations about nation-building, mission, and the role of the Church in shaping the future of the continent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
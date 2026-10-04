"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import chim from "@/public/assets/chim edited.png"

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
  const [missionForm, setMissionForm] = useState({
    name: "",
    email: "",
    phone: "",
    localChurchNameAndAddress: "",
    pastorName: "",
    calling: "",
  });
  const [missionStatus, setMissionStatus] = useState({ type: "idle", message: "" });
  const [isSubmittingMission, setIsSubmittingMission] = useState(false);

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

    

      <section id="aboutthemovie" className="bg-[#111111] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">About the film</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
WHEN THE CALL DEMANDS A SACRIFICE, HOW FAR WILL YOU GO?</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5 text-lg text-white/75">
             Beautiful Feet is a deeply moving story rooted in real-life experiences in the interiors of Northern Nigeria near the borders with Niger Republic. 

It follows a polished young female specialist doctor who abandons prosperous city prospects in Lagos to follow God's call into the unreached interiors. It authentically portrays human frailty and divine courage—showing her confront personal fears, navigate opposition from loved ones who feel she is "wasting her life," face kidnapping threats, and struggle to stand firm in her calling. 

Unapologetically bold, Beautiful Feet highlights the urgent task of reaching Muslim communities and asks the difficult question of how far we are willing to go to obey God’s calling when it means risking everything. 

The film stars renowned gospel minister Nathaniel Bassey in his debut acting role along with a stellar cast.


              <p className="border-l border-yellow-500/60 mt-4 pl-5 text-white/90 italic">
                “She must decide how far she’s willing to go in pursuit of her calling.”
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Content note</p>
                <p className="mt-4 text-base leading-relaxed text-white/80">
                  
Filmed in the arid villages of the Sahel as well as the beautiful city of Lagos, the movie has strong visuals - it’s a cinematic experience
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
           Beautiful Feet is produced by CAP Studios, a creative production company committed to telling powerful, Christ-centred, culturally rooted stories with authenticity, purpose, and cinematic quality.
Through Beautiful Feet, CAP Studios continues its mission of delivering memorable storytelling that inspires audiences and celebrates the depth of African creativity.
          </div>
        </div>
      </section>

      <section id="cast" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">The Cast</p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              name: "Tuke Morgan",
              intro: `Actor, Saxophonist, Photgrapher & Content Creator. Known for Live Music Performances as a Solo Artist or with her Talented Band at Birthday Parties, Weddings, Corporate Events & Social Functions like TEDxGbagada. She stars in web series The Wives (2025) & Visa on Arrival (2025)`,
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/Tuke-Morgan-2.jpeg",
            },
            {
              name: "Nathaniel Bassey",
              intro: " Pastor Nathaniel Bassey, is the globally celebrated worship leader and gospel singer whose music carries spiritual depth and conviction. This is his debut acting in any film",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/09/nathaniel.jpg",
            },
            {
              name: "Chidinma Umeh",
              intro: "ctor, creative performer and journalist. Beyond her screen appearances, she is recognized for her creative talents, storytelling, and contribution to digital and performance art.",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/CHIDINMA-UMEH.jpeg",
            },
            {name:"Kate Adepegba",
              image:"/assets/Kate adepegba.jpeg",
intro:"Actor and television veteran; known for The Figurine and Slum King."},
            {
              name: "Seun Adejumobi",
              intro: "Actor and filmmaker.. Famous for portraying Mike Bamiloye in Mount Zion’s hit The Train , his movie credits also include Abattoir, Exposed, Dark Corner, DNA, Wait, and Indelible",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/SEUN-ADEJUMOBI.jpeg",
            },
            {
              name: "Opadele Joseph",
              intro: "Actor, filmmaker, drama minister, and theatre practitioner with over two decades of experience in stage performance, teaching, and film production. His notable film and stage credits include Land of Fury, Shackles, Tales of Sharon, and The Plan",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/09/opadelejoseph.jpeg",
           },
            {
              name: "Moromoluwatiketike Abolaji-Adeola",
              intro: " Actor, voice artist, event compere, and Christian content creator. Known for her engaging digital storytelling and screen performances. Her film credits include: The Corridor, The JAR, 30 Pieces",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/08/MOROMOTIKEITIKE.png",
            },
            {
              name: "Timmy Adebola",
              intro: "Actor and creative professional. He is best known for his roles in notable screen productions, including  She Builds, ROT and Holy Scamtrimony",
              image: "https://beautifulfeetmovie.com/wp-content/uploads/2026/09/tmmy-adebola.jpeg",
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
                  WATCH THE MOVIE, SEND A MISSIONARY
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                 There are still over 3 billion people in the world who have not heard the Gospel. Let’s change that! We want to use Beautiful Feet to raise funds for frontier missionaries. <b className="text-white italic "> 50% of all incomes and gifts to this project will be sent to a missionary in the field among the unreached.</b> And we will send you the names of the missionaries your gift is supporting if you want to pray for them. Give now to help us reach the remaining unreached peoples of Africa and beyond.
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
                  href="/donate"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-[10px] text-center bg-yellow-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-yellow-400"
                >
                  Support the mission
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-yellow-500/20 bg-[#171717] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Go for missions</p>
            <h3 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              DO YOU FEEL THE MISSIONARY CALL?
            </h3>
            <p className="mt-4 text-lg italic text-yellow-300">
              “The harvest truly is plenteous, but the labourers are few;”
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
              — Matthew 9:37 (KJV)
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
              Complete the form below if you feel God calling you to go as a missionary either long term or short term. We will connect you with mission agencies to help you fulfill God’s calling.
            </p>
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setMissionStatus({ type: "idle", message: "" });

              const requiredFields = [
                "name",
                "email",
                "phone",
                "localChurchNameAndAddress",
                "pastorName",
                "calling",
              ];

              const hasEmptyField = requiredFields.some((field) => !String(missionForm[field]).trim());
              if (hasEmptyField) {
                setMissionStatus({ type: "error", message: "Please complete all fields before submitting." });
                return;
              }

              setIsSubmittingMission(true);

              try {
                const response = await fetch("/api/mission", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(missionForm),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || "Unable to submit the form.");
                }

                setMissionForm({
                  name: "",
                  email: "",
                  phone: "",
                  localChurchNameAndAddress: "",
                  pastorName: "",
                  calling: "",
                });
                setMissionStatus({ type: "success", message: "Your response has been submitted successfully." });
              } catch (error) {
                setMissionStatus({ type: "error", message: error.message || "Something went wrong while submitting." });
              } finally {
                setIsSubmittingMission(false);
              }
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">Name</label>
              <input
                type="text"
                value={missionForm.name}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">Email</label>
              <input
                type="email"
                value={missionForm.email}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Your email address"
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">Phone</label>
              <input
                type="tel"
                value={missionForm.phone}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, phone: event.target.value }))}
                placeholder="Your phone number"
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">Local church name and address</label>
              <input
                type="text"
                value={missionForm.localChurchNameAndAddress}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, localChurchNameAndAddress: event.target.value }))}
                placeholder="Church name and address"
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">Your pastor</label>
              <input
                type="text"
                value={missionForm.pastorName}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, pastorName: event.target.value }))}
                placeholder="Pastor's name"
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">What do you sense God is calling you to do?</label>
              <textarea
                rows="5"
                value={missionForm.calling}
                onChange={(event) => setMissionForm((prev) => ({ ...prev, calling: event.target.value }))}
                placeholder="Share how you feel God is leading you."
                className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            {missionStatus.message ? (
              <div className={`md:col-span-2 rounded-xl border px-4 py-3 text-sm ${missionStatus.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-200" : "border-red-500/30 bg-red-500/10 text-red-200"}`}>
                {missionStatus.message}
              </div>
            ) : null}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmittingMission}
                className="inline-flex items-center justify-center rounded-[10px] bg-yellow-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmittingMission ? "Submitting..." : "Submit my response"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-[#111111] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <img
              src="https://beautifulfeetmovie.com/wp-content/uploads/2026/09/chim-edited.png"
              alt="Chim Onyebilanma"
              className="h-[28rem] w-full object-cover object-center"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Director spotlight</p>
            <h3 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Chim Onyebilanma</h3>

            <div className="mt-5 space-y-4 text-lg text-white/75">
              <p>
              Chim Onyebilanma is an award-winning filmmaker, director, and producer of TREASURE HUNT, which premiered at the Oscar-qualifying American Black Film Festival in Miami and screened in South African cinemas in 2025.
A veteran missionary dedicated to reaching unreached peoples across Africa and beyond, Chim served as a leader with CAPRO for over 30 years.
This story is deeply personal, drawing from real-life experiences he and his team have faced over the past three decades.
              </p>
            
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
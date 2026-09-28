"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const releaseDate = new Date("2027-02-19T00:00:00");
  const [isMinimumDelayComplete, setIsMinimumDelayComplete] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMinimumDelayComplete(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoReady && isMinimumDelayComplete) {
      const revealTimer = window.setTimeout(() => setShowVideo(true), 250);
      return () => window.clearTimeout(revealTimer);
    }
  }, [videoReady, isMinimumDelayComplete]);

  useEffect(() => {
    const fullText = "Beautiful Feet";
    let index = 0;

    const tick = () => {
      setTypedText(fullText.slice(0, index));
      index += 1;

      if (index > fullText.length) {
        window.setTimeout(() => {
          setTypedText("");
          index = 0;
          window.setTimeout(tick, 400);
        }, 900);
        return;
      }

      window.setTimeout(tick, 120);
    };

    const initialTimer = window.setTimeout(tick, 250);
    return () => {
      window.clearTimeout(initialTimer);
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = releaseDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const isReleased = new Date() >= releaseDate;

  return (
    <section className="relative h-screen min-h-[39rem] overflow-hidden bg-[#090909]">
      <div className="absolute inset-0">
        <Image
          src="/assets/BF122.png"
          alt="Beautiful Feet cinematic background"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${showVideo ? "opacity-0" : "opacity-100"}`}
        />

        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${showVideo ? "opacity-100" : "opacity-0"}`}
          src="/assets/0925.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
        />

        <div className="absolute inset-0 bg-black/75" />
      </div>

      {!showVideo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-3 text-center text-white">
            <div className="foot-loader" aria-label="Loading video" role="img" />
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-yellow-300/90">
              Loading story
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-left">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.45em] text-white">
            A cinematic journey
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-7xl">
            <div className="block text-yellow-400">
              {typedText.split(" ")[0] || "Beautiful"}
            </div>
            <div className="block text-yellow-400">
              {typedText.includes(" ") ? typedText.split(" ")[1] || "Feet" : ""}
            </div>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
            {isReleased ? "Out now — available to watch now." : "Coming Soon To Theaters Across West Africa — February 19, 2027, stay tuned!"}
          </p>

          {!isReleased && (
            <div className="mt-6 flex w-full max-w-[20rem] items-stretch gap-2 sm:max-w-md">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="flex-1 rounded-lg border border-white/10 bg-black/25 px-1.5 py-2 text-center backdrop-blur-sm">
                  <div className="text-lg font-black leading-none text-yellow-400 sm:text-2xl">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[7px] font-medium uppercase tracking-[0.18em] text-white/70 sm:text-[9px]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isReleased && (
            <div className="mt-6 inline-flex rounded-full border border-yellow-400/40 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300">
              Out now
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/payments"
              className="rounded-[10px] bg-yellow-500 px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-yellow-400"
            >
              Get Tickets
            </a>
            <a
              href="/donate"
              className="rounded-[10px] border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Give to missions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
"use client";

import { useMemo, useState } from "react";

export default function DonatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = useMemo(() => {
    const parsed = Number(donationAmount || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [donationAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please provide your full name, email, and phone number.");
      return;
    }

    const donationValue = Number(donationAmount);
    if (!donationAmount || !Number.isFinite(donationValue) || donationValue <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          mode: "donation",
          quantity: 1,
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to initialize donation checkout.");
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      throw new Error("Donation checkout could not be started.");
    } catch (submitError) {
      setError(submitError.message || "Unexpected error while starting donation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_rgba(12,12,12,1),_rgba(22,22,22,1))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Give to missions</p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Support the mission behind Beautiful Feet.
            </h1>

            <div className="mt-8 space-y-5 text-white/75">
              <p>
                Your giving helps support the mission work revealed through this story and advances the call to reach unreached people with the Gospel.
              </p>
              <p>
                50% of rewards and donations will be directed toward empowering gospel outreach in the mission field.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Donation summary</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-white/60">Total</span>
                <span className="text-xl font-black text-yellow-400">NGN {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="0812 345 6789"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Donation amount
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={donationAmount}
                  onChange={(event) => setDonationAmount(event.target.value)}
                  placeholder="Enter amount in NGN"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-[10px] bg-yellow-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#111111] transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : `Give NGN ${totalAmount.toLocaleString()}`}
              </button>

              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40">
                Secured by Paystack
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

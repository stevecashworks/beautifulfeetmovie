"use client";

import { useMemo, useState } from "react";

const TICKET_PRICE = 2500;

export default function PaymentsPage() {
  const [mode, setMode] = useState("ticket");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = useMemo(() => {
    if (mode === "ticket") {
      return TICKET_PRICE * Number(quantity || 1);
    }

    const parsed = Number(donationAmount || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [mode, quantity, donationAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please provide your full name, email, and phone number.");
      return;
    }

    if (mode === "ticket" && Number(quantity) < 1) {
      setError("Please select at least one ticket.");
      return;
    }

    if (mode === "donation") {
      const donationValue = Number(donationAmount);
      if (!donationAmount || !Number.isFinite(donationValue) || donationValue <= 0) {
        setError("Please enter a valid donation amount.");
        return;
      }
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
          mode,
          quantity: Number(quantity || 1),
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to initialize payment yet.");
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      throw new Error("Paystack checkout could not be started.");
    } catch (submitError) {
      setError(submitError.message || "Unexpected error while starting payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_rgba(12,12,12,1),_rgba(22,22,22,1))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Tickets & giving</p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Secure your ticket or support the mission.
            </h1>

            <div className="mt-8 space-y-5 text-white/75">
              <p>
                Purchase a film ticket for a fixed amount of NGN 2,500, or give any amount you feel led to support the ministry and mission behind this project.
              </p>
              <p>
                Once your Paystack API keys are added, this form will redirect securely to a live checkout flow.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Checkout summary</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <span>{mode === "ticket" ? "Ticket purchase" : "Donation"}</span>
                  <span className="font-semibold text-white">{mode === "ticket" ? `${quantity} ticket${quantity > 1 ? "s" : ""}` : "Custom amount"}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-white/60">Total</span>
                  <span className="text-xl font-black text-yellow-400">NGN {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("ticket")}
                  className={`rounded-[10px] border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                    mode === "ticket"
                      ? "border-yellow-400 bg-yellow-500 text-[#111111]"
                      : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  Buy ticket
                </button>
                <button
                  type="button"
                  onClick={() => setMode("donation")}
                  className={`rounded-[10px] border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                    mode === "donation"
                      ? "border-yellow-400 bg-yellow-500 text-[#111111]"
                      : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  Donate
                </button>
              </div>

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

              {mode === "ticket" ? (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                    Number of tickets
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value || 1)))}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                  />
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    Fixed price: NGN {TICKET_PRICE.toLocaleString()} per ticket
                  </p>
                </div>
              ) : (
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
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    Any amount is welcome
                  </p>
                </div>
              )}

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
                {isSubmitting ? "Processing..." : `Pay NGN ${totalAmount.toLocaleString()}`}
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

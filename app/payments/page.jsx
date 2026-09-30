"use client";

import { useMemo, useState } from "react";

const TICKET_PRICE = 10000;
const initialBulkForm = {
  churchName: "",
  pastorName: "",
  churchAddress: "",
  email: "",
  phone: "",
  quantity: "100",
  bookingDate: "",
  preferredCinema: "",
};

export default function PaymentsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bulkForm, setBulkForm] = useState(initialBulkForm);
  const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");
  const [activeForm, setActiveForm] = useState("tickets");

  const totalAmount = useMemo(() => {
    const parsedQuantity = Number(quantity);
    const safeQuantity = Number.isInteger(parsedQuantity) && parsedQuantity >= 1 ? parsedQuantity : 1;
    return TICKET_PRICE * safeQuantity;
  }, [quantity]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please provide your full name, email, and phone number.");
      return;
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setError("Please select at least one whole ticket.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          mode: "ticket",
          quantity: parsedQuantity,
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

  const handleBulkSubmit = async (event) => {
    event.preventDefault();
    setBulkError("");
    setBulkSuccess("");

    const parsedQuantity = Number(bulkForm.quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 100) {
      setBulkError("Please enter a whole number of at least 100 seats.");
      return;
    }

    setIsBulkSubmitting(true);

    try {
      const response = await fetch("/api/bulk-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bulkForm, quantity: parsedQuantity }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit the bulk booking request.");
      }

      setBulkSuccess(data.message || "Your request has been received. Our team will contact you soon.");
      setBulkForm(initialBulkForm);
    } catch (submitError) {
      setBulkError(submitError.message || "Unable to submit the bulk booking request.");
    } finally {
      setIsBulkSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div role="tablist" aria-label="Choose a booking type" className="grid grid-cols-2 border-b border-white/10">
          <button
            id="tickets-tab"
            type="button"
            role="tab"
            aria-selected={activeForm === "tickets"}
            aria-controls="tickets-panel"
            onClick={() => setActiveForm("tickets")}
            className={`px-3 py-4 text-xs font-bold uppercase tracking-[0.12em] transition sm:px-5 sm:text-sm sm:tracking-[0.2em] ${activeForm === "tickets" ? "border-b-2 border-yellow-400 bg-yellow-500/10 text-yellow-300" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
          >
            Individual tickets
          </button>
          <button
            id="bulk-booking-tab"
            type="button"
            role="tab"
            aria-selected={activeForm === "bulk"}
            aria-controls="bulk-booking-panel"
            onClick={() => setActiveForm("bulk")}
            className={`px-3 py-4 text-xs font-bold uppercase tracking-[0.12em] transition sm:px-5 sm:text-sm sm:tracking-[0.2em] ${activeForm === "bulk" ? "border-b-2 border-yellow-400 bg-yellow-500/10 text-yellow-300" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
          >
            Church group booking
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_rgba(12,12,12,1),_rgba(22,22,22,1))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            {activeForm === "tickets" ? (
              <>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Movie tickets</p>
                <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Secure your ticket.</h1>
                <div className="mt-8 space-y-5 text-white/75">
                  <p>Book your seat for Beautiful Feet and support the mission through the story and the message it carries.</p>
                  <p>Pay securely through Paystack and receive a checkout link to complete your purchase.</p>
                </div>
                <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-500">Checkout summary</p>
                  <div className="mt-4 space-y-3 text-sm text-white/80">
                    <div className="flex items-center justify-between">
                      <span>Ticket purchase</span>
                      <span className="font-semibold text-white">{quantity} ticket{quantity > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-white/60">Total</span>
                      <span className="text-xl font-black text-yellow-400">NGN {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Church group screenings</p>
                <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Bring your church together.</h1>
                <p className="mt-8 text-white/75">
                  Book a cinema hall of 100-150 seats or more for your church family to watch Beautiful Feet together.
                  Send us your preferred date and cinema, and our team will contact you with the details.
                </p>
              </>
            )}
          </section>

          <div className="p-6 sm:p-8">
            <div id="tickets-panel" role="tabpanel" aria-labelledby="tickets-tab" hidden={activeForm !== "tickets"}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="ticket-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Full name</label>
                  <input id="ticket-name" type="text" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter full name" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="ticket-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Email address</label>
                  <input id="ticket-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="ticket-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Phone number</label>
                  <input id="ticket-phone" type="tel" required autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0812 345 6789" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="ticket-quantity" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Number of tickets</label>
                  <input
                    id="ticket-quantity"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    onBlur={() => {
                      const parsedQuantity = Number(quantity);
                      if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) setQuantity("1");
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                  />
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">Fixed price: NGN {TICKET_PRICE.toLocaleString()} per ticket</p>
                </div>
                {error ? <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
                <button type="submit" disabled={isSubmitting} className="w-full rounded-[10px] bg-yellow-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#111111] transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmitting ? "Processing..." : `Pay NGN ${totalAmount.toLocaleString()}`}
                </button>
                <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40">Secured by Paystack</p>
              </form>
            </div>

            <div id="bulk-booking-panel" role="tabpanel" aria-labelledby="bulk-booking-tab" hidden={activeForm !== "bulk"}>
              <form onSubmit={handleBulkSubmit} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="church-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Name of church</label>
                  <input id="church-name" type="text" required maxLength={160} value={bulkForm.churchName} onChange={(event) => setBulkForm((form) => ({ ...form, churchName: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="pastor-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Pastor’s name</label>
                  <input id="pastor-name" type="text" required maxLength={160} value={bulkForm.pastorName} onChange={(event) => setBulkForm((form) => ({ ...form, pastorName: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="church-address" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Church address</label>
                  <textarea id="church-address" required maxLength={500} rows={3} value={bulkForm.churchAddress} onChange={(event) => setBulkForm((form) => ({ ...form, churchAddress: event.target.value }))} className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="bulk-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Email address</label>
                  <input id="bulk-email" type="email" required maxLength={254} autoComplete="email" value={bulkForm.email} onChange={(event) => setBulkForm((form) => ({ ...form, email: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="bulk-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Phone number</label>
                  <input id="bulk-phone" type="tel" required maxLength={40} autoComplete="tel" value={bulkForm.phone} onChange={(event) => setBulkForm((form) => ({ ...form, phone: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="bulk-quantity" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Number you want to book for</label>
                  <input id="bulk-quantity" type="number" required min="100" step="1" value={bulkForm.quantity} onChange={(event) => setBulkForm((form) => ({ ...form, quantity: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                  <p className="mt-2 text-xs text-white/45">Minimum 100 seats</p>
                </div>
                <div>
                  <label htmlFor="booking-date" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Date you like to book</label>
                  <input id="booking-date" type="date" required value={bulkForm.bookingDate} onChange={(event) => setBulkForm((form) => ({ ...form, bookingDate: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="preferred-cinema" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Preferred cinema</label>
                  <input id="preferred-cinema" type="text" required maxLength={200} value={bulkForm.preferredCinema} onChange={(event) => setBulkForm((form) => ({ ...form, preferredCinema: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none" />
                </div>
                {bulkError ? <p role="alert" className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{bulkError}</p> : null}
                {bulkSuccess ? <p role="status" className="sm:col-span-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">{bulkSuccess}</p> : null}
                <button type="submit" disabled={isBulkSubmitting} className="sm:col-span-2 w-full rounded-[10px] bg-yellow-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70">
                  {isBulkSubmitting ? "Submitting request..." : "Request a church booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
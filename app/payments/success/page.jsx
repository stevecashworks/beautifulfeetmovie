export default function PaymentSuccessPage({ searchParams }) {
  const reference = searchParams?.reference || "your payment";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-16 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#111111] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-500/10 text-3xl text-yellow-400">
          ✓
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Payment received</p>
        <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white">Thank you.</h1>
        <p className="mt-4 text-white/75">
          Your payment is being processed successfully. Reference: <span className="font-semibold text-yellow-400">{reference}</span>
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-yellow-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#111111] transition hover:bg-yellow-400"
        >
          Back home
        </a>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const initialForm = {
  email: "",
  password: "",
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions", { method: "GET" });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setIsAuthenticated(false);
        setError(data.error || "Unable to load submissions.");
        return;
      }

      setError("");
      setSubmissions(data.submissions || []);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setError("Unable to connect to the dashboard data source.");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSubmissions();
      setLoading(false);
    };

    load();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setForm(initialForm);
      await fetchSubmissions();
    } catch (loginError) {
      setError(loginError.message || "Authentication failed.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setSubmissions([]);
    setForm(initialForm);
  };

  const handleDelete = async (submissionId) => {
    setDeletingId(submissionId);

    try {
      const response = await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: submissionId }),
      });

      if (!response.ok) {
        throw new Error("Unable to delete this record.");
      }

      await fetchSubmissions();
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete this record.");
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return <main className="min-h-screen bg-[#090909] px-4 py-16 text-white">Loading admin panel...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-16 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111111] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Admin access</p>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">Sign in</h1>

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-[10px] bg-yellow-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#111111] transition hover:bg-yellow-400"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-yellow-500">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-white">Form submissions</h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-[10px] border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111111] p-4 text-sm text-white/70">
          Total submissions: <span className="font-semibold text-yellow-400">{submissions.length}</span>
        </div>

        <div className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-black/20 text-white/60">
              <tr>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Type</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Name</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Email</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Phone</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Details</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Submitted</th>
                <th className="px-4 py-3 font-medium uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/60">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((item) => (
                  <tr key={item._id} className="align-top text-white/80">
                    <td className="px-4 py-4 uppercase tracking-[0.15em] text-yellow-300">{item.formType}</td>
                    <td className="px-4 py-4">{item.name || "—"}</td>
                    <td className="px-4 py-4 break-all">{item.email || "—"}</td>
                    <td className="px-4 py-4">{item.phone || "—"}</td>
                    <td className="px-4 py-4">
                      {item.formType === "bulk_booking" ? (
                        <div className="space-y-1">
                          {item.pastorName ? <div><span className="font-semibold text-white">Pastor:</span> {item.pastorName}</div> : null}
                          {item.churchAddress ? <div><span className="font-semibold text-white">Address:</span> {item.churchAddress}</div> : null}
                          {item.quantity ? <div><span className="font-semibold text-white">Seats:</span> {item.quantity}</div> : null}
                          {item.bookingDate ? <div><span className="font-semibold text-white">Preferred date:</span> {item.bookingDate}</div> : null}
                          {item.preferredCinema ? <div><span className="font-semibold text-white">Preferred cinema:</span> {item.preferredCinema}</div> : null}
                        </div>
                      ) : item.localChurchNameAndAddress ? (
                        <div className="space-y-1">
                          <div><span className="font-semibold text-white">Church:</span> {item.localChurchNameAndAddress}</div>
                          {item.pastorName ? <div><span className="font-semibold text-white">Pastor:</span> {item.pastorName}</div> : null}
                          {item.calling ? <div><span className="font-semibold text-white">Calling:</span> {item.calling}</div> : null}
                          {item.amount ? <div><span className="font-semibold text-white">Amount:</span> NGN {Number(item.amount).toLocaleString()}</div> : null}
                          {item.quantity ? <div><span className="font-semibold text-white">Quantity:</span> {item.quantity}</div> : null}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {item.mode ? <div><span className="font-semibold text-white">Mode:</span> {item.mode}</div> : null}
                          {item.amount ? <div><span className="font-semibold text-white">Amount:</span> NGN {Number(item.amount).toLocaleString()}</div> : null}
                          {item.quantity ? <div><span className="font-semibold text-white">Tickets:</span> {item.quantity}</div> : null}
                          {item.mode === "donation" && item.metadata?.connectToMissionary ? <div><span className="font-semibold text-white">Missionary connection:</span> Requested</div> : null}
                          {item.reference ? <div><span className="font-semibold text-white">Ref:</span> {item.reference}</div> : null}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">{item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        disabled={deletingId === item._id}
                        onClick={() => handleDelete(item._id)}
                        className="rounded-[8px] border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 transition hover:bg-red-500/20 disabled:opacity-60"
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

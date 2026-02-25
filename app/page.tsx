"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";

const PERSONAS = [
  { value: "heritage", label: "2nd/3rd gen Yoruba reconnecting with my culture" },
  { value: "parent",   label: "Parent wanting my kids to learn Yoruba" },
  { value: "partner",  label: "Partner/spouse of a Yoruba speaker" },
  { value: "enthusiast", label: "Interested in Yoruba culture & language" },
];

const LEVELS = [
  { value: "none",          label: "Complete beginner — I know nothing" },
  { value: "passive",       label: "I understand some but can't speak" },
  { value: "basic",         label: "I can say a few words/phrases" },
  { value: "conversational", label: "Conversational but want to improve" },
];

const BUDGETS = [
  { value: "free",  label: "I'd want it free" },
  { value: "10-20", label: "$10 – $20/mo" },
  { value: "21-35", label: "$21 – $35/mo" },
  { value: "36-50", label: "$36 – $50/mo" },
  { value: "50+",   label: "Over $50/mo" },
];

const PAIN_POINTS = [
  "Speaking Yoruba with my family",
  "Understanding conversations at events",
  "Visiting Nigeria and feeling like an outsider",
  "Passing culture on to my children",
  "Feeling disconnected from my identity",
];

const PAIN_CARDS = [
  {
    icon: "😶",
    title: "Silent at family gatherings",
    body: "You understand 20% of what's said. You laugh when others laugh. You nod. But you can't really participate.",
  },
  {
    icon: "📱",
    title: "Duolingo didn't cut it",
    body: "You started. You quit within 2 weeks. The lessons felt robotic, culturally hollow, and disconnected from who you are.",
  },
  {
    icon: "⏳",
    title: "The clock is ticking",
    body: "Your grandparents won't be here forever. Your kids are growing up without the language. The urgency is real.",
  },
];

const EPISODES = [
  {
    ep: "S1 · E1",
    title: "The Sound System",
    sub: "Master Yoruba's 3 tones through the talking drum. By the end: you can hear the difference — and produce it.",
    tags: ["Phonetics", "Tones", "Pronunciation"],
  },
  {
    ep: "S1 · E3",
    title: "The Market Hustle",
    sub: "Navigate Balogun Market with a character who bargains, jokes, and haggles. Numbers, food vocab, polite phrases — absorbed through story.",
    tags: ["Numbers", "Transactions", "Everyday language"],
  },
  {
    ep: "S1 · E6",
    title: "Family & Respect",
    sub: "Learn kinship terms and greeting etiquette through an extended family gathering — including why you kneel, and when.",
    tags: ["Family", "Greetings", "Cultural etiquette"],
  },
];

const DIFFERENTIATORS = [
  {
    label: "Cinematic production",
    body: "1080p+ video, professional lighting, original score. Content that makes you lean forward — not click away.",
  },
  {
    label: "Built for heritage learners",
    body: "Every lesson acknowledges your emotional relationship to the language. This isn't ESL. It's homecoming.",
  },
  {
    label: "Measurable outcomes",
    body: "CEFR A1–B2 progression. You'll know exactly where you stand and what you can do at every stage.",
  },
  {
    label: "Culture-first, language-second",
    body: "Language is the byproduct of culture. Learn Yoruba proverbs, ceremonies, food, music — and the words follow.",
  },
];

export default function Home() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    persona: "",
    level: "",
    budget: "",
    painPoint: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.email || !form.persona || !form.level || !form.budget) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen glow-bg">

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: "rgba(10,8,5,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              À
            </div>
            <span className="font-semibold text-sm tracking-wide text-cream">
              [Platform Name]
            </span>
          </div>
          <a
            href="#waitlist"
            className="btn-gold text-xs font-medium px-4 py-2 rounded-full"
            style={{ display: "inline-block" }}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              border: "1px solid var(--border)",
              color: "var(--gold)",
              background: "rgba(200,147,42,0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full pulse"
              style={{ background: "#4ade80", display: "inline-block", flexShrink: 0 }}
            />
            Now accepting waitlist applications
          </div>

          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight text-cream"
          >
            Speak Yoruba.<br />
            <span className="gold-shimmer">Own your roots.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-muted">
            A cinematic learning platform that teaches Yoruba through culture — not drills.
            Built for the diaspora who are tired of apps that don&apos;t understand{" "}
            <em style={{ color: "var(--cream)" }}>who they really are</em>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <a
              href="#waitlist"
              className="btn-gold px-8 py-4 rounded-full text-sm font-semibold"
              style={{ display: "inline-block" }}
            >
              Reserve your spot →
            </a>
            <a
              href="#how-it-works"
              className="btn-outline px-8 py-4 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              See how it works <ChevronDown size={14} />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            {["Houston, TX", "London, UK", "Atlanta, GA", "Lagos, NG", "New York, NY"].map((city) => (
              <span key={city} className="flex items-center gap-1.5">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--gold)", display: "inline-block" }}
                />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PAIN_CARDS.map((card) => (
              <div key={card.title} className="card card-hover p-6">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-display font-semibold mb-2 text-base text-cream">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium mb-3 uppercase tracking-widest text-gold">
              The approach
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-cream">
              Language through living
            </h2>
            <p className="text-base max-w-xl mx-auto text-muted">
              We don&apos;t teach vocabulary lists. We follow characters through real Yoruba
              life — markets, ceremonies, drumming, Lagos traffic — and the language comes
              with it.
            </p>
          </div>

          <div className="space-y-4">
            {EPISODES.map((ep) => (
              <div key={ep.ep} className="card card-hover flex gap-5 p-5 cursor-pointer group">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-center"
                  style={{
                    background: "rgba(200,147,42,0.12)",
                    border: "1px solid rgba(200,147,42,0.2)",
                  }}
                >
                  <span className="text-[9px] font-medium leading-tight text-gold">
                    {ep.ep}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold mb-1 text-cream">{ep.title}</h4>
                  <p className="text-sm mb-3 leading-relaxed text-muted">{ep.sub}</p>
                  <div className="flex flex-wrap gap-2">
                    {ep.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 self-center text-xl group-hover:translate-x-1 transition-transform duration-200 text-gold">
                  ▶
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium mb-3 uppercase tracking-widest text-gold">
              Why us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
              Not another app
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.label} className="card p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--gold)" }}
                  />
                  <div>
                    <p className="font-semibold mb-1.5 text-sm text-cream">{item.label}</p>
                    <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST FORM ────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="card p-8 md:p-10" style={{ borderRadius: 24 }}>

            {step === "success" ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-6">🎉</div>
                <h3
                  className="font-display text-2xl font-bold mb-3 text-cream"
                >
                  You&apos;re on the list
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  We&apos;ll reach out with early access and exclusive founding member pricing.
                  Share this page to help us grow the community.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-xs font-medium mb-2 uppercase tracking-widest text-gold">
                    Early access
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-cream">
                    Be the first to learn
                  </h2>
                  <p className="text-sm text-muted">
                    Founding members get early access, discounted pricing, and direct input on
                    content. Takes 60 seconds.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-cream">
                        First name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Amara"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-cream">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="field"
                      />
                    </div>
                  </div>

                  {/* Persona */}
                  <div>
                    <label className="block text-xs font-medium mb-2 text-cream">
                      What best describes you? <span className="text-gold">*</span>
                    </label>
                    <div className="space-y-2">
                      {PERSONAS.map((p) => (
                        <label
                          key={p.value}
                          className={`radio-card${form.persona === p.value ? " selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name="persona"
                            value={p.value}
                            checked={form.persona === p.value}
                            onChange={(e) => setForm({ ...form, persona: e.target.value })}
                            style={{ display: "none" }}
                          />
                          <div className="radio-dot">
                            {form.persona === p.value && (
                              <div className="radio-dot-inner" />
                            )}
                          </div>
                          <span
                            className="text-xs leading-snug"
                            style={{
                              color: form.persona === p.value
                                ? "var(--cream)"
                                : "var(--muted)",
                            }}
                          >
                            {p.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-xs font-medium mb-2 text-cream">
                      Your current Yoruba level? <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                        required
                        className="field"
                        style={{
                          borderColor: form.level ? "var(--gold)" : undefined,
                          color: form.level ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <option value="" disabled>Select your level…</option>
                        {LEVELS.map((l) => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "var(--muted)" }}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-medium mb-2 text-cream">
                      What would you pay monthly? <span className="text-gold">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {BUDGETS.map((b) => (
                        <label
                          key={b.value}
                          className={`chip${form.budget === b.value ? " selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={b.value}
                            checked={form.budget === b.value}
                            onChange={(e) => setForm({ ...form, budget: e.target.value })}
                            style={{ display: "none" }}
                          />
                          {b.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pain Point (optional) */}
                  <div>
                    <label className="block text-xs font-medium mb-2 text-muted">
                      What matters most to you? (optional)
                    </label>
                    <div className="relative">
                      <select
                        value={form.painPoint}
                        onChange={(e) => setForm({ ...form, painPoint: e.target.value })}
                        className="field"
                        style={{
                          color: form.painPoint ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <option value="">Select one…</option>
                        {PAIN_POINTS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "var(--muted)" }}
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      className="text-xs px-4 py-3 rounded-xl"
                      style={{
                        background: "rgba(220,38,38,0.1)",
                        color: "#f87171",
                        border: "1px solid rgba(220,38,38,0.2)",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-4 rounded-xl text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Joining…" : "Reserve my spot →"}
                  </button>

                  <p className="text-center text-xs text-muted">
                    No spam. No credit card. We&apos;ll reach out when we launch.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              À
            </div>
            <span className="text-xs font-medium text-muted">
              [Platform Name] — Yoruba Heritage Learning
            </span>
          </div>
          <p className="text-xs text-muted">
            Built with love for the diaspora · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}

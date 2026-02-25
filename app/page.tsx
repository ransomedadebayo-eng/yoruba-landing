"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { value: "yoruba",   label: "Yoruba",      region: "Nigeria · Benin · Togo" },
  { value: "swahili",  label: "Swahili",     region: "Kenya · Tanzania · Uganda" },
  { value: "twi",      label: "Twi / Akan",  region: "Ghana · Ivory Coast" },
  { value: "igbo",     label: "Igbo",        region: "Nigeria" },
  { value: "amharic",  label: "Amharic",     region: "Ethiopia · Eritrea" },
  { value: "hausa",    label: "Hausa",       region: "Nigeria · Niger · Ghana" },
  { value: "zulu",     label: "Zulu / Xhosa",region: "South Africa" },
  { value: "wolof",    label: "Wolof",       region: "Senegal · Gambia" },
  { value: "somali",   label: "Somali",      region: "Somalia · Ethiopia · Kenya" },
  { value: "other",    label: "Other African language", region: "" },
];

const PERSONAS = [
  { value: "heritage",   label: "2nd/3rd gen diaspora reconnecting with my heritage language" },
  { value: "parent",     label: "Parent wanting my kids to speak our family's language" },
  { value: "partner",    label: "Partner/spouse of an African language speaker" },
  { value: "enthusiast", label: "Interested in African culture and languages" },
];

const LEVELS = [
  { value: "none",           label: "Complete beginner — I know nothing" },
  { value: "passive",        label: "I understand some but can't speak" },
  { value: "basic",          label: "I can say a few words/phrases" },
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
  "Feeling left out at family gatherings",
  "Connecting with grandparents before it's too late",
  "Raising my children with cultural and language fluency",
  "Understanding conversations at cultural events",
  "Feeling disconnected from my African identity",
  "Visiting the home country and not being able to communicate",
];

const PAIN_CARDS = [
  {
    icon: "😶",
    title: "Silent at family gatherings",
    body: "You understand fragments of what's said. You laugh when others laugh. You nod. But you can't really participate — and everyone knows it.",
  },
  {
    icon: "📱",
    title: "Apps don't understand your story",
    body: "You downloaded three. You quit within two weeks. The lessons were robotic, culturally empty, and built for travelers — not for someone trying to come home.",
  },
  {
    icon: "⏳",
    title: "The clock is ticking",
    body: "Grandparents won't be here forever. Your kids are growing up without the language. The chain is breaking — and you feel it.",
  },
];

const EPISODES = [
  {
    lang: "Yoruba",
    ep: "S1 · E1",
    title: "The Sound System",
    sub: "Master Yoruba's 3 tones through the talking drum. By the end you can hear the difference — and produce it.",
    tags: ["Phonetics", "Tones", "Pronunciation"],
  },
  {
    lang: "Swahili",
    ep: "S1 · E1",
    title: "Jambo, Nairobi",
    sub: "Follow Amina through a morning commute in Westlands — greetings, small talk, and the social rules that make Swahili speakers feel at home anywhere.",
    tags: ["Greetings", "Everyday speech", "Culture"],
  },
  {
    lang: "Twi",
    ep: "S1 · E2",
    title: "Akwaaba",
    sub: "A homecoming to Kumasi. Learn the language of welcome and hospitality — what to say when you arrive, how to greet elders, and what happens when you get it right.",
    tags: ["Welcome", "Etiquette", "Family"],
  },
];

const DIFFERENTIATORS = [
  {
    label: "Cinematic production",
    body: "1080p+ video, professional lighting, original score. Content that makes you lean forward — not click away.",
  },
  {
    label: "Built for heritage reconnectors",
    body: "Every lesson acknowledges the emotional weight of returning to your language. This isn't a travel app. It's a homecoming.",
  },
  {
    label: "Measurable outcomes",
    body: "CEFR A1–B2 progression across all languages. You'll know exactly where you stand and what you can say at every stage.",
  },
  {
    label: "Culture-first, language-second",
    body: "Language is the byproduct of culture. Learn proverbs, ceremonies, food, music — and the words follow naturally.",
  },
];

export default function Home() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    language: "",
    persona: "",
    level: "",
    budget: "",
    painPoint: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.email || !form.language || !form.persona || !form.level || !form.budget) {
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

  const selectedLang = LANGUAGES.find((l) => l.value === form.language);

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

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight text-cream">
            Speak Yoruba.<br />
            Speak Swahili.<br />
            <span className="gold-shimmer">Own your roots.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-muted">
            A cinematic platform that teaches African heritage languages through culture — not drills.
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

          {/* Language pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {["Yoruba", "Swahili", "Twi", "Igbo", "Amharic", "Hausa", "Zulu", "Wolof"].map((lang) => (
              <span
                key={lang}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {lang}
              </span>
            ))}
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                border: "1px solid rgba(200,147,42,0.3)",
                color: "var(--gold)",
                background: "rgba(200,147,42,0.06)",
              }}
            >
              + more
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            {["Houston, TX", "London, UK", "Toronto, Canada", "Nairobi, Kenya", "New York, NY"].map((city) => (
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
              We don&apos;t teach vocabulary lists. We follow characters through real African life —
              markets, ceremonies, morning commutes, family compounds — and the language comes with it.
            </p>
          </div>

          <div className="space-y-4">
            {EPISODES.map((ep) => (
              <div key={ep.lang + ep.ep} className="card card-hover flex gap-5 p-5 cursor-pointer group">
                <div
                  className="shrink-0 w-16 h-14 rounded-xl flex flex-col items-center justify-center text-center px-1"
                  style={{
                    background: "rgba(200,147,42,0.12)",
                    border: "1px solid rgba(200,147,42,0.2)",
                  }}
                >
                  <span className="text-[8px] font-semibold text-gold leading-none mb-0.5">
                    {ep.lang}
                  </span>
                  <span className="text-[9px] font-medium leading-tight text-gold opacity-70">
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
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "var(--gold)" }} />
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
                <h3 className="font-display text-2xl font-bold mb-3 text-cream">
                  You&apos;re on the list
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {selectedLang
                    ? `We'll reach out when ${selectedLang.label} launches — with early access and founding member pricing.`
                    : "We'll reach out with early access and exclusive founding member pricing."}
                  {" "}Share this page to help us grow the community.
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
                    which languages launch first. Takes 90 seconds.
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

                  {/* Language */}
                  <div>
                    <label className="block text-xs font-medium mb-2 text-cream">
                      Which language do you most want to learn? <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.language}
                        onChange={(e) => setForm({ ...form, language: e.target.value })}
                        required
                        className="field"
                        style={{
                          borderColor: form.language ? "var(--gold)" : undefined,
                          color: form.language ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <option value="" disabled>Select a language…</option>
                        {LANGUAGES.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}{l.region ? ` — ${l.region}` : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "var(--muted)" }}
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
                            {form.persona === p.value && <div className="radio-dot-inner" />}
                          </div>
                          <span
                            className="text-xs leading-snug"
                            style={{
                              color: form.persona === p.value ? "var(--cream)" : "var(--muted)",
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
                      Your current level{form.language && selectedLang?.label !== "Other African language" ? ` in ${selectedLang?.label}` : ""}?{" "}
                      <span className="text-gold">*</span>
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
                        style={{ color: form.painPoint ? "var(--cream)" : "var(--muted)" }}
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
                    No spam. No credit card. Your answers shape which languages we build first.
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
              [Platform Name] — African Heritage Language Learning
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

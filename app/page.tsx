"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const CYCLE_LANGUAGES = [
  "Yoruba", "Swahili", "Twi", "Igbo", "Amharic", "Hausa", "Zulu", "Wolof",
];

const LANGUAGES = [
  { value: "yoruba",   label: "Yoruba",                  region: "Nigeria, Benin, Togo" },
  { value: "swahili",  label: "Swahili",                 region: "Kenya, Tanzania, Uganda" },
  { value: "twi",      label: "Twi / Akan",              region: "Ghana, Ivory Coast" },
  { value: "igbo",     label: "Igbo",                    region: "Nigeria" },
  { value: "amharic",  label: "Amharic",                 region: "Ethiopia, Eritrea" },
  { value: "hausa",    label: "Hausa",                   region: "Nigeria, Niger, Ghana" },
  { value: "zulu",     label: "Zulu / Xhosa",            region: "South Africa" },
  { value: "wolof",    label: "Wolof",                   region: "Senegal, Gambia" },
  { value: "somali",   label: "Somali",                  region: "Somalia, Ethiopia, Kenya" },
  { value: "other",    label: "Other African language",  region: "" },
];

const PERSONAS = [
  { value: "heritage",   label: "2nd/3rd gen diaspora reconnecting with my heritage language" },
  { value: "parent",     label: "Parent wanting my kids to speak our family's language" },
  { value: "partner",    label: "Partner/spouse of an African language speaker" },
  { value: "enthusiast", label: "Interested in African culture and languages" },
];

const LEVELS = [
  { value: "none",           label: "Complete beginner, nothing yet" },
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

// ── Sub-components ───────────────────────────────────────────────────────────

function AsaLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${dim} rounded-full flex items-center justify-center font-bold font-display`}
        style={{ background: "var(--magenta)", color: "#fff" }}
      >
        A
      </div>
      <span
        className="font-display font-semibold tracking-wide text-cream"
        style={{ fontSize: size === "sm" ? 13 : 15 }}
      >
        Asa
      </span>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: light ? "var(--magenta)" : "var(--magenta)" }}
    >
      {children}
    </p>
  );
}

// ── FAQ Accordion ────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "When does Asa launch?",
    a: "We're targeting a beta launch with a focused group of founding members in late 2026. Waitlist members get first access.",
  },
  {
    q: "How much will it cost?",
    a: "We're validating pricing with our waitlist community. Early access members will receive founding member pricing, which will be significantly below our public rate.",
  },
  {
    q: "What languages will be available?",
    a: "We're launching with Yoruba, Swahili, Twi/Akan, and Igbo. Additional languages will be added based on waitlist demand. Your selection in the form directly influences our roadmap.",
  },
  {
    q: "Is this for complete beginners?",
    a: "Asa is designed for diaspora heritage learners at all levels, from complete beginners to those who understand but can't speak. Our CEFR-mapped curriculum meets you where you are.",
  },
  {
    q: "How is this different from Duolingo?",
    a: "Duolingo doesn't offer most African languages. More importantly, Duolingo is built for language tourists. Asa is built for people coming home. Every lesson is grounded in cultural context, emotional authenticity, and community.",
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="card"
            style={{ borderRadius: 14, overflow: "hidden" }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-display font-semibold text-sm text-cream"
                style={{ lineHeight: 1.4 }}
              >
                {item.q}
              </span>
              <ChevronDown
                size={16}
                style={{
                  color: "var(--muted)",
                  flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>
            <div
              style={{
                maxHeight: isOpen ? 240 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <p className="text-sm leading-relaxed text-muted px-6 pb-5">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

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

  // Cycling language animation
  const [langIndex, setLangIndex] = useState(0);
  const [langVisible, setLangVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLangVisible(false);
      setTimeout(() => {
        setLangIndex((i) => (i + 1) % CYCLE_LANGUAGES.length);
        setLangVisible(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

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

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: "rgba(11,22,40,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <AsaLogo size="md" />
          <a
            href="#waitlist"
            className="btn-primary text-xs font-semibold px-5 py-2.5 rounded-full"
            style={{ display: "inline-block" }}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{
              border: "1px solid rgba(74,222,128,0.25)",
              color: "#4ade80",
              background: "rgba(74,222,128,0.07)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full pulse"
              style={{ background: "#4ade80", display: "inline-block", flexShrink: 0 }}
            />
            Now accepting early access
          </div>

          {/* H1 */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight text-cream">
            Speak{" "}
            <span
              style={{
                display: "inline-block",
                color: "var(--gold)",
                opacity: langVisible ? 1 : 0,
                transform: langVisible ? "translateY(0px)" : "translateY(-10px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                minWidth: "4ch",
              }}
            >
              {CYCLE_LANGUAGES[langIndex]}
            </span>
            .<br />
            <span className="gold-shimmer">You&apos;re coming home.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-muted">
            The first platform that teaches African heritage languages through cinematic cultural storytelling.
            No drills. No apps. Just your language, brought to life.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a
              href="#waitlist"
              className="btn-primary px-8 py-4 rounded-full text-sm font-semibold"
              style={{ display: "inline-block" }}
            >
              Join the Waitlist
            </a>
            <a
              href="#how-it-works"
              className="btn-outline px-8 py-4 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              See how it works <ChevronDown size={14} />
            </a>
          </div>

          {/* Social proof */}
          <p className="text-xs text-muted mb-10">
            Join 500+ people reconnecting with their heritage
          </p>

          {/* Language pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CYCLE_LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  border: "1px solid",
                  color: lang === CYCLE_LANGUAGES[langIndex] ? "var(--cream)" : "var(--muted)",
                  background: lang === CYCLE_LANGUAGES[langIndex]
                    ? "var(--magenta-dim)"
                    : "rgba(255,255,255,0.02)",
                  borderColor: lang === CYCLE_LANGUAGES[langIndex]
                    ? "rgba(194,24,91,0.4)"
                    : "var(--border)",
                  transition: "color 0.35s ease, background 0.35s ease, border-color 0.35s ease",
                }}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* City dots */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            {[
              "Houston TX",
              "London UK",
              "Toronto Canada",
              "Nairobi Kenya",
              "New York NY",
            ].map((city) => (
              <span key={city} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--magenta)", display: "inline-block", flexShrink: 0 }}
                />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--off-white)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--magenta)" }}
            >
              The Problem
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: "#111827" }}
            >
              Your language deserves better
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Not on Duolingo",
                body: "Yoruba, Igbo, Twi, and most African languages have zero presence on mainstream apps. You were never their audience.",
              },
              {
                title: "YouTube is not a curriculum",
                body: "Scattered videos, no progression tracking, no accountability layer. You've watched a hundred videos and still can't hold a conversation.",
              },
              {
                title: "Family guilt is not a teacher",
                body: "Learning from relatives is emotionally charged and inconsistent. It shouldn't feel like a burden on people you love.",
              },
            ].map((card) => (
              <div key={card.title} className="card-light card-light-hover p-7">
                <h3
                  className="font-display font-bold mb-3 text-base"
                  style={{ color: "#111827" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
              Three steps to fluency
            </h2>
          </div>

          {/* Steps: horizontal on desktop, stacked on mobile */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-0">

            {/* Connecting line: desktop only */}
            <div
              className="hidden md:block absolute top-8 left-0 right-0"
              style={{
                height: 1,
                background: "linear-gradient(90deg, transparent 0%, var(--border) 15%, var(--border) 85%, transparent 100%)",
                zIndex: 0,
              }}
            />

            {[
              {
                num: "01",
                title: "Choose your heritage language",
                body: "Yoruba, Swahili, Twi, Igbo and more",
              },
              {
                num: "02",
                title: "Watch cinematic episodes",
                body: "Mapped to CEFR A1 through B2 progression",
              },
              {
                num: "03",
                title: "Practice and connect",
                body: "Interactive tools and a community of diaspora learners",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center flex-1 px-6"
                style={{ zIndex: 1 }}
              >
                {/* Number circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg mb-5"
                  style={{
                    background: "var(--magenta-dim)",
                    border: "2px solid var(--magenta)",
                    color: "var(--magenta-light)",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-base mb-2 text-cream">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{step.body}</p>

                {/* Mobile connector */}
                {i < 2 && (
                  <div
                    className="md:hidden w-px h-8 mt-6"
                    style={{ background: "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Why Asa</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
              Built for people coming home
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Pull quote */}
            <div
              className="card p-8"
              style={{
                borderLeft: "4px solid var(--magenta)",
                borderRadius: 16,
              }}
            >
              <p
                className="font-display text-xl md:text-2xl font-semibold leading-snug mb-6 text-cream"
                style={{ fontStyle: "italic" }}
              >
                "I tried every app. Nothing was built for someone like me."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm font-display"
                  style={{ background: "var(--magenta-dim)", color: "var(--magenta-light)", border: "1px solid rgba(194,24,91,0.3)" }}
                >
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">Amara, 28</p>
                  <p className="text-xs text-muted">Houston</p>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div className="space-y-5">
              {[
                "Cinematic production quality",
                "CEFR-structured progression (A1 to B2)",
                "Cultural context in every lesson",
                "Built by and for the African diaspora",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--gold)" }}
                  />
                  <p className="text-sm font-medium text-cream leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <SectionLabel>Languages</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-3">
              Languages at launch
            </h2>
            <p className="text-sm text-muted">More languages added by community demand</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {[
              {
                name: "Yoruba",
                speakers: "50M+ speakers",
                region: "Nigeria, Benin, Togo",
                tag: "Launch language",
                isLaunch: true,
              },
              {
                name: "Swahili",
                speakers: "200M+ speakers",
                region: "Kenya, Tanzania, Uganda",
                tag: "Launch language",
                isLaunch: true,
              },
              {
                name: "Twi / Akan",
                speakers: "20M+ speakers",
                region: "Ghana, Ivory Coast",
                tag: "Launch language",
                isLaunch: true,
              },
              {
                name: "Igbo",
                speakers: "45M+ speakers",
                region: "Nigeria",
                tag: "Launch language",
                isLaunch: true,
              },
            ].map((lang) => (
              <div key={lang.name} className="card card-hover p-6 flex flex-col gap-3">
                <h3 className="font-display font-bold text-lg text-cream">{lang.name}</h3>
                <p className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
                  {lang.speakers}
                </p>
                <p className="text-xs text-muted">{lang.region}</p>
                <div className="mt-auto pt-2">
                  <span className="tag">{lang.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST FORM ──────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-xl mx-auto">
          <div className="card p-8 md:p-10" style={{ borderRadius: 24 }}>

            {step === "success" ? (
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: "rgba(194,24,91,0.12)",
                    border: "1px solid rgba(194,24,91,0.3)",
                  }}
                >
                  <CheckCircle size={28} style={{ color: "var(--magenta-light)" }} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-cream">
                  You&apos;re on the list
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {selectedLang && selectedLang.label !== "Other African language"
                    ? `We will reach out when ${selectedLang.label} launches, with early access and founding member pricing.`
                    : "We will reach out with early access and exclusive founding member pricing."}
                  {" "}Share this page to help us grow the community.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <SectionLabel>Early access</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-cream">
                    Be among the first
                  </h2>
                  <p className="text-sm text-muted">
                    Founding members get early access, discounted pricing, and direct input on
                    which languages we build first.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-cream">
                        First name <span style={{ color: "var(--magenta)" }}>*</span>
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
                        Email <span style={{ color: "var(--magenta)" }}>*</span>
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
                      Which language do you most want to learn?{" "}
                      <span style={{ color: "var(--magenta)" }}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.language}
                        onChange={(e) => setForm({ ...form, language: e.target.value })}
                        required
                        className="field"
                        style={{
                          borderColor: form.language ? "var(--magenta)" : undefined,
                          color: form.language ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <option value="" disabled>Select a language...</option>
                        {LANGUAGES.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}{l.region ? ` (${l.region})` : ""}
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
                      What best describes you?{" "}
                      <span style={{ color: "var(--magenta)" }}>*</span>
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
                      Your current level
                      {form.language && selectedLang?.label !== "Other African language"
                        ? ` in ${selectedLang?.label}`
                        : ""}?{" "}
                      <span style={{ color: "var(--magenta)" }}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                        required
                        className="field"
                        style={{
                          borderColor: form.level ? "var(--magenta)" : undefined,
                          color: form.level ? "var(--cream)" : "var(--muted)",
                        }}
                      >
                        <option value="" disabled>Select your level...</option>
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
                      What would you pay monthly?{" "}
                      <span style={{ color: "var(--magenta)" }}>*</span>
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
                        <option value="">Select one...</option>
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
                    className="btn-primary w-full py-4 rounded-xl text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Joining..." : "Join the Waitlist"}
                  </button>

                  <p className="text-center text-xs text-muted">
                    No spam. No credit card. Your answers shape which languages launch first.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">
              Frequently asked questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="py-10 px-6"
        style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">

            {/* Left: logo + tagline */}
            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <AsaLogo size="sm" />
              <p className="text-xs text-muted">African Heritage Language Learning</p>
            </div>

            {/* Right: copyright + links */}
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>© {new Date().getFullYear()} Asa</span>
              <a
                href="#"
                className="hover:text-cream transition-colors duration-150"
                style={{ color: "var(--muted)" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-cream transition-colors duration-150"
                style={{ color: "var(--muted)" }}
              >
                Terms
              </a>
            </div>
          </div>

          {/* City dots row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            {[
              "Houston TX",
              "London UK",
              "Toronto Canada",
              "Nairobi Kenya",
              "New York NY",
            ].map((city) => (
              <span key={city} className="flex items-center gap-1.5">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--muted)", display: "inline-block" }}
                />
                {city}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

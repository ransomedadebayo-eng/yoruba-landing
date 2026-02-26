"use client";

// Platform UI Mockup: Asa African Heritage Creator Marketplace
// 5 screens navigable via top tabs
// Accessible at /mockup, share this link as a design reference

import { useState } from "react";

// ── Design tokens (mirroring globals.css vars, used inline) ────────────────
const C = {
  bg:           "#0B1628",
  surface:      "#152340",
  surface2:     "#1E3055",
  border:       "#2A3F60",
  magenta:      "#C2185B",
  magentaLight: "#E91E8C",
  magentaDim:   "rgba(194,24,91,0.12)",
  gold:         "#C8932A",
  goldLight:    "#E8B84B",
  goldDim:      "rgba(200,147,42,0.12)",
  cream:        "#F5EDD6",
  muted:        "#7A90AE",
  fontDisplay:  "var(--font-display, Poppins, Georgia, sans-serif)",
  fontBody:     "var(--font-body, Inter, system-ui, sans-serif)",
};

// ── Shared data ────────────────────────────────────────────────────────────
const EPISODES = [
  { num: 1, title: "The Sound System",    duration: "14 min", progress: 100, level: "A1" },
  { num: 2, title: "Greetings & Respect", duration: "12 min", progress: 60,  level: "A1" },
  { num: 3, title: "The Market Hustle",   duration: "16 min", progress: 0,   level: "A1" },
  { num: 4, title: "Family Structures",   duration: "13 min", progress: 0,   level: "A1" },
  { num: 5, title: "Food & Celebration",  duration: "15 min", progress: 0,   level: "A1" },
];

const VOCAB = [
  { yoruba: "E káàárọ̀",  english: "Good morning",  tone: "↗ ↘ ↗" },
  { yoruba: "E káàbọ̀",   english: "Welcome",        tone: "↗ ↘ ↘" },
  { yoruba: "Dáadáa ni",  english: "I am fine",      tone: "↘ ↗  ↗" },
  { yoruba: "Ẹ jọ̀ọ́",    english: "Please",          tone: "↗  ↘ ↗" },
  { yoruba: "Ẹ ṣéun",    english: "Thank you",       tone: "↗ ↘ ↗" },
  { yoruba: "O dàbọ̀",   english: "Goodbye",          tone: "↗ ↘ ↘" },
];

const DOMAINS = [
  { icon: "LG", name: "Language Learning",      tag: "Speak your roots",          creators: 12, courses: 34 },
  { icon: "MR", name: "Marriage & Relationships", tag: "Traditions that bind",      creators: 6,  courses: 18 },
  { icon: "CK", name: "Cooking & Cuisine",        tag: "Taste the culture",         creators: 9,  courses: 27 },
  { icon: "FT", name: "Folktales & Storytelling", tag: "Stories that last",         creators: 7,  courses: 21 },
  { icon: "FV", name: "Festivals & Celebrations", tag: "Live the calendar",         creators: 5,  courses: 14 },
  { icon: "MD", name: "Music & Dance",            tag: "Move with meaning",         creators: 8,  courses: 23 },
  { icon: "HH", name: "History & Heritage",       tag: "Know where you come from",  creators: 11, courses: 29 },
  { icon: "FA", name: "Fashion & Textiles",        tag: "Wear your story",           creators: 4,  courses: 12 },
];

const CREATORS = [
  { initials: "AO", name: "Adunola Okafor", rating: 4.9, reviews: 312, languages: ["Yoruba"],        bio: "Cultural educator and linguist from Ibadan. 15 years teaching Yoruba to diaspora communities in London and Houston.", courses: 3, featured: true  },
  { initials: "KA", name: "Kofi Asante",    rating: 4.7, reviews: 187, languages: ["Twi", "Ga"],     bio: "Ghanaian storyteller and language instructor. Teaches Twi through proverbs, songs, and traditional narratives.",      courses: 2, featured: false },
  { initials: "FM", name: "Fatuma Mbeki",   rating: 4.8, reviews: 241, languages: ["Swahili"],       bio: "Based in Nairobi and New York. Specializes in conversational Swahili for East African diaspora learners.",             courses: 4, featured: true  },
  { initials: "CE", name: "Chidi Eze",      rating: 4.6, reviews: 143, languages: ["Igbo"],          bio: "Igbo language advocate and cultural historian. Courses cover language, proverbs, and Igbo cosmology.",                courses: 2, featured: false },
];

const CREATOR_COURSES = [
  { title: "The Foundations of Yoruba",   level: "A1",    episodes: 8, duration: "1h 52m", rating: 4.9, reviews: 198, description: "Start from zero. Learn tones, greetings, and the sound system of Yoruba through cinematic storytelling." },
  { title: "Yoruba in Daily Life",         level: "A2",    episodes: 6, duration: "1h 24m", rating: 4.8, reviews: 87,  description: "Market conversations, family vocabulary, and navigating everyday Nigerian life in Yoruba." },
  { title: "The Culture Behind the Language", level: "A1-A2", episodes: 5, duration: "58m",   rating: 4.9, reviews: 27,  description: "Egungun, Ifa, Oriki: understanding the spiritual and cultural roots that give Yoruba its depth." },
];

const REVIEWS = [
  { name: "Amara T.",  rating: 5, text: "Adunola is extraordinary. I grew up hearing Yoruba but never speaking it. After 3 months I had my first full conversation with my grandmother.", tags: ["Culturally authentic", "Great for beginners"] },
  { name: "Marcus O.", rating: 5, text: "The production quality is unlike anything I've seen for African language learning. Every episode feels like a documentary.",                        tags: ["Excellent production", "Engaging teacher"]   },
];

const CEFR_LEVELS = ["A1", "A2", "B1", "B2"];

// ── Reusable primitives ────────────────────────────────────────────────────

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MagentaBtn({
  children,
  onClick,
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? C.surface2 : C.magenta,
        color: disabled ? C.muted : "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 24px",
        fontSize: 14,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: C.fontBody,
        transition: "opacity 0.15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: C.cream,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "10px 24px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: C.fontBody,
        transition: "border-color 0.15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Top navigation bar ─────────────────────────────────────────────────────

const SCREEN_LABELS = ["Home", "Domain", "Creator", "Player", "My Learning"] as const;

function TopNav({
  screen,
  setScreen,
}: {
  screen: number;
  setScreen: (n: number) => void;
}) {
  return (
    <div
      style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: C.magenta,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              fontFamily: C.fontDisplay,
            }}
          >
            A
          </div>
          <span
            style={{
              color: C.cream,
              fontWeight: 700,
              fontSize: 18,
              fontFamily: C.fontDisplay,
              letterSpacing: "-0.01em",
            }}
          >
            Asa
          </span>
        </div>

        {/* Screen tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {SCREEN_LABELS.map((label, i) => {
            const active = screen === i;
            return (
              <button
                key={label}
                onClick={() => setScreen(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: active ? `2px solid ${C.magenta}` : "2px solid transparent",
                  color: active ? C.cream : C.muted,
                  fontFamily: C.fontBody,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  padding: "0 14px",
                  height: 60,
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* User avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: C.surface2,
            border: `2px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 600,
            color: C.cream,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          T
        </div>
      </div>
    </div>
  );
}

// ── Screen 0: Home ─────────────────────────────────────────────────────────

function HomeScreen({ setScreen }: { setScreen: (n: number) => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "calc(100vh - 60px)", padding: "36px 24px 60px", fontFamily: C.fontBody }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Featured Creator hero banner */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderLeft: `4px solid ${C.gold}`,
            borderRadius: 16,
            padding: "32px 36px",
            marginBottom: 48,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle ambient glow */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 400,
              height: "100%",
              background: "radial-gradient(ellipse at 80% 50%, rgba(200,147,42,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              color: C.magenta,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 10,
              fontFamily: C.fontBody,
            }}
          >
            Featured Creator
          </p>
          <h2
            style={{
              fontFamily: C.fontDisplay,
              fontSize: 24,
              fontWeight: 700,
              color: C.cream,
              marginBottom: 6,
              lineHeight: 1.2,
            }}
          >
            Adunola Okafor
          </h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 6, fontFamily: C.fontBody }}>
            Yoruba Language &amp; Culture &middot; 4.9&#9733; &middot; 2,340 learners
          </p>
          <p style={{ color: C.cream, fontSize: 14, marginBottom: 24, fontFamily: C.fontBody, opacity: 0.85 }}>
            The Foundations of Yoruba, Season 1 now complete
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <MagentaBtn onClick={() => setScreen(2)} style={{ padding: "10px 22px", borderRadius: 10 }}>
              View Creator
            </MagentaBtn>
            <OutlineBtn onClick={() => setScreen(1)} style={{ padding: "10px 22px", borderRadius: 10 }}>
              See All Creators
            </OutlineBtn>
          </div>
        </div>

        {/* Explore by Domain */}
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              color: C.muted,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 20,
            }}
          >
            Explore by Domain
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {DOMAINS.map((domain) => {
              return (
                <div
                  key={domain.name}
                  onClick={() => setScreen(1)}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "20px 22px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = C.magenta; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; }}
                >
                  <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{domain.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: C.cream,
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: C.fontBody,
                        marginBottom: 3,
                      }}
                    >
                      {domain.name}
                    </p>
                    <p style={{ color: C.muted, fontSize: 12, marginBottom: 8, fontFamily: C.fontBody }}>
                      {domain.tag}
                    </p>
                    <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
                      {domain.creators} creators &middot; {domain.courses} courses
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Creators */}
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 16,
            }}
          >
            Recommended Creators
          </p>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {CREATORS.slice(0, 3).map((creator) => (
              <div
                key={creator.name}
                onClick={() => setScreen(2)}
                style={{
                  flexShrink: 0,
                  width: 220,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "20px 18px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.magenta} 0%, ${C.surface2} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: C.fontDisplay,
                  }}
                >
                  {creator.initials}
                </div>
                <div>
                  <p style={{ color: C.cream, fontSize: 14, fontWeight: 700, fontFamily: C.fontBody, marginBottom: 2 }}>
                    {creator.name}
                  </p>
                  <p style={{ color: C.muted, fontSize: 12, fontFamily: C.fontBody, marginBottom: 4 }}>
                    {creator.languages.join(", ")}
                  </p>
                  <p style={{ color: C.gold, fontSize: 12, fontFamily: C.fontBody }}>
                    &#9733; {creator.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen 1: Domain Page (Language) ───────────────────────────────────────

const LANG_FILTERS = ["All", "Yoruba", "Swahili", "Twi", "Igbo", "Amharic"];

function DomainScreen({ setScreen }: { setScreen: (n: number) => void }) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div style={{ background: C.bg, minHeight: "calc(100vh - 60px)", padding: "36px 24px 60px", fontFamily: C.fontBody }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Domain header */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderLeft: `4px solid ${C.gold}`,
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 32,
          }}
        >
          <p
            style={{
              color: C.magenta,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 8,
              fontFamily: C.fontBody,
            }}
          >
            Language Learning
          </p>
          <h2
            style={{
              fontFamily: C.fontDisplay,
              fontSize: 26,
              fontWeight: 700,
              color: C.cream,
              marginBottom: 6,
            }}
          >
            Speak your roots
          </h2>
          <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody }}>
            12 creators &middot; 34 courses &middot; A1 through B2
          </p>
        </div>

        {/* Filter row */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
          {LANG_FILTERS.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: active ? C.magenta : "transparent",
                  color: active ? "#fff" : C.muted,
                  border: `1px solid ${active ? C.magenta : C.border}`,
                  borderRadius: 99,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: C.fontBody,
                  transition: "all 0.15s",
                }}
              >
                {f}
              </button>
            );
          })}
          <div style={{ flex: 1 }} />
          {["4.5+ stars", "Top Rated"].map((chip) => (
            <button
              key={chip}
              style={{
                background: "transparent",
                color: C.muted,
                border: `1px solid ${C.border}`,
                borderRadius: 99,
                padding: "6px 16px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: C.fontBody,
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Creator grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {CREATORS.map((creator) => (
            <div
              key={creator.name}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "22px 24px",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: C.magenta,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: C.fontDisplay,
                    flexShrink: 0,
                  }}
                >
                  {creator.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                    <p style={{ color: C.cream, fontSize: 15, fontWeight: 700, fontFamily: C.fontBody }}>
                      {creator.name}
                    </p>
                    {creator.featured && (
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          background: C.goldDim,
                          color: C.gold,
                          border: `1px solid rgba(200,147,42,0.35)`,
                          borderRadius: 99,
                          fontWeight: 700,
                          fontFamily: C.fontBody,
                        }}
                      >
                        Asa Pick
                      </span>
                    )}
                  </div>
                  <p style={{ color: C.muted, fontSize: 12, fontFamily: C.fontBody }}>
                    &#9733; {creator.rating} &middot; {creator.reviews} reviews
                  </p>
                </div>
              </div>

              {/* Language tags */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {creator.languages.map((lang) => (
                  <span
                    key={lang}
                    style={{
                      fontSize: 11,
                      padding: "2px 9px",
                      background: C.surface2,
                      color: C.muted,
                      border: `1px solid ${C.border}`,
                      borderRadius: 99,
                      fontFamily: C.fontBody,
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p
                style={{
                  color: C.muted,
                  fontSize: 13,
                  fontFamily: C.fontBody,
                  lineHeight: 1.5,
                  marginBottom: 16,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {creator.bio}
              </p>

              {/* Bottom row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ color: C.muted, fontSize: 12, fontFamily: C.fontBody }}>
                  {creator.courses} courses
                </p>
                <MagentaBtn onClick={() => setScreen(2)} style={{ padding: "8px 18px", fontSize: 13, borderRadius: 9 }}>
                  View Profile
                </MagentaBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Screen 2: Creator Profile ───────────────────────────────────────────────

function CreatorProfileScreen({ setScreen }: { setScreen: (n: number) => void }) {
  const [activeTab, setActiveTab] = useState<"courses" | "about" | "reviews">("courses");

  return (
    <div style={{ background: C.bg, minHeight: "calc(100vh - 60px)", padding: "0 0 60px", fontFamily: C.fontBody }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header section */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            overflow: "hidden",
            marginTop: 32,
            marginBottom: 28,
          }}
        >
          {/* Banner gradient */}
          <div
            style={{
              height: 140,
              background: `linear-gradient(120deg, ${C.bg} 0%, ${C.surface2} 100%)`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 60% 50%, rgba(200,147,42,0.10) 0%, transparent 70%)",
              }}
            />
          </div>

          <div style={{ padding: "0 32px 28px" }}>
            {/* Avatar overlapping banner */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: C.magenta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                color: "#fff",
                fontFamily: C.fontDisplay,
                marginTop: -36,
                border: `3px solid ${C.surface}`,
                marginBottom: 16,
              }}
            >
              AO
            </div>

            {/* Name + chips */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
              <div>
                <h1
                  style={{
                    fontFamily: C.fontDisplay,
                    fontSize: 28,
                    fontWeight: 700,
                    color: C.cream,
                    marginBottom: 4,
                  }}
                >
                  Adunola Okafor
                </h1>
                <p style={{ color: C.muted, fontSize: 14, fontFamily: C.fontBody }}>
                  Yoruba Language &amp; Culture Educator
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 12px",
                    background: C.goldDim,
                    color: C.gold,
                    border: `1px solid rgba(200,147,42,0.35)`,
                    borderRadius: 99,
                    fontWeight: 700,
                    fontFamily: C.fontBody,
                  }}
                >
                  Asa Verified
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 12px",
                    background: C.magentaDim,
                    color: C.magentaLight,
                    border: `1px solid rgba(194,24,91,0.25)`,
                    borderRadius: 99,
                    fontWeight: 700,
                    fontFamily: C.fontBody,
                  }}
                >
                  Editorial Pick
                </span>
              </div>
            </div>

            {/* Meta row */}
            <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody }}>
              &#9733; 4.9 &middot; 312 reviews &middot; 2,340 learners &middot; Yoruba, English
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ borderBottom: `1px solid ${C.border}`, display: "flex", gap: 0, marginBottom: 28 }}>
          {(["courses", "about", "reviews"] as const).map((tab) => {
            const active = activeTab === tab;
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: active ? `2px solid ${C.magenta}` : "2px solid transparent",
                  color: active ? C.cream : C.muted,
                  fontFamily: C.fontBody,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  padding: "10px 24px",
                  cursor: "pointer",
                  marginBottom: -1,
                  transition: "color 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Courses tab */}
        {activeTab === "courses" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {CREATOR_COURSES.map((course) => (
                <div
                  key={course.title}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "22px 24px",
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Thumbnail placeholder */}
                  <div
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${C.surface2} 0%, ${C.bg} 100%)`,
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: C.gold,
                        fontFamily: C.fontDisplay,
                        opacity: 0.7,
                      }}
                    >
                      A
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <p style={{ color: C.cream, fontSize: 16, fontWeight: 700, fontFamily: C.fontBody }}>
                        {course.title}
                      </p>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          background: C.goldDim,
                          color: C.gold,
                          border: `1px solid rgba(200,147,42,0.3)`,
                          borderRadius: 99,
                          fontWeight: 700,
                          fontFamily: C.fontBody,
                        }}
                      >
                        {course.level}
                      </span>
                    </div>
                    <p style={{ color: C.muted, fontSize: 12, fontFamily: C.fontBody, marginBottom: 6 }}>
                      {course.episodes} episodes &middot; {course.duration} &middot; &#9733; {course.rating} ({course.reviews})
                    </p>
                    <p
                      style={{
                        color: C.muted,
                        fontSize: 13,
                        fontFamily: C.fontBody,
                        lineHeight: 1.5,
                        marginBottom: 14,
                      }}
                    >
                      {course.description}
                    </p>
                    <MagentaBtn
                      onClick={() => setScreen(3)}
                      style={{ padding: "8px 20px", fontSize: 13, borderRadius: 9 }}
                    >
                      Start Course
                    </MagentaBtn>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews preview */}
            <p
              style={{
                color: C.muted,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Recent Reviews
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "20px 22px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: C.surface2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.muted,
                        flexShrink: 0,
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, fontFamily: C.fontBody }}>
                        {review.name}
                      </p>
                      <p style={{ color: C.gold, fontSize: 12 }}>{review.rating.toFixed(1)}</p>
                    </div>
                  </div>
                  <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody, lineHeight: 1.55, marginBottom: 12 }}>
                    {review.text}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          padding: "2px 10px",
                          background: C.surface2,
                          color: C.muted,
                          border: `1px solid ${C.border}`,
                          borderRadius: 99,
                          fontFamily: C.fontBody,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About tab */}
        {activeTab === "about" && (
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: "28px 28px",
            }}
          >
            <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody, lineHeight: 1.6 }}>
              Adunola Okafor is a cultural educator and linguist from Ibadan, Nigeria. With 15 years of experience
              teaching Yoruba to diaspora communities in London and Houston, she brings a deeply personal and cinematic
              approach to language instruction. Her courses blend linguistics, storytelling, and cultural history to
              give learners not just a language, but a world to step into.
            </p>
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "20px 22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: C.surface2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.muted,
                      flexShrink: 0,
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, fontFamily: C.fontBody }}>
                      {review.name}
                    </p>
                    <p style={{ color: C.gold, fontSize: 12 }}>{review.rating.toFixed(1)}</p>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody, lineHeight: 1.55, marginBottom: 12 }}>
                  {review.text}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: "2px 10px",
                        background: C.surface2,
                        color: C.muted,
                        border: `1px solid ${C.border}`,
                        borderRadius: 99,
                        fontFamily: C.fontBody,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Screen 3: Player ───────────────────────────────────────────────────────

function PlayerScreen({ setScreen }: { setScreen: (n: number) => void }) {
  const [activeTab, setActiveTab] = useState<"vocabulary" | "notes" | "quiz">("vocabulary");

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "calc(100vh - 60px)",
        padding: "28px 24px 48px",
        fontFamily: C.fontBody,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 24,
        }}
      >
        {/* Left: creator bar + video + tabs */}
        <div>
          {/* Creator bar */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.magenta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                fontFamily: C.fontDisplay,
                flexShrink: 0,
              }}
            >
              AO
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, fontFamily: C.fontBody }}>
                Adunola Okafor
              </p>
              <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
                Yoruba Language &amp; Culture
              </p>
            </div>
            <button
              onClick={() => setScreen(2)}
              style={{
                background: "transparent",
                border: "none",
                color: C.magenta,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: C.fontBody,
              }}
            >
              View Profile
            </button>
          </div>

          {/* 16:9 video player */}
          <div
            style={{
              aspectRatio: "16/9",
              background: "#080f1c",
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              position: "relative",
              overflow: "hidden",
              marginBottom: 0,
            }}
          >
            {/* Radial ambient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 60%, rgba(194,24,91,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Episode badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "rgba(11,22,40,0.85)",
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                color: C.gold,
                fontWeight: 600,
                zIndex: 2,
              }}
            >
              Yoruba &middot; S1 &middot; E2
            </div>

            {/* Gold play button */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: C.magenta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                boxShadow: `0 0 32px rgba(194,24,91,0.4)`,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "14px solid transparent",
                  borderBottom: "14px solid transparent",
                  borderLeft: "22px solid #fff",
                  marginLeft: 4,
                }}
              />
            </div>

            {/* Interactive subtitle bar */}
            <div
              style={{
                position: "absolute",
                bottom: 56,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  background: "rgba(11,22,40,0.92)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: C.gold, fontSize: 15, fontWeight: 600 }}>E káàárọ̀</span>
                <span style={{ color: C.muted, fontSize: 14 }}>-</span>
                <span style={{ color: C.cream, fontSize: 14 }}>Good morning</span>
                <span
                  style={{
                    fontSize: 10,
                    color: C.magentaLight,
                    border: `1px solid rgba(233,30,140,0.3)`,
                    borderRadius: 4,
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  tap for more
                </span>
              </div>
            </div>

            {/* Progress bar + controls */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
              }}
            >
              <div style={{ height: 3, background: C.border }}>
                <div style={{ height: "100%", width: "60%", background: C.magenta }} />
              </div>
              <div
                style={{
                  background: "rgba(11,22,40,0.95)",
                  padding: "9px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 16, cursor: "pointer", color: C.muted }}>&#10226;</span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: C.magenta,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>II</span>
                  </div>
                  <span style={{ fontSize: 16, cursor: "pointer", color: C.muted }}>&#10227;</span>
                  <span style={{ fontSize: 12, color: C.muted }}>7:12 / 12:00</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: C.magenta,
                      border: `1px solid rgba(194,24,91,0.3)`,
                      borderRadius: 4,
                      padding: "2px 7px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    0.75x
                  </span>
                  <span style={{ fontSize: 12, color: C.muted, cursor: "pointer" }}>CC</span>
                  <span style={{ fontSize: 14, color: C.muted, cursor: "pointer" }}>&#x26F6;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              gap: 0,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {(["vocabulary", "notes", "quiz"] as const).map((tab) => {
              const active = activeTab === tab;
              const label = tab === "vocabulary" ? "Vocabulary" : tab === "notes" ? "Notes" : "Quiz";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: active ? `2px solid ${C.magenta}` : "2px solid transparent",
                    color: active ? C.cream : C.muted,
                    fontFamily: C.fontBody,
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    padding: "8px 20px",
                    cursor: "pointer",
                    marginBottom: -1,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Vocabulary tab */}
          {activeTab === "vocabulary" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {VOCAB.map((w) => (
                  <div
                    key={w.yoruba}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        color: C.cream,
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: C.fontBody,
                        marginBottom: 3,
                      }}
                    >
                      {w.yoruba}
                    </div>
                    <div style={{ color: C.muted, fontSize: 12, marginBottom: 4 }}>{w.english}</div>
                    <div
                      style={{
                        color: C.gold,
                        fontSize: 11,
                        fontFamily: "monospace",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {w.tone}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mid-episode quiz callout */}
              <div
                style={{
                  background: `rgba(200,147,42,0.06)`,
                  border: `1px solid rgba(200,147,42,0.28)`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: C.gold,
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 4,
                      fontFamily: C.fontBody,
                    }}
                  >
                    Quick check: 8:30 mark
                  </p>
                  <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody }}>
                    How do you greet an elder?
                  </p>
                </div>
                <MagentaBtn style={{ padding: "8px 18px", fontSize: 12, borderRadius: 8 }}>
                  Answer now
                </MagentaBtn>
              </div>
            </div>
          )}

          {/* Notes tab placeholder */}
          {activeTab === "notes" && (
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 24,
                minHeight: 200,
              }}
            >
              <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody }}>
                Your episode notes will appear here. Tap any subtitle to save it as a note.
              </p>
            </div>
          )}

          {/* Quiz tab placeholder */}
          {activeTab === "quiz" && (
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 24,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p style={{ color: C.cream, fontSize: 15, fontWeight: 600, fontFamily: C.fontDisplay }}>
                Episode 2 Quiz
              </p>
              <p style={{ color: C.muted, fontSize: 13, fontFamily: C.fontBody }}>
                Complete the episode to unlock the full quiz. 5 questions on greetings and respect.
              </p>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Language switcher */}
          <Card style={{ padding: 16 }}>
            <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: C.fontBody }}>
              Language
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              {["Yoruba", "Swahili", "Twi"].map((lang) => (
                <div
                  key={lang}
                  style={{
                    flex: 1,
                    padding: "6px 0",
                    borderRadius: 8,
                    background: lang === "Yoruba" ? C.magentaDim : "transparent",
                    border: `1px solid ${lang === "Yoruba" ? C.magenta : C.border}`,
                    textAlign: "center",
                    fontSize: 11,
                    color: lang === "Yoruba" ? C.cream : C.muted,
                    fontWeight: lang === "Yoruba" ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: C.fontBody,
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          </Card>

          {/* Up Next */}
          <Card style={{ padding: 16 }}>
            <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: C.fontBody }}>
              Up Next
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {EPISODES.slice(2, 4).map((ep) => (
                <div
                  key={ep.num}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 36,
                      borderRadius: 6,
                      background: C.surface2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.gold,
                      fontFamily: C.fontDisplay,
                    }}
                  >
                    E{ep.num}
                  </div>
                  <div>
                    <p style={{ color: C.cream, fontSize: 12, fontWeight: 600, fontFamily: C.fontBody, marginBottom: 2 }}>
                      {ep.title}
                    </p>
                    <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>{ep.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Progress card */}
          <Card style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, fontFamily: C.fontBody }}>Your progress</p>
              <span
                style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  background: C.magentaDim,
                  color: C.magentaLight,
                  borderRadius: 99,
                  border: `1px solid rgba(194,24,91,0.25)`,
                  fontWeight: 600,
                  fontFamily: C.fontBody,
                }}
              >
                CEFR A1
              </span>
            </div>
            {/* Streak dots */}
            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: 5,
                      background: i < 5 ? C.magenta : C.border,
                      marginBottom: 3,
                    }}
                  />
                  <span style={{ fontSize: 9, color: C.muted }}>{day}</span>
                </div>
              ))}
            </div>
            <p style={{ color: C.magenta, fontSize: 11, fontWeight: 600, textAlign: "center", marginBottom: 14, fontFamily: C.fontBody }}>
              5-day streak
            </p>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: C.fontBody }}>Yoruba A1 progress</span>
                <span style={{ fontSize: 11, color: C.magenta, fontWeight: 600, fontFamily: C.fontBody }}>34%</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 99 }}>
                <div style={{ height: "100%", width: "34%", background: C.magenta, borderRadius: 99 }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Screen 4: My Learning ──────────────────────────────────────────────────

const MY_COURSES = [
  { course: "The Foundations of Yoruba", creator: "Adunola Okafor", progress: 62, episode: "E5 of 8", level: "A1" },
  { course: "Yoruba in Daily Life",        creator: "Adunola Okafor", progress: 17, episode: "E1 of 6", level: "A2" },
];

const SAVED_CREATORS = [
  { initials: "AO", name: "Adunola Okafor" },
  { initials: "FM", name: "Fatuma Mbeki"   },
];

function MyLearningScreen({ setScreen }: { setScreen: (n: number) => void }) {
  return (
    <div
      style={{
        background: C.bg,
        minHeight: "calc(100vh - 60px)",
        padding: "36px 24px 60px",
        fontFamily: C.fontBody,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <h1
          style={{
            fontFamily: C.fontDisplay,
            fontSize: 28,
            fontWeight: 700,
            color: C.cream,
            marginBottom: 32,
          }}
        >
          My Learning
        </h1>

        {/* Currently Learning */}
        <p
          style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          Currently Learning
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
          {MY_COURSES.map((item) => (
            <div
              key={item.course}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "20px 22px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
              }}
            >
              {/* Thumbnail placeholder */}
              <div
                style={{
                  width: 96,
                  height: 64,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${C.surface2} 0%, ${C.bg} 100%)`,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.gold,
                  fontFamily: C.fontDisplay,
                  opacity: 0.7,
                }}
              >
                A
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                  <p style={{ color: C.cream, fontSize: 15, fontWeight: 700, fontFamily: C.fontBody }}>
                    {item.course}
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      background: C.goldDim,
                      color: C.gold,
                      border: `1px solid rgba(200,147,42,0.3)`,
                      borderRadius: 99,
                      fontWeight: 700,
                      fontFamily: C.fontBody,
                    }}
                  >
                    {item.level}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: C.magenta,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: C.fontDisplay,
                      flexShrink: 0,
                    }}
                  >
                    AO
                  </div>
                  <p style={{ color: C.muted, fontSize: 12, fontFamily: C.fontBody }}>{item.creator}</p>
                </div>
                {/* Progress bar */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ height: 4, background: C.border, borderRadius: 99, marginBottom: 5 }}>
                    <div style={{ height: "100%", width: `${item.progress}%`, background: C.magenta, borderRadius: 99 }} />
                  </div>
                  <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
                    {item.episode} &middot; {item.progress}% complete
                  </p>
                </div>
                <MagentaBtn
                  onClick={() => setScreen(3)}
                  style={{ padding: "8px 18px", fontSize: 13, borderRadius: 9 }}
                >
                  Continue
                </MagentaBtn>
              </div>
            </div>
          ))}
        </div>

        {/* CEFR Journey */}
        <p
          style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}
        >
          CEFR Journey
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 44 }}>
          {CEFR_LEVELS.map((level, i) => {
            const active = level === "A1";
            return (
              <div
                key={level}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i < CEFR_LEVELS.length - 1 ? 1 : "none",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  {active ? (
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: `conic-gradient(${C.magenta} 34%, ${C.border} 34%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: C.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.magenta, fontFamily: C.fontDisplay }}>
                          {level}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: C.surface,
                        border: `2px solid ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.muted, fontFamily: C.fontDisplay }}>
                        {level}
                      </span>
                    </div>
                  )}
                  <span style={{ fontSize: 10, color: active ? C.magenta : C.muted }}>
                    {active ? "In progress" : "Locked"}
                  </span>
                </div>
                {i < CEFR_LEVELS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: C.border,
                      margin: "0 8px",
                      marginBottom: 20,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 44,
          }}
        >
          {[
            { label: "Episodes Completed", value: "5 of 14" },
            { label: "Vocabulary Learned",  value: "38 words" },
            { label: "Current Streak",      value: "7 days"   },
            { label: "Time Learning",        value: "2h 14m"   },
          ].map((stat) => (
            <Card key={stat.label} style={{ padding: "20px 16px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: C.fontDisplay,
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.cream,
                  marginBottom: 6,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  color: C.muted,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Saved Creators */}
        <p
          style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          Saved Creators
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {SAVED_CREATORS.map((creator) => (
            <div
              key={creator.name}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: C.magenta,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: C.fontDisplay,
                  flexShrink: 0,
                }}
              >
                {creator.initials}
              </div>
              <p style={{ color: C.cream, fontSize: 14, fontWeight: 600, fontFamily: C.fontBody }}>
                {creator.name}
              </p>
              <OutlineBtn style={{ padding: "6px 14px", fontSize: 12, borderRadius: 8 }}>
                Following
              </OutlineBtn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Root: orchestrates all screens ─────────────────────────────────────────

export default function MockupPage() {
  const [screen, setScreen] = useState(0);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: C.fontBody }}>
      <TopNav screen={screen} setScreen={setScreen} />
      {screen === 0 && <HomeScreen setScreen={setScreen} />}
      {screen === 1 && <DomainScreen setScreen={setScreen} />}
      {screen === 2 && <CreatorProfileScreen setScreen={setScreen} />}
      {screen === 3 && <PlayerScreen setScreen={setScreen} />}
      {screen === 4 && <MyLearningScreen setScreen={setScreen} />}
      <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, textAlign: "center", padding: "16px 24px 28px" }}>
        <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
          UI mockup — creator marketplace model. Back to landing page at{" "}
          <a href="/" style={{ color: C.muted, textDecoration: "underline" }}>/</a>
        </p>
      </div>
    </div>
  );
}

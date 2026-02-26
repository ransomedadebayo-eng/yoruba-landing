"use client";

// Platform UI Mockup — Asa: African Heritage Language Learning
// 5 screens navigable via top tabs
// Accessible at /mockup — share this link as a design reference

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

const SCREEN_LABELS = ["Onboarding", "Dashboard", "Player", "Progress", "Practice"] as const;

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

// ── Screen 1: Onboarding ───────────────────────────────────────────────────

const LANGUAGES = [
  { code: "yo", label: "Yoruba",  flag: "🇳🇬" },
  { code: "sw", label: "Swahili", flag: "🇰🇪" },
  { code: "tw", label: "Twi",     flag: "🇬🇭" },
  { code: "ig", label: "Igbo",    flag: "🇳🇬" },
  { code: "am", label: "Amharic", flag: "🇪🇹" },
  { code: "ot", label: "Other",   flag: "" },
];

const LEVELS = [
  "Complete beginner",
  "I understand but can't speak",
  "I know a few phrases",
  "Conversational",
];

const REASONS = [
  "Connect with family",
  "Raise my children with the language",
  "Personal heritage connection",
  "Cultural curiosity",
];

function OnboardingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const totalSteps = 3;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: C.bg,
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>

        {/* Step indicator */}
        {step < totalSteps && (
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: dot === step ? 24 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: dot === step ? C.magenta : dot < step ? C.magenta : C.border,
                    opacity: dot < step ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: C.fontBody }}>
              Step {step + 1} of {totalSteps}
            </span>
          </div>
        )}

        {/* Step 0: Language selection */}
        {step === 0 && (
          <div>
            <h2
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 28,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              What's your heritage language?
            </h2>
            <p style={{ color: C.muted, textAlign: "center", marginBottom: 32, fontSize: 14, fontFamily: C.fontBody }}>
              Choose the language you want to reconnect with.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 32,
              }}
            >
              {LANGUAGES.map((lang) => {
                const selected = selectedLanguage === lang.code;
                return (
                  <div
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    style={{
                      background: selected ? C.magentaDim : "rgba(255,255,255,0.02)",
                      border: `2px solid ${selected ? C.magenta : C.border}`,
                      borderRadius: 12,
                      padding: "20px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    {lang.flag && (
                      <span style={{ fontSize: 28, lineHeight: 1 }}>{lang.flag}</span>
                    )}
                    {!lang.flag && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: C.surface2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: C.muted,
                        }}
                      >
                        +
                      </div>
                    )}
                    <span
                      style={{
                        fontFamily: C.fontBody,
                        fontSize: 15,
                        fontWeight: selected ? 600 : 400,
                        color: selected ? C.cream : C.muted,
                      }}
                    >
                      {lang.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <MagentaBtn
              disabled={!selectedLanguage}
              onClick={() => setStep(1)}
              style={{ width: "100%", padding: "14px 0", fontSize: 15, borderRadius: 12 }}
            >
              Continue
            </MagentaBtn>
          </div>
        )}

        {/* Step 1: Level selection */}
        {step === 1 && (
          <div>
            <h2
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 28,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              What's your current level?
            </h2>
            <p style={{ color: C.muted, textAlign: "center", marginBottom: 32, fontSize: 14, fontFamily: C.fontBody }}>
              Be honest, there's no wrong answer.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {LEVELS.map((level) => {
                const selected = selectedLevel === level;
                return (
                  <div
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    style={{
                      background: selected ? C.magentaDim : "rgba(255,255,255,0.02)",
                      border: `2px solid ${selected ? C.magenta : C.border}`,
                      borderRadius: 12,
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    {/* Radio dot */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${selected ? C.magenta : C.muted}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selected && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: C.magenta,
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: C.fontBody,
                        fontSize: 14,
                        fontWeight: selected ? 600 : 400,
                        color: selected ? C.cream : C.muted,
                      }}
                    >
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <OutlineBtn onClick={() => setStep(0)} style={{ flex: 1, padding: "14px 0", borderRadius: 12 }}>
                Back
              </OutlineBtn>
              <MagentaBtn
                disabled={!selectedLevel}
                onClick={() => setStep(2)}
                style={{ flex: 2, padding: "14px 0", fontSize: 15, borderRadius: 12 }}
              >
                Continue
              </MagentaBtn>
            </div>
          </div>
        )}

        {/* Step 2: Reason selection */}
        {step === 2 && (
          <div>
            <h2
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 28,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Why are you learning?
            </h2>
            <p style={{ color: C.muted, textAlign: "center", marginBottom: 32, fontSize: 14, fontFamily: C.fontBody }}>
              This helps us personalize your experience.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {REASONS.map((reason) => {
                const selected = selectedReason === reason;
                return (
                  <div
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    style={{
                      background: selected ? C.magentaDim : "rgba(255,255,255,0.02)",
                      border: `2px solid ${selected ? C.magenta : C.border}`,
                      borderRadius: 12,
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${selected ? C.magenta : C.muted}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selected && (
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.magenta }} />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: C.fontBody,
                        fontSize: 14,
                        fontWeight: selected ? 600 : 400,
                        color: selected ? C.cream : C.muted,
                      }}
                    >
                      {reason}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <OutlineBtn onClick={() => setStep(1)} style={{ flex: 1, padding: "14px 0", borderRadius: 12 }}>
                Back
              </OutlineBtn>
              <MagentaBtn
                disabled={!selectedReason}
                onClick={() => setStep(3)}
                style={{ flex: 2, padding: "14px 0", fontSize: 15, borderRadius: 12 }}
              >
                Continue
              </MagentaBtn>
            </div>
          </div>
        )}

        {/* Step 3: Welcome */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            {/* Decorative glow */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: C.magenta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
                fontSize: 32,
                boxShadow: `0 0 48px rgba(194,24,91,0.35)`,
              }}
            >
              A
            </div>
            <h1
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 48,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Welcome home.
            </h1>
            <p
              style={{
                color: C.muted,
                fontSize: 16,
                marginBottom: 40,
                fontFamily: C.fontBody,
              }}
            >
              Your Yoruba journey starts here.
            </p>
            <MagentaBtn
              onClick={onFinish}
              style={{ padding: "14px 48px", fontSize: 16, borderRadius: 12 }}
            >
              Go to Dashboard
            </MagentaBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Screen 2: Dashboard ────────────────────────────────────────────────────

const CONTINUE_CARDS = [
  { num: 1, title: "The Sound System",    duration: "14 min", progress: 100 },
  { num: 2, title: "Greetings & Respect", duration: "12 min", progress: 60  },
  { num: 3, title: "The Market Hustle",   duration: "16 min", progress: 0   },
];

const SEASON1_CARDS = [
  { num: 1, title: "The Sound System",    duration: "14 min", progress: 100 },
  { num: 2, title: "Greetings & Respect", duration: "12 min", progress: 60  },
  { num: 3, title: "The Market Hustle",   duration: "16 min", progress: 0   },
  { num: 4, title: "Family Structures",   duration: "13 min", progress: 0   },
  { num: 5, title: "Food & Celebration",  duration: "15 min", progress: 0   },
];

const CULTURE_CARDS = [
  { title: "Balogun Market",    subtitle: "Commerce & Culture",    level: "A1" },
  { title: "Egungun Festival",  subtitle: "Ancestral Masquerade",  level: "A2" },
  { title: "Yoruba Cuisine",    subtitle: "Food Vocabulary",       level: "A1" },
];

const PRACTICE_CARDS = [
  { icon: "▣", title: "Flashcards",   subtitle: "12 cards due today" },
  { icon: "◎", title: "Tone Trainer", subtitle: "5 min daily drill" },
  { icon: "★", title: "Word of Day",  subtitle: "Àánú - Compassion" },
];

function EpisodeThumb({
  num,
  title,
  duration,
  progress,
}: {
  num: number;
  title: string;
  duration: string;
  progress: number;
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 200,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 112,
          background: `linear-gradient(135deg, ${C.surface2} 0%, ${C.bg} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: C.gold,
            fontFamily: C.fontDisplay,
            opacity: 0.6,
          }}
        >
          E{num}
        </span>
        {progress === 100 && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: C.magenta,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
            }}
          >
            ✓
          </div>
        )}
        {progress > 0 && progress < 100 && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: C.border }}>
            <div style={{ height: "100%", width: `${progress}%`, background: C.magenta }} />
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: "10px 12px" }}>
        <p
          style={{
            color: C.cream,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: C.fontBody,
            marginBottom: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </p>
        <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>{duration}</p>
      </div>
    </div>
  );
}

function Carousel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span
          style={{
            fontFamily: C.fontDisplay,
            fontSize: 16,
            fontWeight: 600,
            color: C.cream,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 12,
            color: C.gold,
            cursor: "pointer",
            fontFamily: C.fontBody,
          }}
        >
          See all
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DashboardScreen({ onGoPlayer }: { onGoPlayer: () => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "calc(100vh - 60px)", display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          padding: "32px 0",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {[
          { icon: "⌂", label: "Home",        active: true  },
          { icon: "◈", label: "My Progress",  active: false },
          { icon: "◇", label: "Practice",     active: false },
          { icon: "◎", label: "Community",    active: false },
          { icon: "○", label: "Profile",      active: false },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 24px",
              cursor: "pointer",
              borderLeft: `3px solid ${item.active ? C.magenta : "transparent"}`,
              background: item.active ? C.magentaDim : "transparent",
            }}
          >
            <span style={{ fontSize: 16, color: item.active ? C.magenta : C.muted }}>{item.icon}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: item.active ? 600 : 400,
                color: item.active ? C.cream : C.muted,
                fontFamily: C.fontBody,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "32px 32px 48px", overflowY: "auto" }}>

        {/* Hero banner */}
        <div
          style={{
            background: `linear-gradient(120deg, ${C.surface2} 0%, ${C.surface} 100%)`,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle glow */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 300,
              height: "100%",
              background: "radial-gradient(ellipse at 80% 50%, rgba(194,24,91,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div>
            <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: C.fontBody }}>
              Continue Watching
            </p>
            <h2
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 22,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 4,
              }}
            >
              Episode 2: Greetings & Respect
            </h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, fontFamily: C.fontBody }}>
              Yoruba, Season 1
            </p>
            {/* Progress bar */}
            <div style={{ width: 260, height: 4, background: C.border, borderRadius: 99, marginBottom: 16 }}>
              <div style={{ height: "100%", width: "60%", background: C.magenta, borderRadius: 99 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <MagentaBtn onClick={onGoPlayer} style={{ padding: "9px 24px", fontSize: 13, borderRadius: 8 }}>
                Resume
              </MagentaBtn>
              <span
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  background: C.magentaDim,
                  color: C.magentaLight,
                  border: `1px solid rgba(194,24,91,0.25)`,
                  borderRadius: 99,
                  fontWeight: 600,
                  fontFamily: C.fontBody,
                }}
              >
                CEFR A1
              </span>
            </div>
          </div>
          <div
            style={{
              width: 120,
              height: 80,
              borderRadius: 10,
              background: C.bg,
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.magenta,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "7px solid transparent",
                  borderBottom: "7px solid transparent",
                  borderLeft: "11px solid #fff",
                  marginLeft: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* Carousels */}
        <Carousel title="Continue Learning">
          {CONTINUE_CARDS.map((ep) => (
            <EpisodeThumb key={ep.num} {...ep} />
          ))}
        </Carousel>

        <Carousel title="Season 1: The Foundations (A1)">
          {SEASON1_CARDS.map((ep) => (
            <EpisodeThumb key={ep.num} {...ep} />
          ))}
        </Carousel>

        <Carousel title="Cultural Immersion">
          {CULTURE_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                flexShrink: 0,
                width: 200,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: 112,
                  background: `linear-gradient(135deg, rgba(200,147,42,0.15) 0%, ${C.bg} 100%)`,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    background: C.goldDim,
                    color: C.gold,
                    border: `1px solid rgba(200,147,42,0.3)`,
                    borderRadius: 99,
                    fontWeight: 600,
                    fontFamily: C.fontBody,
                  }}
                >
                  {card.level}
                </span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <p style={{ color: C.cream, fontSize: 12, fontWeight: 600, fontFamily: C.fontBody, marginBottom: 3 }}>
                  {card.title}
                </p>
                <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>{card.subtitle}</p>
              </div>
            </div>
          ))}
        </Carousel>

        <Carousel title="Daily Practice">
          {PRACTICE_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                flexShrink: 0,
                width: 200,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "20px 16px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 10,
                  color: C.magenta,
                }}
              >
                {card.icon}
              </div>
              <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, fontFamily: C.fontBody, marginBottom: 4 }}>
                {card.title}
              </p>
              <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>{card.subtitle}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

// ── Screen 3: Episode Player ───────────────────────────────────────────────

function PlayerScreen() {
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
        {/* Left: video + tabs */}
        <div>
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

// ── Screen 4: Progress Dashboard ───────────────────────────────────────────

const CEFR_LEVELS = ["A1", "A2", "B1", "B2"];

// 6 rows x 7 cols — current week is row 5, Mon-Fri filled
const HEATMAP_DATA: number[][] = [
  [1, 0, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 0], // current week
];

const ACHIEVEMENTS = [
  { icon: "▣", title: "First Episode",  subtitle: "Completed your first lesson", unlocked: true  },
  { icon: "◆", title: "5-Day Streak",   subtitle: "Practiced 5 days in a row",   unlocked: true  },
  { icon: "♪", title: "Tone Master",    subtitle: "Score 90%+ on tone exercises", unlocked: false },
];

function ProgressScreen() {
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

        {/* CEFR roadmap */}
        <div style={{ marginBottom: 40 }}>
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
            Your CEFR Journey
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {CEFR_LEVELS.map((level, i) => {
              const active = level === "A1";
              const done = false;
              return (
                <div key={level} style={{ display: "flex", alignItems: "center", flex: i < CEFR_LEVELS.length - 1 ? 1 : "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    {/* Progress ring for A1 */}
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
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: C.magenta,
                              fontFamily: C.fontDisplay,
                            }}
                          >
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
                          background: done ? C.surface2 : C.surface,
                          border: `2px solid ${done ? C.border : C.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: C.muted,
                            fontFamily: C.fontDisplay,
                          }}
                        >
                          {level}
                        </span>
                      </div>
                    )}
                    <span style={{ fontSize: 10, color: active ? C.magenta : C.muted }}>
                      {active ? "In progress" : "Locked"}
                    </span>
                  </div>
                  {/* Connector line */}
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
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 36,
          }}
        >
          {[
            { label: "Episodes Completed", value: "1 of 8", sub: "Season 1"     },
            { label: "Vocabulary Learned",  value: "24",      sub: "words"        },
            { label: "Current Streak",      value: "5",       sub: "days"         },
            { label: "Time Learning",        value: "1h 42m",  sub: "total"        },
          ].map((stat) => (
            <Card key={stat.label} style={{ padding: "20px 16px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: C.fontDisplay,
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.cream,
                  marginBottom: 4,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>{stat.sub}</p>
              <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Weekly heatmap */}
        <Card style={{ padding: "24px 24px 20px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ color: C.cream, fontSize: 14, fontWeight: 600, fontFamily: C.fontDisplay }}>
              Activity
            </p>
            <p style={{ color: C.muted, fontSize: 12 }}>Last 6 weeks</p>
          </div>
          {/* Day labels */}
          <div style={{ display: "flex", gap: 5, marginBottom: 5, paddingLeft: 0 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 10, color: C.muted }}>
                {d}
              </div>
            ))}
          </div>
          {/* Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {HEATMAP_DATA.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 5 }}>
                {row.map((filled, ci) => (
                  <div
                    key={ci}
                    style={{
                      flex: 1,
                      aspectRatio: "1",
                      borderRadius: 4,
                      background:
                        ri === 5 && filled
                          ? C.magenta
                          : filled
                          ? `rgba(194,24,91,0.25)`
                          : C.surface2,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 14,
            }}
          >
            Achievements
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {ACHIEVEMENTS.map((ach) => (
              <Card
                key={ach.title}
                style={{
                  padding: "20px 20px",
                  border: ach.unlocked ? `1px solid rgba(200,147,42,0.4)` : `1px solid ${C.border}`,
                  opacity: ach.unlocked ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    color: ach.unlocked ? C.gold : C.muted,
                    marginBottom: 10,
                  }}
                >
                  {ach.icon}
                </div>
                <p
                  style={{
                    color: ach.unlocked ? C.cream : C.muted,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: C.fontBody,
                    marginBottom: 4,
                  }}
                >
                  {ach.title}
                </p>
                <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
                  {ach.unlocked ? ach.subtitle : "Keep going to unlock this"}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen 5: Practice Hub ─────────────────────────────────────────────────

function PracticeScreen() {
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
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontFamily: C.fontDisplay,
              fontSize: 24,
              fontWeight: 700,
              color: C.cream,
              marginBottom: 6,
            }}
          >
            Practice Hub
          </h2>
          <p style={{ color: C.muted, fontSize: 13 }}>
            Daily exercises tailored to your Yoruba A1 progress.
          </p>
        </div>

        {/* 2x2 module grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Card 1: Flashcards */}
          <Card style={{ padding: "28px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontSize: 32, color: C.magenta }}>▣</span>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  background: C.magentaDim,
                  color: C.magentaLight,
                  border: `1px solid rgba(194,24,91,0.25)`,
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                Due today
              </span>
            </div>
            <p
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 17,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 6,
              }}
            >
              Flashcards
            </p>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 6 }}>12 cards due today</p>
            {/* Progress bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: C.muted }}>Mastered</span>
                <span style={{ fontSize: 11, color: C.cream, fontWeight: 600 }}>8 / 20</span>
              </div>
              <div style={{ height: 5, background: C.border, borderRadius: 99 }}>
                <div style={{ height: "100%", width: "40%", background: C.magenta, borderRadius: 99 }} />
              </div>
            </div>
            <MagentaBtn style={{ width: "100%", padding: "10px 0", borderRadius: 9 }}>
              Start Review
            </MagentaBtn>
          </Card>

          {/* Card 2: Conversation Simulator */}
          <Card style={{ padding: "28px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontSize: 32, color: C.magenta }}>◎</span>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  background: C.goldDim,
                  color: C.gold,
                  border: `1px solid rgba(200,147,42,0.25)`,
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                A1
              </span>
            </div>
            <p
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 17,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 6,
              }}
            >
              Conversation Simulator
            </p>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 6 }}>5 scenarios available</p>
            <p style={{ color: C.muted, fontSize: 12, marginBottom: 20 }}>Practice real-life dialogues with instant feedback.</p>
            <MagentaBtn style={{ width: "100%", padding: "10px 0", borderRadius: 9 }}>
              Start Practice
            </MagentaBtn>
          </Card>

          {/* Card 3: Pronunciation Clinic */}
          <Card style={{ padding: "28px 24px" }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32, color: C.magenta }}>♪</span>
            </div>
            <p
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 17,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 6,
              }}
            >
              Pronunciation Clinic
            </p>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
              Record and compare your pronunciation to a native speaker.
            </p>
            <OutlineBtn style={{ width: "100%", padding: "10px 0", borderRadius: 9, textAlign: "center" }}>
              Open Clinic
            </OutlineBtn>
          </Card>

          {/* Card 4: Tone Trainer */}
          <Card style={{ padding: "28px 24px" }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32, color: C.magenta }}>&#8767;</span>
            </div>
            <p
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 17,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 6,
              }}
            >
              Tone Trainer
            </p>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 14 }}>
              Listen and identify tonal differences.
            </p>
            {/* Tone chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[
                { label: "High", arrow: "↗" },
                { label: "Mid",  arrow: "→" },
                { label: "Low",  arrow: "↘" },
              ].map((tone) => (
                <div
                  key={tone.label}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "8px 0",
                    borderRadius: 8,
                    background: C.surface2,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 2 }}>{tone.arrow}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{tone.label}</div>
                </div>
              ))}
            </div>
            <OutlineBtn style={{ width: "100%", padding: "10px 0", borderRadius: 9, textAlign: "center" }}>
              Train Tones
            </OutlineBtn>
          </Card>
        </div>

        {/* Word of the Day */}
        <div
          style={{
            background: C.surface,
            border: `1px solid rgba(200,147,42,0.35)`,
            borderRadius: 16,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: C.gold,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 10,
              }}
            >
              Word of the Day
            </p>
            <p
              style={{
                fontFamily: C.fontDisplay,
                fontSize: 36,
                fontWeight: 700,
                color: C.cream,
                marginBottom: 4,
                lineHeight: 1.1,
              }}
            >
              Àánú
            </p>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 12 }}>
              Compassion
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 12,
                  color: C.gold,
                  background: C.goldDim,
                  border: `1px solid rgba(200,147,42,0.25)`,
                  borderRadius: 99,
                  padding: "3px 10px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                ↘ ↗ ↗
              </span>
              <span style={{ fontSize: 12, color: C.muted }}>
                "Mo ni àánú fún e" — I have compassion for you
              </span>
            </div>
            <MagentaBtn style={{ padding: "9px 20px", fontSize: 12, borderRadius: 8 }}>
              Add to flashcards
            </MagentaBtn>
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(200,147,42,0.18) 0%, transparent 70%)`,
              border: `1px solid rgba(200,147,42,0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              flexShrink: 0,
            }}
          >
            A
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root: orchestrates all screens ────────────────────────────────────────

export default function MockupPage() {
  const [screen, setScreen] = useState(0);

  function handleGoToDashboard() {
    setScreen(1);
  }

  function handleGoToPlayer() {
    setScreen(2);
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: C.fontBody,
      }}
    >
      <TopNav screen={screen} setScreen={setScreen} />

      {screen === 0 && <OnboardingScreen onFinish={handleGoToDashboard} />}
      {screen === 1 && <DashboardScreen onGoPlayer={handleGoToPlayer} />}
      {screen === 2 && <PlayerScreen />}
      {screen === 3 && <ProgressScreen />}
      {screen === 4 && <PracticeScreen />}

      {/* Footer */}
      <div
        style={{
          background: C.bg,
          borderTop: `1px solid ${C.border}`,
          textAlign: "center",
          padding: "16px 24px 28px",
        }}
      >
        <p style={{ color: C.muted, fontSize: 11, fontFamily: C.fontBody }}>
          UI mockup, not a live product. Back to landing page at{" "}
          <a href="/" style={{ color: C.muted, textDecoration: "underline" }}>
            /
          </a>
        </p>
      </div>
    </div>
  );
}

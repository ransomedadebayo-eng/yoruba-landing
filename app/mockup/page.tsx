"use client";

// Platform UI Mockup — shows what the learning platform would look like
// Accessible at /mockup — share this link as a design reference

export default function Mockup() {
  const episodes = [
    { num: 1, title: "The Sound System", duration: "14 min", progress: 100, tags: ["Tones", "Phonetics"] },
    { num: 2, title: "Greetings & Respect", duration: "12 min", progress: 60, tags: ["Greetings", "Etiquette"] },
    { num: 3, title: "The Market Hustle", duration: "16 min", progress: 0, tags: ["Numbers", "Transactions"] },
    { num: 4, title: "Family Structures", duration: "13 min", progress: 0, tags: ["Family", "Kinship"] },
    { num: 5, title: "Food & Celebration", duration: "15 min", progress: 0, tags: ["Food", "Festivals"] },
  ];

  return (
    <div style={{ background: "#0A0805", minHeight: "100vh", fontFamily: "var(--font-body, Inter, sans-serif)" }}>

      {/* Top bar */}
      <div style={{ background: "rgba(10,8,5,0.95)", borderBottom: "1px solid #2A2015", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#C8932A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0A0805" }}>À</div>
            <span style={{ color: "#F5EDD6", fontWeight: 600, fontSize: 14 }}>[Platform Name]</span>
          </div>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["Learn", "Culture", "Practice", "Community"].map((item) => (
              <span key={item} style={{ color: item === "Learn" ? "#C8932A" : "#7A6A52", fontSize: 13, cursor: "pointer", fontWeight: item === "Learn" ? 600 : 400 }}>{item}</span>
            ))}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2A2015", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#C8932A", fontWeight: 600 }}>A</div>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>

        {/* ── MAIN PLAYER ── */}
        <div>
          {/* Video player */}
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#141009", border: "1px solid #2A2015", aspectRatio: "16/9", marginBottom: 20 }}>
            {/* Fake video frame */}
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1208 0%, #0d0a05 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {/* Scene backdrop */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(200,147,42,0.08) 0%, transparent 70%)" }} />

              {/* Play button */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(200,147,42,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
                <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid #0A0805", marginLeft: 4 }} />
              </div>

              {/* Episode badge */}
              <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(10,8,5,0.8)", border: "1px solid #2A2015", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#C8932A", fontWeight: 600 }}>
                S1 · E2 — Greetings & Respect
              </div>

              {/* Interactive subtitle bar */}
              <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                <div style={{ background: "rgba(10,8,5,0.9)", border: "1px solid #2A2015", borderRadius: 8, padding: "8px 16px", fontSize: 14, color: "#F5EDD6", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: "#7A6A52" }}>E káàárọ̀ —</span>
                  <span style={{ color: "#F5EDD6" }}>Good morning</span>
                  <span style={{ fontSize: 10, color: "#C8932A", border: "1px solid rgba(200,147,42,0.3)", borderRadius: 4, padding: "1px 5px", cursor: "pointer" }}>hover for more</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <div style={{ height: 3, background: "#2A2015" }}>
                  <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #C8932A, #E8B84B)" }} />
                </div>
                <div style={{ background: "rgba(10,8,5,0.9)", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 18, cursor: "pointer" }}>⏮</span>
                    <span style={{ fontSize: 20, cursor: "pointer", color: "#C8932A" }}>⏸</span>
                    <span style={{ fontSize: 18, cursor: "pointer" }}>⏭</span>
                    <span style={{ fontSize: 12, color: "#7A6A52" }}>7:12 / 12:00</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#C8932A", border: "1px solid rgba(200,147,42,0.3)", borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}>0.75×</span>
                    <span style={{ fontSize: 11, color: "#7A6A52", cursor: "pointer" }}>CC</span>
                    <span style={{ fontSize: 11, color: "#7A6A52", cursor: "pointer" }}>⛶</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episode info */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <h2 style={{ color: "#F5EDD6", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display, Georgia, serif)", marginBottom: 4 }}>
                  Greetings & Respect
                </h2>
                <p style={{ color: "#7A6A52", fontSize: 13 }}>Season 1, Episode 2 · 12 min · CEFR A1</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Greetings", "Etiquette", "Respect"].map((tag) => (
                  <span key={tag} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, background: "rgba(200,147,42,0.1)", color: "#C8932A", border: "1px solid rgba(200,147,42,0.2)" }}>{tag}</span>
                ))}
              </div>
            </div>
            <p style={{ color: "#7A6A52", fontSize: 13, lineHeight: 1.7 }}>
              Follow Tunde as he navigates his first morning in his grandmother&apos;s compound in Ibadan.
              Learn the language of respect — why prostrating matters, when to kneel, and what happens
              when you get it wrong.
            </p>
          </div>

          {/* Vocabulary pulled from this episode */}
          <div style={{ background: "#141009", border: "1px solid #2A2015", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <p style={{ color: "#C8932A", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Vocabulary from this episode
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { yoruba: "E káàárọ̀", english: "Good morning", tone: "↗↘↗" },
                { yoruba: "E káàbọ̀", english: "Welcome", tone: "↗↘↘" },
                { yoruba: "Dáadáa ni", english: "I am fine", tone: "↘↗ ↗" },
                { yoruba: "Ẹ jọ̀ọ́", english: "Please", tone: "↗ ↘↗" },
                { yoruba: "Ẹ ṣéun", english: "Thank you", tone: "↗↘↗" },
                { yoruba: "O dàbọ̀", english: "Goodbye", tone: "↗↘↘" },
              ].map((w) => (
                <div key={w.yoruba} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2A2015", borderRadius: 8, padding: "8px 10px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,147,42,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2015")}>
                  <div style={{ color: "#F5EDD6", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{w.yoruba}</div>
                  <div style={{ color: "#7A6A52", fontSize: 11 }}>{w.english}</div>
                  <div style={{ color: "rgba(200,147,42,0.6)", fontSize: 10, marginTop: 2, fontFamily: "monospace" }}>{w.tone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-episode quiz callout */}
          <div style={{ background: "rgba(200,147,42,0.06)", border: "1px solid rgba(200,147,42,0.2)", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#C8932A", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>🎯 Quick check — 8:30 mark</p>
              <p style={{ color: "#7A6A52", fontSize: 12 }}>How do you greet an elder in the morning?</p>
            </div>
            <button style={{ background: "#C8932A", color: "#0A0805", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Answer now
            </button>
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Progress card */}
          <div style={{ background: "#141009", border: "1px solid #2A2015", borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ color: "#F5EDD6", fontSize: 13, fontWeight: 600 }}>Your progress</p>
              <span style={{ fontSize: 10, padding: "2px 8px", background: "rgba(200,147,42,0.1)", color: "#C8932A", borderRadius: 99, border: "1px solid rgba(200,147,42,0.2)" }}>CEFR A1</span>
            </div>

            {/* Streak */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ width: "100%", aspectRatio: "1", borderRadius: 6, background: i < 5 ? "#C8932A" : "#2A2015", marginBottom: 4 }} />
                  <span style={{ fontSize: 9, color: "#7A6A52" }}>{day}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#C8932A", fontSize: 11, fontWeight: 600, textAlign: "center", marginBottom: 16 }}>🔥 5-day streak</p>

            {/* Proficiency bar */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#7A6A52" }}>A1 progress</span>
                <span style={{ fontSize: 11, color: "#C8932A", fontWeight: 600 }}>34%</span>
              </div>
              <div style={{ height: 4, background: "#2A2015", borderRadius: 99 }}>
                <div style={{ height: "100%", width: "34%", background: "linear-gradient(90deg, #C8932A, #E8B84B)", borderRadius: 99 }} />
              </div>
            </div>
            <p style={{ fontSize: 10, color: "#7A6A52", textAlign: "center" }}>Est. 28 hrs to reach A2</p>
          </div>

          {/* Season 1 episode list */}
          <div style={{ background: "#141009", border: "1px solid #2A2015", borderRadius: 16, padding: 20 }}>
            <p style={{ color: "#F5EDD6", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Season 1 — The Foundations</p>
            <p style={{ color: "#7A6A52", fontSize: 11, marginBottom: 16 }}>8 episodes · CEFR A1</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {episodes.map((ep) => (
                <div key={ep.num}
                  style={{
                    display: "flex", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                    background: ep.num === 2 ? "rgba(200,147,42,0.08)" : "transparent",
                    border: `1px solid ${ep.num === 2 ? "rgba(200,147,42,0.25)" : "#2A2015"}`,
                    transition: "all 0.15s",
                  }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: ep.progress === 100 ? "#C8932A" : ep.progress > 0 ? "rgba(200,147,42,0.15)" : "#2A2015",
                    fontSize: 10, fontWeight: 700,
                    color: ep.progress === 100 ? "#0A0805" : ep.progress > 0 ? "#C8932A" : "#7A6A52",
                  }}>
                    {ep.progress === 100 ? "✓" : ep.num}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ep.num === 2 ? "#F5EDD6" : "#7A6A52", fontSize: 12, fontWeight: ep.num === 2 ? 600 : 400, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {ep.title}
                    </p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: "#7A6A52" }}>{ep.duration}</span>
                      {ep.progress > 0 && ep.progress < 100 && (
                        <div style={{ flex: 1, height: 2, background: "#2A2015", borderRadius: 99 }}>
                          <div style={{ height: "100%", width: `${ep.progress}%`, background: "#C8932A", borderRadius: 99 }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flashcard CTA */}
          <div style={{ background: "rgba(200,147,42,0.06)", border: "1px solid rgba(200,147,42,0.2)", borderRadius: 16, padding: 16, textAlign: "center" }}>
            <p style={{ color: "#C8932A", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📚 Flashcard deck ready</p>
            <p style={{ color: "#7A6A52", fontSize: 11, marginBottom: 12 }}>12 words from episodes 1 & 2. Due for review.</p>
            <button style={{ width: "100%", background: "#C8932A", color: "#0A0805", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Review now
            </button>
          </div>
        </div>
      </div>

      {/* Mockup label */}
      <div style={{ textAlign: "center", padding: "20px 24px 40px", borderTop: "1px solid #2A2015", marginTop: 20 }}>
        <p style={{ color: "#5A4A38", fontSize: 11 }}>
          UI mockup — not a live product.{" "}
          <a href="/" style={{ color: "#8A7A62", textDecoration: "underline" }}>← Back to landing page</a>
        </p>
      </div>
    </div>
  );
}

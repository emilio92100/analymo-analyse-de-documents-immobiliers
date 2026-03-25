import { useEffect, useRef, useState } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-04-24");
const REVEAL_DATE = new Date("2026-03-25");

function getProgress() {
  const now = new Date();
  const totalMs = LAUNCH_DATE.getTime() - REVEAL_DATE.getTime();
  const elapsedMs = now.getTime() - REVEAL_DATE.getTime();
  const pct = Math.min(Math.max(elapsedMs / totalMs, 0), 1);
  const daysLeft = Math.max(0, Math.ceil((LAUNCH_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const daysElapsed = Math.min(Math.max(Math.floor(elapsedMs / (1000 * 60 * 60 * 24)), 0), 30);
  return { pct, daysLeft, daysElapsed };
}

// ─── BEAUTIFUL PHONE ─────────────────────────────────────────────────────────
function PhoneModel() {
  const [rot, setRot] = useState({ x: -5, y: 8 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    let live = true;
    const tick = (t: number) => {
      if (!live) return;
      setRot({ x: -5 + Math.sin(t / 3200) * 5, y: 8 + Math.cos(t / 4100) * 9 });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      live = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const W = 210,
    H = 430;

  return (
    <div style={{ width: W, height: H, perspective: 1200 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 0.15s linear",
          position: "relative",
          filter: "drop-shadow(0 40px 70px rgba(30,58,95,0.25)) drop-shadow(0 10px 28px rgba(30,58,95,0.15))",
        }}
      >
        {/* ── FRAME ── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2c3e52" />
              <stop offset="50%" stopColor="#1a2a3a" />
              <stop offset="100%" stopColor="#0f1a24" />
            </linearGradient>
            <linearGradient id="shineLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="shineTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="sideRight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#243444" />
              <stop offset="100%" stopColor="#0d1820" />
            </linearGradient>
            <linearGradient id="sideBottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e2e3e" />
              <stop offset="100%" stopColor="#0a1218" />
            </linearGradient>
            <clipPath id="screenClip">
              <rect x="10" y="10" width={W - 20} height={H - 20} rx="32" />
            </clipPath>
          </defs>

          {/* Body */}
          <rect x="0" y="0" width={W} height={H} rx="38" fill="url(#frameGrad)" />

          {/* Top-left shine */}
          <rect x="0" y="0" width={W * 0.45} height={H} rx="38" fill="url(#shineLeft)" />
          <rect x="0" y="0" width={W} height={H * 0.3} rx="38" fill="url(#shineTop)" />

          {/* Side depth — right */}
          <rect
            x={W - 4}
            y="20"
            width="8"
            height={H - 40}
            rx="4"
            fill="url(#sideRight)"
            style={{ transform: "translateZ(-4px)" }}
          />
          {/* Side depth — bottom */}
          <rect
            x="20"
            y={H - 4}
            width={W - 40}
            height="8"
            rx="4"
            fill="url(#sideBottom)"
            style={{ transform: "translateZ(-4px)" }}
          />

          {/* Screen bezel */}
          <rect x="8" y="8" width={W - 16} height={H - 16} rx="33" fill="#0a0f14" />

          {/* Screen area */}
          <rect x="10" y="10" width={W - 20} height={H - 20} rx="32" fill="#f4f5f7" />

          {/* Dynamic island */}
          <rect x={W / 2 - 30} y="20" width="60" height="18" rx="9" fill="#0a0f14" />

          {/* Buttons */}
          <rect x="-3" y="80" width="4" height="28" rx="2" fill="#243040" />
          <rect x="-3" y="120" width="4" height="48" rx="2" fill="#243040" />
          <rect x={W - 1} y="100" width="4" height="56" rx="2" fill="#243040" />

          {/* Edge ring highlight */}
          <rect x="0" y="0" width={W} height={H} rx="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>

        {/* ── SCREEN CONTENT ── */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            width: W - 20,
            height: H - 20,
            borderRadius: 32,
            overflow: "hidden",
            background: "#f4f5f7",
          }}
        >
          {/* Scan line */}
          <div className="scanline-light" />

          {/* Status bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px 4px",
              fontSize: 10,
              color: "#1a2a3a",
              fontWeight: 700,
            }}
          >
            <span>9:41</span>
            <span style={{ fontSize: 9, letterSpacing: 1 }}>5G ••</span>
          </div>

          {/* Header */}
          <div
            style={{ padding: "6px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1a2a3a" }}>Mon analyse</div>
              <div style={{ fontSize: 9, color: "#8a9ab0", marginTop: 1 }}>PV d'assemblée · Appt Paris 8e</div>
            </div>
            <div style={{ background: "#e6f0e8", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#2d7a3a" }}>Terminé ✓</span>
            </div>
          </div>

          {/* Score card */}
          <div
            style={{
              margin: "10px 14px 0",
              background: "#1e3a5f",
              borderRadius: 16,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Circle */}
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
                <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <circle
                  cx="26"
                  cy="26"
                  r="21"
                  fill="none"
                  stroke="#7ecfb3"
                  strokeWidth="4"
                  strokeDasharray={`${(7 / 10) * 132} 132`}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1 }}>7</span>
                <span style={{ fontSize: 7, color: "rgba(255,255,255,0.55)" }}>/10</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Score global</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Bien recommandé</div>
              <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 4,
                      borderRadius: 2,
                      background: i <= 7 ? "#7ecfb3" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mini bars */}
          <div style={{ margin: "10px 14px 0", background: "#fff", borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#1a2a3a", marginBottom: 8 }}>Analyse des charges</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 36 }}>
              {[55, 40, 72, 60, 88, 50, 68, 80, 44, 90].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: "3px 3px 0 0",
                    background: i === 9 ? "#1e3a5f" : i === 4 ? "#5a9fd4" : "#dce8f4",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Items */}
          <div style={{ margin: "8px 14px 0", display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              {
                dot: "#2d7a3a",
                bg: "#e6f4ea",
                label: "3 points positifs",
                sub: "Finances saines, entretien ok",
                icon: "✓",
              },
              { dot: "#c8620a", bg: "#fef0e0", label: "2 vigilances", sub: "Toiture prévue 2026", icon: "⚠" },
              { dot: "#1e3a5f", bg: "#e6edf5", label: "Impact financier", sub: "−12 000 € de charges", icon: "€" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 10px",
                  borderRadius: 10,
                  background: "#fff",
                  border: "1px solid #edf0f4",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: item.dot,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: "#1a2a3a" }}>{item.label}</div>
                  <div style={{ fontSize: 8, color: "#8a9ab0", marginTop: 1 }}>{item.sub}</div>
                </div>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#fff",
              borderTop: "1px solid #edf0f4",
              padding: "8px 0 12px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {[
              { icon: "⊞", active: false },
              { icon: "◎", active: true },
              { icon: "◈", active: false },
              { icon: "◉", active: false },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    background: item.active ? "#e6edf5" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    color: item.active ? "#1e3a5f" : "#b0bec8",
                  }}
                >
                  {item.icon}
                </div>
                {item.active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1e3a5f" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar({ pct, daysLeft, daysElapsed }: { pct: number; daysLeft: number; daysElapsed: number }) {
  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimPct(pct), 400);
    return () => clearTimeout(t);
  }, [pct]);
  const displayPct = Math.round(animPct * 100);
  const milestones = [
    { day: 10, label: "J−20" },
    { day: 20, label: "J−10" },
    { day: 30, label: "🚀" },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#8a9ab0",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Progression
          </div>
          <div style={{ fontSize: 12, color: "#5a7085" }}>
            Jour <strong style={{ color: "#1e3a5f" }}>{daysElapsed}</strong> / 30
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#1e3a5f", lineHeight: 1 }}>{displayPct}%</div>
          <div style={{ fontSize: 11, color: "#8a9ab0", marginTop: 1 }}>
            {daysLeft === 0 ? "Aujourd'hui !" : `J−${daysLeft}`}
          </div>
        </div>
      </div>

      <div style={{ position: "relative", height: 10, borderRadius: 99, background: "#e2e8f0" }}>
        <div
          style={{
            height: "100%",
            width: `${animPct * 100}%`,
            minWidth: animPct > 0 ? 12 : 0,
            borderRadius: 99,
            background: "linear-gradient(90deg, #1e3a5f, #3a7fc1)",
            boxShadow: "0 2px 10px rgba(30,58,95,0.3)",
            transition: "width 1.8s cubic-bezier(.4,0,.2,1)",
            position: "relative",
          }}
        >
          {animPct > 0 && (
            <div
              style={{
                position: "absolute",
                right: -7,
                top: "50%",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#1e3a5f",
                border: "3px solid #fff",
                boxShadow: "0 2px 8px rgba(30,58,95,0.4)",
                zIndex: 2,
              }}
            />
          )}
        </div>
        {milestones.map((m) => (
          <div
            key={m.day}
            style={{
              position: "absolute",
              top: "50%",
              left: `${(m.day / 30) * 100}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: daysElapsed >= m.day ? "#1e3a5f" : "#fff",
                border: `2px solid ${daysElapsed >= m.day ? "#1e3a5f" : "#c8d4e0"}`,
                transition: "all 1.8s",
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ position: "relative", height: 20, marginTop: 6 }}>
        <div style={{ position: "absolute", left: 0, fontSize: 10, color: "#b0bec5" }}>Début</div>
        {milestones.map((m) => (
          <div
            key={m.day}
            style={{
              position: "absolute",
              left: `${(m.day / 30) * 100}%`,
              transform: "translateX(-50%)",
              fontSize: 10,
              fontWeight: 600,
              color: daysElapsed >= m.day ? "#1e3a5f" : "#b0bec5",
              transition: "color 1.8s",
              whiteSpace: "nowrap",
            }}
          >
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function CountdownChips({ daysLeft }: { daysLeft: number }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[
        { v: String(daysLeft).padStart(2, "0"), l: "Jours" },
        { v: "23", l: "Heures" },
        { v: "59", l: "Minutes" },
      ].map(({ v, l }) => (
        <div
          key={l}
          style={{
            textAlign: "center",
            padding: "12px 16px",
            borderRadius: 12,
            background: "#fff",
            border: "1px solid #e0e8f0",
            boxShadow: "0 2px 8px rgba(30,58,95,0.05)",
            minWidth: 60,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1e3a5f", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {v}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#8a9ab0",
              marginTop: 3,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const { pct, daysLeft, daysElapsed } = getProgress();
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f2f4f6; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #1a2a3a; }

        .scanline-light {
          position: absolute; top: -100%; left: 0; width: 100%; height: 35%;
          background: linear-gradient(180deg, transparent 0%, rgba(30,58,95,0.03) 40%, rgba(30,58,95,0.08) 50%, rgba(30,58,95,0.03) 60%, transparent 100%);
          animation: scan 3.5s ease-in-out infinite; pointer-events: none; z-index: 5;
        }
        @keyframes scan { 0% { top: -35%; } 100% { top: 115%; } }

        .fade-up { opacity: 0; transform: translateY(22px); transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1); }
        .fade-up.in { opacity: 1; transform: translateY(0); }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px 7px 12px; border-radius: 99px;
          border: 1.5px solid #c8d8e8; background: #fff;
          color: #1e3a5f; font-size: 12px; font-weight: 600;
          box-shadow: 0 2px 8px rgba(30,58,95,0.06);
        }
        .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #1e3a5f; flex-shrink: 0; animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.55); } }

        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7f96; }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

        .stat-bubble {
          position: absolute; padding: 10px 14px; border-radius: 14px;
          background: #fff; border: 1px solid rgba(30,58,95,0.08);
          box-shadow: 0 8px 28px rgba(30,58,95,0.10), 0 2px 8px rgba(30,58,95,0.05);
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 32px",
        }}
      >
        {/* ── LOGO GRAND CENTRÉ ── */}
        <div
          className={`fade-up ${mounted ? "in" : ""}`}
          style={{ transitionDelay: "0ms", textAlign: "center", marginBottom: 16 }}
        >
          <img
            src="/logo.png"
            alt="Analymo"
            style={{ height: 100, maxWidth: 360, objectFit: "contain", display: "block", margin: "0 auto" }}
          />
        </div>

        {/* ── BADGE CENTRÉ ── */}
        <div
          className={`fade-up ${mounted ? "in" : ""}`}
          style={{ transitionDelay: "60ms", textAlign: "center", marginBottom: 44 }}
        >
          <div className="badge">
            <div className="badge-dot" />
            Bientôt disponible
          </div>
          <p
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "#8a9ab0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Analyses intelligentes de documents immobiliers
          </p>
        </div>

        {/* ── TWO COLUMNS ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 64,
            width: "100%",
            maxWidth: 1040,
          }}
        >
          {/* LEFT */}
          <div
            style={{
              flex: "1 1 340px",
              minWidth: 280,
              maxWidth: 460,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "120ms" }}>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.08,
                  color: "#1a2a3a",
                  letterSpacing: "-0.03em",
                }}
              >
                Analysez vos
                <br />
                <span style={{ color: "#1e3a5f" }}>documents</span>
                <br />
                <span style={{ color: "#1e3a5f" }}>immobiliers</span>
              </h1>
              <p style={{ marginTop: 14, color: "#5a7085", fontSize: 15, lineHeight: 1.75, maxWidth: 390 }}>
                Score global, risques cachés, impact financier — tout ce qu'il faut savoir avant de signer, en moins de
                2 minutes.
              </p>
            </div>

            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "180ms" }}>
              <CountdownChips daysLeft={daysLeft} />
            </div>

            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "240ms" }}>
              <div
                style={{
                  padding: "20px 22px",
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #e0e8f0",
                  boxShadow: "0 2px 16px rgba(30,58,95,0.06)",
                }}
              >
                <ProgressBar pct={pct} daysLeft={daysLeft} daysElapsed={daysElapsed} />
              </div>
            </div>

            <div
              className={`fade-up ${mounted ? "in" : ""}`}
              style={{ display: "flex", gap: 20, flexWrap: "wrap", transitionDelay: "300ms" }}
            >
              {[
                ["🛡", "Documents chiffrés"],
                ["🗑", "Suppression auto"],
                ["📋", "Sans engagement"],
              ].map(([icon, label]) => (
                <div key={label} className="trust-item">
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PHONE */}
          <div
            className={`fade-up ${mounted ? "in" : ""}`}
            style={{
              transitionDelay: "160ms",
              flex: "0 0 auto",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 60,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="float">
              <PhoneModel />
            </div>

            <div
              className="stat-bubble"
              style={{ top: "8%", right: "-10px", animation: "float 5.5s ease-in-out infinite 0.8s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "#e6edf5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                  }}
                >
                  🛡
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#1a2a3a" }}>100% sécurisé</div>
                  <div style={{ fontSize: 10, color: "#8a9ab0" }}>Chiffré & supprimé</div>
                </div>
              </div>
            </div>

            <div
              className="stat-bubble"
              style={{ bottom: "22%", right: "-10px", animation: "float 7s ease-in-out infinite 0.3s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "#e6f4ea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                  }}
                >
                  📈
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#1a2a3a" }}>Score: 7/10</div>
                  <div style={{ fontSize: 10, color: "#2d7a3a" }}>Bien recommandé</div>
                </div>
              </div>
            </div>

            <div
              className="stat-bubble"
              style={{ bottom: "6%", left: "-20px", animation: "float 6s ease-in-out infinite 1.4s" }}
            >
              <span style={{ fontSize: 12, color: "#1a2a3a", fontWeight: 600 }}>📄 PV scanné ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", paddingBottom: 24, fontSize: 11, color: "#b0bec8" }}>
        © 2025 Analymo · Analyses intelligentes de documents immobiliers
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const LAUNCH_DAYS = 30;
const START_DATE = new Date("2025-03-25");

function getDaysElapsed() {
  const now = new Date();
  const diff = Math.floor((now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff, 0), LAUNCH_DAYS);
}

// ─── 3D PHONE ────────────────────────────────────────────────────────────────
function PhoneModel() {
  const [rotation, setRotation] = useState({ x: -6, y: 10 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    let running = true;
    function animate(t: number) {
      if (!running) return;
      const x = -6 + Math.sin(t / 3000) * 6;
      const y = 10 + Math.cos(t / 4000) * 10;
      setRotation({ x, y });
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      style={{
        width: 240,
        height: 480,
        perspective: 1000,
        filter: "drop-shadow(0 32px 64px rgba(30,58,95,0.22)) drop-shadow(0 8px 24px rgba(30,58,95,0.12))",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.12s linear",
          position: "relative",
        }}
      >
        {/* Phone body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background: "#1a2a3a",
            border: "2px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Screen */}
          <div
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: 34,
              background: "#f5f6f7",
              overflow: "hidden",
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
                padding: "10px 16px 4px",
                fontSize: 9,
                color: "#1a2a3a",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              <span>9:41</span>
              <span style={{ fontSize: 11 }}>5G ▪</span>
            </div>

            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 72,
                height: 16,
                borderRadius: 20,
                background: "#1a2a3a",
                zIndex: 10,
              }}
            />

            {/* App content */}
            <div style={{ padding: "28px 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, color: "#1a2a3a" }}>
                  Résultat d'analyse
                </span>
                <span
                  style={{
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    fontSize: 8,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 99,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Terminé
                </span>
              </div>

              {/* Score circle */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 4 }}>
                <div style={{ position: "relative", width: 64, height: 64 }}>
                  <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, transform: "rotate(-90deg)" }}>
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#e8edf2" strokeWidth="5" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      stroke="#1e3a5f"
                      strokeWidth="5"
                      strokeDasharray={`${(7 / 10) * 163} 163`}
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
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#1a2a3a",
                        lineHeight: 1,
                      }}
                    >
                      7
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, color: "#8a9ab0" }}>/10</span>
                  </div>
                </div>
              </div>

              {/* Chart bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48, padding: "0 4px" }}>
                {[40, 60, 80, 55, 90, 70, 65, 85].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "3px 3px 0 0",
                      background: i === 4 ? "#1e3a5f" : "#c5d4e8",
                    }}
                  />
                ))}
              </div>

              {/* Items */}
              {[
                {
                  icon: "✓",
                  color: "#2e7d32",
                  bg: "#e8f5e9",
                  label: "3 points positifs",
                  sub: "Finances saines, entretien ok",
                },
                { icon: "⚠", color: "#e65100", bg: "#fff3e0", label: "2 vigilances", sub: "Toiture prévue 2026" },
                { icon: "€", color: "#1e3a5f", bg: "#e8edf5", label: "Impact financier", sub: "−12 000 € de charges" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 8,
                    background: "#fff",
                    border: "1px solid #eaecef",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: item.color,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 9, color: "#1a2a3a" }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, color: "#8a9ab0" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side shine */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "35%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
              borderRadius: "40px 0 0 40px",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* 3D right edge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: -7,
            width: 7,
            height: "calc(100% - 20px)",
            background: "linear-gradient(180deg, #2a3d52, #141f2b)",
            borderRadius: "0 6px 6px 0",
          }}
        />
        {/* 3D bottom edge */}
        <div
          style={{
            position: "absolute",
            bottom: -7,
            left: 10,
            width: "calc(100% - 20px)",
            height: 7,
            background: "linear-gradient(180deg, #243040, #131d28)",
            borderRadius: "0 0 6px 6px",
          }}
        />
      </div>
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar({ days, total }: { days: number; total: number }) {
  const pct = Math.round((days / total) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span
          style={{
            fontSize: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            color: "#6b7f96",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Progression du lancement
        </span>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#1e3a5f", fontFamily: "'DM Sans', sans-serif" }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: "#e2e8f0", position: "relative" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg, #1e3a5f, #2d6a9f)",
            boxShadow: "0 2px 12px rgba(30,58,95,0.3)",
            transition: "width 1.5s cubic-bezier(.4,0,.2,1)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -6,
              top: "50%",
              transform: "translateY(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#1e3a5f",
              border: "3px solid #fff",
              boxShadow: "0 2px 8px rgba(30,58,95,0.4)",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ fontSize: 11, color: "#8a9ab0", fontFamily: "'DM Sans', sans-serif" }}>Jour {days}</span>
        <span style={{ fontSize: 11, color: "#8a9ab0", fontFamily: "'DM Sans', sans-serif" }}>
          Jour {total} — Lancement 🚀
        </span>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const daysElapsed = getDaysElapsed();

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f2f4f6;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .scanline-light {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(30,58,95,0.03) 40%,
            rgba(30,58,95,0.07) 50%,
            rgba(30,58,95,0.03) 60%,
            transparent 100%
          );
          animation: scan 3.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes scan {
          0%   { top: -35%; }
          100% { top: 110%; }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1);
        }
        .fade-up.in {
          opacity: 1;
          transform: translateY(0);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 10px;
          border-radius: 99px;
          border: 1.5px solid #c8d8e8;
          background: #fff;
          color: #1e3a5f;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #1e3a5f;
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }

        .email-input {
          flex: 1;
          min-width: 0;
          background: #fff;
          border: 1.5px solid #d4dde8;
          border-radius: 12px;
          padding: 13px 16px;
          color: #1a2a3a;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .email-input::placeholder { color: #9aacbe; }
        .email-input:focus {
          border-color: #1e3a5f;
          box-shadow: 0 0 0 3px rgba(30,58,95,0.08);
        }

        .cta-btn {
          padding: 13px 22px;
          border-radius: 12px;
          background: #1e3a5f;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(30,58,95,0.25);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cta-btn:hover {
          background: #163050;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(30,58,95,0.3);
        }
        .cta-btn:active { transform: translateY(0); }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7f96;
        }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        .stat-bubble {
          position: absolute;
          padding: 10px 14px;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 8px 32px rgba(30,58,95,0.12), 0 2px 8px rgba(30,58,95,0.06);
          border: 1px solid rgba(30,58,95,0.07);
        }

        .nav-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 64px;
          background: rgba(242,244,246,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(30,58,95,0.07);
          display: flex;
          align-items: center;
          padding: 0 40px;
          z-index: 100;
        }
      `}</style>

      {/* NAV */}
      <nav className="nav-bar">
        <img src="/logo.png" alt="Analymo" style={{ height: 34, objectFit: "contain" }} />
        <span
          style={{
            fontSize: 11,
            color: "#8a9ab0",
            marginLeft: "auto",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Bientôt disponible
        </span>
      </nav>

      {/* MAIN */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 32px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 72,
            width: "100%",
            maxWidth: 1080,
          }}
        >
          {/* ── LEFT ── */}
          <div
            style={{
              flex: "1 1 380px",
              minWidth: 300,
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "0ms" }}>
              <div className="badge">
                <div className="badge-dot" />
                Analyse immobilière intelligente
              </div>
            </div>

            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "80ms" }}>
              <h1
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(36px, 5vw, 58px)",
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
              <p style={{ marginTop: 16, color: "#5a7085", fontSize: 15, lineHeight: 1.7, maxWidth: 420 }}>
                Score global, risques cachés, impact financier — tout ce qu'il faut savoir avant de signer, expliqué
                simplement en moins de 2 minutes.
              </p>
            </div>

            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "160ms" }}>
              {submitted ? (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: "#e8f5e9",
                    border: "1.5px solid #a5d6a7",
                    color: "#2e7d32",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  ✓ Vous êtes inscrit — on vous prévient en premier lors du lancement !
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    className="email-input"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && email) setSubmitted(true);
                    }}
                  />
                  <button className="cta-btn" onClick={() => email && setSubmitted(true)}>
                    <span>🛡</span> Être notifié
                  </button>
                </div>
              )}
            </div>

            {/* Progress card */}
            <div className={`fade-up ${mounted ? "in" : ""}`} style={{ transitionDelay: "240ms" }}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #e0e8f0",
                  boxShadow: "0 2px 16px rgba(30,58,95,0.06)",
                }}
              >
                <ProgressBar days={daysElapsed} total={LAUNCH_DAYS} />
              </div>
            </div>

            {/* Trust */}
            <div
              className={`fade-up ${mounted ? "in" : ""}`}
              style={{ display: "flex", gap: 20, flexWrap: "wrap", transitionDelay: "320ms" }}
            >
              {[
                ["🛡", "Documents chiffrés"],
                ["🗑", "Suppression auto"],
                ["📋", "Sans engagement"],
              ].map(([icon, label]) => (
                <div key={label} className="trust-item">
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 3D PHONE ── */}
          <div
            className={`fade-up ${mounted ? "in" : ""}`}
            style={{
              transitionDelay: "200ms",
              flex: "0 0 auto",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,58,95,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="float">
              <PhoneModel />
            </div>

            {/* Bubble: 100% sécurisé */}
            <div
              className="stat-bubble"
              style={{ top: "10%", left: "-70px", animation: "float 5.5s ease-in-out infinite 0.8s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#e8edf5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  🛡
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2a3a" }}>100% sécurisé</div>
                  <div style={{ fontSize: 11, color: "#8a9ab0" }}>Chiffré & supprimé</div>
                </div>
              </div>
            </div>

            {/* Bubble: Score */}
            <div
              className="stat-bubble"
              style={{ bottom: "20%", right: "-60px", animation: "float 7s ease-in-out infinite 0.3s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  📈
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2a3a" }}>Score: 7/10</div>
                  <div style={{ fontSize: 11, color: "#2e7d32" }}>Bien recommandé</div>
                </div>
              </div>
            </div>

            {/* Bubble: PV scanné */}
            <div
              className="stat-bubble"
              style={{ bottom: "4%", left: "-50px", animation: "float 6s ease-in-out infinite 1.4s" }}
            >
              <span style={{ fontSize: 12, color: "#1a2a3a", fontWeight: 500 }}>📄 PV scanné ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", paddingBottom: 28, fontSize: 12, color: "#9aacbe" }}>
        © 2025 Analymo · Analyses intelligentes de documents immobiliers
      </div>
    </>
  );
}

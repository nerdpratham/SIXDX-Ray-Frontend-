import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

interface FormState {
  username: string;
  password: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Frosted pill input — mirrors the screenshot's translucent rounded fields */
function PillInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-5 py-4 rounded-full text-white placeholder-white/55 text-sm font-light outline-none transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.14)",
          border: focused
            ? "1px solid rgba(255,255,255,0.55)"
            : "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: focused
            ? "0 0 0 3px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.12)",
          letterSpacing: "0.01em",
        }}
      />
    </div>
  );
}

/** Animated mesh gradient blob — matches the screenshot's soft blue glow */
function MeshGradient() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* White top — fades into blue mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #daeeff 28%, #9ecfff 42%, #3d8fff 58%, #1155ee 75%, #0930cc 100%)",
        }}
      />

      {/* Radial blobs — replicating the soft cyan/blue mesh */}
      <div
        className="absolute"
        style={{
          top: "38%",
          left: "-10%",
          width: "80%",
          height: "55%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(100,200,255,0.75) 0%, transparent 65%)",
          filter: "blur(32px)",
          animation: "driftA 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "45%",
          right: "-15%",
          width: "75%",
          height: "50%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(60,120,255,0.65) 0%, transparent 65%)",
          filter: "blur(28px)",
          animation: "driftB 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "55%",
          left: "20%",
          width: "60%",
          height: "40%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(130,210,255,0.5) 0%, transparent 60%)",
          filter: "blur(22px)",
          animation: "driftC 13s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface LandingPageProps {
  onLoginSuccess?: () => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [form, setForm] = useState<FormState>({ username: "", password: "" });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async — replace with your auth logic
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess?.();
    }, 800);
  }

  return (
    <>
      {/* ── Keyframe injections ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        @font-face {
          font-family: 'Ethnocentric';
          src: url('https://db.onlinewebfonts.com/t/4f212c96840b7c759cb0e61720d2c2c5.woff2') format('woff2'),
               url('https://db.onlinewebfonts.com/t/4f212c96840b7c759cb0e61720d2c2c5.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @keyframes driftA {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          33%       { transform: translate(6%, -4%) scale(1.05); }
          66%       { transform: translate(-4%, 6%) scale(0.97); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          40%       { transform: translate(-8%, 5%) scale(1.08); }
          75%       { transform: translate(5%, -3%) scale(0.95); }
        }
        @keyframes driftC {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%       { transform: translate(4%, -6%) scale(1.06); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        .anim-logo {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: 0.05s;
        }
        .anim-inputs {
          animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: 0.18s;
        }
        .anim-btn {
          animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: 0.28s;
        }
        .anim-forgot {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: 0.36s;
        }

        .login-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(255,255,255,0.28);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0px);
        }

        .forgot-link {
          transition: color 0.2s ease;
        }
        .forgot-link:hover {
          color: rgba(255,255,255,0.85);
        }

        .spin-ring {
          border: 2px solid rgba(30,80,200,0.2);
          border-top-color: #1a4dcc;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spinRing 0.75s linear infinite;
          display: inline-block;
        }
      `}</style>

      {/*
       * Full-screen wrapper — fills entire viewport.
       * MeshGradient covers the background; form is centred on the lower half.
       */}
      <div
        className="relative min-h-screen w-full overflow-hidden flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Full-screen mesh background ── */}
        <MeshGradient />

        {/* ── Content layer ── */}
        <div className="relative z-10 flex flex-col flex-1 w-full">

          {/* LOGO — top centre, matching screenshot */}
          <div
            className={`text-center pt-12 sm:pt-16 ${mounted ? "anim-logo" : "opacity-0"}`}
          >
            <span
              style={{
                fontFamily: "'Ethnocentric', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                letterSpacing: "0.18em",
                color: "#111",
                textTransform: "uppercase",
              }}
            >
              SIXDX
            </span>
          </div>

          {/* Spacer — pushes form to lower portion of screen */}
          <div className="flex-1" />

          {/* ── FORM — centred, width-capped for readability ── */}
          <div className="w-full px-6 pb-10 sm:pb-16 flex flex-col items-center">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full"
              style={{ maxWidth: 420 }}
            >
              {/* Inputs */}
              <div
                className={`space-y-3 mb-4 ${mounted ? "anim-inputs" : "opacity-0"}`}
              >
                <PillInput
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange("username")}
                  autoComplete="username"
                />
                <PillInput
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                />
              </div>

              {/* Log in button */}
              <div className={`mb-1 ${mounted ? "anim-btn" : "opacity-0"}`}>
                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn w-full py-4 rounded-full text-sm font-semibold disabled:opacity-80 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "'Ethnocentric', sans-serif",
                    background: "#ffffff",
                    color: "#0a20bb",
                    letterSpacing: "0.01em",
                    boxShadow: "0 6px 28px rgba(255,255,255,0.25)",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spin-ring" />
                      <span>Signing in…</span>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className={`mt-3 ${mounted ? "anim-forgot" : "opacity-0"}`}>
                <button
                  type="button"
                  className="forgot-link text-xs text-white/55 hover:text-white/85 text-left transition-colors duration-200"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  onClick={() => {/* hook up your password reset flow */}}
                >
                  Forgot Password ?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 
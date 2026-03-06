import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrganisationProps {
  onNext?: (organisation: string) => void;
}

interface Organisation {
  id: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ORGANISATIONS: Organisation[] = [
  { id: "acme",      label: "Acme Corporation" },
  { id: "globex",    label: "Globex Industries" },
  { id: "initech",   label: "Initech Group" },
  { id: "umbrella",  label: "Umbrella Ltd" },
  { id: "soylent",   label: "Soylent Dynamics" },
  { id: "vehement",  label: "Vehement Capital" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated mesh gradient — identical background to the login page */
function MeshGradient() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #daeeff 28%, #9ecfff 42%, #3d8fff 58%, #1155ee 75%, #0930cc 100%)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "38%", left: "-10%", width: "80%", height: "55%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(100,200,255,0.75) 0%, transparent 65%)",
          filter: "blur(32px)",
          animation: "driftA 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "45%", right: "-15%", width: "75%", height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(60,120,255,0.65) 0%, transparent 65%)",
          filter: "blur(28px)",
          animation: "driftB 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "55%", left: "20%", width: "60%", height: "40%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(130,210,255,0.5) 0%, transparent 60%)",
          filter: "blur(22px)",
          animation: "driftC 13s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Organisation({ onNext }: OrganisationProps) {
  const [mounted, setMounted]       = useState(false);
  const [selected, setSelected]     = useState<Organisation | null>(null);
  const [open, setOpen]             = useState(false);
  const [loading, setLoading]       = useState(false);
  const dropdownRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleNext() {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext?.(selected.id);
    }, 1200);
  }

  return (
    <>
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
          0%, 100% { transform: translate(0%,  0%) scale(1);    }
          33%       { transform: translate(6%,  -4%) scale(1.05); }
          66%       { transform: translate(-4%, 6%)  scale(0.97); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0%,  0%) scale(1);    }
          40%       { transform: translate(-8%, 5%)  scale(1.08); }
          75%       { transform: translate(5%,  -3%) scale(0.95); }
        }
        @keyframes driftC {
          0%, 100% { transform: translate(0%, 0%)  scale(1);    }
          50%       { transform: translate(4%, -6%) scale(1.06); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes dropdownOpen {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0)    scaleY(1);    }
        }

        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        .anim-logo   { animation: fadeSlideUp 0.5s  cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.05s; }
        .anim-label  { animation: fadeSlideUp 0.5s  cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.15s; }
        .anim-select { animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.25s; }
        .anim-btn    { animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.35s; }

        .next-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .next-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(255,255,255,0.3);
        }
        .next-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .next-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .dropdown-list {
          animation: dropdownOpen 0.2s cubic-bezier(0.22,1,0.36,1) both;
          transform-origin: top;
        }

        .dropdown-item {
          transition: background 0.15s ease;
        }
        .dropdown-item:hover {
          background: rgba(255,255,255,0.12);
        }

        .chevron {
          transition: transform 0.25s ease;
        }
        .chevron.open {
          transform: rotate(180deg);
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

        .select-trigger {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .select-trigger:focus-visible {
          outline: none;
          border-color: rgba(255,255,255,0.6) !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
        }
      `}</style>

      {/* ── Full-screen wrapper ── */}
      <div
        className="relative min-h-screen w-full overflow-hidden flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <MeshGradient />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col flex-1 w-full">

          {/* LOGO */}
          <div className={`text-center pt-12 sm:pt-16 ${mounted ? "anim-logo" : "opacity-0"}`}>
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Form area ── */}
          <div className="w-full px-6 pb-10 sm:pb-16 flex flex-col items-center">
            <div className="w-full" style={{ maxWidth: 420 }}>

              {/* "Organisation" label — left-aligned, matching screenshot */}
              <div className={`mb-2 ${mounted ? "anim-label" : "opacity-0"}`}>
                <span
                  className="text-sm text-white/80"
                  style={{ letterSpacing: "0.01em" }}
                >
                  Organisation
                </span>
              </div>

              {/* Custom Select Dropdown */}
              <div
                ref={dropdownRef}
                className={`relative mb-4 ${mounted ? "anim-select" : "opacity-0"}`}
              >
                {/* Trigger */}
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  onClick={() => setOpen((o) => !o)}
                  className="select-trigger w-full px-5 py-4 rounded-full flex items-center justify-between text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: open
                      ? "1px solid rgba(255,255,255,0.55)"
                      : "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow: open
                      ? "0 0 0 3px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,0.12)",
                    color: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                    letterSpacing: "0.01em",
                  }}
                >
                  <span>{selected ? selected.label : "Select"}</span>

                  {/* Chevron — matches the screenshot's down arrow */}
                  <svg
                    className={`chevron ${open ? "open" : ""} flex-shrink-0`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown list */}
                {open && (
                  <ul
                    role="listbox"
                    className="dropdown-list absolute left-0 right-0 mt-2 py-1.5 z-50 overflow-hidden"
                    style={{
                      background: "rgba(15,40,130,0.75)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 20,
                      boxShadow: "0 16px 48px rgba(0,20,100,0.45)",
                    }}
                  >
                    {ORGANISATIONS.map((org) => (
                      <li
                        key={org.id}
                        role="option"
                        aria-selected={selected?.id === org.id}
                        onClick={() => {
                          setSelected(org);
                          setOpen(false);
                        }}
                        className="dropdown-item px-5 py-3 text-sm cursor-pointer flex items-center justify-between"
                        style={{
                          color:
                            selected?.id === org.id
                              ? "rgba(255,255,255,1)"
                              : "rgba(255,255,255,0.7)",
                          background:
                            selected?.id === org.id
                              ? "rgba(255,255,255,0.1)"
                              : "transparent",
                        }}
                      >
                        <span>{org.label}</span>
                        {selected?.id === org.id && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(255,255,255,0.8)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Next button */}
              <div className={mounted ? "anim-btn" : "opacity-0"}>
                <button
                  type="button"
                  disabled={!selected || loading}
                  onClick={handleNext}
                  className="next-btn w-full py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "'Ethnocentric', sans-serif",
                    background: "#ffffff",
                    color: "#0a20bb",
                    letterSpacing: "0.04em",
                    boxShadow: "0 6px 28px rgba(255,255,255,0.2)",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spin-ring" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em" }}>
                        Loading…
                      </span>
                    </>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
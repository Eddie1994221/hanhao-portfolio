import { projects } from "../../data/projects";
import type { CSSProperties } from "react";

const signalFieldCss = `
  .signal-field-page,
  .signal-field-page * {
    box-sizing: border-box;
  }

  .signal-field-page {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #020407;
    color: rgba(245, 248, 255, 0.94);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .signal-field-page::before,
  .signal-field-page::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
  }

  .signal-field-page::before {
    background:
      radial-gradient(circle at 50% 28%, rgba(90, 150, 180, 0.10), transparent 30%),
      radial-gradient(circle at 78% 72%, rgba(145, 205, 226, 0.052), transparent 25%),
      linear-gradient(180deg, rgba(2, 4, 7, 0.32), rgba(2, 4, 7, 0.92));
  }

  .signal-field-page::after {
    opacity: 0.05;
    background-image:
      linear-gradient(rgba(180, 210, 225, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180, 210, 225, 0.09) 1px, transparent 1px);
    background-size: 84px 84px;
    mask-image: radial-gradient(circle at 50% 45%, black, transparent 74%);
  }

  .signal-field-shell {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100vw - 96px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 30px 0 42px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 26px;
  }

  .signal-field-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-width: 0;
  }

  .signal-field-link,
  .signal-field-route {
    font-family: Cousine, Consolas, monospace;
    text-transform: uppercase;
  }

  .signal-field-link {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(223, 248, 255, 0.22);
    border-radius: 999px;
    background: rgba(6, 16, 22, 0.46);
    color: rgba(239, 251, 255, 0.82);
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .signal-field-link:hover {
    border-color: rgba(223, 248, 255, 0.36);
    background: rgba(10, 24, 32, 0.66);
    color: rgba(248, 254, 255, 0.96);
    transform: translateY(-1px);
  }

  .signal-field-route {
    margin: 0;
    color: rgba(200, 215, 225, 0.55);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-align: right;
    white-space: nowrap;
  }

  .signal-field-hero {
    display: grid;
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
    gap: clamp(36px, 6vw, 76px);
    align-items: center;
    min-width: 0;
  }

  .signal-field-copy,
  .signal-field-stage,
  .signal-node,
  .signal-node-meta {
    min-width: 0;
  }

  .signal-field-kicker {
    margin: 0 0 18px;
    color: rgba(145, 205, 226, 0.68);
    font-family: Cousine, Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
  }

  .signal-field-title {
    margin: 0;
    max-width: 520px;
    color: rgba(245, 248, 255, 0.98);
    font-size: clamp(46px, 6vw, 78px);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: 0.01em;
    text-shadow: 0 0 24px rgba(180, 220, 238, 0.10);
  }

  .signal-field-summary {
    max-width: 480px;
    margin: 24px 0 0;
    color: rgba(205, 218, 228, 0.64);
    font-size: 14px;
    line-height: 1.72;
  }

  .signal-field-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    max-width: 520px;
    margin-top: 28px;
    border: 1px solid rgba(180, 210, 225, 0.09);
    background: rgba(180, 210, 225, 0.07);
  }

  .signal-field-stat {
    padding: 14px 15px;
    background: rgba(2, 6, 9, 0.72);
  }

  .signal-field-stat strong,
  .signal-field-stat span {
    display: block;
  }

  .signal-field-stat strong {
    color: rgba(245, 248, 255, 0.90);
    font-family: Cousine, Consolas, monospace;
    font-size: 18px;
    line-height: 1;
  }

  .signal-field-stat span {
    margin-top: 7px;
    color: rgba(150, 170, 185, 0.52);
    font-family: Cousine, Consolas, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .signal-field-stage {
    position: relative;
    min-height: 570px;
    border: 1px solid rgba(180, 210, 225, 0.075);
    background:
      radial-gradient(circle at 50% 50%, rgba(120, 190, 220, 0.10), transparent 32%),
      rgba(2, 7, 10, 0.26);
    overflow: hidden;
  }

  .signal-field-stage::before,
  .signal-field-stage::after {
    content: "";
    position: absolute;
    inset: 42px;
    pointer-events: none;
  }

  .signal-field-stage::before {
    border: 1px solid rgba(180, 210, 225, 0.07);
  }

  .signal-field-stage::after {
    background:
      linear-gradient(32deg, transparent 49.85%, rgba(180, 210, 225, 0.11) 50%, transparent 50.15%),
      linear-gradient(-28deg, transparent 49.85%, rgba(180, 210, 225, 0.08) 50%, transparent 50.15%),
      radial-gradient(circle at 50% 50%, rgba(245, 248, 255, 0.15) 0 1px, transparent 2px);
    opacity: 0.38;
  }

  .signal-core {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 148px;
    height: 148px;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(210, 235, 245, 0.16);
    border-radius: 999px;
    background:
      radial-gradient(circle, rgba(210, 235, 245, 0.17), rgba(70, 120, 150, 0.06) 45%, transparent 68%);
    box-shadow:
      inset 0 0 36px rgba(120, 190, 220, 0.10),
      0 0 60px rgba(120, 190, 220, 0.10);
  }

  .signal-core::before,
  .signal-core::after {
    content: "";
    position: absolute;
    inset: 20px;
    border: 1px solid rgba(210, 235, 245, 0.10);
    border-radius: inherit;
  }

  .signal-core::after {
    inset: 46px;
    background: rgba(245, 248, 255, 0.78);
    box-shadow: 0 0 24px rgba(180, 230, 250, 0.42);
  }

  .signal-node {
    --x: 50%;
    --y: 50%;
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 178px;
    padding: 10px;
    transform: translate(-50%, -50%);
    color: inherit;
    text-decoration: none;
  }

  .signal-node-shell {
    position: relative;
    height: 108px;
    border: 1px solid rgba(180, 210, 225, 0.12);
    background:
      linear-gradient(180deg, rgba(8, 18, 24, 0.64), rgba(3, 8, 12, 0.82));
    overflow: hidden;
    box-shadow:
      inset 0 1px 0 rgba(245, 248, 255, 0.035),
      0 12px 34px rgba(0, 0, 0, 0.24);
    transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
  }

  .signal-node:hover .signal-node-shell {
    border-color: rgba(220, 240, 248, 0.24);
    transform: translateY(-2px);
    box-shadow:
      inset 0 1px 0 rgba(245, 248, 255, 0.06),
      0 18px 44px rgba(0, 0, 0, 0.30),
      0 0 28px color-mix(in srgb, var(--accent) 24%, transparent);
  }

  .signal-node-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.62;
    filter: saturate(0.78) contrast(1.06) brightness(0.76);
    transform: scale(1.02);
  }

  .signal-node-index {
    position: absolute;
    left: 10px;
    top: 9px;
    min-width: 28px;
    padding: 3px 6px;
    background: rgba(2, 6, 9, 0.52);
    color: rgba(245, 248, 255, 0.72);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .signal-node-meta {
    margin-top: 9px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 8px;
    align-items: center;
  }

  .signal-node-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 48%, transparent);
  }

  .signal-node-title {
    margin: 0;
    color: rgba(245, 248, 255, 0.84);
    font-family: Cousine, Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .signal-field-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    color: rgba(150, 170, 185, 0.50);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .signal-field-footer-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(180, 210, 225, 0.10), transparent);
  }

  @media (max-width: 980px) {
    .signal-field-shell {
      width: min(100%, calc(100vw - 36px));
      display: block;
      padding: 22px 0 42px;
    }

    .signal-field-hero {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 44px;
    }

    .signal-field-stage {
      min-height: 680px;
    }

    .signal-node {
      width: min(210px, 42vw);
    }
  }

  @media (max-width: 640px) {
    .signal-field-route {
      display: none;
    }

    .signal-field-title {
      font-size: clamp(42px, 15vw, 60px);
    }

    .signal-field-stats {
      grid-template-columns: 1fr;
    }

    .signal-field-stage {
      min-height: auto;
      display: grid;
      gap: 12px;
      padding: 18px;
    }

    .signal-field-stage::before,
    .signal-field-stage::after,
    .signal-core {
      display: none;
    }

    .signal-node {
      position: relative;
      left: auto;
      top: auto;
      width: 100%;
      transform: none;
      padding: 0;
    }
  }
`;

const nodeLayout = [
  ["22%", "28%"],
  ["50%", "18%"],
  ["78%", "29%"],
  ["75%", "70%"],
  ["50%", "82%"],
  ["24%", "69%"],
] as const;

export function SignalFieldPage() {
  return (
    <main className="signal-field-page">
      <style>{signalFieldCss}</style>
      <section className="signal-field-shell">
        <header className="signal-field-topbar">
          <a className="signal-field-link" href="/">
            Back to Journey
          </a>
          <p className="signal-field-route">Experiment / Signal Field</p>
        </header>

        <div className="signal-field-hero">
          <section className="signal-field-copy" aria-labelledby="signal-field-title">
            <p className="signal-field-kicker">Signal Field / Product Systems</p>
            <h1 id="signal-field-title" className="signal-field-title">
              Quiet Signals for Future Interfaces
            </h1>
            <p className="signal-field-summary">
              An alternate portfolio home built as a field of product signals. Each node is treated as a system carrier:
              restrained, indexable, and spatial without relying on the current 3D journey.
            </p>

            <div className="signal-field-stats" aria-label="Signal field attributes">
              <div className="signal-field-stat">
                <strong>06</strong>
                <span>Project Signals</span>
              </div>
              <div className="signal-field-stat">
                <strong>01</strong>
                <span>Field Surface</span>
              </div>
              <div className="signal-field-stat">
                <strong>0</strong>
                <span>Stable Route Impact</span>
              </div>
            </div>
          </section>

          <section className="signal-field-stage" aria-label="Experimental project signal field">
            <div className="signal-core" aria-hidden="true" />
            {projects.map((project, index) => {
              const [x, y] = nodeLayout[index] ?? ["50%", "50%"];
              return (
                <a
                  className="signal-node"
                  href={project.link}
                  key={project.id}
                  style={{ "--x": x, "--y": y, "--accent": project.themeColor } as CSSProperties}
                >
                  <div className="signal-node-shell">
                    <img
                      className="signal-node-image"
                      src={project.coverImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="signal-node-index">{project.numberLabel}</span>
                  </div>
                  <div className="signal-node-meta">
                    <span className="signal-node-dot" aria-hidden="true" />
                    <p className="signal-node-title">{project.title}</p>
                  </div>
                </a>
              );
            })}
          </section>
        </div>

        <footer className="signal-field-footer" aria-label="Signal field status">
          <span>Prototype Surface</span>
          <span className="signal-field-footer-line" />
          <span>Route Isolated</span>
        </footer>
      </section>
    </main>
  );
}

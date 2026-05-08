const experimentsIndexCss = `
  .experiments-page,
  .experiments-page * {
    box-sizing: border-box;
  }

  .experiments-page {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #020407;
    color: rgba(245, 248, 255, 0.94);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .experiments-page::before,
  .experiments-page::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
  }

  .experiments-page::before {
    background:
      radial-gradient(circle at 72% 24%, rgba(90, 150, 180, 0.085), transparent 30%),
      radial-gradient(circle at 18% 80%, rgba(120, 190, 220, 0.045), transparent 34%);
  }

  .experiments-page::after {
    opacity: 0.025;
    background-image:
      linear-gradient(rgba(180, 210, 225, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180, 210, 225, 0.10) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(circle at 52% 44%, black, transparent 76%);
  }

  .experiments-shell {
    position: relative;
    z-index: 1;
    width: min(1120px, calc(100vw - 96px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 32px 0 48px;
    display: grid;
    align-content: center;
    gap: 34px;
  }

  .experiments-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .experiments-back,
  .experiments-route,
  .experiments-kicker,
  .experiment-status,
  .experiment-link,
  .experiment-index {
    font-family: Cousine, Consolas, monospace;
    text-transform: uppercase;
  }

  .experiments-back {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(223, 248, 255, 0.22);
    border-radius: 999px;
    background: rgba(6, 16, 22, 0.48);
    color: rgba(239, 251, 255, 0.84);
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
  }

  .experiments-route {
    margin: 0;
    color: rgba(200, 215, 225, 0.56);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.24em;
    white-space: nowrap;
  }

  .experiments-heading {
    display: grid;
    grid-template-columns: minmax(0, 0.56fr) minmax(280px, 0.44fr);
    gap: clamp(34px, 6vw, 74px);
    align-items: end;
    min-width: 0;
  }

  .experiments-kicker {
    margin: 0 0 16px;
    color: rgba(145, 205, 226, 0.68);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.30em;
  }

  .experiments-title {
    margin: 0;
    max-width: 640px;
    color: rgba(245, 248, 255, 0.98);
    font-size: clamp(38px, 5vw, 68px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.01em;
  }

  .experiments-summary {
    margin: 0;
    color: rgba(205, 218, 228, 0.64);
    font-size: 14px;
    line-height: 1.75;
  }

  .experiments-list {
    border-top: 1px solid rgba(180, 210, 225, 0.10);
  }

  .experiment-row {
    display: grid;
    grid-template-columns: 54px minmax(0, 1fr) 110px 150px;
    gap: 24px;
    align-items: center;
    min-width: 0;
    padding: 22px 0;
    border-bottom: 1px solid rgba(180, 210, 225, 0.075);
  }

  .experiment-index {
    color: rgba(150, 170, 185, 0.44);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .experiment-name {
    margin: 0;
    color: rgba(245, 248, 255, 0.90);
    font-size: 23px;
    font-weight: 650;
    line-height: 1.1;
  }

  .experiment-description {
    margin: 8px 0 0;
    color: rgba(205, 218, 228, 0.58);
    font-size: 13px;
    line-height: 1.55;
  }

  .experiment-status {
    justify-self: start;
    min-width: 92px;
    padding: 7px 9px;
    border: 1px solid rgba(180, 210, 225, 0.11);
    border-radius: 999px;
    color: rgba(145, 205, 226, 0.68);
    background: rgba(80, 140, 170, 0.045);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-align: center;
  }

  .experiment-link {
    justify-self: end;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    min-width: 126px;
    border: 1px solid rgba(223, 248, 255, 0.22);
    border-radius: 999px;
    color: rgba(239, 251, 255, 0.84);
    text-decoration: none;
    background: rgba(6, 16, 22, 0.42);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .experiment-link:hover {
    border-color: rgba(223, 248, 255, 0.36);
    background: rgba(10, 24, 32, 0.66);
    color: rgba(248, 254, 255, 0.96);
    transform: translateY(-1px);
  }

  @media (max-width: 820px) {
    .experiments-shell {
      width: min(100%, calc(100vw - 36px));
      display: block;
    }

    .experiments-heading {
      grid-template-columns: 1fr;
      margin: 56px 0 30px;
    }

    .experiment-row {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .experiment-link {
      justify-self: start;
    }
  }

  @media (max-width: 560px) {
    .experiments-route {
      display: none;
    }
  }
`;

const experimentEntries = [
  {
    label: "00",
    name: "Current Stable Home",
    path: "/",
    status: "Active",
    description: "Current production journey with the existing 3D exploration, nodes, CTA, and loading flow.",
  },
  {
    label: "A",
    name: "Signal Field / 信号原野",
    path: "/signal-field",
    status: "Candidate",
    description: "A quiet product signal surface for system-like project carriers and future interface framing.",
  },
  {
    label: "B",
    name: "Archive Capsule / 轨道档案舱",
    path: "/archive-capsule",
    status: "Draft",
    description: "A contained orbital archive structure for comparing projects as indexed capsules.",
  },
  {
    label: "C",
    name: "Digital Mirage / 数字幻境",
    path: "/digital-mirage",
    status: "Draft",
    description: "A restrained mirage layer for softer signal depth, reflective interfaces, and atmospheric browsing.",
  },
];

export function ExperimentsIndex() {
  return (
    <main className="experiments-page">
      <style>{experimentsIndexCss}</style>
      <section className="experiments-shell">
        <header className="experiments-topbar">
          <a className="experiments-back" href="/">
            Back to Journey
          </a>
          <p className="experiments-route">Home Experiments</p>
        </header>

        <section className="experiments-heading" aria-labelledby="experiments-title">
          <div>
            <p className="experiments-kicker">Parallel Preview Matrix</p>
            <h1 id="experiments-title" className="experiments-title">
              Home Direction Experiments
            </h1>
          </div>
          <p className="experiments-summary">
            Isolated preview routes for comparing homepage directions without touching the current stable journey.
            Each route reads from the same project data and can evolve independently.
          </p>
        </section>

        <section className="experiments-list" aria-label="Experiment previews">
          {experimentEntries.map((entry) => (
            <article className="experiment-row" key={entry.path}>
              <span className="experiment-index">{entry.label}</span>
              <div>
                <h2 className="experiment-name">{entry.name}</h2>
                <p className="experiment-description">{entry.description}</p>
              </div>
              <span className="experiment-status">{entry.status}</span>
              <a className="experiment-link" href={entry.path}>
                Preview
              </a>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

import { projects } from "../../data/projects";

const digitalMirageCss = `
  .digital-mirage-page,
  .digital-mirage-page * {
    box-sizing: border-box;
  }

  .digital-mirage-page {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #020407;
    color: rgba(245, 248, 255, 0.94);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .digital-mirage-page::before,
  .digital-mirage-page::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
  }

  .digital-mirage-page::before {
    background:
      radial-gradient(ellipse at 50% 30%, rgba(120, 190, 220, 0.08), transparent 32%),
      radial-gradient(ellipse at 70% 78%, rgba(220, 235, 245, 0.035), transparent 28%);
  }

  .digital-mirage-page::after {
    opacity: 0.045;
    background:
      repeating-linear-gradient(0deg, rgba(245, 248, 255, 0.10) 0 1px, transparent 1px 12px);
    mask-image: linear-gradient(180deg, transparent, black 24%, black 78%, transparent);
  }

  .digital-mirage-shell {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100vw - 96px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 32px 0 46px;
    display: grid;
    align-content: center;
    gap: 34px;
  }

  .digital-mirage-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .digital-mirage-link,
  .digital-mirage-route,
  .digital-mirage-kicker,
  .digital-mirage-label,
  .digital-mirage-number {
    font-family: Cousine, Consolas, monospace;
    text-transform: uppercase;
  }

  .digital-mirage-link {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(223, 248, 255, 0.22);
    border-radius: 999px;
    color: rgba(239, 251, 255, 0.84);
    background: rgba(6, 16, 22, 0.46);
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
  }

  .digital-mirage-route {
    margin: 0;
    color: rgba(200, 215, 225, 0.56);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.24em;
    white-space: nowrap;
  }

  .digital-mirage-hero {
    display: grid;
    grid-template-columns: minmax(0, 0.40fr) minmax(0, 0.60fr);
    gap: clamp(34px, 6vw, 76px);
    align-items: center;
  }

  .digital-mirage-kicker {
    margin: 0 0 16px;
    color: rgba(145, 205, 226, 0.68);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.30em;
  }

  .digital-mirage-title {
    margin: 0;
    color: rgba(245, 248, 255, 0.98);
    font-size: clamp(42px, 5.2vw, 72px);
    font-weight: 700;
    line-height: 0.98;
  }

  .digital-mirage-summary {
    margin: 22px 0 0;
    max-width: 500px;
    color: rgba(205, 218, 228, 0.64);
    font-size: 14px;
    line-height: 1.75;
  }

  .digital-mirage-panel {
    display: grid;
    gap: 12px;
    padding: 18px;
    border: 1px solid rgba(180, 210, 225, 0.09);
    background:
      radial-gradient(circle at 50% 20%, rgba(120, 190, 220, 0.08), transparent 34%),
      rgba(3, 8, 12, 0.38);
  }

  .digital-mirage-row {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr) 96px;
    gap: 16px;
    align-items: center;
    min-width: 0;
    padding: 13px 0;
    border-bottom: 1px solid rgba(180, 210, 225, 0.075);
    color: inherit;
    text-decoration: none;
  }

  .digital-mirage-row:last-child {
    border-bottom: 0;
  }

  .digital-mirage-number {
    color: rgba(150, 170, 185, 0.44);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .digital-mirage-name {
    margin: 0;
    color: rgba(245, 248, 255, 0.88);
    font-family: Cousine, Consolas, monospace;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .digital-mirage-description {
    margin: 7px 0 0;
    color: rgba(205, 218, 228, 0.56);
    font-size: 12px;
    line-height: 1.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .digital-mirage-label {
    justify-self: end;
    color: rgba(145, 205, 226, 0.58);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
  }

  @media (max-width: 900px) {
    .digital-mirage-shell {
      width: min(100%, calc(100vw - 36px));
      align-content: start;
    }

    .digital-mirage-hero {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .digital-mirage-route {
      display: none;
    }

    .digital-mirage-row {
      grid-template-columns: 42px minmax(0, 1fr);
    }

    .digital-mirage-label {
      display: none;
    }
  }
`;

export function DigitalMiragePage() {
  return (
    <main className="digital-mirage-page">
      <style>{digitalMirageCss}</style>
      <section className="digital-mirage-shell">
        <header className="digital-mirage-topbar">
          <a className="digital-mirage-link" href="/experiments">
            Back to Experiments
          </a>
          <p className="digital-mirage-route">Experiment / Digital Mirage</p>
        </header>

        <section className="digital-mirage-hero" aria-labelledby="digital-mirage-title">
          <div>
            <p className="digital-mirage-kicker">Digital Mirage / 数字幻境</p>
            <h1 id="digital-mirage-title" className="digital-mirage-title">
              Soft Signal Layer for Project Discovery
            </h1>
            <p className="digital-mirage-summary">
              A lightweight skeleton for a quieter digital mirage direction. The first pass keeps project data and
              navigation stable while leaving room for a future atmospheric treatment.
            </p>
          </div>

          <section className="digital-mirage-panel" aria-label="Digital mirage project links">
            {projects.map((project) => (
              <a className="digital-mirage-row" href={project.link} key={project.id}>
                <span className="digital-mirage-number">{project.numberLabel}</span>
                <div>
                  <h2 className="digital-mirage-name">{project.title}</h2>
                  <p className="digital-mirage-description">{project.subtitle}</p>
                </div>
                <span className="digital-mirage-label">{project.category}</span>
              </a>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
}

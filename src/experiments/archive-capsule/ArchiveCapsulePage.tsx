import { projects } from "../../data/projects";

const archiveCapsuleCss = `
  .archive-capsule-page,
  .archive-capsule-page * {
    box-sizing: border-box;
  }

  .archive-capsule-page {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #020407;
    color: rgba(245, 248, 255, 0.94);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .archive-capsule-page::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 52% 34%, rgba(120, 160, 190, 0.09), transparent 30%),
      radial-gradient(circle at 18% 82%, rgba(90, 150, 180, 0.04), transparent 32%);
  }

  .archive-capsule-shell {
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

  .archive-capsule-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .archive-capsule-link,
  .archive-capsule-route,
  .archive-capsule-kicker,
  .archive-capsule-index {
    font-family: Cousine, Consolas, monospace;
    text-transform: uppercase;
  }

  .archive-capsule-link {
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

  .archive-capsule-route {
    margin: 0;
    color: rgba(200, 215, 225, 0.56);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.24em;
    white-space: nowrap;
  }

  .archive-capsule-hero {
    display: grid;
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
    gap: clamp(34px, 6vw, 78px);
    align-items: end;
  }

  .archive-capsule-kicker {
    margin: 0 0 16px;
    color: rgba(145, 205, 226, 0.68);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.30em;
  }

  .archive-capsule-title {
    margin: 0;
    color: rgba(245, 248, 255, 0.98);
    font-size: clamp(42px, 5.2vw, 72px);
    font-weight: 700;
    line-height: 0.98;
  }

  .archive-capsule-summary {
    margin: 0;
    color: rgba(205, 218, 228, 0.64);
    font-size: 14px;
    line-height: 1.75;
  }

  .archive-capsule-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid rgba(180, 210, 225, 0.10);
    border-left: 1px solid rgba(180, 210, 225, 0.07);
  }

  .archive-capsule-card {
    min-width: 0;
    min-height: 168px;
    display: grid;
    align-content: space-between;
    padding: 18px;
    border-right: 1px solid rgba(180, 210, 225, 0.07);
    border-bottom: 1px solid rgba(180, 210, 225, 0.07);
    color: inherit;
    text-decoration: none;
    background:
      linear-gradient(180deg, rgba(8, 18, 24, 0.34), rgba(3, 8, 12, 0.18));
  }

  .archive-capsule-card:hover {
    background:
      linear-gradient(180deg, rgba(10, 24, 32, 0.48), rgba(3, 8, 12, 0.24));
  }

  .archive-capsule-index {
    color: rgba(150, 170, 185, 0.44);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .archive-capsule-name {
    margin: 20px 0 0;
    color: rgba(245, 248, 255, 0.88);
    font-family: Cousine, Consolas, monospace;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
  }

  .archive-capsule-category {
    margin: 10px 0 0;
    color: rgba(145, 205, 226, 0.58);
    font-size: 12px;
    line-height: 1.4;
  }

  .archive-capsule-tags {
    margin: 22px 0 0;
    color: rgba(150, 170, 185, 0.50);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    .archive-capsule-shell {
      width: min(100%, calc(100vw - 36px));
      align-content: start;
    }

    .archive-capsule-hero,
    .archive-capsule-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .archive-capsule-route {
      display: none;
    }
  }
`;

export function ArchiveCapsulePage() {
  return (
    <main className="archive-capsule-page">
      <style>{archiveCapsuleCss}</style>
      <section className="archive-capsule-shell">
        <header className="archive-capsule-topbar">
          <a className="archive-capsule-link" href="/experiments">
            Back to Experiments
          </a>
          <p className="archive-capsule-route">Experiment / Archive Capsule</p>
        </header>

        <section className="archive-capsule-hero" aria-labelledby="archive-capsule-title">
          <div>
            <p className="archive-capsule-kicker">Archive Capsule / 轨道档案舱</p>
            <h1 id="archive-capsule-title" className="archive-capsule-title">
              Orbital Index for Project Archives
            </h1>
          </div>
          <p className="archive-capsule-summary">
            A lightweight skeleton for a future archive-capsule direction. Projects are presented as indexed capsules,
            keeping the route isolated while preserving all current project links.
          </p>
        </section>

        <section className="archive-capsule-grid" aria-label="Archive capsule project links">
          {projects.map((project) => (
            <a className="archive-capsule-card" href={project.link} key={project.id}>
              <span className="archive-capsule-index">{project.numberLabel}</span>
              <div>
                <h2 className="archive-capsule-name">{project.title}</h2>
                <p className="archive-capsule-category">{project.category}</p>
                <p className="archive-capsule-tags">{project.tags.join(" / ")}</p>
              </div>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}

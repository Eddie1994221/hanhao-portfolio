import { useState } from "react";

const avatarPath = "/portfolio/profile/avatar.jpg";

const profile = {
  name: "韩灏",
  romanName: "HAN HAO",
  role: "Product Design Engineer",
  email: "m13131676216@163.com",
  phone: "13131676216",
  education: "渭南师范 — 数字媒体艺术（本科）",
};

const capabilities = [
  "Product Design",
  "Interaction Design",
  "Visual Design",
  "AI Experience",
  "Mobility Experience",
  "Service Design",
  "Design Systems",
  "Design Engineering",
];

const impacts = [
  {
    title: "全链路体验设计",
    body: "从信息架构、流程设计、交互细节到视觉表现，推动复杂业务路径清晰落地。",
  },
  {
    title: "汽车业务核心链路",
    body: "负责 SU7 Ultra 购车流程、服务频道、F 码领取、预约试驾、交付流程等关键体验改版。",
  },
  {
    title: "发布与运营视觉",
    body: "参与 SU7、SU7 Ultra、YU7 发布会物料及视觉长图等运营推广设计。",
  },
  {
    title: "业务结果与增长",
    body: "相关项目助力小米汽车销售突破，YU7 项目推动小米股价单日市值激增超 500 亿港元。",
  },
  {
    title: "AI 与视觉动效",
    body: "将 AI 工作链路、视觉动效与产品体验结合，服务多个高关注度业务场景。",
  },
  {
    title: "奖项与认可",
    body: "负责项目获得 2025 德国 iF 设计大奖，多个设计方案获得项目负责人与集团高层认可。",
  },
];

const profilePageCss = `
  .profile-page,
  .profile-page * {
    box-sizing: border-box;
  }

  .profile-page {
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #020407;
    color: rgba(245, 248, 255, 0.96);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
  }

  .profile-page::before,
  .profile-page::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
  }

  .profile-page::before {
    background:
      radial-gradient(circle at 63% 35%, rgba(90, 150, 180, 0.072), transparent 30%),
      radial-gradient(circle at 18% 72%, rgba(90, 150, 180, 0.032), transparent 32%);
  }

  .profile-page::after {
    opacity: 0.018;
    background-image:
      linear-gradient(rgba(180, 210, 225, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180, 210, 225, 0.10) 1px, transparent 1px),
      repeating-linear-gradient(0deg, rgba(245, 248, 255, 0.10) 0 1px, transparent 1px 9px);
    background-size: 56px 56px, 56px 56px, 100% 9px;
    mask-image: radial-gradient(circle at 56% 44%, black, transparent 78%);
  }

  .profile-topbar {
    position: sticky;
    top: 0;
    z-index: 5;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 14px clamp(18px, 4vw, 54px);
    border-bottom: 1px solid rgba(180, 210, 225, 0.10);
    background: rgba(2, 4, 7, 0.78);
    backdrop-filter: blur(16px) saturate(118%);
    -webkit-backdrop-filter: blur(16px) saturate(118%);
  }

  .profile-back {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(223, 248, 255, 0.24);
    border-radius: 999px;
    background: rgba(6, 16, 22, 0.58);
    color: rgba(239, 251, 255, 0.86);
    text-decoration: none;
    font-family: Cousine, Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .profile-back:hover {
    border-color: rgba(223, 248, 255, 0.38);
    background: rgba(10, 24, 32, 0.72);
    color: rgba(248, 254, 255, 0.96);
    transform: translateY(-1px);
  }

  .profile-back:focus-visible {
    outline: 1px solid rgba(143, 220, 255, 0.58);
    outline-offset: 3px;
  }

  .profile-route {
    min-width: 0;
    margin: 0;
    color: rgba(200, 215, 225, 0.62);
    font-family: Cousine, Consolas, monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-align: right;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .profile-shell {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100vw - 96px));
    max-width: 1180px;
    min-height: calc(100dvh - 65px);
    margin: 0 auto;
    padding: clamp(18px, 2.7vh, 30px) 0 26px;
    display: grid;
    align-content: center;
    gap: clamp(18px, 2.5vh, 24px);
  }

  .profile-main-grid,
  .profile-bottom-grid,
  .profile-copy,
  .profile-visual,
  .impact-panel,
  .capability-panel {
    min-width: 0;
  }

  .profile-main-grid {
    display: grid;
    grid-template-columns: minmax(300px, 338px) minmax(0, 1fr);
    gap: clamp(50px, 5.4vw, 68px);
    align-items: start;
  }

  .portrait-shell {
    position: relative;
    width: min(328px, 100%);
    height: clamp(392px, 43.5vh, 424px);
    padding: 12px;
    border: 1px solid rgba(170, 205, 220, 0.12);
    border-radius: 3px;
    background:
      linear-gradient(180deg, rgba(7, 15, 20, 0.88), rgba(2, 5, 8, 0.92)),
      rgba(4, 10, 14, 0.78);
    box-shadow:
      inset 0 0 0 1px rgba(245, 248, 255, 0.018),
      inset 0 0 38px rgba(0, 0, 0, 0.20),
      0 24px 58px rgba(0, 0, 0, 0.40),
      0 0 38px rgba(90, 160, 190, 0.065);
    overflow: hidden;
  }

  .portrait-shell::before {
    content: "";
    position: absolute;
    inset: 12px;
    z-index: 2;
    pointer-events: none;
    border: 1px solid rgba(180, 210, 225, 0.07);
  }

  .portrait-window {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #03080c;
    box-shadow:
      inset 0 0 34px rgba(2, 4, 7, 0.32),
      inset 0 -42px 56px rgba(2, 4, 7, 0.22);
  }

  .portrait-window::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(2, 4, 7, 0.28), transparent 22%, transparent 78%, rgba(2, 4, 7, 0.28)),
      radial-gradient(ellipse at 50% 14%, transparent 44%, rgba(2, 4, 7, 0.18) 100%),
      radial-gradient(ellipse at 50% 94%, rgba(2, 4, 7, 0.30), transparent 42%);
    mix-blend-mode: multiply;
  }

  .portrait-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: saturate(0.80) brightness(0.88) contrast(1.08);
  }

  .portrait-fallback {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 28%, rgba(120, 190, 220, 0.10), transparent 34%),
      #03080c;
  }

  .portrait-meta {
    width: min(328px, 100%);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(180, 210, 225, 0.075);
    color: rgba(150, 170, 185, 0.42);
    font-family: Cousine, Consolas, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .profile-kicker {
    margin: 0 0 13px;
    color: rgba(150, 170, 185, 0.52);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.30em;
    text-transform: uppercase;
  }

  .profile-name {
    margin: 0;
    color: rgba(245, 248, 255, 0.98);
    font-size: clamp(46px, 3.9vw, 52px);
    font-weight: 700;
    letter-spacing: 0.012em;
    line-height: 1;
    text-shadow: 0 0 18px rgba(255, 255, 255, 0.07);
  }

  .profile-roman {
    margin: 10px 0 0;
    color: rgba(200, 215, 225, 0.60);
    font-family: Cousine, Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.34em;
    text-transform: uppercase;
  }

  .profile-identity {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 27px;
    padding-top: 23px;
    border-top: 1px solid rgba(180, 210, 225, 0.10);
  }

  .profile-role {
    min-width: 0;
    color: rgba(245, 248, 255, 0.91);
    font-size: clamp(23px, 2vw, 27px);
    font-weight: 600;
    line-height: 1.1;
  }

  .profile-summary {
    max-width: 620px;
    margin: 22px 0 0;
    color: rgba(210, 220, 230, 0.64);
    font-size: 13.5px;
    line-height: 1.68;
  }

  .info-rail {
    display: grid;
    grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.64fr) minmax(0, 1.30fr);
    margin-top: 22px;
    border-top: 1px solid rgba(180, 210, 225, 0.075);
    border-bottom: 1px solid rgba(180, 210, 225, 0.075);
  }

  .info-item {
    min-width: 0;
    padding: 10px 16px 11px;
  }

  .info-item + .info-item {
    border-left: 1px solid rgba(180, 210, 225, 0.07);
  }

  .info-label {
    margin: 0 0 6px;
    color: rgba(150, 170, 185, 0.48);
    font-family: Cousine, Consolas, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .info-value {
    margin: 0;
    color: rgba(230, 238, 245, 0.80);
    font-size: 13px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .profile-bottom-grid {
    display: grid;
    grid-template-columns: minmax(304px, 0.36fr) minmax(0, 0.64fr);
    gap: clamp(44px, 5vw, 56px);
    align-items: start;
    padding-top: 19px;
    border-top: 1px solid rgba(180, 210, 225, 0.075);
  }

  .section-title {
    margin: 0 0 12px;
    color: rgba(245, 248, 255, 0.78);
    font-family: Cousine, Consolas, monospace;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  .capability-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .capability-chip {
    min-width: 0;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border: 1px solid rgba(180, 210, 225, 0.13);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(8, 19, 25, 0.36), rgba(3, 9, 13, 0.24));
    box-shadow: inset 0 1px 0 rgba(245, 248, 255, 0.026);
    color: rgba(215, 230, 238, 0.72);
    font-family: Cousine, Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .impact-list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid rgba(180, 210, 225, 0.075);
  }

  .impact-item {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 15px;
    align-items: baseline;
    padding: 8px 0 9px;
    border-bottom: 1px solid rgba(180, 210, 225, 0.070);
  }

  .impact-index {
    color: rgba(150, 170, 185, 0.38);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    line-height: 1.58;
    padding-top: 0;
  }

  .impact-text {
    margin: 0;
    color: rgba(210, 222, 230, 0.72);
    font-size: 13px;
    line-height: 1.58;
  }

  .impact-text strong {
    color: rgba(245, 248, 255, 0.88);
    font-weight: 650;
  }

  @media (max-height: 840px) and (min-width: 941px) {
    .profile-shell {
      padding-top: 20px;
      padding-bottom: 22px;
      gap: 18px;
    }

    .portrait-shell {
      height: 398px;
    }

    .profile-name {
      font-size: clamp(44px, 3.8vw, 50px);
    }

    .profile-summary {
      margin-top: 15px;
      line-height: 1.6;
    }

    .info-rail {
      margin-top: 15px;
    }

    .profile-bottom-grid {
      padding-top: 15px;
    }

    .impact-item {
      padding: 6px 0 7px;
    }
  }

  @media (max-width: 940px) {
    .profile-shell {
      width: min(100%, calc(100vw - 36px));
      min-height: auto;
      display: block;
      padding-top: 28px;
      padding-bottom: 44px;
    }

    .profile-main-grid,
    .profile-bottom-grid {
      grid-template-columns: 1fr;
    }

    .profile-bottom-grid {
      margin-top: 26px;
    }

    .profile-visual {
      max-width: 360px;
    }

    .info-rail {
      grid-template-columns: 1fr;
    }

    .info-item + .info-item {
      border-left: 0;
      border-top: 1px solid rgba(180, 210, 225, 0.09);
    }
  }

  @media (max-width: 560px) {
    .profile-route {
      display: none;
    }
  }
`;

function formatImpact(item: { title: string; body: string }) {
  return (
    <>
      <strong>{item.title}：</strong>
      {item.body}
    </>
  );
}

export function ProfilePage() {
  const [hasAvatar, setHasAvatar] = useState(true);

  return (
    <main className="profile-page">
      <style>{profilePageCss}</style>
      <header className="profile-topbar">
        <a href="/" className="profile-back">
          Back to Journey
        </a>
        <p className="profile-route">Profile / Han Hao</p>
      </header>

      <section className="profile-shell">
        <div className="profile-main-grid">
          <aside className="profile-visual" aria-label="Han Hao profile portrait">
            <div className="portrait-shell">
              <div className="portrait-window">
                {hasAvatar ? (
                  <img
                    className="portrait-image"
                    src={avatarPath}
                    alt="韩灏 portrait"
                    decoding="async"
                    onError={() => setHasAvatar(false)}
                  />
                ) : (
                  <div className="portrait-fallback" aria-hidden="true" />
                )}
              </div>
            </div>
            <div className="portrait-meta">
              <span>{profile.romanName}</span>
              <span>{profile.role}</span>
            </div>
          </aside>

          <div className="profile-copy">
            <p className="profile-kicker">Profile / Product Design</p>
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-roman">{profile.romanName}</p>

            <div className="profile-identity">
              <span className="profile-role">{profile.role}</span>
            </div>

            <p className="profile-summary">
              以业务目标、用户路径与视觉系统为核心，连接完整产品链路、移动出行体验、商业转化流程和 AI 工作链路，让复杂系统以更清晰、更可执行的体验落地。
            </p>

            <div className="info-rail" aria-label="Profile contact information">
              <div className="info-item">
                <p className="info-label">Email</p>
                <p className="info-value">{profile.email}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Phone</p>
                <p className="info-value">{profile.phone}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Education</p>
                <p className="info-value">{profile.education}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-bottom-grid">
          <section className="capability-panel" aria-labelledby="profile-capabilities">
            <h2 id="profile-capabilities" className="section-title">
              Capability Matrix
            </h2>
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <span className="capability-chip" key={capability}>
                  {capability}
                </span>
              ))}
            </div>
          </section>

          <section className="impact-panel" aria-labelledby="profile-impact">
            <h2 id="profile-impact" className="section-title">
              Selected Impact
            </h2>
            <ol className="impact-list">
              {impacts.map((impact, index) => (
                <li className="impact-item" key={impact.title}>
                  <span className="impact-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="impact-text">{formatImpact(impact)}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}

import { useMemo, useState, type CSSProperties, type PointerEvent } from "react";
import { projects } from "../../data/projects";

type TerminalLayout = {
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  z: number;
  scale: number;
  width: number;
  parallax: number;
  tiltX: number;
  tiltY: number;
  layer: number;
};

const signalFieldCss = `
  .signal-field-page,
  .signal-field-page * {
    box-sizing: border-box;
  }

  .signal-field-page {
    --field-x: 0px;
    --field-y: 0px;
    --network-x: 0px;
    --network-y: 0px;
    --floor-x: 0px;
    --floor-y: 0px;
    --core-x: 0px;
    --core-y: 0px;
    --active-accent: #b8f5ff;
    position: fixed;
    inset: 0;
    overflow: hidden;
    background:
      radial-gradient(circle at 52% 48%, rgba(116, 172, 196, 0.075), transparent 34%),
      radial-gradient(circle at 20% 78%, rgba(84, 112, 154, 0.055), transparent 28%),
      #010204;
    color: rgba(239, 247, 255, 0.92);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    isolation: isolate;
    cursor: crosshair;
  }

  .signal-field-page::before,
  .signal-field-page::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .signal-field-page::before {
    background:
      linear-gradient(rgba(210, 235, 248, 0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(210, 235, 248, 0.022) 1px, transparent 1px);
    background-position: var(--field-x) var(--field-y);
    background-size: 58px 58px;
    mask-image: radial-gradient(circle at 50% 48%, black 0 34%, transparent 78%);
    opacity: 0.62;
  }

  .signal-field-page::after {
    background:
      repeating-linear-gradient(0deg, rgba(222, 241, 255, 0.038) 0 1px, transparent 1px 4px),
      radial-gradient(circle at 50% 50%, transparent 0 54%, rgba(0, 0, 0, 0.54) 100%);
    mix-blend-mode: screen;
    opacity: 0.24;
  }

  .signal-field-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .signal-field-chrome {
    position: absolute;
    z-index: 20;
    left: 28px;
    right: 28px;
    top: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    pointer-events: none;
  }

  .signal-field-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
  }

  .signal-field-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 13px;
    border: 1px solid rgba(219, 239, 248, 0.16);
    border-radius: 6px;
    background: rgba(2, 7, 11, 0.48);
    color: rgba(235, 247, 255, 0.74);
    font-family: Cousine, Consolas, monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    backdrop-filter: blur(14px);
    transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
  }

  .signal-field-link:hover,
  .signal-field-link:focus-visible {
    border-color: rgba(232, 248, 255, 0.34);
    background: rgba(8, 18, 25, 0.68);
    color: rgba(250, 253, 255, 0.96);
    outline: none;
  }

  .signal-field-space {
    position: absolute;
    inset: 0;
    z-index: 1;
    min-height: 100dvh;
    perspective: 1050px;
    perspective-origin: 50% 45%;
    transform-style: preserve-3d;
  }

  .field-haze,
  .field-noise,
  .data-fiber-floor,
  .signal-connections,
  .field-points {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .field-haze {
    z-index: 1;
    background:
      radial-gradient(circle at 50% 52%, rgba(174, 221, 238, 0.12), transparent 22%),
      radial-gradient(circle at 72% 38%, rgba(116, 151, 192, 0.06), transparent 24%),
      radial-gradient(circle at 27% 45%, rgba(122, 190, 211, 0.052), transparent 22%);
    transform: translate3d(var(--network-x), var(--network-y), 0);
    opacity: 0.82;
  }

  .field-noise {
    z-index: 2;
    opacity: 0.16;
    background-image:
      linear-gradient(115deg, transparent 0 48%, rgba(210, 236, 247, 0.08) 49%, transparent 50%),
      radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px),
      radial-gradient(circle at 70% 63%, rgba(255, 255, 255, 0.13) 0 1px, transparent 1px);
    background-size: 240px 240px, 96px 96px, 132px 132px;
    mix-blend-mode: screen;
  }

  .data-fiber-floor {
    z-index: 3;
    top: 42%;
    bottom: -24%;
    transform: translate3d(var(--floor-x), var(--floor-y), -140px) rotateX(66deg);
    transform-origin: 50% 100%;
    background:
      linear-gradient(rgba(159, 212, 231, 0.11) 1px, transparent 1px),
      linear-gradient(90deg, rgba(159, 212, 231, 0.072) 1px, transparent 1px),
      linear-gradient(28deg, transparent 0 47%, rgba(159, 212, 231, 0.07) 48%, transparent 50%),
      linear-gradient(-28deg, transparent 0 47%, rgba(159, 212, 231, 0.05) 48%, transparent 50%);
    background-size: 82px 82px, 82px 82px, 164px 164px, 164px 164px;
    mask-image: linear-gradient(180deg, transparent 0, rgba(0, 0, 0, 0.76) 20%, black 58%, transparent 100%);
    opacity: 0.68;
    animation: signal-floor-drift 14s linear infinite;
  }

  .data-fiber-floor::before,
  .data-fiber-floor::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .data-fiber-floor::before {
    background: linear-gradient(90deg, transparent, rgba(206, 239, 255, 0.22), transparent);
    width: 22%;
    opacity: 0.18;
    transform: translateX(230%);
    animation: field-floor-scan 5.8s ease-in-out infinite;
  }

  .data-fiber-floor::after {
    background: radial-gradient(ellipse at 50% 42%, rgba(204, 242, 255, 0.18), transparent 38%);
    opacity: 0.38;
  }

  .signal-connections {
    z-index: 5;
    width: 100%;
    height: 100%;
    transform: translate3d(var(--network-x), var(--network-y), 0);
    overflow: visible;
  }

  .signal-connection {
    opacity: 0.45;
    transition: opacity 180ms ease;
  }

  .connection-base {
    stroke: rgba(181, 220, 238, 0.14);
    stroke-width: 0.07;
  }

  .connection-pulse {
    stroke: var(--connection-accent);
    stroke-width: 0.11;
    stroke-dasharray: 0.6 1.8;
    stroke-dashoffset: 6;
    opacity: 0;
    filter: drop-shadow(0 0 6px var(--connection-accent));
  }

  .signal-connection.is-active {
    opacity: 1;
  }

  .signal-connection.is-active .connection-base {
    stroke: rgba(222, 242, 250, 0.22);
  }

  .signal-connection.is-active .connection-pulse {
    opacity: 0.62;
    animation: signal-flow 1.8s linear infinite;
  }

  .field-points {
    z-index: 4;
  }

  .field-point {
    position: absolute;
    left: var(--px);
    top: var(--py);
    width: 2px;
    height: 2px;
    border-radius: 999px;
    background: rgba(219, 244, 255, 0.74);
    box-shadow: 0 0 12px rgba(169, 222, 244, 0.34);
    opacity: var(--po);
    animation: signal-point 3.8s ease-in-out infinite;
    animation-delay: var(--pd);
  }

  .signal-core {
    position: absolute;
    z-index: 8;
    left: 50%;
    top: 56%;
    width: 156px;
    height: 156px;
    transform: translate(-50%, -50%) translate3d(var(--core-x), var(--core-y), 70px);
    border: 1px solid rgba(220, 242, 250, 0.18);
    border-radius: 999px;
    background:
      radial-gradient(circle, rgba(236, 250, 255, 0.34) 0 2px, transparent 3px),
      radial-gradient(circle, rgba(192, 232, 248, 0.14), rgba(65, 104, 133, 0.05) 44%, transparent 70%);
    box-shadow:
      inset 0 0 34px rgba(168, 218, 236, 0.12),
      0 0 70px rgba(149, 213, 238, 0.11);
    transition: border-color 220ms ease, box-shadow 220ms ease;
    pointer-events: none;
  }

  .signal-core::before,
  .signal-core::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    pointer-events: none;
  }

  .signal-core::before {
    inset: 18px;
    border: 1px solid rgba(222, 242, 250, 0.12);
    animation: core-breathe 4.8s ease-in-out infinite;
  }

  .signal-core::after {
    inset: 42px;
    border: 1px solid rgba(222, 242, 250, 0.11);
    background: radial-gradient(circle, rgba(242, 252, 255, 0.36), transparent 54%);
  }

  .signal-core-label {
    position: absolute;
    left: 50%;
    bottom: -25px;
    transform: translateX(-50%);
    color: rgba(218, 238, 248, 0.54);
    font-family: Cousine, Consolas, monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .signal-field-page:not([data-active="none"]) .signal-core {
    border-color: color-mix(in srgb, var(--active-accent) 38%, rgba(220, 242, 250, 0.18));
    box-shadow:
      inset 0 0 42px color-mix(in srgb, var(--active-accent) 16%, transparent),
      0 0 86px color-mix(in srgb, var(--active-accent) 20%, transparent);
  }

  .signal-terminal {
    --x: 50%;
    --y: 50%;
    --mobile-x: 50%;
    --mobile-y: 50%;
    --z: 0px;
    --move-x: 0px;
    --move-y: 0px;
    --scale: 1;
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    --terminal-width: 220px;
    --layer: 6;
    position: absolute;
    z-index: var(--layer);
    left: var(--x);
    top: var(--y);
    width: min(var(--terminal-width), 30vw);
    color: inherit;
    text-decoration: none;
    transform:
      translate(-50%, -50%)
      translate3d(var(--move-x), var(--move-y), var(--z))
      rotateX(var(--tilt-x))
      rotateY(var(--tilt-y))
      scale(var(--scale));
    transform-style: preserve-3d;
    transition: filter 190ms ease;
    outline: none;
  }

  .terminal-beacon {
    position: absolute;
    left: 50%;
    top: 100%;
    width: 1px;
    height: 54px;
    transform: translateX(-50%) translateZ(-20px);
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 36%, transparent), transparent);
    opacity: 0.24;
  }

  .terminal-beacon::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 7px;
    height: 7px;
    transform: translateX(-50%);
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 44%, transparent);
    opacity: 0.58;
  }

  .terminal-shell {
    position: relative;
    overflow: hidden;
    min-height: 142px;
    border: 1px solid rgba(214, 235, 246, 0.14);
    border-radius: 7px;
    background:
      linear-gradient(180deg, rgba(12, 22, 30, 0.78), rgba(3, 7, 11, 0.91)),
      rgba(3, 8, 12, 0.82);
    box-shadow:
      inset 0 1px 0 rgba(245, 250, 255, 0.055),
      0 24px 54px rgba(0, 0, 0, 0.40),
      0 0 30px color-mix(in srgb, var(--accent) 8%, transparent);
    backdrop-filter: blur(16px);
    transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
  }

  .terminal-shell::before,
  .terminal-shell::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  .terminal-shell::before {
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 16% 84%, rgba(255, 255, 255, 0.09)),
      repeating-linear-gradient(180deg, transparent 0 8px, rgba(230, 246, 255, 0.055) 8px 9px);
    opacity: 0.12;
  }

  .terminal-shell::after {
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.28));
  }

  .terminal-image-frame {
    position: relative;
    height: 92px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.36);
  }

  .terminal-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.58;
    filter: saturate(0.58) contrast(1.1) brightness(0.62);
    transform: scale(1.04);
    transition: opacity 180ms ease, filter 180ms ease, transform 180ms ease;
  }

  .terminal-scan {
    position: absolute;
    z-index: 4;
    left: 0;
    right: 0;
    top: -28%;
    height: 32%;
    background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 34%, transparent), transparent);
    opacity: 0;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .terminal-meta {
    position: relative;
    z-index: 5;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 11px;
    align-items: end;
    min-height: 50px;
    padding: 10px 11px 11px;
  }

  .terminal-number,
  .terminal-type,
  .field-legend,
  .field-status {
    font-family: Cousine, Consolas, monospace;
    text-transform: uppercase;
  }

  .terminal-number {
    color: color-mix(in srgb, var(--accent) 72%, rgba(244, 250, 255, 0.92));
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .terminal-title {
    display: block;
    overflow: hidden;
    color: rgba(245, 250, 255, 0.92);
    font-size: 13px;
    font-weight: 650;
    line-height: 1.05;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .terminal-type {
    display: block;
    overflow: hidden;
    margin-top: 5px;
    color: rgba(178, 200, 214, 0.56);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .signal-terminal:hover .terminal-shell,
  .signal-terminal:focus-visible .terminal-shell {
    border-color: color-mix(in srgb, var(--accent) 44%, rgba(232, 248, 255, 0.24));
    background:
      linear-gradient(180deg, rgba(16, 29, 37, 0.84), rgba(4, 9, 13, 0.94)),
      rgba(3, 8, 12, 0.92);
    box-shadow:
      inset 0 1px 0 rgba(245, 250, 255, 0.08),
      0 28px 62px rgba(0, 0, 0, 0.46),
      0 0 36px color-mix(in srgb, var(--accent) 22%, transparent);
  }

  .signal-terminal:hover .terminal-image,
  .signal-terminal:focus-visible .terminal-image {
    opacity: 0.82;
    filter: saturate(0.82) contrast(1.18) brightness(0.78);
    transform: scale(1.07);
  }

  .signal-terminal:hover .terminal-scan,
  .signal-terminal:focus-visible .terminal-scan {
    opacity: 0.48;
    animation: terminal-scan 1.7s linear infinite;
  }

  .signal-terminal:hover .terminal-beacon,
  .signal-terminal:focus-visible .terminal-beacon {
    opacity: 0.62;
  }

  .field-legend {
    position: absolute;
    z-index: 18;
    left: 30px;
    bottom: 28px;
    max-width: 270px;
    color: rgba(219, 238, 247, 0.62);
    pointer-events: none;
  }

  .field-legend strong {
    display: block;
    color: rgba(244, 250, 255, 0.84);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .field-legend span {
    display: block;
    margin-top: 8px;
    color: rgba(166, 189, 204, 0.52);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.7;
  }

  .field-status {
    position: absolute;
    z-index: 18;
    right: 30px;
    bottom: 28px;
    display: grid;
    justify-items: end;
    gap: 7px;
    color: rgba(166, 189, 204, 0.52);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    pointer-events: none;
  }

  .field-status::before {
    content: "";
    width: 96px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(207, 234, 246, 0.24));
  }

  @keyframes signal-floor-drift {
    from {
      background-position: 0 0, 0 0, 0 0, 0 0;
    }

    to {
      background-position: 0 82px, 82px 0, 164px 164px, -164px 164px;
    }
  }

  @keyframes field-floor-scan {
    0%, 32% {
      transform: translateX(-120%);
      opacity: 0;
    }

    48% {
      opacity: 0.18;
    }

    70%, 100% {
      transform: translateX(520%);
      opacity: 0;
    }
  }

  @keyframes signal-flow {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes terminal-scan {
    from {
      transform: translateY(-70%);
    }

    to {
      transform: translateY(430%);
    }
  }

  @keyframes core-breathe {
    0%, 100% {
      opacity: 0.42;
      transform: scale(0.92);
    }

    50% {
      opacity: 0.84;
      transform: scale(1.08);
    }
  }

  @keyframes signal-point {
    0%, 100% {
      opacity: calc(var(--po) * 0.32);
      transform: translateY(0);
    }

    50% {
      opacity: var(--po);
      transform: translateY(-5px);
    }
  }

  @media (max-width: 900px) {
    .signal-field-chrome {
      left: 18px;
      right: 18px;
      top: 16px;
    }

    .signal-field-nav {
      gap: 6px;
    }

    .signal-field-link {
      min-height: 32px;
      padding: 0 10px;
      font-size: 9px;
      letter-spacing: 0.1em;
    }

    .signal-terminal {
      width: min(var(--terminal-width), 36vw);
    }

    .terminal-shell {
      min-height: 126px;
    }

    .terminal-image-frame {
      height: 78px;
    }

    .terminal-title {
      font-size: 12px;
    }
  }

  @media (max-width: 640px) {
    .signal-field-page {
      cursor: default;
    }

    .signal-field-chrome {
      left: 14px;
      right: 14px;
      align-items: flex-start;
    }

    .signal-field-nav {
      flex-direction: column;
      align-items: flex-end;
    }

    .signal-field-link {
      min-height: 30px;
      padding: 0 9px;
    }

    .signal-field-space {
      perspective: 820px;
      perspective-origin: 50% 46%;
    }

    .signal-core {
      top: 54%;
      width: 116px;
      height: 116px;
    }

    .signal-core-label {
      bottom: -22px;
      font-size: 8px;
    }

    .data-fiber-floor {
      top: 46%;
      bottom: -18%;
      opacity: 0.58;
    }

    .signal-terminal {
      left: var(--mobile-x);
      top: var(--mobile-y);
      width: min(150px, 40vw);
    }

    .signal-terminal[href="/projects/su7-ultra"] {
      width: min(220px, 56vw);
    }

    .terminal-shell {
      min-height: 108px;
      border-radius: 6px;
    }

    .terminal-image-frame {
      height: 64px;
    }

    .terminal-meta {
      grid-template-columns: 24px minmax(0, 1fr);
      gap: 7px;
      min-height: 42px;
      padding: 8px;
    }

    .terminal-number {
      font-size: 14px;
    }

    .terminal-title {
      font-size: 10px;
    }

    .terminal-type {
      margin-top: 4px;
      font-size: 7px;
      letter-spacing: 0.08em;
    }

    .terminal-beacon {
      height: 34px;
    }

    .field-legend,
    .field-status {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .data-fiber-floor,
    .data-fiber-floor::before,
    .signal-connection.is-active .connection-pulse,
    .signal-terminal:hover .terminal-scan,
    .signal-terminal:focus-visible .terminal-scan,
    .signal-core::before,
    .field-point {
      animation: none;
    }
  }
`;

const terminalLayout: readonly TerminalLayout[] = [
  {
    x: 51,
    y: 36,
    mobileX: 50,
    mobileY: 34,
    z: 142,
    scale: 1.08,
    width: 258,
    parallax: 18,
    tiltX: -3,
    tiltY: 2,
    layer: 12,
  },
  {
    x: 27,
    y: 47,
    mobileX: 24,
    mobileY: 46,
    z: 54,
    scale: 0.92,
    width: 228,
    parallax: 13,
    tiltX: -2,
    tiltY: -7,
    layer: 9,
  },
  {
    x: 73,
    y: 48,
    mobileX: 76,
    mobileY: 47,
    z: 68,
    scale: 0.94,
    width: 232,
    parallax: 14,
    tiltX: -2,
    tiltY: 7,
    layer: 10,
  },
  {
    x: 19,
    y: 69,
    mobileX: 23,
    mobileY: 64,
    z: -70,
    scale: 0.78,
    width: 216,
    parallax: 8,
    tiltX: 2,
    tiltY: -9,
    layer: 5,
  },
  {
    x: 52,
    y: 74,
    mobileX: 52,
    mobileY: 79,
    z: -26,
    scale: 0.84,
    width: 222,
    parallax: 10,
    tiltX: 1,
    tiltY: 0,
    layer: 7,
  },
  {
    x: 82,
    y: 67,
    mobileX: 77,
    mobileY: 65,
    z: -86,
    scale: 0.76,
    width: 214,
    parallax: 7,
    tiltX: 2,
    tiltY: 9,
    layer: 4,
  },
];

const fieldPoints = [
  { x: 12, y: 24, opacity: 0.42, delay: "-1.2s" },
  { x: 18, y: 54, opacity: 0.28, delay: "-2.7s" },
  { x: 31, y: 31, opacity: 0.34, delay: "-0.4s" },
  { x: 36, y: 77, opacity: 0.3, delay: "-3.1s" },
  { x: 46, y: 18, opacity: 0.36, delay: "-1.8s" },
  { x: 58, y: 62, opacity: 0.42, delay: "-2.2s" },
  { x: 66, y: 27, opacity: 0.32, delay: "-0.8s" },
  { x: 79, y: 55, opacity: 0.4, delay: "-3.6s" },
  { x: 87, y: 36, opacity: 0.26, delay: "-1.5s" },
  { x: 91, y: 76, opacity: 0.34, delay: "-2.9s" },
] as const;

const signalCore = { x: 50, y: 56 } as const;

export function SignalFieldPage() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [activeProjectId],
  );

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setPointer({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  }

  const fieldStyle = {
    "--field-x": `${pointer.x * 14}px`,
    "--field-y": `${pointer.y * 10}px`,
    "--network-x": `${pointer.x * -6}px`,
    "--network-y": `${pointer.y * -4}px`,
    "--floor-x": `${pointer.x * 18}px`,
    "--floor-y": `${pointer.y * 6}px`,
    "--core-x": `${pointer.x * -8}px`,
    "--core-y": `${pointer.y * -5}px`,
    "--active-accent": activeProject?.themeColor ?? "#b8f5ff",
  } as CSSProperties;

  return (
    <main
      className="signal-field-page"
      data-active={activeProjectId ?? "none"}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      onPointerMove={handlePointerMove}
      style={fieldStyle}
    >
      <style>{signalFieldCss}</style>
      <h1 className="signal-field-sr-only">Signal Field immersive portfolio experiment</h1>

      <header className="signal-field-chrome">
        <a className="signal-field-link" href="/">
          Back to Journey
        </a>
        <nav className="signal-field-nav" aria-label="Signal field navigation">
          <a className="signal-field-link" href="/experiments">
            Experiments
          </a>
          <a className="signal-field-link" href="/profile">
            Profile
          </a>
        </nav>
      </header>

      <section className="signal-field-space" aria-label="Product signal map">
        <div className="field-haze" aria-hidden="true" />
        <div className="field-noise" aria-hidden="true" />
        <div className="data-fiber-floor" aria-hidden="true" />

        <svg className="signal-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {projects.map((project, index) => {
            const layout = terminalLayout[index] ?? terminalLayout[0];
            const isActive = activeProjectId === project.id;

            return (
              <g
                className={`signal-connection${isActive ? " is-active" : ""}`}
                key={project.id}
                style={{ "--connection-accent": project.themeColor } as CSSProperties}
              >
                <line
                  className="connection-base"
                  x1={signalCore.x}
                  x2={layout.x}
                  y1={signalCore.y}
                  y2={layout.y}
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  className="connection-pulse"
                  x1={signalCore.x}
                  x2={layout.x}
                  y1={signalCore.y}
                  y2={layout.y}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        <div className="field-points" aria-hidden="true">
          {fieldPoints.map((point) => (
            <span
              className="field-point"
              key={`${point.x}-${point.y}`}
              style={
                {
                  "--px": `${point.x}%`,
                  "--py": `${point.y}%`,
                  "--po": point.opacity,
                  "--pd": point.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="signal-core" aria-hidden="true">
          <span className="signal-core-label">Signal Core</span>
        </div>

        {projects.map((project, index) => {
          const layout = terminalLayout[index] ?? terminalLayout[0];
          const terminalStyle = {
            "--x": `${layout.x}%`,
            "--y": `${layout.y}%`,
            "--mobile-x": `${layout.mobileX}%`,
            "--mobile-y": `${layout.mobileY}%`,
            "--z": `${layout.z}px`,
            "--move-x": `${pointer.x * layout.parallax}px`,
            "--move-y": `${pointer.y * layout.parallax * -0.65}px`,
            "--scale": `${layout.scale}`,
            "--tilt-x": `${layout.tiltX}deg`,
            "--tilt-y": `${layout.tiltY}deg`,
            "--terminal-width": `${layout.width}px`,
            "--layer": `${layout.layer}`,
            "--accent": project.themeColor,
          } as CSSProperties;

          return (
            <a
              className="signal-terminal"
              href={project.link}
              key={project.id}
              onBlur={() => setActiveProjectId(null)}
              onFocus={() => setActiveProjectId(project.id)}
              onPointerEnter={() => setActiveProjectId(project.id)}
              onPointerLeave={() => setActiveProjectId(null)}
              style={terminalStyle}
            >
              <span className="terminal-beacon" aria-hidden="true" />
              <div className="terminal-shell">
                <div className="terminal-image-frame">
                  <img
                    className="terminal-image"
                    src={project.coverImage}
                    alt=""
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="terminal-scan" aria-hidden="true" />
                </div>
                <div className="terminal-meta">
                  <span className="terminal-number">{project.numberLabel}</span>
                  <span>
                    <strong className="terminal-title">{project.title}</strong>
                    <span className="terminal-type">{project.category}</span>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </section>

      <aside className="field-legend" aria-hidden="true">
        <strong>Signal Field</strong>
        <span>Product signal map / 06 terminals / isolated experiment route</span>
      </aside>
      <div className="field-status" aria-hidden="true">
        <span>{activeProject ? `Linked ${activeProject.numberLabel}` : "Idle Signal Layer"}</span>
      </div>
    </main>
  );
}

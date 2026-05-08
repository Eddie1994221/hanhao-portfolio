import { useMemo } from "react";
import { projects } from "../../data/projects";
import { usePortfolioStore } from "../../core/store/portfolioStore";

export function ProjectActionBar() {
  const focusedProjectId = usePortfolioStore((state) => state.focusedProjectId);

  const project = useMemo(
    () => projects.find((item) => item.id === focusedProjectId) ?? null,
    [focusedProjectId],
  );

  if (!project) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(116px, calc(8vh + 36px), 156px)",
        transform: "translateX(-50%)",
        zIndex: 30,
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        aria-label={`Enter ${project.title}`}
        onClick={() => {
          window.location.href = project.link;
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "204px",
          height: "50px",
          padding: "0 48px",
          border: "1px solid rgba(132, 210, 245, 0.34)",
          borderRadius: "999px",
          color: "rgba(226, 244, 250, 0.84)",
          background:
            "linear-gradient(135deg, rgba(5, 17, 24, 0.62), rgba(7, 24, 34, 0.42))",
          boxShadow:
            "0 0 0 1px rgba(120, 210, 245, 0.05) inset, 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 14px rgba(80, 190, 235, 0.08)",
          backdropFilter: "blur(14px) saturate(145%)",
          WebkitBackdropFilter: "blur(14px) saturate(145%)",
          fontFamily: "Cousine, Consolas, monospace",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0",
          lineHeight: 1,
          cursor: "pointer",
          transition:
            "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease, background 180ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(event) => {
          const arrow = event.currentTarget.querySelector("[data-action-arrow]");

          event.currentTarget.style.borderColor = "rgba(239, 251, 255, 0.76)";
          event.currentTarget.style.color = "rgba(250, 254, 255, 1)";
          event.currentTarget.style.background =
            "linear-gradient(135deg, rgba(18, 64, 88, 0.9), rgba(8, 34, 50, 0.76))";
          event.currentTarget.style.boxShadow =
            "0 0 0 1px rgba(214, 247, 255, 0.32) inset, 0 18px 54px rgba(0, 0, 0, 0.34), 0 0 38px rgba(99, 210, 255, 0.3)";
          event.currentTarget.style.transform = "translateY(-2px)";

          if (arrow instanceof HTMLElement) {
            arrow.style.borderLeftColor = "rgba(250, 254, 255, 0.96)";
          }
        }}
        onMouseLeave={(event) => {
          const arrow = event.currentTarget.querySelector("[data-action-arrow]");

          event.currentTarget.style.borderColor = "rgba(132, 210, 245, 0.34)";
          event.currentTarget.style.color = "rgba(226, 244, 250, 0.84)";
          event.currentTarget.style.background =
            "linear-gradient(135deg, rgba(5, 17, 24, 0.62), rgba(7, 24, 34, 0.42))";
          event.currentTarget.style.boxShadow =
            "0 0 0 1px rgba(120, 210, 245, 0.05) inset, 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 14px rgba(80, 190, 235, 0.08)";
          event.currentTarget.style.transform = "translateY(0)";

          if (arrow instanceof HTMLElement) {
            arrow.style.borderLeftColor = "rgba(239, 251, 255, 0.68)";
          }
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <span>{`Enter ${project.title}`}</span>
          <span
            aria-hidden="true"
            data-action-arrow
            style={{
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "7px solid rgba(239, 251, 255, 0.68)",
              transition: "border-left-color 180ms ease",
            }}
          />
        </span>
      </button>
    </div>
  );
}

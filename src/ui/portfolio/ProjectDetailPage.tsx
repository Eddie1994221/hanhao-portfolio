import type { SyntheticEvent } from "react";
import { projectDetailBySlug } from "../../data/projectDetails";

type ProjectDetailPageProps = {
  slug: string;
};

const pageStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  overflowY: "auto",
  background: "#020509",
  color: "rgba(239, 251, 255, 0.94)",
  fontFamily: "Cousine, Consolas, monospace",
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "24px",
  padding: "18px clamp(18px, 4vw, 54px)",
  background: "rgba(5, 10, 14, 0.72)",
  backdropFilter: "blur(16px) saturate(130%)",
  WebkitBackdropFilter: "blur(16px) saturate(130%)",
  borderBottom: "1px solid rgba(223, 248, 255, 0.12)",
};

const backLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "38px",
  padding: "0 15px",
  border: "1px solid rgba(223, 248, 255, 0.24)",
  borderRadius: "999px",
  color: "rgba(239, 251, 255, 0.86)",
  background: "rgba(6, 16, 22, 0.64)",
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0",
  lineHeight: 1,
  textTransform: "uppercase",
  transition: "border-color 160ms ease, background 160ms ease, color 160ms ease",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 700,
  letterSpacing: "0",
  textAlign: "right",
  color: "rgba(244, 253, 255, 0.94)",
  textShadow: "0 0 18px rgba(143, 220, 255, 0.16)",
};

const imageListStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1360px",
  margin: "0 auto",
  padding: "28px clamp(14px, 4vw, 52px) 72px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const imageStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
  margin: "0 auto",
  background: "rgba(5, 14, 20, 0.42)",
  borderRadius: "2px",
};

const emptyStyle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "18vh auto 0",
  padding: "28px",
  border: "1px solid rgba(223, 248, 255, 0.18)",
  background: "rgba(6, 16, 22, 0.48)",
  color: "rgba(239, 251, 255, 0.68)",
  textAlign: "center",
};

const detailPageCss = `
  .project-detail-back:hover {
    border-color: rgba(223, 248, 255, 0.38);
    background: rgba(10, 24, 32, 0.76);
    color: rgba(248, 254, 255, 0.96);
  }

  .project-detail-back:focus-visible {
    outline: 1px solid rgba(143, 220, 255, 0.58);
    outline-offset: 3px;
  }
`;

function hideMissingImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = "none";
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const project = projectDetailBySlug.get(slug);

  if (!project) {
    return (
      <main style={pageStyle}>
        <style>{detailPageCss}</style>
        <header style={headerStyle}>
          <a href="/" className="project-detail-back" style={backLinkStyle}>Back to Journey</a>
          <h1 style={titleStyle}>Project Not Found</h1>
        </header>
        <div style={emptyStyle}>No project images are configured for this route.</div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <style>{detailPageCss}</style>
      <header style={headerStyle}>
        <a href="/" className="project-detail-back" style={backLinkStyle}>Back to Journey</a>
        <h1 style={titleStyle}>{project.title}</h1>
      </header>

      {project.images.length > 0 ? (
        <section style={imageListStyle} aria-label={`${project.title} project images`}>
          {project.images.map((image, index) => (
            <img
              key={image}
              src={`${project.imageFolder}/${image}`}
              alt={`${project.title} case image ${index + 1}`}
              loading="lazy"
              decoding="async"
              onError={hideMissingImage}
              style={imageStyle}
            />
          ))}
        </section>
      ) : (
        <div style={emptyStyle}>Project images have not been added yet.</div>
      )}
    </main>
  );
}

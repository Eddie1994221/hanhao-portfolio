export type ProjectPosition = readonly [number, number, number];

export type ProjectItem = {
  id: string;
  order: number;
  numberLabel: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: readonly string[];
  coverImage: string;
  link: string;
  caseSlug: string;
  position: ProjectPosition;
  themeColor: string;
};

export const projects: readonly ProjectItem[] = [
  {
    id: "project-01",
    order: 1,
    numberLabel: "01",
    title: "SU7-Ultra",
    subtitle: "Immersive automotive launch experience",
    category: "Mobility Experience",
    description:
      "A restrained high-performance product story shaped through motion, atmosphere, and spatial presentation.",
    tags: ["Automotive", "Motion", "Spatial UI"],
    coverImage: "/portfolio/placeholders/project-01-su7-ultra.jpg",
    link: "/projects/su7-ultra",
    caseSlug: "su7-ultra",
    position: [4.2, 0, 0.4],
    themeColor: "#B8F5FF",
  },
  {
    id: "project-02",
    order: 2,
    numberLabel: "02",
    title: "YU7-F",
    subtitle: "Electric mobility interface and visual system",
    category: "Mobility Interface",
    description:
      "A cool, precise product interface direction for performance, navigation, and brand presence.",
    tags: ["UX", "Automotive", "Visual System"],
    coverImage: "/portfolio/placeholders/project-02-yu7-f.jpg",
    link: "/projects/yu7-f",
    caseSlug: "yu7-f",
    position: [7.3, 0, -3.4],
    themeColor: "#9FD8FF",
  },
  {
    id: "project-03",
    order: 3,
    numberLabel: "03",
    title: "Ai-Product",
    subtitle: "Applied AI product workflow and interface",
    category: "AI Product",
    description:
      "A product system that turns model capability into a legible workflow, control surface, and user-facing outcome.",
    tags: ["AI", "Workflow", "Product"],
    coverImage: "/portfolio/placeholders/project-03-ai-product.jpg",
    link: "/projects/ai-product",
    caseSlug: "ai-product",
    position: [10.6, 0, 5.2],
    themeColor: "#C8D7FF",
  },
  {
    id: "project-04",
    order: 4,
    numberLabel: "04",
    title: "Awards-Visual",
    subtitle: "Award identity and ceremonial motion language",
    category: "Visual System",
    description:
      "A composed visual language for recognition moments, stage presence, and high-contrast editorial motion.",
    tags: ["Awards", "Motion", "Art Direction"],
    coverImage: "/portfolio/placeholders/project-04-awards-visual.jpg",
    link: "/projects/awards-visual",
    caseSlug: "awards-visual",
    position: [15.8, 0, -5.4],
    themeColor: "#DCEBFF",
  },
  {
    id: "project-05",
    order: 5,
    numberLabel: "05",
    title: "Spearca",
    subtitle: "Brand system and digital experience",
    category: "Brand Experience",
    description:
      "A focused identity and interface system with a cold-light visual language and practical digital touchpoints.",
    tags: ["Identity", "Interface", "System"],
    coverImage: "/portfolio/placeholders/project-05-spearca.jpg",
    link: "/projects/spearca",
    caseSlug: "spearca",
    position: [20.2, 0, 7.4],
    themeColor: "#A7F0E6",
  },
  {
    id: "project-06",
    order: 6,
    numberLabel: "06",
    title: "Classpod",
    subtitle: "Learning product interface and experience",
    category: "Education Product",
    description:
      "A product experience for focused learning flows, class context, and useful information hierarchy.",
    tags: ["Education", "Product", "UX"],
    coverImage: "/portfolio/placeholders/project-06-classpod.jpg",
    link: "/projects/classpod",
    caseSlug: "classpod",
    position: [25.4, 0, -6.6],
    themeColor: "#BFD3FF",
  },
];

export const projectBySlug = new Map(
  projects.map((project) => [project.caseSlug, project]),
);

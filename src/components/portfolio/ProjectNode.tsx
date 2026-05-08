import type { ProjectItem } from "../../data/projects";
import { projects } from "../../data/projects";
import { usePortfolioStore } from "../../core/store/portfolioStore";
import { NodeBeacon } from "./NodeBeacon";
import { ProjectDisplayPanel } from "./ProjectDisplayPanel";

type ProjectNodeProps = {
  project: ProjectItem;
};

export function ProjectNode({ project }: ProjectNodeProps) {
  const focusedProjectId = usePortfolioStore((state) => state.focusedProjectId);
  const activeProjectId = usePortfolioStore((state) => state.activeProjectId);
  const isFocused = focusedProjectId === project.id;
  const isActive = activeProjectId === project.id;
  const focusedProject = focusedProjectId
    ? projects.find((item) => item.id === focusedProjectId)
    : null;

  const orderDistance = focusedProject
    ? Math.abs(project.order - focusedProject.order)
    : project.order - 1;

  const clarity = isActive || isFocused
    ? 1
    : focusedProject
      ? Math.max(0.2, 0.62 - orderDistance * 0.15)
      : Math.max(0.22, 0.62 - (project.order - 1) * 0.09);

  return (
    <group name={`PortfolioNode.${project.numberLabel}`} position={project.position}>
      <NodeBeacon color={project.themeColor} focused={isFocused} active={isActive} />
      <ProjectDisplayPanel project={project} focused={isFocused} active={isActive} clarity={clarity} />
    </group>
  );
}

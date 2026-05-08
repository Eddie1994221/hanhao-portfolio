import { projects } from "../../data/projects";
import { PortfolioTriggerController } from "./PortfolioTriggerController";
import { ProjectNode } from "./ProjectNode";

export function PortfolioNodes({ visible = true }: { visible?: boolean }) {
  return (
    <group name="PortfolioNodes" visible={visible}>
      <PortfolioTriggerController />
      {projects.map((project) => (
        <ProjectNode key={project.id} project={project} />
      ))}
    </group>
  );
}

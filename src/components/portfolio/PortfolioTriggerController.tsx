import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { projects, type ProjectItem } from "../../data/projects";
import { gameEvents } from "../../core/events";
import { useGameStore } from "../../core/store/gameStore";
import { usePortfolioStore } from "../../core/store/portfolioStore";

const FOCUS_ENTER_RADIUS = 3.2;
const FOCUS_EXIT_RADIUS = 4.0;
const FOCUS_SWITCH_MARGIN = 0.65;
const ACTIVATE_RADIUS = 1.65;
const ACTIVATION_WAVE_RADIUS = 9.0;

type ProjectTriggerTarget = {
  project: ProjectItem;
  position: THREE.Vector3;
};

function distanceToProjectXZ(characterPosition: THREE.Vector3, projectPosition: THREE.Vector3) {
  const dx = characterPosition.x - projectPosition.x;
  const dz = characterPosition.z - projectPosition.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function PortfolioTriggerController() {
  const characterRef = useGameStore((state) => state.characterRef);
  const setFocusedProjectId = usePortfolioStore((state) => state.setFocusedProjectId);
  const setActiveProjectId = usePortfolioStore((state) => state.setActiveProjectId);

  const characterPosition = useMemo(() => new THREE.Vector3(), []);
  const focusedProjectIdRef = useRef<string | null>(null);
  const activeProjectIdRef = useRef<string | null>(null);
  const enteredProjectIdRef = useRef<string | null>(null);

  const triggerTargets = useMemo<ProjectTriggerTarget[]>(
    () =>
      projects.map((project) => ({
        project,
        position: new THREE.Vector3(...project.position),
      })),
    [],
  );

  useEffect(() => {
    return () => {
      setFocusedProjectId(null);
      setActiveProjectId(null);
    };
  }, [setActiveProjectId, setFocusedProjectId]);

  useFrame(() => {
    if (!characterRef?.current) {
      if (focusedProjectIdRef.current !== null) {
        focusedProjectIdRef.current = null;
        setFocusedProjectId(null);
      }
      if (activeProjectIdRef.current !== null) {
        activeProjectIdRef.current = null;
        enteredProjectIdRef.current = null;
        setActiveProjectId(null);
      }
      return;
    }

    characterRef.current.getWorldPosition(characterPosition);

    let nearestTarget: ProjectTriggerTarget | null = null;
    let nearestDistance = Infinity;

    for (const target of triggerTargets) {
      const distance = distanceToProjectXZ(characterPosition, target.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestTarget = target;
      }
    }

    const currentFocusedTarget = focusedProjectIdRef.current
      ? triggerTargets.find((target) => target.project.id === focusedProjectIdRef.current) ?? null
      : null;
    const currentFocusedDistance = currentFocusedTarget
      ? distanceToProjectXZ(characterPosition, currentFocusedTarget.position)
      : Infinity;
    const nearestFocusableTarget = nearestDistance <= FOCUS_ENTER_RADIUS ? nearestTarget : null;
    const nearestShouldReplaceCurrent = Boolean(
      nearestFocusableTarget &&
      currentFocusedTarget &&
      nearestFocusableTarget.project.id !== currentFocusedTarget.project.id &&
      nearestDistance + FOCUS_SWITCH_MARGIN < currentFocusedDistance,
    );
    const focusedTarget = !currentFocusedTarget || currentFocusedDistance > FOCUS_EXIT_RADIUS
      ? nearestFocusableTarget
      : nearestShouldReplaceCurrent
        ? nearestFocusableTarget
        : currentFocusedTarget;
    const activeTarget = nearestDistance <= ACTIVATE_RADIUS ? nearestTarget : null;
    const focusedProjectId = focusedTarget?.project.id ?? null;
    const activeProjectId = activeTarget?.project.id ?? null;

    if (focusedProjectIdRef.current !== focusedProjectId) {
      focusedProjectIdRef.current = focusedProjectId;
      setFocusedProjectId(focusedProjectId);
    }

    if (activeProjectIdRef.current !== activeProjectId) {
      activeProjectIdRef.current = activeProjectId;
      setActiveProjectId(activeProjectId);
    }

    if (!activeTarget) {
      enteredProjectIdRef.current = null;
      return;
    }

    if (enteredProjectIdRef.current === activeTarget.project.id) {
      return;
    }

    enteredProjectIdRef.current = activeTarget.project.id;
    gameEvents.emit("beam:hit", {
      position: activeTarget.position.clone(),
      radius: ACTIVATION_WAVE_RADIUS,
    });
  });

  return null;
}

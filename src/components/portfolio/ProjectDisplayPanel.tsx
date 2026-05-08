import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree, type ThreeEvent } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three/webgpu";
import type { ProjectItem } from "../../data/projects";
import { NodeNumber } from "./NodeNumber";

const PANEL_WIDTH = 2.24;
const PANEL_HEIGHT = 1.68;
const CARD_WIDTH = PANEL_WIDTH + 0.18;
const CARD_HEIGHT = PANEL_HEIGHT + 0.58;
const IMAGE_Y = 0.16;
const LABEL_WIDTH = PANEL_WIDTH + 0.08;
const LABEL_HEIGHT = 0.42;
const PANEL_SCALE_MIN = 0.97;
const PANEL_SCALE_RANGE = 0.1;
const PANEL_Y = 2.9;
const BACKPLATE_WIDTH = CARD_WIDTH + 0.18;
const BACKPLATE_HEIGHT = CARD_HEIGHT + 0.22;

type ProjectDisplayPanelProps = {
  project: ProjectItem;
  focused?: boolean;
  active?: boolean;
  clarity?: number;
};

function createTitleTexture(project: ProjectItem) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const accent = new THREE.Color(project.themeColor);
  const accentRgb = [
    Math.round(accent.r * 255),
    Math.round(accent.g * 255),
    Math.round(accent.b * 255),
  ].join(", ");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "rgba(4, 14, 20, 0)");
  gradient.addColorStop(0.16, "rgba(3, 10, 16, 0.78)");
  gradient.addColorStop(0.86, "rgba(3, 10, 16, 0.76)");
  gradient.addColorStop(1, "rgba(4, 14, 20, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.shadowColor = `rgba(${accentRgb}, 0.78)`;
  ctx.shadowBlur = 28;
  ctx.font = "800 92px Cousine, Consolas, monospace";
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(0, 5, 9, 0.96)";
  ctx.strokeText(project.title, 72, 108);
  ctx.fillStyle = "rgba(250, 254, 255, 1)";
  ctx.fillText(project.title, 72, 108);

  ctx.shadowBlur = 0;
  ctx.font = "700 29px Cousine, Consolas, monospace";
  ctx.fillStyle = `rgba(${accentRgb}, 0.78)`;
  ctx.fillText(`${project.numberLabel} / ${project.category.toUpperCase()}`, 76, 176);

  ctx.fillStyle = "rgba(238, 250, 255, 0.3)";
  ctx.fillRect(72, 218, 310, 3);
  ctx.fillStyle = `rgba(${accentRgb}, 0.7)`;
  ctx.fillRect(72, 218, 132, 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return texture;
}

function FrameBar({
  position,
  scale,
  opacity,
  renderOrder,
}: {
  position: [number, number, number];
  scale: [number, number];
  opacity: number;
  renderOrder?: number;
}) {
  return (
    <mesh position={position} renderOrder={renderOrder}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        color="#edfaff"
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function SolidBackPlate({
  accentColor,
  glowOpacity,
  renderOrder,
}: {
  accentColor: string;
  glowOpacity: number;
  renderOrder: number;
}) {
  return (
    <group name="ProjectPanelSolidBackPlate" renderOrder={renderOrder}>
      <mesh position={[0, -0.08, -0.068]} renderOrder={renderOrder}>
        <planeGeometry args={[BACKPLATE_WIDTH, BACKPLATE_HEIGHT]} />
        <meshBasicMaterial
          color="#050b10"
          transparent={false}
          depthWrite
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, -0.08, -0.064]} renderOrder={renderOrder + 1}>
        <planeGeometry args={[CARD_WIDTH + 0.02, CARD_HEIGHT + 0.04]} />
        <meshBasicMaterial
          color="#02070c"
          transparent={false}
          depthWrite
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, -0.08, -0.058]} renderOrder={renderOrder + 2}>
        <planeGeometry args={[BACKPLATE_WIDTH + 0.06, BACKPLATE_HEIGHT + 0.06]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={glowOpacity}
          depthWrite={false}
          depthTest
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function ProjectDisplayPanel({
  project,
  focused = false,
  active = false,
  clarity = 0.34,
}: ProjectDisplayPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();
  const coverTexture = useLoader(TextureLoader, project.coverImage);
  const titleTexture = useMemo(() => createTitleTexture(project), [project]);

  const layerStrength = active ? 1 : focused ? 0.94 : THREE.MathUtils.clamp(clarity, 0.18, 0.68);
  const focusLevel = active ? 1 : focused ? 0.9 : layerStrength * 0.55;
  const frameOpacity = active ? 0.9 : focused ? 0.82 : 0.14 + layerStrength * 0.22;
  const titleOpacity = active ? 1 : focused ? 1 : 0.32 + layerStrength * 0.38;
  const panelRenderOrder = active ? 46 : focused ? 42 : 10 + Math.round(layerStrength * 8);
  const backplateGlowOpacity = active ? 0.08 : focused ? 0.06 : 0.012 + layerStrength * 0.014;

  useEffect(() => {
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    coverTexture.minFilter = THREE.LinearFilter;
    coverTexture.magFilter = THREE.LinearFilter;
    coverTexture.generateMipmaps = false;
    coverTexture.needsUpdate = true;
  }, [coverTexture]);

  useEffect(() => {
    return () => {
      titleTexture.dispose();
    };
  }, [titleTexture]);

  useEffect(() => {
    return () => {
      if (gl.domElement.style.cursor === "pointer") {
        gl.domElement.style.cursor = "";
      }
    };
  }, [gl]);

  const stopPanelPropagation = useCallback((event: ThreeEvent<PointerEvent | MouseEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation?.();
  }, []);

  const handlePanelPointerOver = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    gl.domElement.style.cursor = "pointer";
  }, [gl]);

  const handlePanelPointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    gl.domElement.style.cursor = "";
  }, [gl]);

  const handlePanelClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    stopPanelPropagation(event);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    window.location.href = project.link;
  }, [project.link, stopPanelPropagation]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    groupRef.current.quaternion.copy(camera.quaternion);
    const pulse = focused ? Math.sin(clock.elapsedTime * 2.0) * 0.01 : 0;
    const targetScale = PANEL_SCALE_MIN + layerStrength * PANEL_SCALE_RANGE + pulse;
    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 8, delta);
    groupRef.current.scale.setScalar(nextScale);

    const targetZ = active ? 0.1 : focused ? 0.08 : 0;
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 8, delta);
  });

  return (
    <group ref={groupRef} name={`ProjectDisplayPanel.${project.numberLabel}`} position={[0, PANEL_Y, 0]} renderOrder={panelRenderOrder}>
      <SolidBackPlate
        accentColor={project.themeColor}
        glowOpacity={backplateGlowOpacity}
        renderOrder={panelRenderOrder}
      />

      <mesh position={[0, -0.08, -0.026]} renderOrder={panelRenderOrder + 3}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <meshBasicMaterial
          color="#061016"
          transparent={false}
          depthWrite
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, IMAGE_Y, -0.012]} renderOrder={panelRenderOrder + 4}>
        <planeGeometry args={[PANEL_WIDTH + 0.08, PANEL_HEIGHT + 0.08]} />
        <meshBasicMaterial
          color="#071018"
          transparent={false}
          depthWrite
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, IMAGE_Y, -0.006]} renderOrder={panelRenderOrder + 5}>
        <planeGeometry args={[PANEL_WIDTH + 0.08, PANEL_HEIGHT + 0.08]} />
        <meshBasicMaterial
          color={project.themeColor}
          transparent
          opacity={0.035 + focusLevel * 0.035}
          depthWrite={false}
          depthTest
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, IMAGE_Y, 0]} renderOrder={panelRenderOrder + 6}>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshBasicMaterial
          map={coverTexture}
          transparent={false}
          depthWrite
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name={`ProjectImageHitArea.${project.numberLabel}`}
        position={[0, IMAGE_Y, 0.052]}
        renderOrder={panelRenderOrder + 10}
        onClick={handlePanelClick}
        onPointerDown={stopPanelPropagation}
        onPointerUp={stopPanelPropagation}
        onPointerOver={handlePanelPointerOver}
        onPointerOut={handlePanelPointerOut}
      >
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <FrameBar renderOrder={panelRenderOrder + 7} position={[0, IMAGE_Y + PANEL_HEIGHT / 2 + 0.016, 0.018]} scale={[PANEL_WIDTH + 0.08, 0.012]} opacity={frameOpacity} />
      <FrameBar renderOrder={panelRenderOrder + 7} position={[0, IMAGE_Y - PANEL_HEIGHT / 2 - 0.016, 0.018]} scale={[PANEL_WIDTH + 0.08, 0.012]} opacity={frameOpacity} />
      <FrameBar renderOrder={panelRenderOrder + 7} position={[-PANEL_WIDTH / 2 - 0.016, IMAGE_Y, 0.018]} scale={[0.012, PANEL_HEIGHT + 0.08]} opacity={frameOpacity} />
      <FrameBar renderOrder={panelRenderOrder + 7} position={[PANEL_WIDTH / 2 + 0.016, IMAGE_Y, 0.018]} scale={[0.012, PANEL_HEIGHT + 0.08]} opacity={frameOpacity} />

      <FrameBar renderOrder={panelRenderOrder + 8} position={[-PANEL_WIDTH / 2 + 0.13, IMAGE_Y + PANEL_HEIGHT / 2 + 0.054, 0.022]} scale={[0.26, 0.018]} opacity={frameOpacity + 0.12} />
      <FrameBar renderOrder={panelRenderOrder + 8} position={[PANEL_WIDTH / 2 - 0.13, IMAGE_Y - PANEL_HEIGHT / 2 - 0.054, 0.022]} scale={[0.26, 0.018]} opacity={frameOpacity + 0.12} />

      <NodeNumber
        label={project.numberLabel}
        color={project.themeColor}
        focused={focused}
        active={active}
        clarity={layerStrength}
        renderOrder={panelRenderOrder + 9}
        position={[-0.82, IMAGE_Y + PANEL_HEIGHT / 2 - 0.2, 0.04]}
      />

      <mesh position={[0, IMAGE_Y - PANEL_HEIGHT / 2 - 0.25, 0.026]} renderOrder={panelRenderOrder + 9}>
        <planeGeometry args={[LABEL_WIDTH, LABEL_HEIGHT]} />
        <meshBasicMaterial
          map={titleTexture}
          transparent
          opacity={titleOpacity}
          depthWrite={false}
          depthTest
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

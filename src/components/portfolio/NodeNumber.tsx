import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three/webgpu";

type NodeNumberProps = {
  label: string;
  color: string;
  focused?: boolean;
  active?: boolean;
  clarity?: number;
  renderOrder?: number;
  position?: [number, number, number];
};

function createNumberTexture(label: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 192;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const accent = new THREE.Color(color);
  const accentRgb = [
    Math.round(accent.r * 255),
    Math.round(accent.g * 255),
    Math.round(accent.b * 255),
  ].join(", ");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(2, 10, 15, 0.68)";
  ctx.fillRect(42, 28, 300, 118);
  ctx.strokeStyle = `rgba(${accentRgb}, 0.42)`;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 30, 296, 114);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 104px Cousine, Consolas, monospace";
  ctx.shadowColor = `rgba(${accentRgb}, 0.58)`;
  ctx.shadowBlur = 20;
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(0, 5, 9, 0.88)";
  ctx.strokeText(label, 192, 84);
  ctx.fillStyle = "rgba(244, 252, 255, 0.88)";
  ctx.fillText(label, 192, 84);

  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(${accentRgb}, 0.68)`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(112, 150);
  ctx.lineTo(272, 150);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return texture;
}

export function NodeNumber({
  label,
  color,
  focused = false,
  active = false,
  clarity = 0.34,
  renderOrder = 4,
  position = [0, 0, 0],
}: NodeNumberProps) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const texture = useMemo(() => createNumberTexture(label, color), [label, color]);
  const layerStrength = active ? 1 : focused ? 0.96 : THREE.MathUtils.clamp(clarity, 0.18, 0.68);
  const opacity = active ? 1 : focused ? 0.96 : 0.42 + layerStrength * 0.44;

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = opacity;
    }
  }, [opacity]);

  return (
    <mesh name={`NodeNumber.${label}`} position={position} renderOrder={renderOrder}>
      <planeGeometry args={[0.58, 0.29]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

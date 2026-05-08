import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three/webgpu";

type NodeBeaconProps = {
  color: string;
  focused?: boolean;
  active?: boolean;
};

export function NodeBeacon({ color, focused = false, active = false }: NodeBeaconProps) {
  const lineMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const baseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const tipMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const tipRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const focusLevel = active ? 1 : focused ? 0.62 : 0;
    const pulse = focused ? Math.sin(clock.elapsedTime * 2.2) * 0.04 : 0;

    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = 0.34 + focusLevel * 0.26 + pulse;
    }
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.08 + focusLevel * 0.12 + pulse * 0.45;
    }
    if (baseMaterialRef.current) {
      baseMaterialRef.current.opacity = 0.12 + focusLevel * 0.18;
    }
    if (tipMaterialRef.current) {
      tipMaterialRef.current.opacity = 0.55 + focusLevel * 0.28;
    }
    if (tipRef.current) {
      tipRef.current.scale.setScalar(active ? 1.24 : focused ? 1.12 : 1);
    }
  });

  return (
    <group name="NodeBeacon">
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 2.36, 8]} />
        <meshBasicMaterial
          ref={lineMaterialRef}
          color="#f0fbff"
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 2.36, 12]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={color}
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.26, 0.29, 64]} />
        <meshBasicMaterial
          ref={baseMaterialRef}
          color="#eefbff"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={tipRef} position={[0, 2.36, 0]}>
        <sphereGeometry args={[0.048, 18, 12]} />
        <meshBasicMaterial
          ref={tipMaterialRef}
          color="#f5fdff"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

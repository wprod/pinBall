import * as THREE from "three";
import { useEffect, useRef } from "react";
import { usePlane, useSphere } from "@react-three/cannon";
import { PerspectiveCamera, useTexture } from "@react-three/drei";
import { Vector } from "three";

interface IBallAndCollisions {
  args?: [
    radius?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined,
    phiStart?: number | undefined,
    phiLength?: number | undefined,
    thetaStart?: number | undefined,
    thetaLength?: number | undefined
  ];
  v?: Vector;
}

export function BallAndCollisions({
  args = [1.2, 32, 32],
  v = new THREE.Vector3(),
}: IBallAndCollisions) {
  const cam = useRef<any>();

  const [ref, api] = useSphere(() => ({
    args: 1.2,
    mass: 1,
    material: { restitution: 0.95 },
  }));

  usePlane(() => ({
    position: [0, -15, 0],
    rotation: [-Math.PI / 2, 0, 0],
    onCollide: () => (api.position.set(0, 0, 0), api.velocity.set(10, 0, 0)),
  }));

  usePlane(() => ({
    position: [-15, 0, 0],
    rotation: [-Math.PI / 2, Math.PI / 2, 0],
  }));

  usePlane(() => ({
    position: [15, 0, 0],
    rotation: [Math.PI / 2, -Math.PI / 2, 0],
  }));

  useEffect(() => {
    if (!cam?.current?.position) {
      return;
    }

    api.position.subscribe(
      (p) => (
        cam.current.position.lerp(
          v.set(p[0], p[1], 28 + Math.max(0, p[1]) / 2),
          0.05
        ),
        cam.current.lookAt(0, 0, 0)
      )
    );
  }, []);
  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault />

      <mesh ref={ref}>
        <sphereGeometry args={args} />
        <meshPhysicalMaterial
          map={useTexture("/cross.jpg")}
          transmission={1}
          roughness={0}
          thickness={10}
          envMapIntensity={1}
        />
      </mesh>
    </>
  );
}

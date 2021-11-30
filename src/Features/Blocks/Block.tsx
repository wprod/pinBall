import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import {BoxProps, useBox} from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { BufferGeometry, Material, Mesh, Vector } from "three";

export const Block = forwardRef<
  any,
  {
    shake?: number;
    dimensions?: [x: number, y: number, z: number];
    vec?: Vector;
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
    material?: { restitution: number };
  }
>(
  (
    { shake = 0, dimensions = [1, 1.5, 4], vec = new THREE.Vector3(), ...props },
    ref
  ) => {
    const group = useRef<any>();

    const [block, api] = useBox(() => ({
      args: dimensions,
      ...props,
      onCollide: (e) => (shake += e.contact.impactVelocity / 12.5),
    } as BoxProps));

    useFrame(() =>
      group.current.position.lerp(
        vec.set(0, (shake = THREE.MathUtils.lerp(shake || 0, 0, 0.1)), 0),
        0.2
      )
    );

    useImperativeHandle(ref, () => api, [api]);

    return (
      <group ref={group}>
        <RoundedBox
          ref={
            block as
              | Ref<Mesh<BufferGeometry, Material | Material[]>>
              | undefined
          }
          args={dimensions}
          radius={0.4}
          smoothness={10}
        >
          <meshPhysicalMaterial
            transmission={1}
            roughness={0}
            thickness={3}
            envMapIntensity={4}
          />
        </RoundedBox>
      </group>
    );
  }
);

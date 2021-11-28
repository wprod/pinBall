import * as THREE from "three";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  RoundedBox,
  Environment,
  useTexture,
  useAspect,
} from "@react-three/drei";
import { Physics, useSphere, useBox, usePlane } from "@react-three/cannon";
import { BallAndCollisions } from "./BallAndCollisions";
import { Paddle } from "./Blocks/Paddle";
import { Block } from "./Blocks/Block";
import { Background } from "./Backgound";
import { MovingBlock } from "./Blocks/MovingBlock";

export const PinBall = () => (
  <Canvas dpr={1.5} camera={{ position: [0, 2, 12], fov: 50 }}>
    <Physics iterations={5} gravity={[0, -30, 0]}>
      <BallAndCollisions />
      <Paddle />
      {
        Array.from({ length: 6 }, (_, i) => <MovingBlock key={i} position={[0, 1 + i * 4.5, 0]} offset={10000 * i} />) /* prettier-ignore */
      }
      <Block
        args={[10, 1.5, 4]}
        position={[-11, -7, 0]}
        rotation={[0, 0, -0.7]}
        material={{ restitution: 1.2 }}
      />
      <Block
        args={[10, 1.5, 4]}
        position={[11, -7, 0]}
        rotation={[0, 0, 0.7]}
        material={{ restitution: 1.2 }}
      />
      <Environment preset="warehouse" />
      <Background position={[0, 0, -5]} />
    </Physics>
  </Canvas>
);

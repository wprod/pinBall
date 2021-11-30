import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Block } from "./Block";
import { useKeyPress } from "react-use";

export enum ESide {
  LEFT,
  RIGHT,
}

interface IPaddleProps {
  side: ESide;
  dimensions: [x: number, y: number, z: number];
}

export function Paddle({ dimensions, side }: IPaddleProps) {
  const api = useRef<any>();

  const pushed = useKeyPress(side === ESide.LEFT ? "d" : "q");

  useFrame(() => {
    api.current.rotation.set(
      0,
      0,
      (pushed[0] ? -0.25 : 0.25) * (side === ESide.LEFT ? 1 : -1)
    );

    api.current.position.set(side === ESide.LEFT ? 5 : -5, -7, 0);
  });

  return <Block ref={api} dimensions={dimensions} material={{ restitution: 1 }} />;
}

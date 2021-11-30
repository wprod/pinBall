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
  args?: [x: number, y: number, z: number];
}

export function Paddle({ args = [5, 1.5, 4], side }: IPaddleProps) {
  const api = useRef<any>();

  const pushed = useKeyPress(side === ESide.LEFT ? "q" : "d");

  useFrame(() => {
    api.current.rotation.set(
      0,
      0,
      (pushed[0] ? -0.25 : 0.25) * side === ESide.LEFT ? -1 : 1
    );
    api.current.position.set(side === ESide.LEFT ? 10 : -10, 0, 0);
  });

  return <Block ref={api} args={args} material={{ restitution: 1.3 }} />;
}

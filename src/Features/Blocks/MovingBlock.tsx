import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Block } from "./Block";

interface IMovingBlockProps {
  offset: number;
  position: [x: number, y: number, z: number];
}

export function MovingBlock({
  offset = 0,
  position: [x, y, z],
  ...props
}: IMovingBlockProps): JSX.Element {
  const api = useRef<any>();

  useFrame((state) =>
    api.current.position.set(
      x +
        (Math.sin(offset + state.clock.elapsedTime) * state.viewport.width) / 4,
      y,
      z
    )
  );

  return (
    <Block
      ref={api}
      args={[3, 1.5, 4]}
      material={{ restitution: 1.1 }}
      {...props}
    />
  );
}

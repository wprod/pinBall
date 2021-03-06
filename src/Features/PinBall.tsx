import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { BallAndCollisions } from "./BallAndCollisions";
import { ESide, Paddle } from "./Blocks/Paddle";
import { Block } from "./Blocks/Block";
import { Background } from "./Backgound";
import { MovingBlock } from "./Blocks/MovingBlock";

export const PinBall = () => (
  <Canvas dpr={1.5} camera={{ position: [0, 2, 20], fov: 50 }}>
    <Physics iterations={5} gravity={[0, -30, 0]}>
      <BallAndCollisions />

      <Paddle side={ESide.LEFT} dimensions={[7, 1.5, 4]} />
      <Paddle side={ESide.RIGHT} dimensions={[7, 1.5, 4]} />

      {
        Array.from({ length: 6 }, (_, i) => <MovingBlock key={i} position={[0, 1 + i * 4.5, 0]} offset={10000 * i} />) /* prettier-ignore */
      }


      <Block
        dimensions={[10, 1.5, 4]}
        position={[-13, -7, 0]}
        rotation={[0, 0, -0.7]}
        material={{ restitution: 1 }}
      />
      <Block
        dimensions={[10, 1.5, 4]}
        position={[13, -7, 0]}
        rotation={[0, 0, 0.7]}
        material={{ restitution: 1 }}
      />
      <Environment preset="warehouse" />
      <Background position={[0, 0, -5]} />
    </Physics>
  </Canvas>
);

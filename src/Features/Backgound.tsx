import { useAspect, useTexture } from "@react-three/drei";

export const Background = (props: any) => (
  <mesh scale={useAspect(5000, 3800, 3)} {...props}>
    <planeGeometry />
    <meshBasicMaterial map={useTexture("/bg.jpg")} />
  </mesh>
);

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const FaroModel = () => {
  const scene = useMemo(() => {
    const data = useGLTF("/lighthouseWLight.glb");
    return data.scene;
  }, []);
  return (
    <>
      <primitive position={[1.3, -0.1, -6.5]} object={scene} />
    </>
  );
};

export default FaroModel;

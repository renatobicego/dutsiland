import { LayoutOrthographicCamera } from "framer-motion-3d";
import { useTransform } from "framer-motion";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useWindowSize from "../../utils/useWindowSize";
const Camera = ({ sectionBreakpoints, scrollYProgress }) => {
  const { width: widthScreen } = useWindowSize();
  const cameraRef = useRef(null);
  // Camera positions
  const xCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [
      0,
      0,
      widthScreen < 700 ? -0.5 : -1.3,
      widthScreen < 1020 ? -2.5 : -1.7,
      4,
      7,
    ]
    //[1.5, -1.3, 0, 0, 0]
  );
  const yCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [
      1.5,
      widthScreen < 1020 ? 5 : 1,
      3,
      widthScreen < 1020 ? 0.5 : 3.5,
      0,
      widthScreen < 1020 ? 0.9 : 0.4,
    ]
    // [0.6, 3, 3, 0, 0.8]
  );
  const zCamPos = useTransform(scrollYProgress, sectionBreakpoints, [
    3,
    widthScreen < 1020 ? 8 : 2,
    0.4,
    1.5,
    3,
    widthScreen < 1300 ? (widthScreen > 1020 ? 5.7 : 4.3) : 6,
  ]);
  // Camera rotations
  const xCamRot = useTransform(scrollYProgress, sectionBreakpoints, [
    0,
    -Math.PI / 8,
    -Math.PI / 2,
    -Math.PI / 3,
    0,
    0,
  ]);
  const yCamRot = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0, 0, 0, 0, Math.PI / 4, Math.PI / 3]
    // [0, 0, 0, 0, 0]
  );
  const zCamRot = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0, 0, 0, 0, 0, 0]
  );
  // useFrame((state, delta) => {
  //   if (!cameraRef.current) {
  //     return;
  //   }
  //   // if (mousePos && widthScreen > 1020) {
  //   //   cameraRef.current.rotation.x = xCamRot.get() - mousePos.y * 0.1;
  //   //   cameraRef.current.rotation.y = yCamRot.get() - mousePos.x * 0.1;
  //   //   cameraRef.current.rotation.z = zCamRot.get();
  //   // } else {
  //     cameraRef.current.rotation.x = xCamRot.get();
  //     cameraRef.current.rotation.y = yCamRot.get();
  //     cameraRef.current.rotation.z = zCamRot.get();
  //   // }
  // });
  return (
    <LayoutOrthographicCamera
      ref={cameraRef}
      position={[xCamPos, yCamPos, zCamPos]}
      rotation={[xCamRot, yCamRot, zCamRot]}
    />
  );
};

export default Camera;

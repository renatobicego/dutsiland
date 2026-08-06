import { LayoutOrthographicCamera } from "framer-motion-3d";
import { useTransform } from "framer-motion";
import { useRef } from "react";
import useWindowSize from "../../utils/useWindowSize";
import useMousePos from "../../utils/useMousePos";
import { useFrame } from "@react-three/fiber";
import { isBrowser } from "react-device-detect";
import { useControls } from "leva";
const Camera = ({ sectionBreakpoints, scrollYProgress }) => {
  const { width: widthScreen } = useWindowSize();
  const mousePos = useMousePos();

  const xCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [
      -1,
      -1,
      widthScreen < 700 ? -0.5 : -1.1,
      widthScreen < 1020 ? -2.5 : -1.1,
      -1.2,
      -1.2,
    ],
    //[1.5, -1.3, 0, 0, 0]
  );
  const yCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [
      1.2,
      widthScreen < 1020 ? 5 : 1.4,
      1.3,
      widthScreen < 1020 ? 0.5 : 1.2,
      1.2,
      widthScreen < 1020 ? 1 : 1.2,
    ],
    // [0.6, 3, 3, 0, 0.8]
  );
  const zCamPos = useTransform(scrollYProgress, sectionBreakpoints, [
    3,
    widthScreen < 1020 ? 8 : 2,
    2,
    2,
    2,
    widthScreen < 1300 ? (widthScreen > 1020 ? 5.7 : 4.3) : 2,
  ]);
  // Camera rotations
  const xCamRot = useTransform(scrollYProgress, sectionBreakpoints, [
    -Math.PI / 8,
    -Math.PI / 8,
    -Math.PI / 9,
    -Math.PI / 9.3,
    -Math.PI / 9.5,
    -Math.PI / 9.8,
  ]);
  const yCamRot = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [
      -Math.PI / 7,
      -Math.PI / 7,
      -Math.PI / 7,
      -Math.PI / 7,
      -Math.PI / 7,
      -Math.PI / 7,
    ],
    // [0, 0, 0, 0, 0]
  );
  const zCamRot = useTransform(scrollYProgress, sectionBreakpoints, [
    -Math.PI / 22,
    -Math.PI / 22,
    -Math.PI / 22,
    -Math.PI / 22,
    -Math.PI / 22,
    -Math.PI / 22,
  ]);
  useFrame((state, delta) => {
    if (mousePos && isBrowser) {
      state.camera.rotation.x = xCamRot.get() - mousePos.y * 0.1;
      state.camera.rotation.y = yCamRot.get() - mousePos.x * 0.1;
      state.camera.rotation.z = zCamRot.get();
    } else {
      state.camera.rotation.x = xCamRot.get();
      state.camera.rotation.y = yCamRot.get();
      state.camera.rotation.z = zCamRot.get();
    }
    state.camera.zoom = widthScreen < 1020 ? 100 : 400;
    state.camera.updateProjectionMatrix();
    // cameraRef.current.rotation.x = xCamRot.get();
    // cameraRef.current.rotation.y = yCamRot.get();
    // cameraRef.current.rotation.z = zCamRot.get();
    // cameraRef.current.position.x = xCamPos.get();
    // cameraRef.current.position.y = yCamPos.get();
    // cameraRef.current.position.z = zCamPos.get();
    // }
  });
  return (
    <LayoutOrthographicCamera
      position={[xCamPos, yCamPos, zCamPos]}
      // rotation={[xCamRot, yCamRot, zCamRot]}
    />
  );
};

export default Camera;

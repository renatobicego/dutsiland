import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const R3FLoader = ({ background }) => {
  const { progress } = useProgress();
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [progress]);
  console.log(progress)
  return (
    <div
      className={`${background} title-size absolute left-0 top-0 w-full h-full flex z-[1200]
        items-center justify-center title-second-animation `}
    >
      <div className="h-4 bg-white/20 w-32 flex items-start">
        <div
          style={{
            width: `${progress}%`,
          }}
          className="h-full bg-white"
        ></div>
      </div>
    </div>
  );
};

export default R3FLoader;

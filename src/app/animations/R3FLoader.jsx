import { useProgress } from "@react-three/drei";

const R3FLoader = ({ background }) => {
  const { progress } = useProgress();
  return (
    <div
      className={`${background} title-size absolute left-0 top-0 w-full h-full flex z-[1200]
        items-center justify-center title-second-animation ${progress === 100 ? 'hidden' : ''}`}
    >
      {progress} %
    </div>
  );
};

export default R3FLoader;

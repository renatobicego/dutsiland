import { useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const R3FLoader = ({ background }) => {
  const [visible, setVisible] = useState(true)
  const { progress } = useProgress();
  useEffect(() => {
    if(progress === 100){
      setInterval(() => setVisible(false), 2100)
    }
  }, [progress])
  const containerVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 2 } },
  };
  return (
    <div
      className={`${background} title-size absolute left-0 top-0 w-full h-full flex z-[1200]
        items-center justify-center title-second-animation ${
          visible ? "" : "hideLoader"
        }`}
    >
      <div className="h-4 bg-white/20 w-40 flex items-start">
        <motion.div
          className={`h-full bg-white transition-width duration-400`}
          initial="hidden"
          animate={progress === 100 ? "visible" : "hidden"}
          variants={containerVariants}
        ></motion.div>
      </div>
    </div>
  );
};

export default R3FLoader;

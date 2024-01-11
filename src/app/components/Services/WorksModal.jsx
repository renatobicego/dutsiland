
import { motion, AnimatePresence } from "framer-motion";
import WorkCard from "./WorkCard";

const WorksModal = ({ works, open, setOpen }) => {
  const variants = {
    hidden: { y: "100%" },
    visible: { y: "0%" },
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`bg-white text-sm rounded-2xl text-[#202020] pt-1 pb-1.5 px-6 md:hidden my-6 ${
          open ? "invisible" : ""
        }`}
      >
        Nuestros Trabajos
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full max-h-full z-50 overflow-y-auto bg-[#202020]/30  rounded-lg grid grid-cols-1 
         gap-4 px-4 py-12 transition-all duration-300"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3"
            >
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="1em"
                role="presentation"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="1em"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
            {works.map((work, i) => (
              <WorkCard key={i} data={work} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorksModal;

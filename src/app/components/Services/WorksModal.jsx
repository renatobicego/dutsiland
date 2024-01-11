// import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
// import WorkCard from "./WorkCard";
// import { useState } from "react";

// const WorksModal = ({ works }) => {
//   //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-white rounded-2xl text-[#202020] pt-1 pb-1.5 px-6 md:hidden my-6"
//       >
//         Nuestros Trabajos
//       </button>
//       {/* <Modal
//         classNames={{
//           base: "max-w-[90%] ",
//           closeButton: "text-white hover:bg-white/5 active:bg-white/10",
//           backdrop: "bg-[#202020]/90",
//         }}
//         backdrop="blur"
//         placement="center"
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//       >
//         <ModalContent className="w-full h-3/4 bg-[#202020]/80">
//           {(onClose) => (
//             <div
//               className={`w-full bg-[#202020]/30 h-auto max-h-full rounded-lg grid grid-cols-1
//         overflow-y-auto gap-4 px-4 py-12 `}
//             >
//               {works.map((work, i) => (
//                 <WorkCard key={i} data={work} />
//               ))}
//             </div>
//           )}
//         </ModalContent>
//       </Modal> */}
//       <div
//         className={`w-full bg-[#202020]/30 h-auto max-h-full rounded-lg grid grid-cols-1 absolute top-0 left-0
//         overflow-y-auto gap-4 px-4 py-12 z-30 ${
//           open ? "translate-y-0" : "translate-y-full invisible"
//         } transition-all duration-300`}
//       >
//         <button onClick={() => setOpen(false)} className="absolute top-3 right-3">
//           <svg
//             aria-hidden="true"
//             fill="none"
//             focusable="false"
//             height="1em"
//             role="presentation"
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             viewBox="0 0 24 24"
//             width="1em"
//           >
//             <path d="M18 6L6 18M6 6l12 12"></path>
//           </svg>
//         </button>
//         {works.map((work, i) => (
//           <WorkCard key={i} data={work} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default WorksModal;

import { useState } from "react";
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

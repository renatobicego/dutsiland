import { motion, AnimatePresence } from "framer-motion";
import WorkCard from "./WorkCard";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

const WorksModal = ({ works}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpenChange}
        className={`bg-white text-sm rounded-2xl text-[#202020] pt-1 pb-1.5 px-6 md:hidden my-6`}
      >
        Nuestros Trabajos
      </button>
      <Modal
        classNames={{
          base: "max-w-[90%]",
          closeButton:
            "text-white hover:bg-white/5 active:bg-white/10 z-[1300]",
        }}
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="h-[90%] bg-[#202020]/30">
          {(onClose) => (
            <div
              className="w-full max-h-full z-50 overflow-y-auto   rounded-lg grid grid-cols-1 
         gap-4 px-4 py-12 transition-all duration-300"
            >
              {works.map((work, i) => (
                <WorkCard key={i} data={work} />
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorksModal;

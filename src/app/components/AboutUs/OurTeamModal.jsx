import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import OurTeam from "./OurTeam";

const OurTeamModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button onClick={onOpenChange} className="btn-primary">
        Nuestro Equipo
      </button>
      <Modal
        classNames={{
          base: "max-w-[92%] sm:max-w-[85%] lg:max-w-[70%] 2xl:max-w-[55%] mx-auto",
          backdrop: "bg-negro/80 backdrop-blur-sm",
          closeButton:
            "text-white/60 hover:text-white hover:bg-white/5 active:bg-white/10 z-[1300] top-4 right-4",
          header:
            "text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-white font-semibold pb-0 pt-6 px-6 sm:px-8",
          body: "px-0 py-0",
        }}
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
          },
        }}
      >
        <ModalContent className="bg-negro-light border border-white/[0.06] max-h-[85vh] overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="font-serif">Nuestro Equipo</ModalHeader>
              <ModalBody className="px-4 sm:px-6 md:px-8 py-6 overflow-y-auto">
                <OurTeam />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OurTeamModal;

import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import OurTeam from "./OurTeam";
const OurTeamModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpenChange}
        className={`bg-white button text-negro button-animation max-lg:drop-shadow-lg`}
      >
        Nuestro Equipo
      </button>
      <Modal
        classNames={{
          base: "max-w-[90%] md:max-w-[70%] 2xl:max-w-[60%]",
          closeButton:
            "text-white hover:bg-white/5 active:bg-white/10 z-[1300]",
          header: "text-xl md:text-2xl 2xl:text-3xl text-white"
        }}
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="h-auto max-h-[80%] overflow-y-auto bg-[#202020]/30">
          {(onClose) => (
            <>
              <ModalHeader>Nuestro Equipo</ModalHeader>
              <OurTeam />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OurTeamModal;

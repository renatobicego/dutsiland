import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import OurTeam from './OurTeam'
const OurTeamModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpenChange}
        className={`bg-white text-sm rounded-2xl text-[#202020] pt-1 pb-1.5 px-6 md:hidden my-6`}
      >
        Nuestros Equipo
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
        <ModalContent className="h-auto max-h-[80%] overflow-y-auto bg-[#202020]/30">
          {(onClose) => (
            <OurTeam />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OurTeamModal;

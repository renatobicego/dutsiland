import React from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


const CustomDrawer = ({ ...props }) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement="center"
      backdrop="blur"
      size="full"
      classNames={{
        wrapper: "flex justify-end h-[100dvh] top-0",
        closeButton: "[&>svg]:w-6 [&>svg]:h-6 top-3 right-6 text-white active:bg-white/5 z-[1000]"
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
      className="rounded-md max-w-sm w-2/3 h-full max-h-full  bg-[#202020]/95">
      <ModalContent>{(onClose) => <>{props.children}</>}</ModalContent>
    </Modal>
  );
};

export default CustomDrawer;

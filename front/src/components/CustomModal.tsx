import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ICustomModal {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

export default function CustomModal({
  isOpen,
  onClose,
  header,
  body,
  footer,
}: ICustomModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={["full", "80%", "50em"]}>
        <ModalHeader>{header && header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body && body}</ModalBody>

        <ModalFooter>{footer && footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

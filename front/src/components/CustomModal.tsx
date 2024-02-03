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
  size?: any;
}

export default function CustomModal({
  isOpen,
  onClose,
  header,
  body,
  footer,
  size = "sm",
}: ICustomModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header && header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body && body}</ModalBody>

        <ModalFooter>{footer && footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function CustomModal({
  isOpen,
  setOpen,
  header,
  body,
  footer,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="xl">
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

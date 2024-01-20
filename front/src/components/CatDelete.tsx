import {
  // Alert
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function CatDelete({ catId, isOpen, setOpen }: any) {
  const cancelRef = useRef();

  const onDelete = () => {
    setOpen(false);
    // /catId
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer Chat
          </AlertDialogHeader>

          <AlertDialogBody>
            Êtes-vous sûr de vouloir supprimer cette adorable chat ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

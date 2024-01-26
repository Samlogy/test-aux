import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ICatDelete {
  catId: number;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function CatDelete({ catId, isOpen, setOpen }: ICatDelete) {
  const cancelRef = useRef();

  const onDelete = async () => {
    setOpen(false);
    // api.deleteData("/cat/" + catId);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
      isCentered
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
            <Button
              ref={cancelRef}
              onClick={() => setOpen(false)}
              variant="ghost"
              color="accent.1"
            >
              Annuler
            </Button>
            <Button bgColor="accent.1" color="white" onClick={onDelete} ml={3}>
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

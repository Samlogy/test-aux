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
import fetechRequest from "../lib/api";
import useActionStore, { INIT_CAT } from "../store/useActionStore";
import { ICat } from "../lib/interfaces";

interface ICatDelete {
  isOpen: boolean;
  onClose: () => void;
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
}

export default function CatDelete({
  isOpen,
  onClose,
  setCatsList,
}: ICatDelete) {
  const cancelRef = useRef();

  const currentCat = useActionStore((state) => state.cat);
  const setCat = useActionStore((state) => state.setCat);

  const onCloseDelete = () => {
    onClose();
    setCat(INIT_CAT);
  };
  const onDelete = async () => {
    onCloseDelete();
    await fetechRequest("DELETE", `cat/${currentCat?.id}`);
    setCatsList((prev) => prev.filter((c) => c.id !== currentCat.id));
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseDelete}
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
              onClick={onCloseDelete}
              variant="ghost"
              color="accent.1"
            >
              Annuler
            </Button>
            <Button
              bgColor="accent.1"
              color="white"
              _hover={{
                bg: "accent.2",
              }}
              onClick={onDelete}
              ml={3}
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

import {
  // Drawer
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

interface ICustomDrawer {
  isOpen: boolean;
  onClose: any;
  title?: string;
  placement?: "left" | "right";
  size?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function CustomDrawer({
  isOpen,
  onClose,
  title,
  placement = "left",
  size = "xs",
  body,
  footer,
}: ICustomDrawer) {
  return (
    <Drawer size={size} isOpen={isOpen} placement={placement} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {title && <DrawerHeader>{title}</DrawerHeader>}
        {body && <DrawerBody>{body}</DrawerBody>}
        {footer && (
          <DrawerFooter justifyContent="center">{footer}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

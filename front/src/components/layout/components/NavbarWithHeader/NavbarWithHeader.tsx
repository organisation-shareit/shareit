import {
  useDisclosure,
  useColorModeValue,
  Box,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MobileNav } from "./components/MobileNav";
import { SidebarContent } from "./components/SidebarContent";
import { LinkItem } from "./model/link-item";

interface NavbarWithHeaderProps {
  linkItems: LinkItem[];
}
export const NavbarWithHeader = ({ linkItems }: NavbarWithHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        linkItems={linkItems}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent linkItems={linkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

import { Box, BoxProps, CloseButton, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { LinkItem } from '../model/link-item';
import { NavItem } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: LinkItem[];
}

export const SidebarContent = ({ linkItems, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Share It.
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {Object.values(linkItems).map((link) => (
        <NavItem key={link.name} icon={link.icon} linkPath={link.linkPath}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

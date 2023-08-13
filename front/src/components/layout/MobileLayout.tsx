import { Outlet } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';
import { BottomNavigationBar } from './components/BottomNavigationBar/BottomNavigationBar';
import { routes } from '../../routes/route';

export const MobileLayout = () => {
  return (
    <Flex direction="column" h="100vh">
      {/* Content */}
      <Flex flex="1" overflow="auto" padding="1em">
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Flex>

      <Box
        as="footer"
        h="60px"
        bg="gray.200"
        shadow={'dark-lg'}
        position="fixed"
        bottom="0"
        width="100%"
      >
        <BottomNavigationBar linkItems={[routes.items, routes.loans, routes.groups]} />
      </Box>
    </Flex>
  );
};

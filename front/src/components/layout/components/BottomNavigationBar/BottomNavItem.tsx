import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

type BottomNavItemProps = {
  icon: IconType;
  linkPath: string;
  name: string;
};

export const BottomNavItem = ({ icon, linkPath, name }: BottomNavItemProps) => {
  const selectedColor = 'purple.600';
  return (
    <Box height="100%" width="100%">
      <NavLink to={linkPath} style={{ flex: 1 }}>
        {({ isActive }) => (
          <Box
            flex={1}
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={isActive ? 'white' : ''}
          >
            <VStack gap={0}>
              <Icon fontSize="2xl" as={icon} color={isActive ? selectedColor : ''} />
              <Text fontSize={'sm'} color={isActive ? selectedColor : ''}>
                {name}
              </Text>
            </VStack>
          </Box>
        )}
      </NavLink>
    </Box>
  );
};

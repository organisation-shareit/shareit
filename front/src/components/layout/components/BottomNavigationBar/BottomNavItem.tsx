import { Box, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

type BottomNavItemProps = {
  icon: IconType;
  linkPath: string;
};

export const BottomNavItem = ({ icon, linkPath }: BottomNavItemProps) => {
  return (
    <Box height="100%" width="100%">
      <NavLink to={linkPath} style={{ flex: 1 }}>
        {({ isActive }) => (
          <Box
            flex={1}
            height="100%"
            width="100%"
            background={isActive ? 'purple.400' : ''}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={isActive ? 'white' : ''}
          >
            <Icon fontSize="2xl" as={icon} />
          </Box>
        )}
      </NavLink>
    </Box>
  );
};

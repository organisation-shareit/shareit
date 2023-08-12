import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  linkPath: string;
  children: string;
}
export const NavItem = ({ icon, linkPath, children, ...rest }: NavItemProps) => {
  return (
    <NavLink to={linkPath}>
      {({ isActive }) => (
        <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
          <Flex
            align="center"
            color={isActive ? 'white' : ''}
            p="4"
            mx="4"
            borderRadius="lg"
            background={isActive ? 'purple.400' : ''}
            role="group"
            cursor="pointer"
            _hover={{
              bg: 'purple.200',
              color: 'white',
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Box>
      )}
    </NavLink>
  );
};

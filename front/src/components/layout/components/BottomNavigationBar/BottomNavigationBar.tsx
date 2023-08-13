import { Box, Flex } from '@chakra-ui/react';
import { BottomNavItem } from './BottomNavItem';
import { LinkItem } from '../NavbarWithHeader/model/link-item';

type BottomNavigationBarProps = {
  linkItems: LinkItem[];
};

export const BottomNavigationBar = ({ linkItems }: BottomNavigationBarProps) => {
  return (
    <Flex align="stretch" direction="row" flex="1" height={'100%'}>
      {linkItems.map((linkItem) => {
        return (
          <Box flex="1" textAlign="center" display="flex" alignItems="center">
            <BottomNavItem icon={linkItem.icon} linkPath={linkItem.linkPath} name={linkItem.name} />
          </Box>
        );
      })}
    </Flex>
  );
};

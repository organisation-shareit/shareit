import { FaToolbox, FaRegListAlt, FaUserFriends } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { NavbarWithHeader } from './components/NavbarWithHeader/NavbarWithHeader';

const routes = [
  { name: 'Mes objets', linkPath: 'items', icon: FaToolbox },
  {
    name: 'Mes emprunts',
    linkPath: 'loans',
    icon: FaRegListAlt,
  },
  { name: 'Mes groupes', linkPath: 'groups', icon: FaUserFriends },
  { name: 'Configuration', linkPath: 'settings', icon: FiSettings },
];

export const WebLayout = () => {
  return <NavbarWithHeader linkItems={routes} />;
};

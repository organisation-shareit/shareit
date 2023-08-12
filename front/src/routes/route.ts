import { FaToolbox, FaRegListAlt, FaUserFriends } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { LinkItem } from '../components/layout/components/NavbarWithHeader/model/link-item';

export const routes: Record<string, LinkItem> = {
    items: { name: 'Mes objets', linkPath: 'items', icon: FaToolbox },
    loans: { name: 'Mes emprunts', linkPath: 'loans', icon: FaRegListAlt },
    groups: { name: 'Mes groupes', linkPath: 'groups', icon: FaUserFriends },
    settings: { name: 'Configuration', linkPath: 'settings', icon: FiSettings }
};
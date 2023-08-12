import { routes } from '../../routes/route';
import { NavbarWithHeader } from './components/NavbarWithHeader/NavbarWithHeader';

export const WebLayout = () => {
  return (
    <NavbarWithHeader linkItems={[routes.items, routes.loans, routes.groups, routes.settings]} />
  );
};

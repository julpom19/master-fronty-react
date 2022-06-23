import { Breadcrumbs } from '@mui/material';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../routes/routes';

const HeaderNavigation = () => {
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/result', '/result/:userId'] });
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </Breadcrumbs>
  );
};

export default HeaderNavigation;
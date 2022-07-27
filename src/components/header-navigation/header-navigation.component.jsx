import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../routes/routes';
import { Breadcrumbs } from '@mui/material';

const HeaderNavigation = () => {
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/quiz-results/:userId'] });
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </Breadcrumbs>
  );
};

export default HeaderNavigation;
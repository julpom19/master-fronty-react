import { Breadcrumbs } from '@mui/material';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../routes/routes';

const HeaderNavigation = () => {
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/quiz-results/:userId'] });
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </Breadcrumbs>
  );
};

export default HeaderNavigation;
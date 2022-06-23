import { Link, useMatch, useLocation } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../../routes/routes';

const HeaderNavigation = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/result', '/result/:userId'] });
  const match = useMatch('/:categoryId/:quizId');
  const [ breadcrumbsLinks, setBreadcrumbsLinks ] = useState(null);
  useEffect(() => {
    console.log('location', location);
    buildBreadcrumbs();
  }, [location]);
  useEffect(() => {
    console.log('MATCh', match);
  }, [match]);

  const buildBreadcrumbs = () => {
    let breadcrumbsLinks;
    switch (location.pathname) {
      case '/': {
        breadcrumbsLinks = null;
        break;
      }
      case '/profile': {
        breadcrumbsLinks = <Typography color="text.primary">Profile</Typography>;
        break;
      }
    }
    if(breadcrumbsLinks === undefined) {

    }
    setBreadcrumbsLinks(breadcrumbsLinks);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </Breadcrumbs>
  );
};

export default HeaderNavigation;
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';

import { selectCategoryById } from '../../store/categories/categories.selectors';

import { Typography } from '@mui/material';

const CategoryBreadcrumb = ({match}) => {
  const matchRes = useMatch(match.pathname);

  const category = useSelector((state) => selectCategoryById(state, match.params.categoryId));

  if(matchRes) {
    return <Typography>{category?.title}</Typography>;
  } else {
    return <Link to={match.pathname}>{category?.title}</Link>;
  }
};

export default memo(CategoryBreadcrumb);
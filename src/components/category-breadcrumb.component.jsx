import { useSelector } from 'react-redux';
import { selectCategoryById } from '../store/categories/categories.selectors';
import { Link, useMatch } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { Typography } from '@mui/material';

const CategoryBreadcrumb = ({match}) => {
  const category = useSelector((state) => selectCategoryById(state, match.params.categoryId));
  const matchRes = useMatch(match.pathname);
  if(matchRes) {
    return <Typography>{category?.title}</Typography>;
  } else {
    return <Link to={match.pathname}>{category?.title}</Link>;
  }
};

export default CategoryBreadcrumb;
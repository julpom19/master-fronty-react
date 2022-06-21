import { useDispatch, useSelector } from 'react-redux';

import { selectCategories } from '../../store/categories/categories.selectors';

import CategoryCard from '../../components/category-card/category-card.component';

import './home.styles.scss';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import { Container, Grid } from '@mui/material';


const Home = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  const renderedCategories = categories.map(category => (
    <Grid item md={3} sm={4} xs={6} key={category.id}>
      <CategoryCard category={category} />
    </Grid>
  ));

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
      >
        {renderedCategories}
      </Grid>
    </Container>
  );
}

export default Home;
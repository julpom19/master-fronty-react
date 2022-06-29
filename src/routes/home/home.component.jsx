import { useDispatch, useSelector } from 'react-redux';

import { selectCategories, selectCategoriesIsLoading } from '../../store/categories/categories.selectors';

import CategoryCard from '../../components/category-card/category-card.component';

import './home.styles.scss';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';


const Home = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCategoriesIsLoading);

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
      <Typography variant="h3" mt={2} textAlign="center" fontWeight="bold">
        Train yourself to master the force of coding!
      </Typography>
      {isLoading && <LoadingSpinner />}
      <Grid
        container
        spacing={2}
        mt={1}
      >
        {renderedCategories}
      </Grid>
    </Container>
  );
}

export default Home;
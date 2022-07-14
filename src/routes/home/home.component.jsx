import { useDispatch, useSelector } from 'react-redux';

import { selectCategories, selectCategoriesIsLoading } from '../../store/categories/categories.selectors';

import CategoryCard from '../../components/category-card/category-card.component';

import './home.styles.scss';
import { useEffect, useRef } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import { Container, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Container>
      <Typography variant="h3" mt={6} textAlign="center" fontWeight="bold">
        Train yourself to master the force of coding!
      </Typography>
      <Typography mt={2} textAlign="center" sx={{fontSize: 18}}>
        Take quizzes to test your knowledge in the world of frontend development.
        Discover your strengths and weaknesses in order to improve your professional skills
      </Typography>
      {isLoading && <LoadingSpinner />}
      <Grid
        container
        spacing={2}
        mt={6}
        mb={2}
        justifyContent="space-around"
      >
        {
          categories.map(category => {
            return (
              <Grid item md={3} sm={4} xs={6} key={category.id}>
                <CategoryCard category={category} />
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
}

export default Home;
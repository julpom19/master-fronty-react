import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './category.styles.scss';
import { fetchQuizzesByCategoryAsync } from '../../store/quizzes/quizzes.actions';
import { selectQuizzesByCategory, selectQuizzesIsLoading } from '../../store/quizzes/quizzes.selectors';
import { Container, Typography, Grid } from '@mui/material';
import { selectCategoryById } from '../../store/categories/categories.selectors';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import QuizCard from '../../components/quiz-card/quiz-card.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(state => selectQuizzesByCategory(state, categoryId));
  const isLoading = useSelector(selectQuizzesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchQuizzesByCategoryAsync(categoryId));
  }, []);

  const quizzesList = quizzes && quizzes.map(q => (
    <Grid item key={q.id}>
      <Link to={`/${categoryId}/${q.id}`}>
        Link to {q.title}
      </Link>
    </Grid>
  ));

  return (
    <Container>
      { isLoading && <LoadingSpinner /> }
      <Grid container spacing={2} mt={1}>
        {quizzes?.map(q =>
          <Grid item md={3} sm={4} xs={6} key={q.id}>
            <QuizCard quiz={q} categoryId={categoryId} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Category;
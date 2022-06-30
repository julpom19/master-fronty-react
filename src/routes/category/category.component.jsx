import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './category.styles.scss';
import { fetchQuizzesByCategoryAsync, quizzesByCategoryErrorHandled } from '../../store/quizzes/quizzes.actions';
import {
  selectQuizzesByCategory,
  selectQuizzesIsLoading,
  selectQuizzesLoadingError,
} from '../../store/quizzes/quizzes.selectors';
import { Container, Grid } from '@mui/material';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import QuizCard from '../../components/quiz-card/quiz-card.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import { useNavigate } from 'react-router';
import { DBEntityNotFoundError } from '../../utils/errors.utils';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(state => selectQuizzesByCategory(state, categoryId));
  const isLoading = useSelector(selectQuizzesIsLoading);
  const error = useSelector(selectQuizzesLoadingError);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchQuizzesByCategoryAsync(categoryId));
  }, []);

  useEffect(() => {
    if(error && error.name === DBEntityNotFoundError.name) {
      navigate('/', {replace: true});
      dispatch(quizzesByCategoryErrorHandled());
    }
  },[error]);

  return (
    <Container>
      { isLoading && <LoadingSpinner /> }
      {/*{error.toString()}*/}
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
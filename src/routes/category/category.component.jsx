import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzesByCategoryAsync, quizzesByCategoryErrorHandled } from '../../store/quizzes/quizzes.actions';
import {
  selectQuizzesByCategory,
  selectQuizzesIsLoading,
  selectQuizzesLoadingError,
} from '../../store/quizzes/quizzes.selectors';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';

import { DBEntityNotFoundError } from '../../utils/errors.utils';

import { Container, Grid } from '@mui/material';
import QuizCard from '../../components/quiz-card/quiz-card.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

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
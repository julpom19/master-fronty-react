import { createAction } from '../../utils/store/store.utils';
import QUIZZES_ACTION_TYPES from './quizzes.types';
import { getQuizzesByCategory } from '../../utils/firebase/firebase-store.utils';

const fetchQuizzesByCategoryStart = () =>
  createAction(QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_START);

const fetchQuizzesByCategorySuccess = (quizzesByCategory, categoryId) =>
  createAction(QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_SUCCESS, {
    [categoryId]: quizzesByCategory
  });

const fetchQuizzesByCategoryFailed = (error) =>
  createAction(QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_FAILED, error);

export const fetchQuizzesByCategoryAsync = (categoryId) => async (dispatch, getState) => {
  if (getState().quizzes.quizzesByCategories[categoryId]?.length > 0) {
    return Promise.resolve();
  }
  dispatch(fetchQuizzesByCategoryStart());
  try {
    const quizzesByCategory = await getQuizzesByCategory(categoryId);
    dispatch(fetchQuizzesByCategorySuccess(quizzesByCategory, categoryId));
  } catch (error) {
    dispatch(fetchQuizzesByCategoryFailed(error));
  }
};

export const quizzesByCategoryErrorHandled = () =>
  createAction(QUIZZES_ACTION_TYPES.QUIZZES_BY_CATEGORY_ERROR_HANDLED);

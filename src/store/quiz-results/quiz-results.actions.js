import { createAction } from '../../utils/store/store.utils';
import QUIZ_RESULTS_ACTION_TYPES from './quiz-results.types';
import { getQuizResultsByUser } from '../../utils/firebase/firebase-store.utils';

const fetchQuizResultsStart = () =>
  createAction(QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_START);

const fetchQuizResultsSuccess = (quizResults) =>
  createAction(QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_SUCCESS, quizResults);

const fetchQuizResultsFailed = (error) =>
  createAction(QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_FAILED, error);

export const fetchQuizResultsAsync = (userId) => async (dispatch) => {
  dispatch(fetchQuizResultsStart());
  try {
    const quizResults = await getQuizResultsByUser(userId);
    dispatch(fetchQuizResultsSuccess(quizResults));
  } catch (error) {
    dispatch(fetchQuizResultsFailed(error));
  }
}
import { createAction } from '../../utils/store/store.utils';
import QUIZ_RESULT_ACTION_TYPES from './quiz-result.types';
import { getQuizResultByUser, submitQuizResult } from '../../utils/firebase/firebase-store.utils';

const submitQuizResultStart = () =>
  createAction(QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_START);

const submitQuizResultSuccess = (quizResult) =>
  createAction(QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_SUCCESS, quizResult);

const submitQuizResultFailed = (error) =>
  createAction(QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_FAILED, error);

export const submitQuizResultAsync = (userId, quizResult) => async (dispatch) => {
  dispatch(submitQuizResultStart());
  try {
    const quizResultSaved = await submitQuizResult(userId, quizResult);
    dispatch(submitQuizResultSuccess(quizResultSaved));
  } catch (error) {
    dispatch(submitQuizResultFailed(error));
  }
}

const fetchQuizResultStart = () =>
  createAction(QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_START);

const fetchQuizResultSuccess = (quizResult) =>
  createAction(QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_SUCCESS, quizResult);

const fetchQuizResultFailed = (error) =>
  createAction(QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_FAILED, error);

export const fetchQuizResultAsync = (userId, quizResultId) => async (dispatch) => {
  dispatch(fetchQuizResultStart());
  try {
    const quizResult = await getQuizResultByUser(userId, quizResultId);
    dispatch(fetchQuizResultSuccess(quizResult));
  } catch (error) {
    dispatch(fetchQuizResultFailed(error));
  }
};

export const quizResultErrorHandled = () =>
  createAction(QUIZ_RESULT_ACTION_TYPES.QUIZ_RESULT_ERROR_HANDLED);
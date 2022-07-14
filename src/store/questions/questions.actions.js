import { createAction } from '../../utils/store/store.utils';
import QUESTIONS_ACTION_TYPES from './questions.types';
import { getQuestionsByCategoryAndQuiz } from '../../utils/firebase/firebase-store.utils';

const fetchQuestionsByQuizStart = () =>
  createAction(QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_START);

const fetchQuestionsByQuizSuccess = (questions, quizId) =>
  createAction(QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_SUCCESS, {
    [quizId]: questions
  });

const fetchQuestionsByQuizFailed = (error) =>
  createAction(QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_FAILED, error);

export const fetchQuestionsByCategoryAndQuizAsync = (categoryId, quizId) => async (dispatch, getState) => {
  if(getState().questions.questionsByQuiz?.length > 0) { //TODO: BUG
    return Promise.resolve();
  }

  dispatch(fetchQuestionsByQuizStart());
  try {
    const questionsByQuiz = await getQuestionsByCategoryAndQuiz(categoryId, quizId);
    dispatch(fetchQuestionsByQuizSuccess(questionsByQuiz, quizId));
  } catch (error) {
    dispatch(fetchQuestionsByQuizFailed(error));
  }
}

export const questionsByQuizErrorHandled = () =>
  createAction(QUESTIONS_ACTION_TYPES.QUESTIONS_BY_QUIZ_ERROR_HANDLED);
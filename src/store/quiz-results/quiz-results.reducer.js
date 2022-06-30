import QUIZ_RESULTS_ACTION_TYPES from './quiz-results.types';

const INITIAL_STATE = {
  quizResults: [],
  isLoading: false,
  error: null
};

const quizResultsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_START:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_SUCCESS:
      return {
        ...state,
        quizResults: payload, //TODO: add caching
        error: null,
        isLoading: false
      };
    case QUIZ_RESULTS_ACTION_TYPES.FETCH_QUIZ_RESULTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default quizResultsReducer;
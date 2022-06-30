import QUIZ_RESULT_ACTION_TYPES from './quiz-result.types';

const INITIAL_STATE = {
  quizResult: {},
  isSubmitting: false,
  error: null,
  isLoading: false
};

const quizResultReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_START:
      return {
        ...state,
        error: null,
        isSubmitting: true
      };
    case QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        quizResult: {...payload},
        isSubmitting: false,
        error: null
      };
    case QUIZ_RESULT_ACTION_TYPES.SUBMIT_QUIZ_RESULT_FAILED:
      return {
        ...state,
        isSubmitting: false,
        error: payload
      };
    case QUIZ_RESULT_ACTION_TYPES.SET_QUIZ_RESULT:
      return {
        ...state,
        quizResult: {...payload}
      }
    case QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_START:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        quizResult: {...payload},
        isLoading: false,
        error: null
      }
    case QUIZ_RESULT_ACTION_TYPES.FETCH_QUIZ_RESULT_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    case QUIZ_RESULT_ACTION_TYPES.QUIZ_RESULT_ERROR_HANDLED:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default quizResultReducer;
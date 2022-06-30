import QUESTIONS_ACTION_TYPES from './questions.types';

const INITIAL_STATE = {
  questionsByQuiz: {},
  isLoading: false,
  error: null
};

const questionsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_SUCCESS:
      return {
        ...state,
        questionsByQuiz: {
          ...state.questionsByQuiz,
          ...payload
        },
        error: null,
        isLoading: false
      };
    case QUESTIONS_ACTION_TYPES.FETCH_QUESTIONS_BY_QUIZ_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case QUESTIONS_ACTION_TYPES.QUESTIONS_BY_QUIZ_ERROR_HANDLED:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default questionsReducer;
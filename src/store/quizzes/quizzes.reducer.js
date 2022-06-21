import QUIZZES_ACTION_TYPES from './quizzes.types';

const INITIAL_STATE = {
  quizzesByCategories: {},
  isLoading: false,
  error: null
};

const quizzesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_START:
      return {
        ...state,
        isLoading: true
      };
    case QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        quizzesByCategories: {
          ...state.quizzesByCategories,
          ...payload
        },
        isLoading: false
      };
    case QUIZZES_ACTION_TYPES.FETCH_QUIZZES_BY_CATEGORY_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    default:
      return state;
  }
}

export default quizzesReducer;
import QUIZZES_ACTION_TYPES from './quizzes.types';

const QUIZ_TYPE = {
  RANDOM: 'RANDOM',
  DEFINED: 'DEFINED'
};

const INITIAL_STATE = {
  quizzesByCategories: {
    // 'js': [
    //   {
    //     id: 1,
    //     category_id: 1,
    //     title: 'JS BASIC',
    //     description: 'Questions about types, functions, objects',
    //     quiz_type: QUIZ_TYPE.DEFINED,
    //     showable: true
    //   },
    //   {
    //     id: 2,
    //     category_id: 1,
    //     title: 'JS ADVANCED',
    //     description: 'Questions about prototypes, classes',
    //     quiz_type: QUIZ_TYPE.DEFINED,
    //     showable: true
    //   },
    // ],
    // 'css': [
    //   {
    //     id: 3,
    //     category_id: 2,
    //     title: 'CSS BASIC',
    //     description: 'Questions about selectors',
    //     quiz_type: QUIZ_TYPE.DEFINED,
    //     showable: true
    //   }
    // ]
  },
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
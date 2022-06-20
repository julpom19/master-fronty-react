import CATEGORIES_ACTION_TYPES from './categories.types';

const INITIAL_STATE = {
  // categories: {
  //   ids: [1, 2, 3],
  //   entities: [
  //     {
  //       id: 1,
  //       name: 'js'
  //     },
  //     {
  //       id: 2,
  //       name: 'css'
  //     },
  //     {
  //       id: 3,
  //       name: 'html'
  //     },
  //   ],
  // },
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  };
};

export default categoriesReducer;
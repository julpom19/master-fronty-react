import { createAction } from '../../utils/store/store.utils';
import CATEGORIES_ACTION_TYPES from './categories.types';
import { getCategories } from '../../utils/firebase/firebase-store.utils';

const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch, getState) => {
  if (getState().categories.categories.length > 0) {
    return Promise.resolve();
  }

  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategories();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
}


import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoryById = createSelector(
  [
    selectCategoriesReducer,
    (state, categoryId) => categoryId
  ],
  (categoriesSlice, categoryId) => categoriesSlice.categories.find(c => c.id === categoryId)
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);



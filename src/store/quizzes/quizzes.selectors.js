import { createSelector } from 'reselect';

const selectQuizzesReducer = state => state.quizzes;

export const selectQuizzesByCategory = createSelector(
  [
    selectQuizzesReducer,
    (state, categoryId) => categoryId
  ],
  (quizzesSlice, categoryId) => quizzesSlice.quizzesByCategories[categoryId]
);
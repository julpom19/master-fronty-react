import { createSelector } from 'reselect';

const selectQuizzesReducer = state => state.quizzes;

export const selectQuizzesByCategory = createSelector(
  [
    selectQuizzesReducer,
    (state, categoryId) => categoryId
  ],
  (quizzesSlice, categoryId) => quizzesSlice.quizzesByCategories[categoryId]
);

export const selectQuizById = createSelector(
  [
    selectQuizzesReducer,
    (state, quizId) => quizId
  ],
  (quizzesSlice, quizId) => {
    for(const quizzes of Object.values(quizzesSlice.quizzesByCategories)) {
      const quiz = quizzes.find(quiz => quiz.id === quizId);
      if(quiz) return quiz;
    }
  }
);

export const selectQuizzesIsLoading = createSelector(
  [selectQuizzesReducer],
  (quizzesSlice) => quizzesSlice.isLoading
);

export const selectQuizzesLoadingError = createSelector(
  [selectQuizzesReducer],
  (quizzesSlice) => quizzesSlice.error
);
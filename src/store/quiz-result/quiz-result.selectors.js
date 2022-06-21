import { createSelector } from 'reselect';

const selectQuizResultReducer = state => state.quizResult;

export const selectQuizResult = createSelector(
  [
    selectQuizResultReducer
  ],
  (quizResultSlice) => quizResultSlice.quizResult
);

export const selectIsQuizResultSubmitting = createSelector(
  [
    selectQuizResultReducer
  ],
  (quizResultSlice) => quizResultSlice.isSubmitting
);

export const selectQuizResultError = createSelector(
  [
    selectQuizResultReducer
  ],
  (quizResultSlice) => quizResultSlice.error
);
import { createSelector } from 'reselect';

const selectQuestionsReducer = state => state.questions;

export const selectQuestionsByQuiz = createSelector(
  [
    selectQuestionsReducer,
    (state, quizId) => quizId
  ],
  (questionsSlice, quizId) => questionsSlice.questionsByQuiz[quizId] || []
);

export const selectQuestionsIsLoading = createSelector(
  [selectQuestionsReducer],
  (questionsSlice) => questionsSlice.isLoading
)
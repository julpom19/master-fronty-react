import { createSelector } from 'reselect';
import { selectCurrentUser } from '../user/user.selectors';

const selectQuizResultsReducer = state => state.quizResults;

export const selectQuizResults = createSelector(
  [
    selectQuizResultsReducer,
    selectCurrentUser
  ],
  (quizResultsSlice) => quizResultsSlice.quizResults || []
);
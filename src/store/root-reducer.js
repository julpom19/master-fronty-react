import { combineReducers } from 'redux';
import categoriesReducer from './categories/categories.reducer';
import quizzesReducer from './quizzes/quizzes.reducer';
import questionsReducer from './questions/questions.reducer';
import { userReducer } from './user/user.reducer';
import quizResultsReducer from './quiz-results/quiz-results.reducer';
import quizResultReducer from './quiz-result/quiz-result.reducer';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  quizzes: quizzesReducer,
  questions: questionsReducer,
  user: userReducer,
  quizResults: quizResultsReducer,
  quizResult: quizResultReducer
});
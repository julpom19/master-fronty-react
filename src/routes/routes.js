import Home from './home/home.component';
import QuizResultsPage from './quiz-results-page/quiz-results-page.component';
import Authentication from './authentication/authentication.component';
import QuizResult from './quiz-result/quiz-result.component';
import Category from './category/category.component';
import Quiz from './quiz/quiz.component';
import CategoryBreadcrumb from '../components/breadcrumbs/category-breadcrumb.component';
import QuizBreadcrumb from '../components/breadcrumbs/quiz-breadcrumb.component';
import HomeBreadcrumb from '../components/breadcrumbs/home-breadcrumb.component';
import QuizResultsBreadcrumb from '../components/breadcrumbs/quiz-results-breadcrumb.component';
import { Navigate } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <Home />,
    breadcrumb: HomeBreadcrumb
  },
  {
    path: 'quiz-results',
    element: <QuizResultsPage />,
    breadcrumb: QuizResultsBreadcrumb
  },
  {
    path: 'auth',
    element: <Authentication />,
    breadcrumb: 'Authentication'
  },
  {
    path: 'quiz-results/:userId/:quizResultId',
    element: <QuizResult />,
    breadcrumb: 'Quiz Result'
  },
  {
    path: ':categoryId',
    element: <Category />,
    breadcrumb: CategoryBreadcrumb
  },
  {
    path: ':categoryId/:quizId',
    element: <Quiz />,
    breadcrumb: QuizBreadcrumb
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  }
]
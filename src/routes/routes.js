import Home from './home/home.component';
import Profile from './profile/profile.component';
import Authentication from './authentication/authentication.component';
import QuizResult from './quiz-result/quiz-result.component';
import Category from './category/category.component';
import Quiz from './quiz/quiz.component';
import CategoryBreadcrumb from '../components/category-breadcrumb.component';
import QuizBreadcrumb from '../components/quiz-breadcrumb.component';
import HomeBreadcrumb from '../components/home-breadcrumb.component';

export const routes = [
  {
    path: '/',
    element: <Home />,
    breadcrumb: HomeBreadcrumb
  },
  {
    path: 'profile',
    element: <Profile />,
    breadcrumb: 'Profile'
  },
  {
    path: 'auth',
    element: <Authentication />,
    breadcrumb: 'Authentication'
  },
  {
    path: 'result/:userId/:quizResultId',
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
]
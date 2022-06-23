import { useSelector } from 'react-redux';
import { selectQuizById } from '../store/quizzes/quizzes.selectors';
import { Typography } from '@mui/material';

const QuizBreadcrumb = ({match}) => {
  const quiz = useSelector((state) => selectQuizById(state, match.params.quizId));
  return <Typography>{quiz?.title}</Typography>;
};

export default QuizBreadcrumb;
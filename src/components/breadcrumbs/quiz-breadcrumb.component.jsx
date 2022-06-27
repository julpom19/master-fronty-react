import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { selectQuizById } from '../../store/quizzes/quizzes.selectors';

const QuizBreadcrumb = ({match}) => {
  const quiz = useSelector((state) => selectQuizById(state, match.params.quizId));
  return <Typography>{quiz?.title}</Typography>;
};

export default QuizBreadcrumb;
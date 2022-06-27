import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizResults } from '../../store/quiz-results/quiz-results.selectors';
import { useEffect } from 'react';
import { fetchQuizResultsAsync } from '../../store/quiz-results/quiz-results.actions';
import { selectCurrentUser } from '../../store/user/user.selectors';

const QuizResultsTable = () => {
  const dispatch = useDispatch();
  const quizResults = useSelector(selectQuizResults);
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    dispatch(fetchQuizResultsAsync(currentUser?.uid));
  }, [currentUser]);



  return (
    <DataGrid
      columns={[]}
      rows={quizResults}
    />
  );
};

export default QuizResultsTable;
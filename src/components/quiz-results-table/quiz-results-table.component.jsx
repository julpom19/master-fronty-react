import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizResults, selectQuizResultsLoading } from '../../store/quiz-results/quiz-results.selectors';
import { useEffect, useState } from 'react';
import { fetchQuizResultsAsync } from '../../store/quiz-results/quiz-results.actions';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './quiz-results-table.styles.scss';

const QuizResultsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizResultsFromState = useSelector(selectQuizResults);
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectQuizResultsLoading);
  const [ quizResults, setQuizResults ] = useState([]);

  useEffect(() => {
    dispatch(fetchQuizResultsAsync(currentUser?.uid));
  }, [currentUser]);

  useEffect(() => {
    if(!quizResultsFromState || quizResultsFromState.length === 0) return;
    setQuizResults(
      quizResultsFromState.map((qResult, index) => {
        qResult.index = index + 1;
        qResult.score = qResult.correctAnswersAmount + ' of ' + qResult.answers.length;
        qResult.date = new Date(qResult.date).toLocaleDateString("en-US");
        return qResult;
    }));
  }, [quizResultsFromState]);

  const onHandleRowClick = (params) => {
    navigate(`/quiz-results/${currentUser.uid}/${params.id}`);
  }

  const columns = [
    {
      field: 'index',
      headerName: '#',
      flex: 0.3,
    },
    {
      field: 'quizTitle',
      headerName: 'Quiz',
      flex: 1,
    },
    {
      field: 'categoryTitle',
      headerName: 'Category',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'score',
      headerName: 'Score',
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        disableSelectionOnClick
        disableColumnMenu
        loading={loading}
        columns={columns}
        rows={quizResults}
        onRowClick={onHandleRowClick}
      />
    </Box>
  );
};

export default QuizResultsTable;
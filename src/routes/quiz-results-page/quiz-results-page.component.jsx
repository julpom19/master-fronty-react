import './quiz-results-page.styles.scss';
import { Container, Typography } from '@mui/material';
import QuizResultsTable from '../../components/quiz-results-table/quiz-results-table.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

const QuizResultsPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!currentUser) {
      navigate('/auth', {replace: true, state: {from: location}});
    }
  }, [currentUser]);

  return (
    <Container>
      <Typography variant="h4" mt={3} mb={3}>Your quiz results</Typography>
      <QuizResultsTable />
    </Container>
  );
}

export default QuizResultsPage;
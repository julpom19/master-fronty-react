import './quiz-results-page.styles.scss';
import { Container, Typography } from '@mui/material';
import QuizResultsTable from '../../components/quiz-results-table/quiz-results-table.component';

const QuizResultsPage = () => {

  return (
    <Container>
      <Typography variant="h4" mt={3} mb={3}>Your quiz results</Typography>
      <QuizResultsTable />
    </Container>
  );
}

export default QuizResultsPage;
import './profile.styles.scss';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import QuizResultsTable from '../../components/quiz-results-table/quiz-results-table.component';

const Profile = () => {

  return (
    <Container>
      <h3>Profile page info</h3>
      <Link to={`/result/${Math.floor(Math.random() * 10)}`}>
        <p>Row of data that leads to quiz result</p>
      </Link>
      <QuizResultsTable />
    </Container>
  );
}

export default Profile;
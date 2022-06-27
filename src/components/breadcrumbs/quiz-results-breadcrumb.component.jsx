import { Link, useMatch } from 'react-router-dom';
import { Typography } from '@mui/material';

const QuizResultsBreadcrumb = ({match}) => {
  const matchRes = useMatch(match.pathname);
  if(matchRes) {
    return <Typography>Quiz Results</Typography>;
  } else {
    return (
      <Link to={match.pathname}>
        <Typography>Quiz Results</Typography>
      </Link>
    );
  }
};

export default QuizResultsBreadcrumb;
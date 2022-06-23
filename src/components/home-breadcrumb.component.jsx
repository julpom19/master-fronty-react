import { Link, useMatch } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const HomeBreadcrumb = ({match}) => {
  const matchRes = useMatch(match.pathname);
  if(matchRes) {
    return <Home />;
  } else {
    return (
      <Link to={match.pathname}>
        <Home />
      </Link>
    );
  }
};

export default HomeBreadcrumb;
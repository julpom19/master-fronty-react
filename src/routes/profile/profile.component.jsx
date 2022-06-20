import './profile.styles.scss';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h3>Profile page info</h3>
      <Link to={`/result/${Math.floor(Math.random() * 10)}`}>
        <p>Row of data that leads to quiz result</p>
      </Link>
    </div>
  );
}

export default Profile;
import './header.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase-auth.utils';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const signOutHandler = async () => {
    await signOutUser();
  };
  const signInHandler = async () => {
    await signInWithGooglePopup();
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logo">LOGO</div>
        </Link>
        {
          currentUser ? (
            <span onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <span onClick={signInHandler}>
              SIGN IN
            </span>
          )
        }
        {/*<Link to="/auth">*/}
        {/*  <div className="profile">SIGN IN</div>*/}
        {/*</Link>*/}
        <Link to="/profile">
          <div className="profile">PROFILE ICON</div>
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
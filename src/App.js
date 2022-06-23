import { Route, Routes } from 'react-router-dom';
import Header from './routes/header/header.component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChangedListener } from './utils/firebase/firebase-auth.utils';
import { createUserDocumentFromAuth } from './utils/firebase/firebase-store.utils';
import { setCurrentUser } from './store/user/user.actions';
import Footer from './components/footer/footer.component';
import { Box, Grid } from '@mui/material';
import { routes } from './routes/routes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    // loadDataToFirestore();
  }, []);
  return (
    <Grid
      container
      justifyContent="space-between"
      flexDirection="column"
      sx={{minHeight: "100vh"}}
    >
      <Box>
        <Routes>
          <Route path="/" element={<Header />} >
            {routes.map(route =>
              <Route path={route.path} element={route.element} key={route.path}/>
            )}
          </Route>
        </Routes>
      </Box>
      <Footer />
    </Grid>
  );
}

export default App;

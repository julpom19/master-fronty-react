import { Route, Routes } from 'react-router-dom';
import Header from './routes/header/header.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Category from './routes/category/category.component';
import Profile from './routes/profile/profile.component';
import Quiz from './routes/quiz/quiz.component';
import QuizResult from './routes/quiz-result/quiz-result.component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChangedListener } from './utils/firebase/firebase-auth.utils';
import { createUserDocumentFromAuth } from './utils/firebase/firebase-store.utils';
import { setCurrentUser } from './store/user/user.actions';
import Footer from './components/footer/footer.component';
import { Box, Grid } from '@mui/material';

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
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="result/:userId/:quizResultId" element={<QuizResult />} />
            <Route path=":categoryId" element={<Category />} />
            <Route path=":categoryId/:quizId" element={<Quiz />} />
          </Route>
        </Routes>
      </Box>
      <Footer />
    </Grid>
  );
}

export default App;

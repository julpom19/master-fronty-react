import './quiz.styles.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsByCategoryAndQuizAsync } from '../../store/questions/questions.actions';
import { selectQuestionsByQuiz } from '../../store/questions/questions.selectors';
import Question from '../../components/question/question.component';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { submitQuizResultAsync } from '../../store/quiz-result/quiz-result.actions';
import {
  selectIsQuizResultSubmitting,
  selectQuizResult,
  selectQuizResultError,
} from '../../store/quiz-result/quiz-result.selectors';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import { fetchQuizzesByCategoryAsync } from '../../store/quizzes/quizzes.actions';
import { Button, Container, Typography } from '@mui/material';
import { selectQuizById } from '../../store/quizzes/quizzes.selectors';
import { useCallbackPrompt } from '../../hooks/useCallbackPrompt';
import ConfirmQuitDialog from '../../components/confirm-quit-dialog.component';

const Quiz = () => {
  const { quizId, categoryId } = useParams();
  const [ userQuizAnswers, setUserQuizAnswers ] = useState([]);
  const [ isQuizResultDispatched, setIsQuizResultDispatched ] = useState(false);
  const [ currentQuestionNum, setCurrentQuestionNum ] = useState(1);
  const [ questions, setQuestions ] = useState([]);
  const [ preventPageLeave, setPreventPageLeave ] = useState(false);
  const dispatch = useDispatch();
  const questionsFromState = useSelector(state => selectQuestionsByQuiz(state, quizId));
  const currentUser = useSelector(selectCurrentUser);
  const isQuizResultSubmitting = useSelector(selectIsQuizResultSubmitting);
  const quizResult = useSelector(selectQuizResult);
  const quizResultError = useSelector(selectQuizResultError);
  const quiz = useSelector(state => selectQuizById(state, quizId));


  const navigate = useNavigate();

  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(preventPageLeave);

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId));
    dispatch(fetchCategoriesAsync());
    dispatch(fetchQuizzesByCategoryAsync(categoryId));
  }, []);

  useEffect(() => {
    setQuestions(questionsFromState.map(q => ({...q, selectedAnswerId: null})));
  }, [questionsFromState]);

  useEffect(() => {
    if(!isQuizResultSubmitting && isQuizResultDispatched) {
      setIsQuizResultDispatched(false);
      if(quizResultError) {
        //TODO: handle error
      } else {
        navigate(`/result/${currentUser.uid}/${quizResult.id}`);
      }
    }
  }, [isQuizResultSubmitting, isQuizResultDispatched]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setPreventPageLeave(false);

    if(questions.length != userQuizAnswers.length) {
      alert('Please, answer all questions to submit');
      return;
    }

    let quizResult = {
      quizId,
      categoryId,
      date: new Date().getTime(),
      answers: userQuizAnswers
    }

    setIsQuizResultDispatched(true);
    dispatch(submitQuizResultAsync(currentUser.uid, quizResult));
  }

  const answerOnChangeHandler = (event) => {
    const { name, value } = event.target;
    addUserQuizAnswer(name, value);
    addAnswerToQuestions(name, value);
    setPreventPageLeave(true);
  };

  const addUserQuizAnswer = (questionId, answerId) => {
    let previousAnswer = userQuizAnswers.find(a => a.questionId === questionId);
    if(previousAnswer) {
      setUserQuizAnswers(userQuizAnswers.map(a =>
        a.questionId === questionId ? {
          questionId,
          answerId
        } : a));
    } else {
      setUserQuizAnswers([...userQuizAnswers, {
        questionId,
        answerId
      }]);
    }
  };

  const addAnswerToQuestions = (questionId, answerId) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? {
        ...q,
        selectedAnswerId: answerId
      } : q));
  };

  const nextOnClickHandler = () => {
    setCurrentQuestionNum(currentQuestionNum + 1);
  };

  const backOnClickHandler = () => {
    setCurrentQuestionNum(currentQuestionNum - 1);
  };

  return (
    <Container>
      <Typography variant="h4" mt={2}>{quiz?.title} Quiz</Typography>
      <Typography variant="h5" mt={2} mb={2}>Question {currentQuestionNum} of {questions?.length}</Typography>
      <form >
        {
          questions[currentQuestionNum - 1] && <Question
            key={questions[currentQuestionNum - 1].id}
            question={questions[currentQuestionNum - 1]}
            answerOnChangeHandler={answerOnChangeHandler}
          />
        }
        <Button
          variant='contained'
          onClick={backOnClickHandler}
          sx={{marginRight: '20px'}}
          disabled={currentQuestionNum === 1}
        >
          BACK
        </Button>
        {
          currentQuestionNum === questions.length ? (
            <Button
              onClick={onSubmitHandler}
              variant='contained'
              disabled={userQuizAnswers.length < questions.length || isQuizResultSubmitting}
            >
              SUBMIT
            </Button>
          ) : (
            <Button
              variant='contained'
              onClick={nextOnClickHandler}
              disabled={currentQuestionNum > userQuizAnswers.length}
            >
              NEXT
            </Button>
          )
        }
      </form>
      <ConfirmQuitDialog
        showDialog={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
        />
    </Container>
  );
}

export default Quiz;
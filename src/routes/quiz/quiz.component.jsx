import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchQuestionsByCategoryAndQuizAsync,
  questionsByQuizErrorHandled,
} from '../../store/questions/questions.actions';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';
import { fetchQuizzesByCategoryAsync } from '../../store/quizzes/quizzes.actions';
import { submitQuizResultAsync } from '../../store/quiz-result/quiz-result.actions';
import {
  selectQuestionsByQuiz,
  selectQuestionsIsLoading,
  selectQuestionsLoadingError,
} from '../../store/questions/questions.selectors';
import {
  selectIsQuizResultSubmitting,
  selectQuizResult,
  selectQuizResultError,
} from '../../store/quiz-result/quiz-result.selectors';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { selectQuizById } from '../../store/quizzes/quizzes.selectors';
import { selectCategoryById } from '../../store/categories/categories.selectors';

import { useCallbackPrompt } from '../../hooks/useCallbackPrompt';
import { calculateCorrectAnswersAmount, getQuestionsAnswered } from '../../utils/questions.utils';
import { DBEntityNotFoundError } from '../../utils/errors.utils';

import { Button, Container, LinearProgress, Typography } from '@mui/material';
import Question from '../../components/question/question.component';
import ConfirmQuitDialog from '../../components/confirm-quit-dialog/confirm-quit-dialog.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

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
  const category = useSelector(state => selectCategoryById(state, categoryId));
  const isLoading = useSelector(selectQuestionsIsLoading);
  const error = useSelector(selectQuestionsLoadingError)

  const navigate = useNavigate();
  const location = useLocation();

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
        navigate(`/quiz-results/${currentUser.uid}/${quizResult.id}`);
      }
    }
  }, [isQuizResultSubmitting, isQuizResultDispatched]);

  useEffect(() => {
    if(!currentUser) {
      navigate('/auth', {replace: true, state: {from: location}});
    }
  }, [currentUser]);

  useEffect(() => {
    if(error && error.name === DBEntityNotFoundError.name) {
      navigate(`/${categoryId}`, {replace: true});
      dispatch(questionsByQuizErrorHandled());
    }
  },[error]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setPreventPageLeave(false);

    if(questions.length != userQuizAnswers.length) {
      alert('Please, answer all questions to submit');
      return;
    }

    const correctAnswersAmount = calculateCorrectAnswersAmount(getQuestionsAnswered(questions, userQuizAnswers));

    let quizResult = {
      quizId,
      categoryId,
      date: new Date().getTime(),
      answers: userQuizAnswers,
      quizTitle: quiz.title,
      categoryTitle: category.title,
      correctAnswersAmount
    };

    setIsQuizResultDispatched(true);
    dispatch(submitQuizResultAsync(currentUser.uid, quizResult));
  };

  const answerOnChangeHandler = useCallback((event) => {
    const { name, value } = event.target;
    addUserQuizAnswer(name, value);
    addAnswerToQuestions(name, value);
    setPreventPageLeave(true);
  }, [questions, userQuizAnswers]);

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
    <>
      { isQuizResultSubmitting && <LinearProgress /> }
      <Container>
        {
          isLoading ? <LoadingSpinner /> :
            <>
              <Typography variant="h4" mt={2}>{quiz?.title} Quiz</Typography>
              <Typography variant="h5" mt={2} mb={2}>Question {currentQuestionNum} of {questions?.length}</Typography>
              <form>
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
            </>
        }
      </Container>
    </>
  );
}

export default Quiz;
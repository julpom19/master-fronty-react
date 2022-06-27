import './quiz-result.styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizResult } from '../../store/quiz-result/quiz-result.selectors';
import { useEffect, useState } from 'react';
import { fetchQuizResultAsync } from '../../store/quiz-result/quiz-result.actions';
import { selectQuizById } from '../../store/quizzes/quizzes.selectors';
import { selectQuestionsByQuiz } from '../../store/questions/questions.selectors';
import { fetchQuestionsByCategoryAndQuizAsync } from '../../store/questions/questions.actions';
import { fetchQuizzesByCategoryAsync } from '../../store/quizzes/quizzes.actions';
import QuestionAnswered from '../../components/question-answered/question-answered.component';
import { getQuestionsAnswered } from '../../utils/questions.utils';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ScoreStars from '../../components/score-stars.component';

const QuizResult = () => {
  const quizResult = useSelector(selectQuizResult);
  const { userId, quizResultId } = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector(state => selectQuizById(state, quizResult?.quizId));
  const questions = useSelector(state => selectQuestionsByQuiz(state, quizResult?.quizId));
  const [ questionsAnswered, setQuestionsAnswered ] = useState([]);

  useEffect(() => {
    if(!quizResult?.id) {
      dispatch(fetchQuizResultAsync(userId, quizResultId));
    }
  }, []);

  useEffect(() => {
    if(quizResult?.id) {
      if(!quiz) {
        dispatch(fetchQuizzesByCategoryAsync(quizResult.categoryId));
      }
      if(questions.length === 0) {
        dispatch(fetchQuestionsByCategoryAndQuizAsync(quizResult.categoryId, quizResult.quizId));
      }
    }
  }, [quizResult]);

  useEffect(() => {
    if(quizResult?.id && questions.length > 0) {
      setQuestionsAnswered(getQuestionsAnswered(questions, quizResult.answers));
    }
  }, [questions, quizResult]);

  return (
    <Container>
      {
        questionsAnswered.length > 0 && (
          <>
            <Grid container justifyContent="space-between" alignContent="center">
              <Grid item>
                <Typography variant="h3" mt={3}>{quiz.title} Quiz Result</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" mt={3}>Score: {quizResult?.correctAnswersAmount} of {questionsAnswered.length}</Typography>
                <ScoreStars correctAmount={quizResult?.correctAnswersAmount} totalAmount={questionsAnswered.length} />
              </Grid>
            </Grid>

            {
              questionsAnswered.map((q, index) =>
                <QuestionAnswered
                  key={q.id}
                  questionAnswered={q}
                  questionIndex={index}
                />)
            }
          </>
        )
      }
    </Container>
  );
}

export default QuizResult;
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
import Question from '../../components/question/question.component';
import QuestionAnswered from '../../components/question-answered/question-answered.component';
import { getQuestionsAnswered, getQuizAnswered } from '../../utils/questions.utils';

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
  }, [questions, quizResult])

  return (
    <div>
      {
        quiz && questions && (
          <>
            <h3>RESULT Quiz {quiz.title}</h3>
            <ul>
              {
                questionsAnswered.map(q =>
                  <QuestionAnswered
                    key={q.id}
                    questionAnswered={q}
                  />)
              }
            </ul>
          </>
        )
      }
    </div>
  );
}

export default QuizResult;
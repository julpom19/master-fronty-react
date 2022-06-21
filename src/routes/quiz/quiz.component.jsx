import './quiz.styles.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

const Quiz = () => {
  const { quizId, categoryId } = useParams();
  const [ userQuizAnswers, setUserQuizAnswers ] = useState([]);
  const [ isQuizResultDispatched, setIsQuizResultDispatched ] = useState(false);
  const dispatch = useDispatch();
  const questions = useSelector(state => selectQuestionsByQuiz(state, quizId));
  const currentUser = useSelector(selectCurrentUser);
  const isQuizResultSubmitting = useSelector(selectIsQuizResultSubmitting);
  const quizResult = useSelector(selectQuizResult);
  const quizResultError = useSelector(selectQuizResultError);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId));
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    setUserQuizAnswers([...userQuizAnswers, {
      questionId: name,
      answerId: value
    }]);
  }

  return (
    <div>
      <h3>Quiz {quizId}</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {
            questions.map(q =>
              <Question
                key={q.id}
                question={q}
                answerOnChangeHandler={answerOnChangeHandler}
              />)
          }
        </ul>
        <button type='submit'>
          SUBMIT
        </button>
      </form>
      <div>
        <Link to={`/${categoryId}`}>
          <h3>CANCEL</h3>
        </Link>
        {/*<Link to={`/result/${quizId}`}>*/}
        {/*  <h3>SUBMIT</h3>*/}
        {/*</Link>*/}
      </div>
    </div>
  );
}

export default Quiz;
import './quiz.styles.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsByCategoryAndQuizAsync } from '../../store/questions/questions.actions';
import { selectQuestionsByQuiz } from '../../store/questions/questions.selectors';
import Question from '../../components/question/question.component';

const Quiz = () => {
  const { quizId, categoryId } = useParams();
  const [ userQuizAnswers, setUserQuizAnswers ] = useState([]);
  const dispatch = useDispatch();
  const questions = useSelector(state => selectQuestionsByQuiz(state, quizId));

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('userQuizAnswers ', userQuizAnswers);
  }

  const answerOnChangeHandler = (event) => {
    console.log('event = ', event);
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
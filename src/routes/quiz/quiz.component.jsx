import './quiz.styles.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsByCategoryAndQuizAsync } from '../../store/questions/questions.actions';
import { selectQuestionsByQuiz } from '../../store/questions/questions.selectors';
import Question from '../../components/question/question.component';
import { getQuizResultsByUser, submitQuizResult } from '../../utils/firebase/firebase-store.utils';
import { selectCurrentUser } from '../../store/user/user.selectors';

const Quiz = () => {
  const { quizId, categoryId } = useParams();
  const [ userQuizAnswers, setUserQuizAnswers ] = useState([]);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const dispatch = useDispatch();
  const questions = useSelector(state => selectQuestionsByQuiz(state, quizId));
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(questions.length != userQuizAnswers.length) {
      alert('Please, answer all questions to submit');
      return;
    }

    const quizResult = {
      quiz_id: quizId,
      date: new Date().getTime(),
      answers: userQuizAnswers
    }

    // console.log(currentUser);
    try {
      setIsSubmitting(true);
      await submitQuizResult(currentUser.uid, quizResult);
    } catch (error) {
      alert(error); //TODO: add error handling
    } finally {
      setIsSubmitting(false);
    }
  }

  const answerOnChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserQuizAnswers([...userQuizAnswers, {
      question_id: name,
      answer_id: value
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
import './quiz-result.styles';
import { useParams } from 'react-router-dom';

const QuizResult = () => {
  const { quizResultId } = useParams();
  return (
    <h3>RESULT Quiz {quizResultId}</h3>
  );
}

export default QuizResult;
import { useNavigate } from 'react-router-dom';
import {
  Card, CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import './quiz-card.styles.scss';

const QuizCard = ({ quiz, categoryId }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${categoryId}/${quiz.id}`);
  }
  return (
    <Card
      onClick={handleCardClick}
      className='category-card'
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">
            {quiz.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizCard;

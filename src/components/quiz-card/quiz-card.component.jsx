import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';

const QuizCard = ({ quiz, categoryId }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${categoryId}/${quiz.id}`);
  };

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

export default memo(QuizCard);

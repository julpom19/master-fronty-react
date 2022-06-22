import { useNavigate } from 'react-router-dom';
import {
  Card, CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import './category-card.styles.scss';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${category.id}`);
  }
  return (
    <Card
      onClick={handleCardClick}
      className='category-card'
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">
            {category.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;

import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
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
      <div>
        {category.title}
      </div>
    </Card>
  );
};

export default CategoryCard;

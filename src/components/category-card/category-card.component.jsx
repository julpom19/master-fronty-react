import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import './category-card.styles.scss';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${category.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className='category-card'
      elevation={6}
      sx={{padding: "0 20px"}}
    >
      <CardActionArea sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: 150}}>
        <CardContent sx={{display: "flex",alignItems: "center"}}>
          <img src={category.icon} alt={category.title}/>
          <Typography variant="h4" className="card-title" sx={{fontWeight: "bold", marginLeft: "20px"}}>
            {category.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(CategoryCard);

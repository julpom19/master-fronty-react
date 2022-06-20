import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/${category.id}`}>
      <div>
        {category.title}
      </div>
    </Link>
  );
};

export default CategoryCard;

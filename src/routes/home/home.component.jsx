import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { selectCategories } from '../../store/categories/categories.selectors';

import CategoryCard from '../../components/category-card/category-card.component';

import './home.styles.scss';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categories.actions';


const Home = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  const renderedCategories = categories.map(category => (
    <li key={category.id}>
      <CategoryCard category={category} />
    </li>
  ));
  return (
    <div>
      <ul>
        {renderedCategories}
      </ul>
    </div>
  );
}

export default Home;
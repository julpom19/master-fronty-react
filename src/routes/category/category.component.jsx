import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './category.styles.scss';
import { fetchQuizzesByCategoryAsync } from '../../store/quizzes/quizzes.actions';
import { selectQuizzesByCategory } from '../../store/quizzes/quizzes.selectors';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(state => selectQuizzesByCategory(state, categoryId));
  console.log('quizzes ', quizzes)

  useEffect(() => {
    dispatch(fetchQuizzesByCategoryAsync(categoryId));
  }, []);

  const quizzesList = quizzes && quizzes.map(q => (
    <li key={q.id}>
      <Link to={`/${categoryId}/${q.id}`}>
        Link to {q.title}
      </Link>
    </li>
  ));

  return (
    <div>
      <h3>{categoryId}</h3>
      <ul>
        {quizzesList}
      </ul>
      {/*<Link to={`/${categoryId}/${Math.floor(Math.random() * 10)}`}>*/}
      {/*  Link to test with random index*/}
      {/*</Link>*/}
    </div>
  );
}

export default Category;
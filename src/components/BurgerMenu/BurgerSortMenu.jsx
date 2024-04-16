import React from 'react';
import styles from './BurgerSortMenu.module.scss';
import { Link } from 'react-router-dom';

const BurgerSortMenu = ({ categories, setSelectedCategory }) => {
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className={styles.burgerSortMenu}>
      <ul>
        {categories.map((categoryName, index) => (
          <li key={index} className={styles.categoryItem}>
            <Link to={`/?category=${encodeURIComponent(categoryName)}`} onClick={() => handleCategoryClick(categoryName)}>{categoryName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgerSortMenu;

// SortMenu.jsx
import React, { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom'; // Importer Link fra react-router-dom

const SortMenu = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const entries = await client.getEntries({ content_type: 'category' });
        const categoryNames = entries.items.map(item => {
          const names = [];
          for (let i = 1; i <= 7; i++) {
            if (item.fields[`categoryName${i}`]) {
              names.push(item.fields[`categoryName${i}`]);
            }
          }
          return names;
        });

        const flattenedCategoryNames = categoryNames.flat();
        setCategories(["Alle", ...flattenedCategoryNames]);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // Opdater selectedCategory
  };

  return (
    <div className={styles.sortMenu}>
      {categories.map((categoryName, index) => (
        <div key={index} className={styles.categoryLinks}>
          {/* Brug Link til at navigere tilbage til hovedsiden med den valgte kategori */}
          <Link to={`/?category=${encodeURIComponent(categoryName)}`} onClick={() => handleCategoryClick(categoryName)}>{categoryName}</Link>
        </div>
      ))}
    </div>
  );
};

export default SortMenu;

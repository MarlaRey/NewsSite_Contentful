import React, { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client';
import styles from './Navigation.module.scss';

const SortMenu = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const entries = await client.getEntries({ content_type: 'category' });
        const categoryNames = entries.items.map(item => {
          // Lav en array med alle kategorinavne fra fields
          const names = [];
          for (let i = 1; i <= 7; i++) { // Antaget at du har 7 kategorier
            if (item.fields[`categoryName${i}`]) {
              names.push(item.fields[`categoryName${i}`]);
            }
          }
          return names;
        });
        // Flad arrayet af, da vi ønsker at have alle kategorinavne på samme niveau
        const flattenedCategoryNames = categoryNames.flat();
        console.log(flattenedCategoryNames);
        setCategories(flattenedCategoryNames);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // Opdater valgt kategori i Main
  };

  return (
    <div className={styles.sortMenu}>
      {categories.map((categoryName, index) => (
        <div key={index} className={styles.categoryLinks}>
          <button
            onClick={() => handleCategoryClick(categoryName)}
          >
            {categoryName}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SortMenu;

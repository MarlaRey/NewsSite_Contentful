import React, { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

const SortMenu = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [logoUrl, setLogoUrl] = useState(null);

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

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const entries = await client.getEntries();
        const logoUrl = entries.items[0]?.fields.logo.fields.file.url;
        setLogoUrl(logoUrl);
        console.log(logoUrl);
      } catch (error) {
        console.log("Error fetching logo:", error);
      }
    };
    
    fetchLogo();
  }, []);
  

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className={styles.sortMenu}>
      <div className={styles.logo}>
        {logoUrl && <img src={logoUrl} alt="Logo" />}
      </div>
      <div className={styles.theMenu}>
        {categories.map((categoryName, index) => (
          <div key={index} className={styles.categoryLinks}>
            <Link to={`/?category=${encodeURIComponent(categoryName)}`} onClick={() => handleCategoryClick(categoryName)}>{categoryName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortMenu;

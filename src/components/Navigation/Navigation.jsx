import React, { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client'; // Importer klient til kommunikation med server
import styles from './Navigation.module.scss'; // Importer CSS-moduler til styling
import { Link } from 'react-router-dom'; // Importer Link-komponenten fra React Router
import BurgerMenu from '../BurgerMenu/BurgerMenu'; // Importer burgermenukomponenten
import BurgerSortMenu from '../BurgerMenu/BurgerSortMenu'; // Importer burgerSortMenukomponenten

const SortMenu = ({ setSelectedCategory }) => {
  // Tilstande til at gemme kategorier, logo-URL og burgermenuens åbne/lukke-tilstand
  const [categories, setCategories] = useState([]);
  const [logoUrl, setLogoUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Effekt-hook til at hente kategorier fra serveren ved komponentmontage
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

    fetchCategories(); // Kald funktionen til at hente kategorier ved komponentmontage
  }, []);

  // Effekt-hook til at hente logo fra serveren ved komponentmontage
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const entries = await client.getEntries();
        const logoUrl = entries.items[10]?.fields.logo.fields.file.url;
        setLogoUrl(logoUrl); // Opdater logo-URL'en i tilstanden
      } catch (error) {
        console.log("Error fetching logo:", error);
      }
    };
    
    fetchLogo(); // Kald funktionen til at hente logo ved komponentmontage
  }, []);

  // Funktion til at håndtere klik på en kategori
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  
  // Funktion til at skifte tilstanden for burgermenuen
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BurgerMenu isOpen={isOpen} toggleMenu={toggleMenu} /> {/* Burgermenukomponenten */}
      {isOpen && <BurgerSortMenu categories={categories} setSelectedCategory={setSelectedCategory} />} {/* BurgerSortMenukomponenten */}
      <div className={styles.sortMenu}>
        <div className={styles.logo}>
          {logoUrl && <img src={logoUrl} alt="Logo" />}
        </div>
        <div className={styles.theMenu}>
          {/* Mapping over kategorier for at vise links */}
          {categories.map((categoryName, index) => (
            <div key={index} className={styles.categoryLinks}>
              {/* Link til kategori med event-handler for klik */}
              <Link to={`/?category=${encodeURIComponent(categoryName)}`} onClick={() => handleCategoryClick(categoryName)}>{categoryName}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortMenu;

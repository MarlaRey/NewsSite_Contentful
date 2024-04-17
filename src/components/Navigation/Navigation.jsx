import React, { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client'; // Importer klient til kommunikation med server
import styles from './Navigation.module.scss'; 
import { Link } from 'react-router-dom'; // Importer Link-komponenten fra React Router
import BurgerMenu from '../BurgerMenu/BurgerMenu'; 
import BurgerSortMenu from '../BurgerMenu/BurgerSortMenu'; 

//modtager setSelectedCategory funktionen fra Main.jsx og sender den med som en anvendelig prop 
const SortMenu = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [logoUrl, setLogoUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Effekt-hook til at hente kategorier fra serveren ved etablering af komponent
  useEffect(() => {
    const fetchCategories = async () => {
      try {
           // Hent indgange af typen 'category' fra serveren
        const entries = await client.getEntries({ content_type: 'category' });
        // Map hver indgang for at hente kategorinavne
        const categoryNames = entries.items.map(item => {
          const names = [];
          //gennmgå alle kategorinavns-felter og tilføj kategorinavne til et nyt array 'names'
          for (let i = 1; i <= 7; i++) {
            if (item.fields[`categoryName${i}`]) {
              names.push(item.fields[`categoryName${i}`]);
            }
          }
          return names;
        });
        //flat(), fjerner alle under-arrays og kombinerer deres elementer i et enkelt array uden underfelter, som er lettere at arbejde med.
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

  // Funktion til at håndtere klik på en kategori. Når en kategori i navigationsmenuen klikkes, udløses handleCategoryClick-funktionen med categoryName som parameter. Den valgte kategori opdateres derefter i komponentens tilstand ved hjælp af setSelectedCategory(categoryName). Dette resulterer i en ny rendering af komponenten, hvor den valgte kategori ændres, og eventuelle afhængige dele af UI'en opdateres i overensstemmelse hermed. 
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  
  // Funktion til at skifte tilstanden for burgermenuen. Hvis isOpen er true, bliver det false, og hvis isOpen er false, bliver det true.
  const toggleMenu = () => {
    //opdaterer tilstanden af burgermenuen til at være det modsatte af dens tidligere tilstand.
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BurgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && <BurgerSortMenu categories={categories} setSelectedCategory={setSelectedCategory} />} {/* Betinget rendering: Hvis isOpen er true, betyder det, at burgermenuen er åben. I dette tilfælde renderes BurgerSortMenu komponenten.BurgerSortMenu komponenten modtager to props: categories og setSelectedCategory.  */}
      <div className={styles.sortMenu}>

        <div className={styles.theMenu}>
        <div className={styles.logo}>
          {logoUrl && <img src={logoUrl} alt="Logo" />} {/*kort betinget rendering, der tjekker om logoUrl har en værdi. Hvis logoUrl er sand, renderes <img>-elementet med logoet. Hvis logoUrl er falsk (f.eks. null eller undefined), renderes intet. */}
        </div>
          {/* Mapping over categories arrayet. For hver kategori i arrayet udføres handlingen at putte hvert kategorilink ind i en div med et link */}
          {categories.map((categoryName, index) => (
            <div key={index} className={styles.categoryLinks}>
              {/* Linket linker til den specifikke kategori med event-handler for klik. Linket fører til den aktuelle side med et queryparameter der indeholder navnet på den valgte kategori */}
              <Link to={`/?category=${encodeURIComponent(categoryName)}`} onClick={() => handleCategoryClick(categoryName)}>{categoryName}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortMenu;

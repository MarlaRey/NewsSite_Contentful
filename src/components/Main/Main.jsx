import React, { useState } from 'react';
import BlogList from '../Blog/BlogList'; // Importér BlogList-komponenten
import SortMenu from '../Navigation/Navigation'; // Importér SortMenu-komponenten
import { Footer } from '../Footer/Footer'; // Importér Footer-komponenten

export const Main = () => {
    // Opretter en state til at holde styr på den valgte kategori
    const [selectedCategory, setSelectedCategory] = useState("Alle");

    return (
      <div>
        {/* Rendér SortMenu-komponenten og send setSelectedCategory som prop */}
        <SortMenu setSelectedCategory={setSelectedCategory} />
        {/* Rendér BlogList-komponenten og send selectedCategory som prop */}
        <BlogList categoryList={selectedCategory} />
        {/* Rendér Footer-komponenten */}
        <Footer></Footer>
      </div>
    );
};

export default Main;

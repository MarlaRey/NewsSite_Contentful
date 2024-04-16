import React, { useState } from 'react';
import styles from './Main.module.scss';
import BlogList from '../Blog/BlogList';
import SortMenu from '../Navigation/Navigation';
import BlogGrid from '../Blog/BlogGrid';
import { Footer } from '../Footer/Footer';


export const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState("Alle");

    return (
      <div>
        <SortMenu setSelectedCategory={setSelectedCategory} />
        <BlogList categoryList={selectedCategory} />
        <Footer></Footer>
      </div>
    );
};

export default Main;
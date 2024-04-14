import React, { useState } from 'react';
import styles from './Main.module.scss';
import BlogList from '../Blog/BlogList';
import SortMenu from '../Navigation/Navigation';


export const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState("Alle");

    return (
      <div>
        <SortMenu setSelectedCategory={setSelectedCategory} />
        <BlogList categoryList={selectedCategory} />
      </div>
    );
};

export default Main;
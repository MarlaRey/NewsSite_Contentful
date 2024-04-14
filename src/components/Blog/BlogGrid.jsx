import React from 'react';
import BlogList from './BlogList'; // Importer BlogList-komponenten
import styles from './BlogGrid.module.scss'; // Importer din SCSS-fil med grid-styling

const BlogGrid = ({ categoryList }) => {
 

  return (
    <div className={styles.parent}>
      {repeatPattern(9).map((index) => (
        <div key={index} className={`${styles['div' + (index + 1)]} ${styles.blogArea}`}>
          <BlogList categoryList={categoryList} />
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;

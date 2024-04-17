import React from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from '../GetAllEntries/GetAllEntries';
import styles from './BlogList.module.scss';

//definerer en funktionel komponent kaldet BlogList, der modtager en prop kaldet categoryList. Denne prop indeholder navnet på den valgte kategori.
const BlogList = ({ categoryList }) => {
  const allBlogPosts = useBlogPosts(); // Hent alle blogposter fra Contentful

  //funktion der forkorter 'text', hvis den er længere end en vis længde.
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };
  const filteredBlogPosts = allBlogPosts.filter(post => {
    // Hvis kategorien er "Alle" eller hvis categoryList ikke er defineret, vises alle blogposter
    if (!categoryList || categoryList === "Alle") {
      return true;
    }
    // Sikre, at post.fields.categoryList er defineret før filtrering
    if (post.fields.categoryList && post.fields.categoryList.includes(categoryList)) {
      return true;
    }
    return false;
  });

  return (
    <div className={styles.blogGrid}>
      {/*mapper over filteredBlogPosts og opretter container og unik nøgle til hver blogpost.Angiver derefter gridArea-egenskaben til hver*/}
      {filteredBlogPosts.map((post, index) => (
    
        <div className={styles.blogPost} key={post.sys.id} style={{ gridArea: getGridArea(index) }} data-grid-area={getGridArea(index)}>

          <h2>{post.fields.title}</h2>

          {/* Dette er en IIFE (Immediately Invoked Function Expression). Viser kun 'text' hvis gridArea er 'a', 'f' eller 'g' */}
          {(() => {
            const gridArea = getGridArea(index);
            if (gridArea === 'a' || gridArea === 'f' || gridArea === 'g') {
              return <p className={styles.blogText}>{truncateText(post.fields.text, 150)}</p>;
            } else {
              return null;
            }
          })()}

          <p className={styles.red}>Dato: {post.fields.date} - Af: {post.fields.author}</p>

          <div className={styles.imageContainer}>
            {post.fields.media && post.fields.media.fields.file && (
              <img src={post.fields.media.fields.file.url} alt={post.fields.title} />
            )}
          </div>

          <p className={styles.categories}>{post.fields.categoryList && post.fields.categoryList.join(' ')}</p>

          <Link to={`/blogDetails/${post.sys.id}`} className={styles.readMore}>Read more</Link>
        </div>
      ))}
    </div>
  );
};


// Denne funktion bruges til at returnere gridArea baseret på indeksen af blogposten. 
const getGridArea = (index) => {
  switch (index) {
    case 0:
      return 'a';
    case 1:
      return 'b';
    case 2:
      return 'c';
    case 3:
      return 'd';
    case 4:
      return 'e';
    case 5:
      return 'f';
    case 6:
      return 'g';
    case 7:
      return 'h';
    case 8:
      return 'i';
  }
};

export default BlogList;

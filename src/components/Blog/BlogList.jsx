import React from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from '../GetAllEntries/GetAllEntries';
import styles from './BlogList.module.scss';

const BlogList = ({ categoryList }) => {
  const allBlogPosts = useBlogPosts(); // Hent alle blogposter

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };
  const filteredBlogPosts = allBlogPosts.filter(post => {
    // Hvis kategorien er "Alle", vises alle blogposter
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
      {filteredBlogPosts.map((post, index) => (
        <div className={styles.blogPost} key={post.sys.id} style={{ gridArea: getGridArea(index) }}>
          <h2>{post.fields.title}</h2>
          {/* Viser kun tekst hvis gridArea er 'a', 'f' eller 'g' */}
          {(() => {
            const gridArea = getGridArea(index);
            if (gridArea === 'a' || gridArea === 'f' || gridArea === 'g') {
              return <p>{truncateText(post.fields.text, 150)}</p>;
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
          <p>{post.fields.categoryList}</p>
          <Link to={`/blogDetails/${post.sys.id}`} className={styles.readMore}>Read more</Link>
        </div>
      ))}
    </div>
  );
};


// Funktion til at returnere gridArea baseret på index
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

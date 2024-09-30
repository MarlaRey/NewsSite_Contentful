import React from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from '../GetAllEntries/GetAllEntries';
import styles from './BlogList.module.scss';

const BlogList = ({ categoryList }) => {
  const allBlogPosts = useBlogPosts(); // Hent alle blogposter fra Contentful

  // Filtrér ud logo og kategori elementer baseret på deres Content Type
  const filteredOutUnwantedPosts = allBlogPosts.filter(post => {
    const contentType = post.sys.contentType.sys.id; // Antager at contentType kan findes her
    return contentType !== 'logo' && contentType !== 'category';
  });

  // Funktion der forkorter 'text', hvis den er længere end en vis længde.
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const filteredBlogPosts = filteredOutUnwantedPosts.filter(post => {
    // Hvis kategorien er "Alle" eller hvis categoryList ikke er defineret, vises alle blogposter
    if (!categoryList || categoryList === "Alle") {
      return true;
    }
    // Sikrer at post.fields.categoryList er defineret før filtrering
    if (post.fields.categoryList && post.fields.categoryList.includes(categoryList)) {
      return true;
    }
    return false;
  });

  return (
    <div className={styles.blogGrid}>
      {/* Mapper over filteredBlogPosts og opretter container og unik nøgle til hver blogpost. Angiver derefter gridArea-egenskaben til hver */}
      {filteredBlogPosts.map((post, index) => (
        <Link to={`/blogDetails/${post.sys.id}`} key={post.sys.id} className={styles.blogPost} style={{ gridArea: getGridArea(index) }} data-grid-area={getGridArea(index)}>
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

          <p className={styles.red}>{post.fields.date} - {post.fields.author}</p>

          <div className={styles.imageContainer}>
            {post.fields.media && post.fields.media.fields.file && (
              <img src={post.fields.media.fields.file.url} alt={post.fields.title} />
            )}
          </div>

          <p className={styles.categories}>{post.fields.categoryList && post.fields.categoryList.join(' | ')}</p>

          {/* <Link to={`/blogDetails/${post.sys.id}`} className={styles.readMore}>Read more</Link> */}
        </Link>
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
    default:
      return null;
  }
};

export default BlogList;

import React from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from '../GetAllEntries/GetAllEntries';
import styles from './BlogList.module.scss';

const BlogList = ({ categoryList }) => {
  const allBlogPosts = useBlogPosts(); // Hent alle blogposter
  

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
    <div>
      {/* Vis de filtrerede blogposter */}
      {filteredBlogPosts.map((post) => (
        <div className="blog-post" key={post.sys.id}>
          {post.fields.media && post.fields.media.fields.file && (
            <img src={post.fields.media.fields.file.url} alt={post.fields.title} />
          )}
          <p>Date: {post.fields.date}</p>
          <p>Author: {post.fields.author}</p>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.text}</p>
          <p>{post.fields.categoryList}</p>
          <Link to={`/blogDetails/${post.sys.id}`} className='readMore'>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
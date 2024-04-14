// BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../ContentfulClient/Client';
import SortMenu from '../Navigation/Navigation';
import BlogList from './BlogList'; // Importer BlogList-komponenten

const BlogDetails = ({ setSelectedCategory, selectedCategory }) => {
  const [singleBlogPost, setSingleBlogPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getEntryById = async () => {
      try {
        const entry = await client.getEntry(id);
        setSingleBlogPost(entry);
      } catch (error) {
        console.log(error);
      }
    };
    getEntryById();
  }, [id]);

  // Lyt efter ændringer i selectedCategory og opdater blogpostene
  useEffect(() => {
    if (singleBlogPost) {
      setSelectedCategory(singleBlogPost.fields.categoryList); // Opdater selectedCategory med kategorien fra den aktuelle blogpost
    }
  }, [singleBlogPost, setSelectedCategory]);

  return (
    <div>
      <SortMenu setSelectedCategory={setSelectedCategory} />
      {singleBlogPost && (
        <div className="blog-post" key={singleBlogPost.sys.id}>
          {singleBlogPost.fields.media && singleBlogPost.fields.media.fields.file && (
            <img src={singleBlogPost.fields.media.fields.file.url} alt={singleBlogPost.fields.title} />
          )}
          <p>Date: {singleBlogPost.fields.date}</p>
          <p>Author: {singleBlogPost.fields.author}</p>
          <h2>{singleBlogPost.fields.title}</h2>
          <p>{singleBlogPost.fields.text}</p>
          <p>{singleBlogPost.fields.categoryList}</p>
        </div>
      )}
      <BlogList categoryList={selectedCategory} /> {/* Pass categoryList som prop til BlogList */}
    </div>
  );
};

export default BlogDetails;

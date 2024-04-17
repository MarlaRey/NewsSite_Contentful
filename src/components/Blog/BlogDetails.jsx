// BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../ContentfulClient/Client';
import SortMenu from '../Navigation/Navigation';
import BlogList from './BlogList'; // Importer BlogList-komponenten
import styles from './BlogDetails.module.scss';
import { Footer } from '../Footer/Footer';

const BlogDetails = ({ setSelectedCategory, selectedCategory }) => {
  const [singleBlogPost, setSingleBlogPost] = useState(null);
  //Dette bruger useParams hook til at hente id'en for den aktuelle blogpost fra URL'en.
  const { id } = useParams();
// henter blogpostdata fra Contentful ved hjælp af id'en.
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
        <div className={styles.blogPost} key={singleBlogPost.sys.id}>
          {singleBlogPost.fields.media && singleBlogPost.fields.media.fields.file && (
            <img src={singleBlogPost.fields.media.fields.file.url} alt={singleBlogPost.fields.title} />
          )}
          <div className={styles.text}>
          <h2>{singleBlogPost.fields.title}</h2>
          <p>Date: {singleBlogPost.fields.date} Af:{singleBlogPost.fields.author}</p>
      
          
          <p>{singleBlogPost.fields.text}</p>
          <p>{singleBlogPost.fields.categoryList && singleBlogPost.fields.categoryList.join(' ')}</p>
          </div>
        </div>
      )}
      <BlogList categoryList={selectedCategory} /> {/* Videregiv categoryList som prop til BlogList */}
      <Footer></Footer>
    </div>
  );
};

export default BlogDetails;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../ContentfulClient/Client';

const BlogDetails = () => {
  const [singleBlogPost, setSingleBlogPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getEntryById = async () => {
      try {
        const entry = await client.getEntry(id);
        console.log(entry);
        setSingleBlogPost(entry);
      } catch (error) {
        console.log(error);
      }
    };
    getEntryById();
  }, [id]);

  console.log(singleBlogPost);

  return (
    <div>
      <Link to="/blogList">Back to headlines</Link>
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
    </div>
  );
};

export default BlogDetails;

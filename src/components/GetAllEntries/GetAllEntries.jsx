// BlogService.js
import { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client';

const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const entries = await client.getEntries();
        setBlogPosts(entries.items);
      } catch (error) {
        console.log("Error fetching entries:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  return blogPosts;
};

export default useBlogPosts;

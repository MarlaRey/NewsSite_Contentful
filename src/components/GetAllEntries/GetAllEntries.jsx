import { useEffect, useState } from 'react';
import client from '../ContentfulClient/Client';

const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    //asynkron funktion der henter blogindlæg fra contentful ved hjælp af APIkey fra client
    const fetchBlogPosts = async () => {
      try {
        const entries = await client.getEntries();
        // Når blogindlæggene er blevet hentet fra Contentful, opdateres tilstanden blogPosts med disse indlæg ved hjælp af setBlogPosts-funktionen. entries.items indeholder selve indlæggene.
        setBlogPosts(entries.items);
      } catch (error) {
        console.log("Error fetching entries:", error);
      }
    };
    fetchBlogPosts();
    //afhængighedsarrayet er tomt, hvilket betyder handlingen kun køres 1 gang, når komponentet først monteres:
  }, []);
// Til sidst returneres blogPosts-tilstanden. Dette gør det muligt for komponenter at bruge denne hook til at få adgang til blogindlæggene, når den er brugt.
  return blogPosts;
};

export default useBlogPosts;

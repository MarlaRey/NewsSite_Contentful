import React, { useState, useEffect } from 'react';
import styles from './News.module.scss';
import client from '../ContentfulClient/Client';


export const News = () => {
    const [author, setAuthor] = useState('');

    useEffect(() => {
      const entryId = import.meta.env.VITE_CONTENTFUL_ENTRY_ID; 
  
      client.getEntry(entryId)
          .then((entry) => {
            console.log(entry);
              setAuthor(entry.fields.author);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }, []);
    return (
        <>
            <p> {author}</p>
        </>
    );
};
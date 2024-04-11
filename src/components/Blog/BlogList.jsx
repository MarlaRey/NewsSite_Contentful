import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../ContentfulClient/Client';


const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);



    useEffect(() => {
        const getAllEntries = async () => {
            try {
                const entries = await client.getEntries();
                console.log(entries);
                setBlogPosts(entries.items);
            } catch (error) {
                console.log("Error fetching entries:", error);
            }
        };
        getAllEntries();
    }, []);

    return (
        <div>
            {blogPosts.map((post) => (
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

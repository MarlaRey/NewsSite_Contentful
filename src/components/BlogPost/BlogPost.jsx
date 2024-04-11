import React from 'react';

function BlogPost({ title, content, author, date, categories, image }) {
    return (
        <div className="blog-post">
            <img src={image} alt="Blog post" />
            <p>Date: {date}</p>
            <p>Author: {author}</p>
            <h2>{title}</h2>
            <p>{content}</p>

            <p>Categories: {categories.join(', ')}</p>

        </div>
    );
}

export default BlogPost;
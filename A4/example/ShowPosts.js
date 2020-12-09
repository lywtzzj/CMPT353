import React from 'react';
import './ShowPosts.css';

export const ShowPosts = ({get}) => {

return (

        <>
        {get.map(post => (

            <div className="container">

                <h3> id: {post.id} </h3>
                <h3> text: {post.text} </h3>
                <h3> user: {post.username} </h3>
                <h3> time: {post.time} </h3>

            </div>

        ))}

        </>
);


}

 
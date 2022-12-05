import React, { useState } from 'react'
import Carousel from '../../Carousel';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState();
  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      >
        <span>
          {(post.content+ "\n" + post.at + "\n on " +post.date ).length < 60
            ? (post.content+ "\n" + post.at + "\n on " +post.date )
            : readMore
            ? (post.content+ "\n" + post.at + "\n on " +post.date ) + " "
            : (post.content+ "\n" + post.at + "\n on " +post.date ).slice(0, 60) + "  ..."}
        </span>
        {(post.content+ "\n" + post.at + "\n on " +post.date ).length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? "Hide Content" : "Read More"}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody

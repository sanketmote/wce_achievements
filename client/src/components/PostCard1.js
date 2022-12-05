import React from 'react';
import CardBody from "./home/post_card1/CardBody";
import CardFooter from "./home/post_card1/CardFooter";
import CardHeader from "./home/post_card1/CardHeader";
import Comments from './home/Comments';
import VerifyButton from './VerifyButton';
import InputComment from "./home/InputComment";


const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-3 outer-shadow">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />

      <Comments post={post} />
      <VerifyButton post={post} />
    </div>
  );
};

export default PostCard

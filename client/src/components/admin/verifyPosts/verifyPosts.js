import { makeRequest } from "../../../axios";
import Post from "../../post/Post";
import "../../posts/posts.scss";
import { useQuery } from "@tanstack/react-query";

const VerifyUserPosts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      console.log(res.data);
      return res.data;
    })
  );

  return (
    <div className="main_admin home">
      <div className="posts">
        {error
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          : data.map((post, index) => <Post post={post} key={index} admin={1}/>)}
      </div>
    </div>
  );
};

export default VerifyUserPosts;

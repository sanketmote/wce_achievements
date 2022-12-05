import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../../components/PostCard1";
import LoadIcon from "../../../images/loading.gif";
import LoadMoreBtn from "../../../components/LoadMoreBtn";
import { getDataAPI } from "../../../utils/fetchData";
import { POST_TYPES } from "../../../redux/actions/postAction";

const VerifyUserPosts = () => {
    const { homePosts, auth, theme } = useSelector((state) => state);
    const dispatch =  useDispatch();
  
    const [load, setLoad] = useState(false);
  
    const handleLoadMore = async () => {
      setLoad(true);
      const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
      console.log(res)
      dispatch({ type: POST_TYPES.GET_POSTS, payload: {...res.data, page: homePosts.page + 1 } });
      setLoad(false);
    };
  return (
    <div className="main_admin">
      <div className="main__container">
        <div className="posts">
        {homePosts.posts.filter(post => post.verified ==  false).map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
        ))}

        <div style={{textAlign: "center" }}><b><h3>No More Achievement for Today.</h3> </b> </div>

        {load && (
            <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
        )}

        <LoadMoreBtn
            result={homePosts.result}
            page={homePosts.page}
            load={load}
            handleLoadMore={handleLoadMore}
        />
        </div>
      </div>
    </div>
  );
};

export default VerifyUserPosts;
 
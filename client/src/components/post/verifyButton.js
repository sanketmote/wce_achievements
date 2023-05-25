import React, { useState } from "react";
import { makeRequest } from "../../axios";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const [vr, setVR] = useState(false);

  const handleSubmit1 = (e) => {
    const newComment = {
      content,
      status: 0,
      id: post.id,
      email: post.email,
      name: post.name,
    };
    console.log(newComment);
    setContent("");
    makeRequest.post("/posts/verify", { data: newComment });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      content,
      status: 1,
      id: post.id,
      email: post.email,
      name: post.name,
    };
    console.log(newComment);
    setContent("");
    makeRequest.post("/posts/verify", { data: newComment });

    // if (setOnReply) {
    //   return setOnReply(false);
    // }
  };

  return (
    <form className="card-footer comment_input">
      {children}
      <input
        type="text"
        placeholder="Add comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        // style={{
        //   filter: theme ? "invert(1)" : "invert(0)",
        //   color: theme ? "white" : "#111",
        //   background: theme ? "rgb(0,0,0,0.3)" : "",
        // }}
      />
      <button type="submit" className="postBtn" onClick={handleSubmit1}>
        Reject
      </button>

      <button type="submit" className="postBtn" onClick={handleSubmit}>
        Verify
      </button>
    </form>
  );
};

export default InputComment;

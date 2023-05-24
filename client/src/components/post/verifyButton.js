import React, { useState } from 'react';
import { makeRequest } from "../../axios";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const [vr, setVR] = useState(false);


  const handleSubmit1 = (e) => {
    e.preventDefault();

    const newComment = {
      content,
      likes: [],
    //   user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user
    };
    setContent("");
    console.log(vr)
    // dispatch(verify({ post, newComment, auth, socket, result: false }));
    console.log("Reject");
    var email = "sanket.mote@walchandsangli.ac.in";
    var subject = "Regarding Added Achievement in WCE ACHIEVEMENT Website";
    var body = "Dear User,\nThank you for your time in adding your new Achievement in WCE ACHIEVEMENT. \n" +
      "\nHowever We have found some problem in your Achievement Post.Please Take a look on it and try again" + (content != "" ? "\n This is Comment From Admin Take a look:\n" + content : "") +
      "\nThanks and Regards, \WCE ACHIEVEMENT Team\n" +
      "\n\nPlease do not reply to this e-mail," +
      "\n\nthis is a system generated email sent from an unattended mail box.";
    var URI = "https://script.google.com/macros/s/AKfycbxeP5Km6KmFQCmuiN9HlxmAbONvN2CDArjowip6bG_GBmBjUjryCLbrWGsxTpZw42uytQ/exec"+"?email=" + email + "&subject=" + subject + "&body=" + body;
    fetch(encodeURI(URI), {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
    }).then((data) => {
      console.log("Email sent");
      if (setOnReply) {
        return setOnReply(false);
      }

    }).catch((err) => {
      console.log(err);
    })

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      content,
      status:1,
      id:post.id,
      mail:post.email
    };
    console.log(newComment)
    setContent("");
    makeRequest.post("/posts/verify",{ data: newComment })

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

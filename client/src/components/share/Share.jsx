import "./share.scss";
import ImagePic from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import circle from "../../assets/2.png";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Image from "../profileImage/image"
import Update from "./AddEntery";


const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  function Capt(str) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ")
    return str2
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* <img src={"/upload/" + currentUser.profilePic} alt="" />
             */}
            <Image name={currentUser.name} imgSrc={currentUser.profilePic} classId={1} />
            <input
              type="text"
              placeholder={`Hey ${Capt(currentUser.name)},what achievements have you accomplished??`}
              onClick={(e) => setOpenUpdate(true)}
              value={desc}
              size={30}
            />
          </div>
          {/* <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div> */}
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={ImagePic} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Add Team Members</span>
            </div>
            <div className="item">
              <img src={circle} alt="" />
              <span>And Share With All</span>
            </div>
          </div>
          {/* <div className="right">
            <span onClick={handleClick}></span>
          </div> */}
          {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
        </div>
      </div>
    </div>
  );
};

export default Share;

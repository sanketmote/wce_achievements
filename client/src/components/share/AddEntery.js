import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { imageShow, videoShow } from "./showMedia";

const Update = ({ setOpenUpdate }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: "",
        password: "",
        name: "",
        city: "",
        website: "",
    });
    const [images, setImages] = useState([]);
    const [user, setUser] = useState({});

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach((file) => {
            if (!file) {
                return (err = "File does not exist.");
            }
            if (file.size > 1024 * 1024 * 5) {
                return (err = "Image size must be less than 5 mb.");
            }
            return newImages.push(file);
        });
        if (err) {
            console.log(err);
        }
        setImages([...images, ...newImages]);
    };

    const upload = async (file) => {
        console.log(file)
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["user"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();

        //TODO: find a better way to get image URL

        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }

    return (
        <div className="update" >
            <div className="wrapper" >
                <h1>Add Your Achievements</h1>
                <form style={{ overflowY: "scroll" }}>
                    <div className="files">
                        {images.map((img, index) => (
                            <label htmlFor="cover">
                                <span>Picture {img }</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        img
                                            ? URL.createObjectURL(img)
                                            : "/upload/" + user.coverPic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                            </label>
                        ))}
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        cover
                                            ? URL.createObjectURL(cover)
                                            : "/upload/" + user.coverPic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={(e) => handleChangeImages(e)}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={texts.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="text"
                        value={texts.password}
                        name="password"
                        onChange={handleChange}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        value={texts.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <label>Country / City</label>
                    <input
                        type="text"
                        name="city"
                        value={texts.city}
                        onChange={handleChange}
                    />
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={texts.website}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};


export default Update;

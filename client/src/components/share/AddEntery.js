import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MultiSelect } from "react-multi-select-component";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { imageShow, videoShow } from "./showMedia";

const Field = ({ label, id, error, ...rest }) => (
  <>
    <div
      className="form-group "
      id={id + "1"}
      ng-class={"{'not-empty': " + id + ".length}"}
    >
      <input id={id} {...rest} className="form-control" ng-model={id} />
      <label htmlFor={id} className="animated-label">
        {label}
      </label>
    </div>
    {error && <p>{error}</p>}
  </>
);

const options = [
  { label: "Sports Achievements", value: "sport" },
  { label: "Academic Achievements", value: "edu" },
  { label: "Extracurricular Achievements", value: "extra" },
  { label: "Internships, Certificate area and Work Experience", value: "intern" },
  { label: "Research and Innovation", value: "res" },
  { label: "Artistic and Creative Achievements:", value: "creat" },
  { label: "Organizational Achievements", value: "org" },
  { label: "Other", value: "other" },
];

const Update = ({ setOpenUpdate }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selected, setSelected] = useState([]);
  const [texts, setTexts] = useState({
    name: "",
    desc: "",
    area: "",
    startDate: "",
    endDate: "",
    outcome: "",
    obh: "",
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

  const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
      const formData = new FormData();

      formData.append("file", item);

      let x = Math.floor(Math.random() * 10000);
      // var pi = String(generateString(5));
      formData.append("upload_preset", "WCEACHIEVEMENTS");
      formData.append("public_id", "test" + x);
      formData.append("api_key", "712178238192867");
      // formData.append("signature", "bfd09f95f331f558cbd1320e67aa8d488770583e");

      await fetch("https://api.cloudinary.com/v1_1/dcnzisojf/image/upload", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          imgArr.push({ public_id: data.public_id, url: data.secure_url });
        })
        .catch((err) => {
          console.log(err);
          imgArr.push({ public_id: x, url: "Error in Uploading images" });
        });
    }
    return imgArr;
  };
  const upload = async (file) => {
    console.log(file);
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    console.log(e.target.startValue, e.target.endValue);
    setTexts((prev) => ({ ...prev, ["startDate"]: e.target.startValue }));
    setTexts((prev) => ({ ...prev, ["endDate"]: e.target.endValue }));
  };

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

    //TODO: find a better way to get image URL
    var image_url = [];
    var file_data = await imageUpload(images);
    file_data.forEach((data, index) => {
      image_url.push("" + data.url);
    });
    console.log(image_url);
    console.log(texts);
    mutation.mutate({ ...texts, images: image_url });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update" style={{ zIndex: "9999" }}>
      <div className="wrapper" style={{ overflowY: "scroll" }}>
        <h1>Add Your Achievements</h1>
        <form>
          <div className="files">
            {images.map((img, index) => (
              <label htmlFor="cover" key={index + "cover"}>
                <span key={index + "span"}>Picture {index}</span>
                <div className="imgContainer" key={index}>
                  <img
                    key={index + "image"}
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
          <label>Enter Name</label>
          <input
            type="text"
            key={1}
            value={texts.name}
            name="name"
            onChange={handleChange}
          />

          <label>Enter Description</label>
          <textarea
            type="text"
            value={texts.desc}
            name="desc"
            rows={5}
            placeholder="Presented Paper In International Conference on Artificial Intelligence: Advances and Applications ICAIAA-2019"
            onChange={handleChange}
          />

          <label>Enter College / Event Place (At) </label>
          <input
            key={3}
            type="text"
            name="area"
            value={texts.area}
            onChange={handleChange}
          />

          <label>Enter Objective</label>
          <input
            type="text"
            key={6}
            value={texts.obj}
            name="obj"
            onChange={handleChange}
          />

          <label>Enter Outcome</label>
          <input
            type="text"
            key={7}
            value={texts.outcome}
            name="outcome"
            onChange={handleChange}
          />

          <label>Award	Recived from ( if Applicable ) </label>
          <input
            type="text"
            key={7}
            value={texts.outcome}
            name="outcome"
            onChange={handleChange}
          />

          <label>Select Event Date</label>
          <DateRangePickerComponent
            id="daterangepicker"
            startDate={texts.startDate}
            endDate={texts.endDate}
            placeholder="Select Event Range Date"
            onChange={handleDateChange}
          />

          <label>Select Achievement Type</label>
          <MultiSelect
            key={5}
            isMulti
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select Achievement Type"
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

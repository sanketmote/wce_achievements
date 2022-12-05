import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { imageShow, videoShow } from "../utils/mediaShow";
import { useForm } from 'react-cool-form'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { MultiSelect } from "react-multi-select-component";

const Field = ({ label, id, error, ...rest }) => (
  <>
    <div className="form-group " id={id + "1"} ng-class={"{'not-empty': " + id + ".length}"}>
      <input id={id} {...rest} className="form-control" ng-model={id} />
      <label htmlFor={id} className="animated-label">{label}</label>
    </div>
    {error && <p>{error}</p>}
  </>

);

const options = [
  { label: "Sport", value: "sport" },
  { label: "Educational", value: "edu" },
  { label: "Other", value: "other"},
];

const TextField = ({ label, id, error, theme, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <textarea
      {...rest}
      style={{
        filter: theme ? "invert(1)" : "invert(0)",
        color: theme ? "white" : "#111",
        background: theme ? "rgb(0,0,0,0.3)" : "",
      }}
      id={id}
    />
    {error && <p>{error}</p>}
  </div>
)


const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [at, setAt] = useState("");
  const [date, setDate] = useState([]);
  const [selected, setSelected] = useState([]);

  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

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
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Add image(s)." },
      });
    }



    if (status.onEdit) {
      dispatch(updatePost({ name, at, date, content, images, auth, status,selected }));
    } else {
      dispatch(createPost({ name, at, date, content, images, auth, socket,selected }));
    }
    setContent("");
    setImages([]);
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    import('../styles/styles.scss')
    if (status.onEdit) {
      setName(status.name);
      setDate(status.date);
      setAt(status.at);
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const { form, use } = useForm({});
  // We can enable the "errorWithTouched" option to filter the error of an un-blurred field
  // Which helps the user focus on typing without being annoyed by the error message
  const errors = use("errors", { errorWithTouched: true });



  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="status_header">
          <h5 className="m-0">Add Your Achievement</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <Field
            label="Enter Name"
            id="name"
            placeholder="Enter Name"
            name="name"
            onChange={(e) => {
              name.length > 0 ? document.getElementById("name1").className = "form-group not-empty " : document.getElementById("name1").className = "form-group";
              setName(e.target.value)
            }}
            value={name}
            // Support built-in validation
            required
            error={errors.name}
          />
          <TextField
            label="Enter Description"
            id="description"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="content"
            required
            placeholder={`Presented Paper In International Conference on Artificial Intelligence: Advances and Applications ICAIAA-2019`}
            error={errors.content}
            theme={theme}
          />
          <Field
            label="Enter College / Event Place (At) "
            id="at"
            placeholder="Enter College / Event Place "
            name="at"
            onChange={(e) => {
              at.length > 0 ? document.getElementById("at1").className = "form-group not-empty " : document.getElementById("at1").className = "form-group";
              setAt(e.target.value)
            }}
            value={at}
            type="text"
            // Support built-in validation
            required
            error={errors.at}
          />

          {/* <Field
            label="Enter Duration"
            id="date"
            onChange={(e) => {
              document.getElementById("date1").className = "form-group not-empty "              
              setDate(e.target.value)
            }}
            value={date}
            // placeholder="Enter Duration"
            name="date"
            type="date"
            // Support built-in validation
            required
            error={errors.date}
          /> */}
          <br />
          <DateRangePicker placeholder="Select Event Date" onChange={(e) => { console.log(e); setDate(e) }} />

          <br />
          <br />

          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select Achievement Type"
          />

          <div className="d-flex">
            <div className="flex-fill"></div>
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="file_img">
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img, theme))
                      : imageShow(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                autoPlay
                muted
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="status_footer">
          <button type="submit" className="btn btn-primary w-100">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;

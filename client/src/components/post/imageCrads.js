import React from "react";

const Carousel = ({ images, id }) => {
  const isActive = (index) => {
    if (index === 0) return "active";
  };
  return (
    <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#image${id}`}
            data-bs-slide-to={index}
            className={isActive(index)}
            aria-current="true"
          />
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${isActive(index)}`}
            style={{ height: "400px" }}
          >
            <img
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
              src={img}
              className="d-block w-100"
            />
          </div>
        ))}
      </div>
      <button
        style={{ width: "5%" }}
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#image${id}`}
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          style={{ backgroundColor: "red" }}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        style={{ width: "5%" }}
        className="carousel-control-next"
        type="button"
        data-bs-target={`#image${id}`}
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          style={{ backgroundColor: "red" }}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

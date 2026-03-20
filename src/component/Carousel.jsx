import React from "react";
import "../css/Carousel.css"; // optional custom styles
import chocolate from "../image/chocolate.jpg";
import birthday from "../image/birthday.jpg";
import strawberry from "../image/strawberry.jpg";

const CarouselComponent = () => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        marginTop: "100px", // space from top
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        id="cakeCarousel"
        className="carousel slide carousel-dark"
        data-bs-ride="false" // stop auto-sliding
        style={{ height: "400px" }} // fixed height
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#cakeCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#cakeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#cakeCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner" style={{ height: "100%" }}>
          <div className="carousel-item active" style={{ height: "100%" }}>
            <img
              src={chocolate}
              className="d-block w-100"
              alt="Chocolate Cake"
              style={{ height: "100%", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Delicious Chocolate Cake</h5>
              <p>Rich, creamy, and perfect for any occasion.</p>
            </div>
          </div>

          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src={strawberry}
              className="d-block w-100"
              alt="Strawberry Cake"
              style={{ height: "100%", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Strawberry Delight</h5>
              <p>Fresh strawberries and cream for the perfect treat.</p>
            </div>
          </div>

          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src={birthday}
              className="d-block w-100"
              alt="Birthday Cake"
              style={{ height: "100%", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Birthday Surprise</h5>
              <p>Colorful, fun, and unforgettable cakes for every party.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#cakeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#cakeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
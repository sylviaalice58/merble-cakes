import React from "react";
import "../css/About.css";
import marbleCake from "../image/img_3202-scaled.jpg";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-overlay">
          <h1>About Our Merble Cake</h1>
          <p>
            A perfect blend of rich chocolate and smooth vanilla, baked with
            love for every sweet moment.
          </p>
        </div>
      </div>

      <div className="about-container">
        <div className="about-image-section">
          <img src={marbleCake} alt="Marble Cake" className="about-image" />
        </div>

        <div className="about-text-section">
          <h2>Our Story</h2>
          <p>
            Marble cake is more than just a dessert to us — it is a beautiful
            mix of flavor, art, and comfort. At our bakery, we prepare every
            marble cake with the finest ingredients to create that soft, moist,
            and unforgettable taste.
          </p>

          <p>
            What makes our marble cake special is the balance between deep
            chocolate swirls and classic vanilla goodness. Every slice gives
            you two delicious flavors in one bite, creating a perfect harmony
            that cake lovers never forget.
          </p>

          <p>
            Whether you are celebrating a birthday, enjoying tea with friends,
            or simply craving something sweet, our marble cake is made to bring
            joy, warmth, and smiles to every table.
          </p>

          <div className="about-highlights">
            <div className="highlight-card">
              <h3>🍫 Rich Chocolate Swirls</h3>
              <p>Delicious cocoa flavor blended into every soft layer.</p>
            </div>
            <div className="highlight-card">
              <h3>🍦 Smooth Vanilla Taste</h3>
              <p>A classic sweetness that perfectly complements the chocolate.</p>
            </div>
            <div className="highlight-card">
              <h3>🎂 Perfect for Every Occasion</h3>
              <p>From family moments to celebrations, marble cake always fits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
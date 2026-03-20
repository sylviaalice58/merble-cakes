import React, { useState } from "react";
import "../css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-left">
          <h1>Contact Merble Cakes</h1>
          <p>
            We would love to hear from you. Whether you want to place an order,
            ask about our merble cakes, or share your sweet experience, our
            team is ready to help.
          </p>

          <div className="contact-info">
            <p><strong>📍 Address:</strong> Kisumu, Kenya</p>
            <p><strong>📞 Phone:</strong> +254 729 932 162</p>
            <p><strong>✉️ Email:</strong> merblecake@gmail.com</p>
            <p><strong>⏰ Opening Hours:</strong> Mon - Sat, 8:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send Us a Message</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
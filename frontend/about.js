
import React, { useState } from "react";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="mysta-page">
      <style>{`
        .mysta-page {
          font-family: Arial, sans-serif;
          color: #292421;
          background: #faf8f5;
          min-height: 100vh;
        }

        .mysta-hero {
          background: #30251f;
          color: white;
          text-align: center;
          padding: 75px 20px;
        }

        .mysta-hero h1 {
          font-size: 42px;
          margin-bottom: 15px;
          letter-spacing: 3px;
        }

        .mysta-hero p {
          color: #e0d4c8;
          font-size: 17px;
        }

        .mysta-section {
          max-width: 1100px;
          margin: auto;
          padding: 65px 25px;
        }

        .mysta-section h2 {
          font-size: 30px;
          margin-bottom: 20px;
          color: #49372c;
        }

        .mysta-section p {
          line-height: 1.8;
          color: #655b54;
          font-size: 16px;
        }

        .mysta-about {
          text-align: center;
          max-width: 850px;
        }

        .mysta-values {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-top: 35px;
        }

        .mysta-card {
          background: white;
          padding: 28px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 3px 12px rgba(0,0,0,0.05);
        }

        .mysta-card h3 {
          color: #8b644a;
          margin-bottom: 12px;
        }

        .mysta-contact {
          background: #f0ebe5;
        }

        .mysta-contact-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 45px;
        }

        .mysta-contact-info {
          padding-top: 10px;
        }

        .mysta-contact-info h3 {
          color: #49372c;
          margin-bottom: 8px;
        }

        .mysta-contact-info p {
          margin-bottom: 25px;
        }

        .mysta-form {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.05);
        }

        .mysta-form input,
        .mysta-form textarea {
          width: 100%;
          padding: 13px;
          margin-bottom: 17px;
          border: 1px solid #ddd2c7;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
          font-family: inherit;
        }

        .mysta-form textarea {
          min-height: 130px;
          resize: vertical;
        }

        .mysta-form input:focus,
        .mysta-form textarea:focus {
          outline: none;
          border-color: #987254;
        }

        .mysta-button {
          background: #49372c;
          color: white;
          border: none;
          padding: 14px 25px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
          transition: 0.3s;
        }

        .mysta-button:hover {
          background: #8b644a;
        }

        .mysta-success {
          color: #34734b;
          margin-bottom: 15px;
        }

        .mysta-footer {
          background: #30251f;
          color: #e0d4c8;
          text-align: center;
          padding: 25px;
        }

        .mysta-footer p {
          color: #e0d4c8;
        }

        @media (max-width: 700px) {
          .mysta-values {
            grid-template-columns: 1fr;
          }

          .mysta-contact-container {
            grid-template-columns: 1fr;
          }

          .mysta-hero h1 {
            font-size: 32px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="mysta-hero">
        <h1>ABOUT MYSTA</h1>
        <p>
          Discover your signature scent. Experience the art of fragrance.
        </p>
      </section>

      {/* About Section */}
      <section className="mysta-section mysta-about">
        <h2>Our Story</h2>

        <p>
          Welcome to Mysta, your destination for discovering the perfect
          fragrance. We believe that perfume is more than just a scent.
          It is a reflection of your personality, memories, and style.
        </p>

        <p>
          Our mission is to make finding your perfect fragrance easier
          through personalized recommendations, detailed product
          information, and a smooth online shopping experience.
        </p>

        <div className="mysta-values">
          <div className="mysta-card">
            <h3>Our Mission</h3>
            <p>
              To help everyone discover fragrances that match their
              personality and preferences.
            </p>
          </div>

          <div className="mysta-card">
            <h3>Personalization</h3>
            <p>
              We provide personalized perfume recommendations based
              on your favorite scent families.
            </p>
          </div>

          <div className="mysta-card">
            <h3>Our Promise</h3>
            <p>
              We aim to provide a convenient, reliable, and enjoyable
              perfume shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mysta-contact">
        <div className="mysta-section">
          <h2>Contact Us</h2>

          <p>
            Have a question or need help finding your perfect fragrance?
            We would love to hear from you.
          </p>

          <div className="mysta-contact-container">
            <div className="mysta-contact-info">
              <h3>Get in Touch</h3>

              <p>
                Our team is here to help with your questions,
                orders, and fragrance recommendations.
              </p>

              <h3>Email</h3>
              <p>support@mysta.com</p>

              <h3>Customer Support</h3>
              <p>
                Contact us using the form and our team can assist you.
              </p>

              <h3>Location</h3>
              <p>Egypt</p>
            </div>

            <form className="mysta-form" onSubmit={handleSubmit}>
              {submitted && (
                <p className="mysta-success">
                  Thank you! Your message has been submitted.
                </p>
              )}

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="mysta-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mysta-footer">
        <p>© 2026 Mysta. All Rights Reserved.</p>
        <p>Discover Your Signature Scent.</p>
      </footer>
    </div>
  );
}

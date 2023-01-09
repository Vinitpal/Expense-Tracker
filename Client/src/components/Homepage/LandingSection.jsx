import React from "react";

import { useNavigate } from "react-router-dom";

const LandingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-section">
      <div className="hero-text">
        <h2>
          <span>An easy way </span> to keep track of your Expenses
        </h2>
        <p>
          Kharche is an easy to use expense tracker focused on a fast and
          delightful user experience.
        </p>
        <div className="btn-wrapper">
          <button type="button" className="sign-up">
            SignUp
          </button>
          <button
            type="button"
            className="guest"
            onClick={() => navigate("/dashboard")}
          >
            Guest Login
          </button>
        </div>
      </div>

      <div className="wave"></div>
    </section>
  );
};

export default LandingSection;

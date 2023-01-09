import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ theme }) {
  const navigate = useNavigate();

  const aboutTheme =
    theme === "home"
      ? {
          color: "#f4fbf4",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }
      : null;

  const logoTheme = theme === "home" ? { color: "#f4fbf4" } : null;

  const btnTheme =
    theme === "home"
      ? {
          background: "rgba(15, 155, 15, 0.5)",
        }
      : null;

  return (
    <nav>
      <h3 className="about" style={aboutTheme}>
        About
      </h3>
      <h2 className="logo" style={logoTheme} onClick={() => navigate("/")}>
        Kha₹che
      </h2>
      <button type="button" style={btnTheme} className="login-btn">
        Login
      </button>
    </nav>
  );
}
export default Navbar;

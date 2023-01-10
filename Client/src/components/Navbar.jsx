import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "@nextui-org/react";
import { AiOutlineMenu } from "react-icons/ai";

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
      <div className="popup">
        <Popover>
          <Popover.Trigger>
            <button type="button">
              <AiOutlineMenu />
            </button>
          </Popover.Trigger>
          <Popover.Content
            css={{
              marginRight: "1.6rem",
              padding: "0.5rem 1rem",
              textAlign: "center",
            }}
          >
            <h3 className="mobile-nav-item">About</h3>
            <h3 className="mobile-nav-item">Login</h3>
          </Popover.Content>
        </Popover>
      </div>
    </nav>
  );
}
export default Navbar;

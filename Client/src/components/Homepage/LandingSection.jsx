import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/state";
import { API_PATH } from "../../Path";

const LandingSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    wait,
    loadingUser,
    setLoadingUser,
    setUser,
    setUserID,
    fetchUser,
    getFromLocal,
    storeToLocal,
  } = useAppContext();

  const createGuestUser = async () => {
    try {
      setLoading(true);
      setLoadingUser(true);

      const userID = getFromLocal("userID");
      console.log(userID);

      if (userID !== null) {
        const userData = await fetchUser(userID);

        setUserID(userID);
        setUser(userData);

        console.log(userData);
        console.log("from LS", loading);
        wait(1000);
        setLoading(false);
        setLoadingUser(false);
      }

      if (userID === null) {
        const body = JSON.stringify({ name: "Guest", balance: 1000 });
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        const data = await axios.post(
          `${API_PATH}/user`,
          body,
          { mode: "cors" },
          { headers }
        );

        const userData = data.data;
        console.log("working u can see", data, userData.User_ID);

        setUser(userData);
        setUserID(userData.User_ID);
        storeToLocal("userID", userData.User_ID);

        console.log(userData);
        console.log("newUser", loading);
        wait(1000);
        setLoading(false);
        setLoadingUser(false);
      }

      console.log(loading);
      if (!loading && !loadingUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={() => createGuestUser()}
          >
            {loading ? "loading" : "Guest Login"}
          </button>
        </div>
      </div>

      <div className="wave"></div>
    </section>
  );
};

export default LandingSection;

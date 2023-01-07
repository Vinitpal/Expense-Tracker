import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import {
  Modal,
  Grid,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
} from "@nextui-org/react";
import UpdateBalanceModal from "./UpdateBalanceModal";
// import { API_PATH } from "../../Path";
// import axios from "axios";

const MainDashboard = ({ user, loadingUser, setUser }) => {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const balanceHandler = () => setShowBalanceModal(true);

  const closeBalanceHandler = () => {
    setShowBalanceModal(false);
    console.log("closed");
  };

  const HandleBalanceEdit = () => {
    console.log("balance edit");
  };

  return (
    <div className="main-dashboard">
      {/* Amount Buttons Wrapper */}
      <div className="amount-btn-wrapper">
        <div className="btn-container">
          {/* Current Balance */}
          <div className="current-balance">
            <button type="button">
              ₹ 1500
              <AiFillEdit className="icon" />
            </button>
            <p>Current Balance</p>
          </div>

          {/* Amount Expended */}
          <div className="amount-expended">
            <button type="button">₹ 2500</button>
            <p>Amount Expended</p>
          </div>
        </div>

        {/* Add New Record */}
        <button type="button" className="add-new-record">
          <IoAddCircle className="icon" />
          Add New Record
        </button>
      </div>

      <div className="expense-table">{/* table */}</div>
    </div>
  );
};

export default MainDashboard;

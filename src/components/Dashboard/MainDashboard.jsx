import React, { useEffect, useState } from "react";
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
import UpdateBalanceModal from "../modals/UpdateBalanceModal";
import AddEntryModal from "../modals/AddEntryModal";
// import { API_PATH } from "../../Path";
// import axios from "axios";

const MainDashboard = ({ user, loadingUser, setUser }) => {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);

  const balanceHandler = () => setShowBalanceModal(true);
  const entryHandler = () => setShowEntryModal(true);

  const closeBalanceHandler = () => {
    setShowBalanceModal(false);
    console.log("closed");
  };

  const closeEntryHandler = () => {
    setShowEntryModal(false);
    console.log("closed");
  };

  // useEffect for calculating expended amount
  const [amountExpended, setAmountExpended] = useState(2000);
  useEffect(() => {
    if (!loadingUser) {
      console.log(user);

      let totalAmount = 0;
      user.Expenses.forEach((element) => {
        totalAmount += element.expend_amount;
      });

      setAmountExpended(totalAmount);
    }
  }, [user]);

  return (
    <div className="main-dashboard">
      {/* Amount Buttons Wrapper */}
      <div className="amount-btn-wrapper">
        <div className="btn-container">
          {/* Current Balance */}
          <div className="current-balance" onClick={balanceHandler}>
            <button type="button">
              ₹ {!loadingUser && user.balance}
              <AiFillEdit className="icon" />
            </button>
            <p>Current Balance</p>
          </div>

          {/* Amount Expended */}
          <div className="amount-expended">
            <button type="button">₹ {amountExpended}</button>
            <p>Amount Expended</p>
          </div>
        </div>

        {/* Add New Record */}
        <button type="button" className="add-new-record" onClick={entryHandler}>
          <IoAddCircle className="icon" />
          Add New Record
        </button>

        <UpdateBalanceModal
          visible={showBalanceModal}
          closeHandler={closeBalanceHandler}
          setShowBalanceModal={setShowBalanceModal}
          setUser={setUser}
        />

        <AddEntryModal
          visible={showEntryModal}
          closeHandler={closeEntryHandler}
          setShowEntryModal={setShowEntryModal}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

export default MainDashboard;

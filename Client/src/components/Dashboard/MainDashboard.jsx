// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";

// components
import UpdateBalanceModal from "../modals/UpdateBalanceModal";
import AddEntryModal from "../modals/EntryModal/AddEntryModal";

// icons
import { IoAddCircle } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

const MainDashboard = () => {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const { user, loadingUser } = useAppContext();
  const [label, setLabel] = useState("Select a label");

  const balanceHandler = () => setShowBalanceModal(true);
  const entryHandler = () => {
    setShowEntryModal(true);
    setLabel("Select a label");
  };

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
              ₹ {!loadingUser ? user.balance : "loading"}
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

        {/* // TODO: priority 
            // -- add a mobile btn for create entry - done
            // -- fix spaccing in the main dashboard - dpme
            // --> responsive of all expenses page - done
            // --> styling left - done
      */}

        {/* Add New Record */}
        <button type="button" className="add-new-record" onClick={entryHandler}>
          <IoAddCircle className="icon" />
          Add New Record
        </button>
        {/* Add New Record for mobile*/}
        <button
          type="button"
          className="add-new-record-mobile"
          onClick={entryHandler}
        >
          <IoAddCircle className="icon" />
        </button>

        <UpdateBalanceModal
          visible={showBalanceModal}
          closeHandler={closeBalanceHandler}
        />

        <AddEntryModal
          visible={showEntryModal}
          closeHandler={closeEntryHandler}
          label={label}
          setLabel={setLabel}
        />
      </div>
    </div>
  );
};

export default MainDashboard;

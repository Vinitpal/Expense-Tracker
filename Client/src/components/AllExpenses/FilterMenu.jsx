// react
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";

// librarys
import moment from "moment";

// components
import DateFilterModal from "../modals/FilterModal/DateFilterModal";
import LabelFilterModal from "../modals/FilterModal/LabelFilterModal";
import PriceFilterModal from "../modals/FilterModal/PriceFilterModal";

// icons
import { AiOutlineCalendar } from "react-icons/ai";
import { MdLabelOutline } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";

const FilterMenu = ({
  currentMonth,
  currentLabel,
  setCurrentMonth,
  setCurrentLabel,
}) => {
  // approach -- TODO :done
  // click on any buttons opens a modal
  // which allow to select filtering way

  const [currentPriceRange, setCurrentPriceRange] = useState("");

  // modals state handlers
  const [showDateModal, setShowDateModal] = useState(false);
  const dateHandler = () => setShowDateModal(true);
  const closeDateHandler = () => {
    setShowDateModal(false);
  };
  const [showLabelModal, setShowLabelModal] = useState(false);
  const labelHandler = () => setShowLabelModal(true);
  const closeLabelHandler = () => {
    setShowLabelModal(false);
  };
  const [showPriceModal, setShowPriceModal] = useState(false);
  const priceHandler = () => setShowPriceModal(true);
  const closePriceHandler = () => {
    setShowPriceModal(false);
  };

  return (
    <div className="filter-menu">
      <h2>Your Expenses</h2>

      <div className="filter-buttons">
        <button className="month" onClick={dateHandler}>
          {currentMonth} <AiOutlineCalendar className="icon" />
        </button>
        <button className="label" onClick={labelHandler}>
          {currentLabel ? currentLabel : "Label"}
          <MdLabelOutline className="icon" />
        </button>
        <button className="price" onClick={priceHandler}>
          {currentPriceRange ? currentPriceRange : "Price Range"}
          <BiCoinStack className="icon" />
        </button>
      </div>

      <DateFilterModal
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        visible={showDateModal}
        closeHandler={closeDateHandler}
      />
      <LabelFilterModal
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        visible={showLabelModal}
        closeHandler={closeLabelHandler}
      />
      <PriceFilterModal
        currentPriceRange={currentPriceRange}
        setCurrentPriceRange={setCurrentPriceRange}
        visible={showPriceModal}
        closeHandler={closePriceHandler}
      />
    </div>
  );
};

export default FilterMenu;

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
import { AiOutlineDelete } from "react-icons/ai";
import { BsFilterCircle } from "react-icons/bs";
import MobileFilterModal from "../modals/FilterModal/MobileFilterModal";

const FilterMenu = ({
  currentMonth,
  currentLabel,
  currentPriceRange,
  setCurrentMonth,
  setCurrentLabel,
  setCurrentPriceRange,
}) => {
  // approach -- TODO :done
  // click on any buttons opens a modal
  // which allow to select filtering way

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
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
  const mobileFilterHandler = () => setShowMobileFilterModal(true);
  const closeMobileFilterHandler = () => {
    setShowMobileFilterModal(false);
  };

  return (
    <div className="filter-menu">
      <h2>Your Expenses</h2>

      <div className="filter-buttons">
        <button className="month" onClick={dateHandler}>
          {currentMonth === "Clear" ? "Month" : currentMonth}{" "}
          <AiOutlineCalendar className="icon" />
        </button>
        <button className="label" onClick={labelHandler}>
          {currentLabel === "Clear" ? "Label" : currentLabel}
          <MdLabelOutline className="icon" />
        </button>
        <button className="price" onClick={priceHandler}>
          {currentPriceRange === "Clear"
            ? "Price Range"
            : currentPriceRange.title}
          <BiCoinStack className="icon" />
        </button>
        <button
          className="price"
          onClick={() => {
            setCurrentMonth("Clear");
            setCurrentLabel("Clear");
            setCurrentPriceRange("Clear");
          }}
        >
          Clear Filter
          <AiOutlineDelete className="icon" />
        </button>
      </div>

      <div className="filter-buttons-mobile">
        <button onClick={mobileFilterHandler}>
          <BsFilterCircle className="icon" />
          Filter
        </button>
        <button
          onClick={() => {
            setCurrentMonth("Clear");
            setCurrentLabel("Clear");
            setCurrentPriceRange("Clear");
          }}
        >
          <AiOutlineDelete className="icon" />
          Clear
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
      <MobileFilterModal
        currentMonth={currentMonth}
        currentLabel={currentLabel}
        currentPriceRange={currentPriceRange}
        setCurrentMonth={setCurrentMonth}
        setCurrentLabel={setCurrentLabel}
        setCurrentPriceRange={setCurrentPriceRange}
        visible={showMobileFilterModal}
        closeHandler={closeMobileFilterHandler}
      />
    </div>
  );
};

export default FilterMenu;

import React from "react";
import { BsCalendarMonth } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { useAppContext } from "../../context/state";

const FilterMenu = () => {
  // approach -- TODO
  // click on any buttons opens a modal
  // which allow to select filtering way
  const { console } = useAppContext();

  return (
    <div className="filter-menu">
      <h2>Your Expenses</h2>

      <div className="filter-buttons">
        <button className="month" onClick={() => console("context working??")}>
          November <BsCalendarMonth className="icon" />
        </button>
        <button className="label">
          Label <MdLabelOutline className="icon" />
        </button>
        <button className="price">
          Price Range <BiCoinStack className="icon" />
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;

import React from "react";
import FilterMenu from "../../components/AllExpenses/FilterMenu";
import Navbar from "../../components/Navbar";

const AllExpenses = () => {
  // ------- approach -- TODO
  // -> get user object
  // -> setup loader
  // -> once loading finishes, filter the expenses
  //    according to current year and month
  // -> show each day's data individually
  // -> checkout how pagination works in next ui table

  return (
    <div>
      <Navbar />

      <section className="all-expenses">
        <FilterMenu />
      </section>
      {/* if no expenses at all then show msg */}
      {/* get the expense obj */}

      {/* ----- multiple filter option ----- */}
      {/* ----- date | label | cost ----- */}

      {/* ----- default: filter date ----- */}
      {/* divide the  obj according to date */}
      {/* create a table component which will take those object as prop */}
      {/* Will show expenses of 10 days, will need to create pagination */}

      {/* ----- filter label ----- */}
      {/* divide obj according to label */}
      {/* show alphabetically 20 entries then pagination*/}

      {/* ----- filter cost ----- */}
      {/* divide obj according to cost */}
      {/* show 20 entries then pagination */}
    </div>
  );
};

export default AllExpenses;

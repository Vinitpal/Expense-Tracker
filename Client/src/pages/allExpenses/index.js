import React from "react";
import Navbar from "../../components/Navbar";

const AllExpenses = () => {
  return (
    <div>
      <Navbar />

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

      <p>This is all expense page</p>
    </div>
  );
};

export default AllExpenses;

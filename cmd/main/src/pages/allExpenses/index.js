import moment from "moment";
import React, { useEffect, useState } from "react";
import FilterMenu from "../../components/AllExpenses/FilterMenu";
import FilterTable from "../../components/AllExpenses/FilterTable";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/state";
import { allMonths } from "../../util";

const AllExpenses = () => {
  // ------- -- TODO
  // -> checkout how pagination works in next ui table

  const { user, loadingUser } = useAppContext();
  const [filterArr, setFilterArr] = useState([]);

  const [currentMonth, setCurrentMonth] = useState("");
  const [currentLabel, setCurrentLabel] = useState("Clear");
  const [currentPriceRange, setCurrentPriceRange] = useState("Clear");

  // setting default month
  useEffect(() => {
    const month = moment().format("MMMM");
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // console.log("filtering", user);
    if (!loadingUser) {
      // filtering according to month

      let expenses = user.Expenses || [];

      if (currentMonth !== "Clear") {
        expenses = expenses.filter(
          (item) =>
            item.CreatedAt.split("T")[0].split("-")[1] - 1 ===
            allMonths.indexOf(currentMonth)
        );
      }

      // TODO: focus on filter label
      // things like label api and allowing user to get a dropdown of labels
      // and create a new label
      // and some shit like color ful label <---
      // after this sort acc to label
      // done
      if (currentLabel !== "Clear") {
        expenses = expenses.filter(
          (item) => item.label.toLowerCase() === currentLabel.toLowerCase()
        );
      }

      // TODO: focus on expense amount range filter
      // agar currentMonth applied hai to uske acc range me show hoga
      // if not then will simply sort every expenses
      if (currentPriceRange !== "Clear") {
        expenses = expenses.filter(
          (item) =>
            item.expend_amount >= currentPriceRange.start &&
            item.expend_amount < currentPriceRange.end
        );
      }

      // TODO: clear button in each filter modal
      // for that specific filter option
      // TODO: clear filters button to show all expenses
      // DONE

      const expenseArr = dateSortExpenses(expenses);

      console.log(currentPriceRange, expenses, expenseArr);
      setFilterArr(expenseArr);
    }
  }, [loadingUser, user, currentMonth, currentLabel, currentPriceRange]);

  const dateSortExpenses = (expenses) => {
    // sorting the arr
    expenses = expenses.sort(
      (a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt)
    );

    let expenseArr = [];
    // creating expense arr with [{date, expenses}]
    expenses.forEach((element, idx) => {
      let obj = {
        date: element.CreatedAt.split("T")[0],
        Expenses: [element],
      };

      if (
        idx > 0 &&
        element.CreatedAt.split("T")[0] ===
          expenses[idx - 1].CreatedAt.split("T")[0]
      ) {
        obj = {
          date: element.CreatedAt.split("T")[0],
          Expenses: [element, expenses[idx - 1]],
        };

        expenseArr.forEach((item) => {
          if (item.date === obj.date) item.Expenses = obj.Expenses;
        });
      } else {
        expenseArr.push(obj);
      }
    });

    // console.log(expenses, expenseArr);
    return expenseArr;
  };

  return (
    <div>
      <Navbar showDashboard={true} />

      <section className="all-expenses">
        <FilterMenu
          currentMonth={currentMonth}
          currentLabel={currentLabel}
          currentPriceRange={currentPriceRange}
          setCurrentMonth={setCurrentMonth}
          setCurrentLabel={setCurrentLabel}
          setCurrentPriceRange={setCurrentPriceRange}
        />

        <FilterTable
          user={user}
          expenses={filterArr}
          loadingUser={loadingUser}
        />
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

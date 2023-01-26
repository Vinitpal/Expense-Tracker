import moment from "moment";
import React, { useEffect, useState } from "react";
import FilterMenu from "../../components/AllExpenses/FilterMenu";
import FilterTable from "../../components/AllExpenses/FilterTable";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/state";
import { allMonths } from "../../util";

const AllExpenses = () => {
  // ------- approach -- TODO :priority
  // -> get user object
  // -> setup loader
  // -> once loading finishes, filter the expenses
  //    according to current year and month
  // -> show each day's data individually
  // -> checkout how pagination works in next ui table

  const { user, loadingUser } = useAppContext();
  const [filterArr, setFilterArr] = useState([]);

  // setting default month
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    const month = moment().format("MMMM");
    // console.log(month);
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // console.log("filtering", user);
    if (!loadingUser) {
      // const index = user.Expenses[0]
      let expenses = user.Expenses.filter(
        (item, idx) =>
          item.CreatedAt.split("T")[0].split("-")[1] - 1 ===
          allMonths.indexOf(currentMonth)
      );

      expenses = expenses
        .filter((item, idx) => {
          if (idx !== expenses.length - 1) {
            return (
              expenses[idx].CreatedAt.split("T")[0] !==
              expenses[idx + 1].CreatedAt.split("T")[0]
            );
          }
          return true;
        })
        .sort((a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt));

      let expenseArr = [];

      expenses.forEach((element, idx) => {
        // console.log(expenses[idx - 1], element);
        let obj = {
          date: element.CreatedAt.split("T")[0],
          Expenses: [element],
        };

        // adding same date values

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
            if (item.date === obj.date) {
              item.Expenses = obj.Expenses;
            }
          });
        } else {
          expenseArr.push(obj);
        }
      });
      console.log(expenseArr);

      // doubt if two entries have same date then they should be combined
      // thanks to above doubt its a pain showing expenses according to same date
      // two options
      // -> may be i can solve this with help of api
      // -> or may be i can just go with old school way of only filtering with month
      // ask for suggestion
      // --> cleared the doubt myself
      // --> no need to go over two options atm
      // tomorrow todo: review whats done and cleanup of code
      // reviewed just now and thing i thought was working, isnot working at all
      // i have rethink the approach
      // i need to create a filterArr something like this
      // [
      //  {
      //   CreatedAt: 2023-01-23,
      //   Expenses: [
      //     {...},
      //     {...},
      //     {...},
      //   ]
      //  },
      //  {
      //   CreatedAt: 2023-01-10,
      //   Expenses: [
      //     {...},
      //     {...},
      //     {...},
      //   ]
      //  }
      // ]
      // I've got the date sorted out, all I need to work upon is expenses field
      // i guess i will need to use the user object for it, and bunch of filter thingies
      // will see tmrw gn
      // console.log(
      //   user.Expenses[0].CreatedAt.split("T")[0].split("-")[1] - 1,
      //   allMonths[new Date().getMonth()],
      //   allMonths.indexOf(currentMonth),
      //   expenses,
      //   user.Expenses.length,
      //   expenseArr
      // );
      setFilterArr(expenseArr);
    }
  }, [user, currentMonth]);

  return (
    <div>
      <Navbar />

      <section className="all-expenses">
        <FilterMenu
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
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

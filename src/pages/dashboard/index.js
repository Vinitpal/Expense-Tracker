import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ExpenseTable from "../../components/Dashboard/ExpenseTable";
import MainDashboard from "../../components/Dashboard/MainDashboard";

const Dashboard = () => {
  const [loadingUser, setLoadingUser] = useState(true);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      const res = await fetch(
        `http://localhost:8080/user/a038c272-c533-44d0-896c-a684974b4231`
      );
      const data = await res.json();
      // console.log(
      //   data.Expenses.sort(
      //     (a, b) => Date.parse(a.CreatedAt) - Date.parse(b.CreatedAt)
      //   )
      // );
      // console.log(
      //   data.Expenses[0].CreatedAt.split("T")[0].split("-").reverse().join("-")
      // );

      setUser(data);
      setLoadingUser(false);
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      <MainDashboard loadingUser={loadingUser} user={user} setUser={setUser} />
      <ExpenseTable loadingUser={loadingUser} user={user} setUser={setUser} />
    </div>
  );
};

export default Dashboard;

import React from "react";

import Navbar from "../../components/Navbar";
import ExpenseTable from "../../components/Dashboard/ExpenseTable";
import MainDashboard from "../../components/Dashboard/MainDashboard";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <MainDashboard />
      <ExpenseTable />
    </div>
  );
};

export default Dashboard;

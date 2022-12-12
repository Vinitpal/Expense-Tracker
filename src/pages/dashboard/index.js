import React from "react";
import ExpenseTable from "../../components/Dashboard/ExpenseTable";
import MainDashboard from "../../components/Dashboard/MainDashboard";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <MainDashboard />
      <ExpenseTable />
    </div>
  );
};

export default Dashboard;

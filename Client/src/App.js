import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import AllExpenses from "./pages/allExpenses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/all-expenses" element={<AllExpenses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

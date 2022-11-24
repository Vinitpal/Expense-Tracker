
// import './App.css';
import { Routes, Route } from "react-router-dom"
import Home  from "./pages/home";
import Navbar from "./components/Navbar";
import  Dashboard  from './pages/dashboard';
<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;

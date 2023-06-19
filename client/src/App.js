import React from "react";
// import QRCodeGenerator from "./components/QRCodeGenerator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarCallerPage from "./components/CarCallerPage";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import RegistrationForm from "./components/RegistrationPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/carCallerPage" element={<CarCallerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/userDetails" element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

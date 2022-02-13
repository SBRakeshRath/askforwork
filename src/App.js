import "./App.css";
import "style/import.scss";
import React from "react";

import DashBoard from "components/dashboard/dashboard";
import Login from "components/login/login";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  // error handling
  const navigate = useNavigate();

  const errorReducer = useSelector((state) => state.errorReducer);

  React.useLayoutEffect(() => {
    if (errorReducer.status === 401) {
      navigate("/login");
    }
  }, [errorReducer, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

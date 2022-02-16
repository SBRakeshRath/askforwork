import "./App.css";
import "style/import.scss";
import React from "react";
import Overlay from "g-components/overlays/overlay";
import DashBoard from "components/dashboard/dashboard";
import Login from "components/login/login";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getCsurfToken from "redux_local/thunks/global_variables/csurfToken";
import globalVariables from "redux_local/thunks/global_variables/globalVaribale";
import GlobalErrorMessageBox from "g-components/box/globalErrorMessageBox/globalErrorMessageBox";

function App() {
  // error handling
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(globalVariables());
  }, [dispatch]);

  console.log("rendering");
  return (
    <div className="App">
      <Overlay>
        <GlobalErrorMessageBox />
      </Overlay>
      <Routes>
        <Route path="/" element={<DashBoard />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

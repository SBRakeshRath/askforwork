import "./App.css";
import "style/import.scss";
import React from "react";
import Overlay from "g-components/overlays/overlay";
import Login from "components/login/login";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import globalVariables from "redux_local/thunks/global_variables/globalVaribale";
import GlobalErrorMessageBox from "g-components/box/globalErrorMessageBox/globalErrorMessageBox";
import StepRoute from "components/newUserSteps/stepsRoute";

function App() {
  // error handling
  const dispatch = useDispatch();
  const token = useSelector((state) => state.useProfilerData.token);

  React.useEffect(() => {
    dispatch(globalVariables());
  }, [dispatch]);

  return (
    <div className="App">
      <Overlay>
        <GlobalErrorMessageBox />
      </Overlay>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/userSteps/*" element={<StepRoute />}></Route>
      </Routes>
    </div>
  );
}

export default App;

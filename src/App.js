import "./App.css";
import "style/import.scss";
import React from "react";
import Overlay from "g-components/overlays/overlay";
import Login from "components/login/login";

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import globalVariables from "redux_local/thunks/global_variables/globalVaribale";
import GlobalErrorMessageBox from "g-components/box/globalErrorMessageBox/globalErrorMessageBox";

function App() {
  // error handling
  const dispatch = useDispatch();

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
      </Routes>
    </div>
  );
}

export default App;

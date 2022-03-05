import "./stepsRoute.scss";
import StepOne from "./stepOne/stepOne";
import StepTwo from "./stepTwo/stepTwo";
import StepThree from "./stepThree/stepThree";
import { useSelector, useDispatch } from "react-redux";
import userStepsLogin from "redux_local/thunks/login/userStepsLogin";

import HorizontalyCenterBox from "g-components/box/horizontalyCenterBox/horizontalyCenterBox";
// import globalVariables from "redux_local/reducers/global_data";
import { useEffect, useState } from "react";
// import globalVariables from './../../redux_local/thunks/global_variables/globalVaribale';
import { useNavigate } from "react-router-dom";

export default function StepRoute() {
  const login = useSelector((state) => state.globalVariables.login);
  const loading = useSelector((state) => state.loadingReducer.newUSerSteps);
  const token = useSelector((state) => state.globalVariables.csurf_token);
  const [reFetch, setRefetch] = useState(true);
  const navigate = useNavigate();
  const userDataAdditional = useSelector(
    (state) => state.useProfilerData.additional
  );
  const dispatch = useDispatch();
  const [step, setStep] = useState(false);
  useEffect(() => {
    if (token === "") return;
    if (!reFetch) return;
    setRefetch(false);
    dispatch(userStepsLogin());
  }, [dispatch, reFetch, token]);
  useEffect(() => {
    if (!userDataAdditional.step) return;
    switch (userDataAdditional.step) {
      case 1:
        setStep(<StepOne reFetch={setRefetch} />);
        break;
      case 2:
        setStep(<StepTwo reFetch={setRefetch} />);
        break;
      case 3:
        setStep(<StepThree reFetch={setRefetch} />);

        break;
      case true:
        window.location.href = process.env.REACT_APP_LOGIN_DEFAULT_LINK;

        break;
      default:
        break;
    }
  }, [userDataAdditional.step]);

  if (!login) {
    navigate("/");
  }
  return (
    <div id="newUserSteps">
      <HorizontalyCenterBox animation={loading}>
        {step ? step : false}
      </HorizontalyCenterBox>
    </div>
  );
}

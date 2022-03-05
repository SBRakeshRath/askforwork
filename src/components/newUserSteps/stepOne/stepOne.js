import { TextField } from "@mui/material";
import HelperText from "g-components/text/helperText";
import { useState } from "react";
import { useRef } from "react";
import { Button } from "@mui/material";
import errorActions from "redux_local/actions/error";
import { useDispatch, useSelector } from "react-redux";
import loadingAction from "redux_local/actions/loading";
import "./../steps.scss";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import csrfAxiosApi from "g-components/axios/csrfAxios";
import global_data from "redux_local/actions/global_data";

export default function StepOne(props) {
  const [fNameErr, setfNameErr] = useState([false, ""]);
  const [mNameErr, setmNameErr] = useState([false, ""]);
  const [lNameErr, setlNameErr] = useState([false, ""]);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const mNameRef = useRef(null);

  const token = useSelector((state) => state.globalVariables.csurf_token);
  const [nextButtonDiable, setNextButtonDisable] = useState(false);
  const dispatch = useDispatch();
  const [smallMessage, setSmallMessage] = useState(["none", ""]);
  const setError = (status, message, varient) => {
    dispatch(errorActions.setCustomError({ status, message }));
    setSmallMessage([varient || "err", message]);
  };
  const validateInput = () => {
    let result = true;
    //cleanup
    const arr = [setfNameErr, setlNameErr, setmNameErr];
    arr.forEach((el) => {
      el([false, ""]);
    });
    //logic
    if (fNameRef.current.value.trim() === "") {
      setfNameErr([true, "Please enter your First name"]);
      setError(0, "Please Fill All the * marked fields", "err");
      result = false;
    }
    if (lNameRef.current.value.trim() === "") {
      setlNameErr([true, "Please enter your Last name"]);
      setError(0, "Please Fill All the * marked fields", "err");
      result = false;
    }

    return result;
  };
  const nextButtonClicked = async () => {
    //initials
    dispatch(loadingAction.setLoading("newUSerSteps", true));
    setNextButtonDisable(true);
    //validate inputs
    if (!validateInput()) {
      dispatch(loadingAction.setLoading("newUSerSteps", false));
      setNextButtonDisable(false);

      return;
    }

    //set Data

    try {
      const resp = await csrfAxiosApi("/registrationSteps", token, {
        data: {
          fName: fNameRef.current.value.trim(),
          lName: lNameRef.current.value.trim(),
          mName: mNameRef.current.value.trim(),
        },
      });
      props.reFetch(true);
    } catch (error) {
      // console.log(error.response)
      switch (error.response.data.code) {
        case "WRONG_PLACE":
          props.reFetch(true);

          setError(401, "wrong place, redirecting...", "err");
          break;
        case "INVALID_DATA_FORMAT":
          setError(400, "Invalid data please re-fill the form", "err");
          break;
        case "INCOMPLETE_DATA":
          setError(400, "Please fill all the fields", "err");
          break;
        case "ERR_TOKEN":
          dispatch(global_data.setGlobalVariableObject({ login: false }));
          break;
        default:
          setError(
            500,
            "internal error occurred, Please try again after some time",
            "err"
          );
          break;
      }
      dispatch(loadingAction.setLoading("newUSerSteps", false));
    }

    //clean

    setNextButtonDisable(false);
  };

  return (
    <div className="stepOne stepsContainer">
      <header className="stepsContainer_header">step one</header>

      <div className="InputContainerHolder">
        {smallMessage[0] !== "none" ? (
          <SmallMessageBox1
            variant={smallMessage[0]}
            message={smallMessage[1]}
          />
        ) : (
          false
        )}
        <TextField
          error={fNameErr[0]}
          required
          label="First Name"
          variant="outlined"
          className="text-field"
          inputRef={fNameRef}
          helperText={
            <HelperText text={fNameErr[1]} variant={fNameErr[0] ? "err" : ""} />
          }
        />
        <TextField
          error={mNameErr[0]}
          label="Middle Name"
          variant="outlined"
          className="text-field"
          inputRef={mNameRef}
          helperText={
            <HelperText text={mNameErr[1]} variant={mNameErr[0] ? "err" : ""} />
          }
        />
        <TextField
          error={lNameErr[0]}
          required
          label="Last Name"
          variant="outlined"
          className="text-field"
          inputRef={lNameRef}
          helperText={
            <HelperText text={lNameErr[1]} variant={lNameErr[0] ? "err" : ""} />
          }
        />
      </div>
      <div className="buttonContainer">
        {/* <Button
          disabled={nextButtonDiable}
          variant="contained"
          onClick={nextButtonClicked}
        >
          pervious
        </Button> */}
        <Button
          disabled={nextButtonDiable}
          variant="contained"
          onClick={nextButtonClicked}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

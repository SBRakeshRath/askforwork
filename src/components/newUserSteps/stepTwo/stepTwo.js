import { useState } from "react";
import { useRef } from "react";
import { Button } from "@mui/material";
import errorActions from "redux_local/actions/error";
import { useDispatch, useSelector } from "react-redux";
import loadingAction from "redux_local/actions/loading";
import "./../steps.scss";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import csrfAxiosApi from "g-components/axios/csrfAxios";
import DatePicker from "g-components/inputs/datePicker/datePicker";
import Textarea from "g-components/inputs/textarea/testarea";
import global_data from "redux_local/actions/global_data";

export default function StepOne(props) {
  const bioRef = useRef(null);
  const dobRef = {
    date: useRef(null),
    month: useRef(null),

    year: useRef(null),
  };
  const [dateErr, setDateErr] = useState([false, ""]);
  const [bioErr, setBioErr] = useState([false, ""]);

  const token = useSelector((state) => state.globalVariables.csurf_token);
  const [nextButtonDiable, setNextButtonDisable] = useState(false);
  const dispatch = useDispatch();
  const [smallMessage, setSmallMessage] = useState(["none", ""]);
  const validateInput = () => {
    let result = true;
    if (bioRef.current.innerText.length > 50) {
      result = false;
      setBioErr([true, "BIO can only contain upto 50 letter"]);
    }

    // date

    function getAge(year, month, date) {
      var today = new Date();
      var birthDate = new Date(year, month, date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    const age = getAge(
      dobRef.year.current.value,
      dobRef.month.current.value,
      dobRef.date.current.value
    );

    if (age < 18) {
      setDateErr([true, "You have to minimum 18 year old"]);
      result = false;
    }

    //cleanup
    return result;
  };
  const nextButtonClicked = async () => {
    //initials

    // validate inputs
    if (!validateInput()) {
      dispatch(
        errorActions.setCustomError({
          status: 0,
          message: "Please Enter the Valid Input",
        })
      );
      setSmallMessage(["err", "Please Enter the Valid Input"]);

      return;
    }

    //set Data

    dispatch(loadingAction.setLoading("newUSerSteps", true));
    setNextButtonDisable(true);

    try {
      const resp = await csrfAxiosApi("/registrationSteps/stepTwo", token, {
        data: {
          dob: {
            year: parseInt(dobRef.year.current.value),
            month: parseInt(dobRef.month.current.value),
            date: parseInt(dobRef.date.current.value),
          },
          // bio: bioRef.current.innerText,
        },
      });
      props.reFetch(true);
    } catch (error) {
      if (!error.response || !error.response.data.code) {
        dispatch(
          errorActions.setCustomError({
            status: 0,
            message:
              "An internal error occurred, Please try again after sometime",
          })
        );
        setSmallMessage([
          "err",
          "An internal error occurred, Please try again after sometime",
        ]);
      }
      switch (error.response.data.code) {
        case "WRONG_PLACE":
          props.reFetch(true);
          dispatch(
            errorActions.setCustomError({
              status: 0,
              message: "wrong place, redirecting...",
            })
          );
          setSmallMessage(["err", "wrong place, redirecting..."]);

          break;
        case "INVALID_DATA":
          dispatch(
            errorActions.setCustomError({
              status: 0,
              message: "Invalid data please re-fill the form,",
            })
          );
          setSmallMessage(["err", "Invalid data please re-fill the form"]);
          break;
        case "ERR_TOKEN":
          dispatch(global_data.setGlobalVariableObject({ login: false }));
          break;
        default:
          dispatch(
            errorActions.setCustomError({
              status: 500,
              message: "Invalid data please re-fill the form",
            })
          );
          setSmallMessage([
            "err",
            "internal error occurred, Please try again after some time",
          ]);
          break;
      }
      dispatch(loadingAction.setLoading("newUSerSteps", false));
    }

    //clean
    dispatch(loadingAction.setLoading("newUSerSteps", false));
    setNextButtonDisable(false);
  };

  return (
    <div className="stepOne stepsContainer">
      <header className="stepsContainer_header">step two</header>

      <div className="InputContainerHolder">
        {smallMessage[0] !== "none" ? (
          <SmallMessageBox1
            variant={smallMessage[0]}
            message={smallMessage[1]}
          />
        ) : (
          false
        )}
        <DatePicker
          name="dob"
          dateRef={dobRef}
          header="Choose your Date of Birth"
          err={dateErr}
        />

        <Textarea
          header="Write something about you(Bio) :"
          name="bio"
          inputRef={bioRef}
          maxLength={50}
        />
      </div>
      <div className="buttonContainer">
        <Button
          disabled={nextButtonDiable}
          variant="contained"
          onClick={nextButtonClicked}
        >
          previous
        </Button>
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

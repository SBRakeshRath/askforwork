import CenterBox from "g-components/box/center-box";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import PhoneNoPicker from "g-components/inputs/phoneNo/phoneNo";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import HelperText from "g-components/text/helperText";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import "./login.scss";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import TimeOutLoader from "g-components/text/timeOutLoader/TimeOutLoader";
import { auth } from "firebase.js";
import { useSelector, useDispatch } from "react-redux";
import csrfAxiosApi from "g-components/axios/csrfAxios";
import error_redux from "redux_local/actions/error";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const disabledTimeOut = "60";
  const [animatorBool, setAnimatorBool] = useState(false);
  const [smallMessage, setSmallMessage] = useState([
    "none",
    "please fill the form",
  ]);
  const [otpTimeOutBool, setOtpTimeOutBool] = useState(false);
  const [getOtpDisabled, setGetOtpDisabled] = useState(false);
  const [numError, setNumError] = useState([false, ""]);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [otpError, setOptError] = useState([false, ""]);
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  const [signInButtonDisabled, setSignInButtonDisabled] = useState(false);
  const [conformationResult, setConformationResult] = useState(null);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const signInButton = useRef(null);
  const phoneNumRef = useRef(null);
  const otpButton = useRef(null);
  const recaptchaContainer = useRef(null);
  const otpRef = useRef(null);
  const resendOtpTimeOut = useRef(null);

  const navigate = useNavigate();
  //redux variables
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.globalVariables.csurf_token);

  const resetLoginForm = (err) => {
    setGetOtpDisabled(false);
    if (err) {
      setSmallMessage(["err", "Please try again !!"]);
    }
    setShowOtpContainer(false);
    setOtpTimeOutBool(false);
  };
  const reSendOtp = () => {
    setOtpTimeOutBool(true);
    const timeOut = parseInt(disabledTimeOut) * 1000;
    resendOtpTimeOut.current = setTimeout(() => {
      setGetOtpDisabled(false);
      setOtpTimeOutBool(false);
    }, timeOut);
  };

  useEffect(() => {
    return () => {
      if (resendOtpTimeOut.current != null) {
        clearTimeout(resendOtpTimeOut.current);
      }
    };
  }, []);

  //sendOtp

  const sendOtp = () => {
    setGetOtpDisabled(true);

    setShowOtpContainer(false);
    setConformationResult("");
    setSmallMessage(["default", "Sending Otp..."]);
    signInWithPhoneNumber(
      auth,
      phoneNumRef.current.value + "",
      recaptchaVerifier
    )
      .then((res) => {
        setSmallMessage(["suc", "otp sent"]);
        setShowOtpContainer(true);
        setConformationResult(res);
        reSendOtp();
      })
      .catch((error) => {
        dispatch(error_redux.firebaseError(error));

        resetLoginForm(true);

        switch (error.code) {
          case "auth/invalid-phone-number":
            setSmallMessage(["err", "Invalid Phone number !!"]);
            setNumError([true, "Invalid Number"]);
            break;
          case "auth/too-many-requests":
            setSmallMessage([
              "err",
              "Too many requests, Please try again after some time",
            ]);
            break;

          default:
            setSmallMessage([
              "err",
              "an error occurred, please try again after some time",
            ]);
            break;
        }
      })
      .finally(() => {});
  };

  useLayoutEffect(() => {
    if (recaptchaContainer == null) return;
    if (recaptchaVerifier != null) return;
    const generateRecaptcha = () => {
      const recaptcha = new RecaptchaVerifier(
        recaptchaContainer.current,
        {
          size: "normal",
          callback: () => {
            setCaptchaCompleted(true);
          },
          "expired-callback": () => {
            setCaptchaCompleted(false);
          },
        },
        auth
      );
      setRecaptchaVerifier(recaptcha);
    };
    generateRecaptcha();
  }, [recaptchaContainer, recaptchaVerifier]);

  useEffect(() => {
    if (recaptchaVerifier == null) return;
    recaptchaVerifier.render();
  }, [recaptchaVerifier]);

  function ButtonClick() {
    //get phone number
    setNumError([false, ""]);
    if (phoneNumRef.current.value === "0") {
      setNumError([true, "Invalid Number"]);
      return;
    }
    if (!captchaCompleted) {
      setSmallMessage(["err", "Please complete the captcha"]);

      return;
    }

    sendOtp();
  }

  // validate Otp

  const signInButtonClicked = async () => {
    setSmallMessage(["none", ""]);
    const otp = otpRef.current.value;
    if (conformationResult === "") {
      resetLoginForm();
      return;
    }

    // now Login with otp
    setAnimatorBool(true);
    conformationResult
      .confirm(otp)
      .then((res) => {
        csrfAxiosApi("/sessionToken", csrfToken, {
          data: {
            idToken: res.user.accessToken,
          },
        })
          .then((tokenRes) => {
            if (tokenRes.data.code === "SUCCESS") {
              setSmallMessage(["suc", "successfully logged in"]);
              window.location.href = process.env.REACT_APP_LOGIN_DEFAULT_LINK
              return;
            }

            dispatch(
              error_redux.setCustomError({
                message:
                  "an Internal error occurred,  Please try again after some time",
              })
            );

            setSmallMessage([
              "err",
              "an Internal error occurred,  Please try again after some time",
            ]);
          })
          .catch(() => {
            dispatch(
              error_redux.setCustomError({
                message:
                  "an Internal error occurred,  Please try again after some time",
              })
            );

            setSmallMessage([
              "err",
              "an Internal error occurred,  Please try again after some time",
            ]);
          })
          .finally(() => {
            setAnimatorBool(false);
          });
        //get session token
      })
      .catch((error) => {
        dispatch(error_redux.firebaseError(error));

        switch (error.code) {
          case "auth/invalid-verification-code":
            setSmallMessage(["err", "wrong otp"]);
            break;

          default:
            setSmallMessage([
              "err",
              "an error occurred,  Please try again after some time",
            ]);

            break;
        }
        setAnimatorBool(false);
      })
      .finally(() => {});
  };

  return (
    <CenterBox id="login" animation={animatorBool}>
      <header>Login</header>
      <div className="inputs">
        {smallMessage[0] !== "none" ? (
          <SmallMessageBox1
            variant={smallMessage[0]}
            message={smallMessage[1]}
          />
        ) : (
          false
        )}
        <div className="form">
          <div className="phoneNumberHolder">
            <PhoneNoPicker
              label="phone number"
              name="phoneNumber"
              hiddenInputRef={phoneNumRef}
              error={numError}
            />

            <div className="recaptcha-container" ref={recaptchaContainer}></div>
            {otpTimeOutBool ? (
              <TimeOutLoader timeout={disabledTimeOut} text="resend OTP in" />
            ) : null}
            <Button
              disabled={getOtpDisabled}
              variant="contained"
              onClick={ButtonClick}
              ref={otpButton}
              id="recaptcha"
            >
              Get OTP
            </Button>
            <div></div>
          </div>
          {showOtpContainer ? (
            <div className="otpHolder">
              <TextField
                error={otpError[0]}
                required
                label="Enter OTP"
                variant="outlined"
                className="text-field"
                inputRef={otpRef}
                helperText={
                  <HelperText
                    text={otpError[1]}
                    variant={otpError[0] ? "err" : ""}
                  />
                }
              />

              <Button
                disabled={signInButtonDisabled}
                variant="contained"
                onClick={signInButtonClicked}
                ref={signInButton}
                id="recaptcha"
              >
                Sign In
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </CenterBox>
  );
}

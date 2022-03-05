import { Button, TextField } from "@mui/material";
import HelperText from "g-components/text/helperText";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import { useSelector } from "react-redux";
import "./../steps.scss";
import { useState, useRef } from "react";

export default function StepThree(params) {
  const [sm, setSm] = useState(["none", ""]);
  const [emailErr, setEmailErr] = useState([false, ""]);
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);

  const emailRef = useRef(null);

  const email = useSelector((state) => state.useProfilerData.email);

  const sendOtp = () => {
    setSm(["", "sending otp"]);
    if (emailRef.current.value === "") {
      setSm(["err", "invalid email"]);
      setEmailErr([true, "invalid email"]);

      return;
    }
    // send otp
  };
  return (
    <div className="stepOne stepsContainer">
      <header className="stepsContainer_header">step three</header>
      <div className="InputContainerHolder">
        {sm[0] !== "none" ? (
          <SmallMessageBox1 variant={sm[0]} message={sm[1]} />
        ) : (
          false
        )}
        <TextField
          error={emailErr[0]}
          required
          label="Enter Email"
          variant="outlined"
          className="text-field"
          inputRef={emailRef}
          helperText={
            <HelperText text={emailErr[1]} variant={emailErr[0] ? "err" : ""} />
          }
          defaultValue={email ? email : ""}
        />
        <Button
          variant="contained"
          disabled={otpButtonDisabled}
          onClick={sendOtp}
        >
          Send Otp
        </Button>
      </div>
    </div>
  );
}

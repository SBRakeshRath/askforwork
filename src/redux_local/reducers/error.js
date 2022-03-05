const initialState = {
  msg: "EveryThing is working Fine",
  status: 200,
  button: false,
  disableSite: false,
  showErrorMessage: false,
};
// import { Dispatch } from "react";

class errorReducerClass {
  constructor(state, action) {
    this.state = state;
    this.action = action;
  }
  setCustomAxiosError(error) {
    this.showErrorMessage(true);
    if (!error.response) {
      this.state.msg = "something wrong happened. Please try after Some time";
      this.state.status = 502;
      return;
    }
    switch (error.response.status) {
      case 500:
        this.state.msg = "something wrong happened. Please try after Some time";
        this.state.status = 500;
        break;
      case 401:
        this.state.msg = "un authorized access";
        this.state.status = 401;
        break;
      default:
        this.state.msg = "something wrong happened. Please try after Some time";
        this.state.status = 400;
        break;
    }
  }
  firebaseError(error) {
    this.showErrorMessage(true);

    switch (error.code) {
      case "auth/invalid-verification-code":
        this.state.status = 400;
        this.state.msg = "wrong verification code";
        break;
      case "auth/invalid-phone-number":
        this.state.status = 400;
        this.state.msg = "Invalid Number";
        break;
      case "auth/too-many-requests":
        this.state.status = 400;
        this.state.msg = "Too many requests, Please try again after some time";
        break;
      default:
        this.state.msg = "something wrong happened. Please try after Some time";
        this.state.status = 400;
        break;
    }
  }
  setCustomError(error) {
    this.showErrorMessage(true);
    this.state.status = 0;
    this.state.msg = error.message;
    this.state.button = error.button || false;
    this.state.disableSite = error.disableSite || false;
  }
  setAutoError(error, msg) {
    this.showErrorMessage(true);

    if (error.response) {
      // axios error
      this.setCustomAxiosError(error);

      return;
    }
    if (error.code) {
      this.firebaseError(error);
      return;
    }
    this.setCustomError(error);

    if (msg && msg !== "") {
      this.state.msg = msg;
    }
  }
  cleanError() {
    this.showErrorMessage(false);

    this.state.msg = "EveryThing is working Fine";
    this.state.status = 200;
  }
  showErrorMessage(bool) {
    this.state.showErrorMessage = bool;
  }

  reducerResponse() {
    // response
    switch (this.action.type) {
      case "SET_AXIOS_ERROR":
        this.setCustomAxiosError(this.action.error);
        break;
      case "FIREBASE_ERROR":
        this.firebaseError(this.action.error);
        break;
      case "SET_CUSTOM_ERROR":
        this.setCustomError(this.action.error);
        break;
      case "CLEAN_ERROR":
        this.cleanError();
        break;
      case "SHOW_ERROR_MESSAGE":
        this.showErrorMessage(this.action.bool);
        break;
      case "SET_AUTO_ERROR":
        this.setAutoError(this.action.error, this.action.message || "");
        break;
      default:
        break;
    }

    return { ...this.state };
  }
}
const reducerFunction = (state = initialState, action) => {
  return new errorReducerClass(state, action).reducerResponse();
};
const errorReducer = reducerFunction;
export default errorReducer;
export { errorReducerClass };

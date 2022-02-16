class errorAction {
  setAxiosError(error) {
    return { type: "SET_AXIOS_ERROR", error: error };
  }
  firebaseError(error) {
    return { type: "FIREBASE_ERROR", error: error };
  }
  setCustomError(error) {
    return { type: "SET_CUSTOM_ERROR", error: error };
  }
  cleanError() {
    return { type: "CLEAN_ERROR" };
  }
  showErrorMessage(bool) {
    return { type: "SHOW_ERROR_MESSAGE", bool: bool };
  }
}
export default new errorAction();

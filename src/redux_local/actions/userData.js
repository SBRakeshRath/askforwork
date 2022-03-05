class userProfileAction {
  changeUserData(params) {
    return { type: "CHANGE_USER_DATA" };
  }
  setUserData(state) {
    return {
      type: "SET_DATA",
      data: state,
    };
  }
}

export default new userProfileAction();

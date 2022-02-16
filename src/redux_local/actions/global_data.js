class globalDataAction {
  setGlobalVariableObject(globalObj) {
    return {
      type: "SET-GLOBAL-VARIABLE",
      data: {
        globalObj: globalObj,
      },
    };
  }
  setCsurfToken(token) {
    return {
      type: "SET-CSURF-TOKEN",
      data: {
        token: token,
      },
    };
  }
}

export default new globalDataAction();

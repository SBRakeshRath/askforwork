const initialState = {
  csurf_token: "",
};

class globalVariablesReducers {
  constructor(state, action) {
    this.state = state;
    this.action = action;
  }
  setGlobalVariables(obj) {
    Object.keys(obj).forEach((key) => {
      this.state[key] = obj[key];
    });
  }
  setCsurfToken(token) {
    this.state.csurf_token = token;
  }
  reducerResponse() {
    // response
    switch (this.action.type) {
      case "SET-GLOBAL-VARIABLES":
        this.setGlobalVariables(this.action.data.globalObj);
        break;

      case "SET-CSURF-TOKEN":
        this.setCsurfToken(this.action.data.token);
        break;

      default:
        break;
    }

    const result = Object.create(this.state);
    return result;
  }
}
const reducerFunction = (state = initialState, action) => {
  return new globalVariablesReducers(state, action).reducerResponse();
};
const globalVariables = reducerFunction;
export default globalVariables;
export { globalVariablesReducers };

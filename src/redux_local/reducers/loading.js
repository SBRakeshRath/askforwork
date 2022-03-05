const initialState = {
  global: true,
  dashboard : true ,
  newUSerSteps : true
};

class loadingReducerClass {
  constructor(state, action) {
    this.state = state;
    this.action = action;
  }
  setLoadingObj(obj) {
    Object.keys(obj).forEach((key) => {
      this.state[key] = obj[key];
    });
  }
  setGlobalLoading(bool) {
    this.state.global = bool;
  }
  setLoading(name, bool) {
    this.state[name] = bool;
  }
  reducerResponse(state) {
    // response
    switch (this.action.type) {
      case "SET-LOADING-OBJECT":
        this.setLoadingObj(this.action.data.loadingObj);
        break;

      case "SET-GLOBAL-LOADING":
        this.setGlobalLoading(this.action.data.bool);
        break;

      case "SET-SINGLE-LOADING":
        this.setLoading(this.action.data.name, this.action.data.bool);
        break;

      default:
        break;
    }
    return {...this.state};
  }
}
const reducerFunction = (state = initialState, action) => {
  return new loadingReducerClass(state, action).reducerResponse();
};
const loadingReducer = reducerFunction;
export default loadingReducer;
export { loadingReducerClass };

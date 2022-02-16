import { combineReducers } from "redux";
import errorReducer from "./error";
import useProfilerData from "./userData";
import loadingReducer from "./loading";
import globalVariables from "./global_data";
export const rootReducer = combineReducers({
  useProfilerData,
  errorReducer,
  loadingReducer,
  globalVariables,
});

import { combineReducers } from "redux";
import errorReducer from "./error";
import useProfilerData from "./userData";
import loadingReducer from "./loading";
export const rootReducer = combineReducers({
  useProfilerData,
  errorReducer,
  loadingReducer,
});

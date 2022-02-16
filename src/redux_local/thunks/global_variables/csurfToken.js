import global_data from "redux_local/actions/global_data";
import error_redux from "redux_local/actions/error";

import axios from "axios";
function getCsurfToken(bool) {
  return async (dispatch, getState) => {
    const token = getState().globalVariables.csurf_token;
    if (token !== "" && !bool) {
      return;
    }
    await dispatch(global_data.setCsurfToken(""));
    const bl =
      process.env.REACT_APP_BACKEND_LINK ||
      " http://auth.backend.askforwork.in";
    try {
      const config = {
        url: bl + "/api",
        method: "GET",
        withCredentials: true,
      };
      const res = await axios(config);
      dispatch(global_data.setCsurfToken(res.data.token));
    } catch (error) {
      dispatch(error_redux.setAxiosError(error));
    }
  };
}
async function globalFetchCsurfToken() {
  let token = ""
  const bl =
    process.env.REACT_APP_BACKEND_LINK || " http://auth.backend.askforwork.in";
  try {
    const config = {
      url: bl + "/api",
      method: "GET",
      withCredentials: true,
    };
    const res = await axios(config);
    token = res.data.token
  } catch (error) {
    throw error ;
  }
  return token ;
}
export default getCsurfToken;
export {globalFetchCsurfToken}

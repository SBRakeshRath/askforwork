import { globalFetchCsurfToken } from "./csurfToken";
import global_data from "redux_local/actions/global_data";
import loading from "redux_local/actions/loading";
import error_redux from "redux_local/actions/error";
function globalVariables() {
  return async (dispatch, getState) => {
    try {
      await dispatch(loading.setGlobalLoading(true));
      // default values
      await dispatch(global_data.setCsurfToken(""));

      //async fetch value

      const csrfToken = await globalFetchCsurfToken();
      dispatch(global_data.setCsurfToken(csrfToken));
    } catch (error) {
        dispatch(error_redux.setCustomError({message:"something went wrong !! please try again after some time"}));

    }finally{
      await dispatch(loading.setGlobalLoading(false));
    }
  };
}

export default globalVariables;

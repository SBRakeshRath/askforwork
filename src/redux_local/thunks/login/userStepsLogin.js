import userData from "redux_local/actions/userData";
import csrfAxiosApi from "g-components/axios/csrfAxios";
import errorAction from "redux_local/actions/error";
import loading from "redux_local/actions/loading";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "firebase.js";
import global_data from "redux_local/actions/global_data";
export default function userStepsLogin() {
  return async function (dispatch, getState) {
    const token = getState().globalVariables.csurf_token;
    if (token === "") {
      return;
    }
    await dispatch(loading.setLoading("newUSerSteps", true));

    try {
      await dispatch(userData.setUserData({ loading: true }));

      const res = await csrfAxiosApi("/sessionToken/newUserStepLogin", token, {
        data: {},
      });
      await signInWithCustomToken(auth, res.data.token);
      dispatch(
        userData.setUserData({
          ...res.data.userData,
          token: res.data.token,
          loading: true,
        })
      );
      await dispatch(userData.setUserData({ loading: false }));

      dispatch(loading.setLoading("newUSerSteps", false));
    } catch (error) {
      dispatch(errorAction.setAxiosError(error));
      if (error.response && error.response.data.code === "ERR_TOKEN") {
        dispatch(global_data.setGlobalVariableObject({ login: false }));
      }
    }
  };
}

import axios from "axios";
import * as apiList from "../apiList";
import * as actionType from "./actionType";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (err) => {
  return {
    type: actionType.AUTH_FAIL,
    error: err,
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const auth = (email, password) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };

    axios({
      method: "post",
      url: apiList.loginUrl,
      data: authData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data._id);
      dispatch(authSuccess(response.data.token, response.data._id));
    });
  };
};

export const autoCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};

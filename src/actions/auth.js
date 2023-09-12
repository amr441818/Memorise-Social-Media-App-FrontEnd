import * as api from "../api/auth.js";
import { AUTH, ERROR } from "../constants/acionTypes";
import { authActons } from "../store/auth-slice.js";

export const singInAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch(authActons.addAuthData(data));

    navigate("/");
  } catch (error) {
    dispatch(
      authActons.addErrors({
        data: error.response ? error.response.data : "somthing went wrong",
      })
    );
    // dispatch({
    //   type: AUTH_ERROR,
    //   data: error.response ? error.response.data : "somthing went wrong",
    // });
  }
};
export const signUpAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    // dispatch({ type: AUTH, data: data });
    dispatch(authActons.addAuthData(data));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(
      authActons.addErrors({
        data: error.response ? error.response.data : "somthing went wrong",
      })
    );
  }
};

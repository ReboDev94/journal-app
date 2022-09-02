import { registerWithEmailPassword, singInWithGoogle, singInWithEmailPassword, logoutFirebase } from "../../../firebase/providers";
import { checkingCredentials, logout, login } from "./actions";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.success) dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const { success, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });
    if (!success) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }));
  }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const result = await singInWithEmailPassword({ email, password });
    if (!result.success) return dispatch(logout({ errorMessage: result.errorMessage }));
    dispatch(login(result));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  }
}
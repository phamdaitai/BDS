import { AuthService } from "./services";
import { AuthConstants } from "./constants";
import { setStorage, clearStorage } from '../../../config';
import store from '../../../redux/store';

export const AuthActions = {
    login,
    setCurrentUser,
    logOut
}

function login(user) {
    return dispatch => {
        dispatch({ type: AuthConstants.LOGIN_REQUEST });
        AuthService.login(user)
            .then(res => {
                setStorage('token', res.data?.content?.token);
                setStorage('userId', res.data?.content?.user?._id);
                // setStorage('portal', res.data?.content?.user?.portal);

                dispatch({
                    type: AuthConstants.LOGIN_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: AuthConstants.LOGIN_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function setCurrentUser (decoded) {
    return {
        type: AuthConstants.SET_CURRENT_USER,
        payload: decoded,
    };
};

function logOut () {
    store.dispatch(setCurrentUser({}));
    clearStorage();
    // window.location.href = "/";
}
import { AuthService } from "./services";
import { AuthConstants } from "./constants";
import { setStorage } from '../../../config';

export const AuthActions = {
    login
}

function login(user) {
    return dispatch => {
        dispatch({ type: AuthConstants.LOGIN_REQUEST });
        AuthService.login(user)
            .then(res => {
                setStorage('token', res.data?.content?.token);
                setStorage('userId', res.data?.content?.user?._id);
                setStorage('portal', res.data?.content?.user?.portal);

                dispatch({
                    type: AuthConstants.LOGIN_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: AuthConstants.LOGIN_FAILE, payload: err?.response?.data?.messages?.[0] });
            })
    }
}
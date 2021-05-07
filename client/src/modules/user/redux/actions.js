import { UserService } from "./services";
import { UserConstants } from "./constants";

export const UserActions = {
    register,
}

function register(user) {
    return dispatch => {
        dispatch({ type: UserConstants.REGISTER_REQUEST });
        UserService.register(user)
            .then(res => {
                dispatch({
                    type: UserConstants.REGISTER_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.REGISTER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

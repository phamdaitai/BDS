import { AuthConstants } from "./constants";
import { isEmpty } from "../../../helpers/isEmpty";

var initState = {
    user: {},
    isLoading: false,
    error: null,
    isAuth: false
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case AuthConstants.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                isLoading: false,
            }
        
        case AuthConstants.SET_CURRENT_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: { ...state.user, ...action.payload }
            };
          

        default:
            return {
                ...state
            };
    }
}
import { AuthConstants } from "./constants";

var initState = {
    user: {},
    isLoading: false,
    error: null,
}

export function auth(state = initState, action) {
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case AuthConstants.LOGIN_FAILE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }

        default:
            return {
                ...state
            };
    }
}
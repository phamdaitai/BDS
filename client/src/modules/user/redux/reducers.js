import { UserConstants } from "./constants";

var initState = {
    profile: {},
    isLoading: false,
    error: null,
    isnewRegister: false,
}

export function user(state = initState, action) {
    switch (action.type) {
        case UserConstants.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case UserConstants.REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case UserConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isnewRegister: true,
                profile: action.payload
            }

        default:
            return {
                ...state
            };
    }
}
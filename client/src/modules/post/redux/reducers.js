import { PostConstants } from "./constants";

var initState = {
    postDetail: {},
    isLoading: false,
    error: null,
}

export function post(state = initState, action) {
    switch (action.type) {
        case PostConstants.POST_ADD_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case PostConstants.POST_ADD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case PostConstants.POST_ADD_SUCCESS:
            return {
                ...state,
                postDetail: action.payload,
                isLoading: false,
            }
          
        default:
            return {
                ...state
            };
    }
}
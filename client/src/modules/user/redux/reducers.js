import { UserConstants } from "./constants";
import { findIndex } from '../../../helpers/findIndex';

var initState = {
    userDetail: {},
    listUsers: [],
    isLoading: false,
    error: null,
    isnewRegister: false,
}

export function user(state = initState, action) {
    let index = -1;

    switch (action.type) {
        case UserConstants.REGISTER_REQUEST:
        case UserConstants.GET_ALL_USERS_REQUEST:
        case UserConstants.GET_USER_DETAIL_REQUEST:
        case UserConstants.UPDATE_USER_REQUEST:
        case UserConstants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case UserConstants.REGISTER_FAIL:
        case UserConstants.GET_ALL_USERS_FAIL:
        case UserConstants.GET_USER_DETAIL_FAIL:
        case UserConstants.UPDATE_USER_FAIL:
        case UserConstants.CHANGE_PASSWORD_FAIL:
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
                userDetail: action.payload
            }
        
        case UserConstants.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listUsers: action.payload.allUsers.docs,
                totalDocs: action.payload.allUsers.totalDocs,
                limit: action.payload.allUsers.limit,
                totalPages: action.payload.allUsers.totalPages,
                page: action.payload.allUsers.page,
                pagingCounter: action.payload.allUsers.pagingCounter,
                hasPrevPage: action.payload.allUsers.hasPrevPage,
                hasNextPage: action.payload.allUsers.hasNextPage,
                prevPage: action.payload.allUsers.prevPage,
                nextPage: action.payload.allUsers.nextPage
            }
        
        case UserConstants.GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                userDetail: action.payload.user,
                isLoading: false,
            }
        
        case UserConstants.UPDATE_USER_SUCCESS:
            index = findIndex(state.listUsers, action.payload.user._id);
            if(index !== -1){
                state.listUsers[index] = action.payload.user
            }
            return {
                ...state,
                isLoading: false
            }
        
        case UserConstants.CHANGE_PASSWORD_SUCCESS:
            index = findIndex(state.listUsers, action.payload.user._id);
            if(index !== -1){
                state.listUsers[index] = action.payload.user
            }
            return {
                ...state,
                isLoading: false
            }

        default:
            return {
                ...state
            };
    }
}
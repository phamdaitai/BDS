import { PostConstants } from "./constants";

var initState = {
    postDetail: {},
    listPosts: [],
    isLoading: false,
    error: null,
}

export function post(state = initState, action) {
    switch (action.type) {
        case PostConstants.POST_ADD_REQUEST:
        case PostConstants.UPLOAD_AVATAR_AND_IMAGE_REQUEST:
        case PostConstants.GET_ALL_POST_REQUEST:
        case PostConstants.GET_POST_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case PostConstants.POST_ADD_FAIL:
        case PostConstants.GET_ALL_POST_FAIL:
        case PostConstants.GET_POST_DETAIL_FAIL:
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
        
        case PostConstants.GET_ALL_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPosts: action.payload.allPosts.docs,
                totalDocs: action.payload.allPosts.totalDocs,
                limit: action.payload.allPosts.limit,
                totalPages: action.payload.allPosts.totalPages,
                page: action.payload.allPosts.page,
                pagingCounter: action.payload.allPosts.pagingCounter,
                hasPrevPage: action.payload.allPosts.hasPrevPage,
                hasNextPage: action.payload.allPosts.hasNextPage,
                prevPage: action.payload.allPosts.prevPage,
                nextPage: action.payload.allPosts.nextPage
            }
        
        case PostConstants.GET_POST_DETAIL_SUCCESS:
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
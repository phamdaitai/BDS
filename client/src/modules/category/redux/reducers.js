import { CategoryConstants } from "./constants";
import { findIndex } from '../../../helpers/findIndex';

var initState = {
    categoryDetail: {},
    listCategories: [],
    isLoading: false,
    error: null,
}

export function category(state = initState, action) {
    var index = -1;

    switch (action.type) {
        case CategoryConstants.CATEGORY_ADD_REQUEST:
        case CategoryConstants.GET_ALL_CATEGORIES_REQUEST:
        case CategoryConstants.GET_DETAIL_CATEGORY_REQUEST:
        case CategoryConstants.UPDATE_CATEGORY_REQUEST:
        case CategoryConstants.DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case CategoryConstants.CATEGORY_ADD_FAIL:
        case CategoryConstants.GET_ALL_CATEGORIES_FAIL:
        case CategoryConstants.GET_DETAIL_CATEGORY_FAIL:
        case CategoryConstants.UPDATE_CATEGORY_FAIL:
        case CategoryConstants.DELETE_CATEGORY_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case CategoryConstants.CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                listCategories: [action.payload.category, ...state.listCategories],
                isLoading: false,
            }
        
        case CategoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listCategories: action.payload.allCategories.docs,
                totalDocs: action.payload.allCategories.totalDocs,
                limit: action.payload.allCategories.limit,
                totalPages: action.payload.allCategories.totalPages,
                page: action.payload.allCategories.page,
                pagingCounter: action.payload.allCategories.pagingCounter,
                hasPrevPage: action.payload.allCategories.hasPrevPage,
                hasNextPage: action.payload.allCategories.hasNextPage,
                prevPage: action.payload.allCategories.prevPage,
                nextPage: action.payload.allCategories.nextPage
            }
        
        case CategoryConstants.GET_DETAIL_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryDetail: action.payload.category,
                isLoading: false,
            }
        
        case CategoryConstants.UPDATE_CATEGORY_SUCCESS:
            index = findIndex(state.listCategories, action.payload.category._id);
            if(index !== -1){
                state.listCategories[index] = action.payload.category
            }
            return {
                ...state,
                isLoading: false,
            }
        
        case CategoryConstants.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                listCategories: state.listCategories.filter(c => c._id !== action.payload.category._id),
                isLoading: false,
            }
        
        default:
            return {
                ...state
            };
    }
}
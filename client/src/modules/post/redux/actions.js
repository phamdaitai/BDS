import { PostServices } from "./services";
import { PostConstants } from "./constants";

export const PostActions = {
    createPost
}

function createPost(data) {
    return dispatch => {
        dispatch({ type: PostConstants.POST_ADD_REQUEST });
        PostServices.createPost(data)
            .then(res => {
                dispatch({
                    type: PostConstants.POST_ADD_SUCCESS,
                    payload: res.data?.content?.post
                })
            })
            .catch(err => {
                dispatch({ type: PostConstants.POST_ADD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}
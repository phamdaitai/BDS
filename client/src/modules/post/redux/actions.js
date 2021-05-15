import { PostServices } from "./services";
import { PostConstants } from "./constants";
import { UploadActions } from "../../upload/redux/actions";

export const PostActions = {
    createPost,
    uploadAvatarAndImage,
    requestUploading
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

function uploadAvatarAndImage (avatar, images) {
    return Promise.all([
        UploadActions.uploadMultiImages(avatar),
        UploadActions.uploadMultiImages(images)
    ])
        .then(res => {
            return {
                avatar: res[0].imageLinks,
                images: res[1].imageLinks,
            }
        })
        .catch(err => {
            return {
                type: PostConstants.UPLOAD_AVATAR_AND_IMAGE_FAIL,
                error: err
            }
        })
}

//Tạo trạng thái đang upload cho hình ảnh: isLoading = true
function requestUploading (){
    return dispatch => {
        dispatch({
            type: PostConstants.UPLOAD_AVATAR_AND_IMAGE_REQUEST,
        })
    }
}
const { initConnection } = require('../../helpers/dbHelpers');

exports.createPost = async (data, portal) => {
    let Post = initConnection(portal).model("Post");

    let newPost = await Post.create(data);
    let post = await Post.findById({ _id: newPost._id });
    return { post }
}
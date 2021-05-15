const { initConnection } = require('../../helpers/dbHelpers');

exports.createPost = async (data, portal) => {
    let Post = initConnection(portal).model("Post");

    let newPost = await Post.create(data);
    let post = await Post.findById({ _id: newPost._id });
    return { post }
}

exports.getAllPosts = async (query, portal) => {
    let { page, limit } = query;
    let option = {};

    let Post = initConnection(portal).model("Post");

    if (!page || !limit) {
        let allPosts = await Post
            .find(option)
        
        return {allPosts}
    } else {
        let allPosts = await Post.paginate(option, {
            page,
            limit
        })

        return {allPosts}
    }
}

exports.getDetailPost = async (id, portal) => {
    console.log("ID", id);
    let Post = initConnection(portal).model("Post");

    let post = await Post
    .findById(id)

    if (!post) {
        throw Error("Post is not existing")
    }

    if (post.province) {
        let Province = initConnection(portal).model("Province");
        province = await Province.findOne({ id: post.province });
        console.log("province", province);
        if (province) post.province = province;
    }

    if (post.district) {
        let Disctrict = initConnection(portal).model("District");
        district = await Disctrict.findOne({ id: post.district });
        if (district) post.district = district;
    }

    if (post.ward) {
        let Ward = initConnection(portal).model("Ward");
        ward = await Ward.findOne({ id: post.ward });
        if (ward) post.ward = ward;
    }

    return { post }
}

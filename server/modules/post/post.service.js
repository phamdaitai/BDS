const { initConnection } = require('../../helpers/dbHelpers');

exports.createPost = async (data, user, portal) => {
    let Post = initConnection(portal).model("Post");
    let User = initConnection(portal).model("User");

    let newPost = await Post.create({ ...data, userName: user.name, userPhone: user.phone });
    let post = await Post.findById({ _id: newPost._id });

    let userInfo = await User.findById(user._id);
    if (userInfo) {
        userInfo.post.push(newPost._id);
        userInfo.save();
    }

    return { post }
}

exports.getAllPosts = async (query, portal) => {
    let { page, limit } = query;
    let option = {};

    let Post = initConnection(portal).model("Post");

    if (!page || !limit) {
        let allPosts = await Post
            .find(option)
            .populate([{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            }])
        
        return {allPosts}
    } else {
        let allPosts = await Post.paginate(option, {
            page,
            limit,
            populate: [{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            }]
        })

        console.log("allPosts", allPosts);

        return {allPosts}
    }
}

exports.getDetailPost = async (id, portal) => {
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
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
            .sort({createdAt: 'desc' })
        
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
            }],
            sort: { 'createdAt': 'desc' }
        })

        return {allPosts}
    }
}

exports.getDetailPost = async (id, portal) => {
    let Post = initConnection(portal).model("Post");

    let post = await Post
        .findById(id)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        }])
    
    if (!post) {
        throw Error("Post is not existing")
    }

    return { post }
}

//Chỉ người đăng mới được sửa, nên cần xác thực trước khi trả về data
exports.getPostForUpdate = async (postId, userId, portal) => {
    let Post = initConnection(portal).model("Post");
    let User = initConnection(portal).model("User");

    let user = await User.findById(userId);

    if (!user) {
        throw Error("User is not existing")
    }

    //Check post đó có phải của user này hay k
    let isPostOfUser = user.posts.includes(postId);

    if (!isPostOfUser) {
        throw Error("you_can_not_access")
    }

    let post = await Post
        .findById(postId)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        }])
    
    if (!post) {
        throw Error("Post is not existing")
    }

    return { post }
}

exports.updatePost = async (id, data, portal) => {
    let Post = initConnection(portal).model("Post");

    let post = await Post.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { post }
}

exports.deletePost = async (id, portal) => {
    let Post = initConnection(portal).model("Post");

    let post = await Post.findByIdAndDelete(id);

    return {post}
}
const { initConnection } = require('../../helpers/dbHelpers');
const paymentService = require('../payment/payment.service');

exports.createPost = async (data, user, portal) => {
    let Post = initConnection(portal).model("Post");
    let User = initConnection(portal).model("User");
    
    //Kiem tra bai dang VIP
    if (data.vipType && data.vipPoint) {
        let date = new Date();

        if (data.vipType === 1) {//Goi 1 ngay
            data.vipExpirationDate = date.setDate(date.getDate() + 1)
        } else {//Goi 30 ngay
            data.vipExpirationDate = date.setDate(date.getDate() + 30)
        }
        data.status = 2;
    } else if (!data.vipType && data.vipPoint) {
        data.vipPoint = 0;
    }

    //Them bai viet vao db
    let newPost = await Post.create({ ...data, userName: user.name, userPhone: user.phone });
    let post = await Post.findById({ _id: newPost._id });

    let userInfo = await User.findById(user._id);

    //Them vao danh sach bai post cua nguoi dang
    if (userInfo) {
        userInfo.posts.push(newPost._id);
        await userInfo.save();
    }

    //Luu lich su giao dich
    if (data.vipType && data.vipPoint) {
        const transactionData = {
            owner: user._id,
            post: post._id,
            transaction: data.vipFee,
            type: 2
        }
        await paymentService.createPayment(transactionData, user, portal)
    }

    return { post }
}

exports.getAllPosts = async (query, portal) => {
    let { page, limit, categories, address, province, district, ward,
        direction, priceFrom, priceTo, acreageFrom, acreageTo,
        title, userName, userPhone, status, follows} = query;
    let option = {};

    //Set query option
    if (categories) option.categories = categories;
    if (address) option.address = new RegExp(address, "i");
    if (province) option.province = province;
    if (district) option.district = district;
    if (ward) option.ward = ward;
    if (direction) option.direction = direction;
    if (priceFrom && priceTo) option.price = { $gte: priceFrom, $lte: priceTo }
    if (acreageFrom && acreageTo) option.acreage = { $gte: acreageFrom, $lte: acreageTo }
    if (title) option.title = new RegExp(title, "i");
    if (userName) option.userName = new RegExp(userName, "i");
    if (userPhone) option.userPhone = new RegExp(userPhone, "i");
    if (status) option.status = status;
    if (follows) option.follows = follows;

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
            .sort({ createdAt: 'desc', vipPoint: -1 })
        
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
            sort: { 'vipPoint': -1, 'createdAt': -1 }
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
        },
        {
        path: "categories"
        },
        {
            path: "comments.user", select: 'name avatar'
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
    
    if (!post) {
        throw Error("Post is not existing")
    }

    return { post }
}

exports.updatePost = async (id, data, portal) => {
    let Post = initConnection(portal).model("Post");

    if (!data.avatar) {
        data.avatar = undefined;
    }

    if (!data.address) {
        data.address = undefined;
    }

    if (!data.description) {
        data.description = undefined;
    }

    if (!data.width) {
        data.width = undefined;
    }

    if (!data.length) {
        data.length = undefined;
    }

    if (!data.roadAhead) {
        data.roadAhead = undefined;
    }

    if (!data.floorNumber) {
        data.floorNumber = undefined;
    }

    if (!data.bedroomNumber) {
        data.bedroomNumber = undefined;
    }

    let post = await Post.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { post }
}

exports.deletePost = async (postId, userId, portal) => {

    let Post = initConnection(portal).model("Post");
    let User = initConnection(portal).model("User");

    let post = await Post.findByIdAndDelete(postId);

    //Loại bỏ post khỏi user
    let user = await User.findById(userId);
    let posts = [...user.posts || []];
    user.posts = posts.filter(p => p.toString() !== postId);
    await user.save();

    return {post}
}

//Comment, rate, follow
exports.interaction = async (id, data, portal) => {
    let Post = initConnection(portal).model("Post");
    
    const post = await Post.findById(id);
    
    if (!post) {
        throw Error("Post is not existing!")
    }


    post.rates = data.rates;
    post.comments = data.comments;
    post.follows = data.follows;

    await post.save();

    let postDetail =  await Post
    .findById(id)
    .populate([{
        path: "province"
    },
    {
        path: "district"
    },
    {
        path: "ward"
    },
    {
        path: "categories"
    },
    {
        path: "comments.user", select: 'name avatar'
    }])

    return { post: postDetail }
}

//Check outdated vip
exports.checkOutDatedVip = async (portal) => {
    let option = { vipExpirationDate: { $lt: new Date() }};

    let Post = initConnection(portal).model("Post");

    await Post.updateMany(option, {
        $set: {
            vipPoint: 0,
            vipExpirationDate: null
        }
    })

    return "Kiểm tra và cập nhật thành công"
}


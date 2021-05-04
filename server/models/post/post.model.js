const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    ward: {
        type: String
    },
    district: {
        type: String
    },
    province: {
        type: String
    },
    type: {
        type: Number,
        enum: [1, 2, 3, 4] //1. Bán, 2. Cho thuê, 3. Cần thuê, 4. Mua
    },
    price: {
        type: Number
    },
    //Dien tich
    acreage: {
        type: Number
    },
    //Chieu dai manh dat
    length: {
        type: Number
    },
    //Chieu rong manh dat
    width: {
        type: Number
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);
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
    //Ten du an
    projectName: {
        type: String
    },
    //Chieu dai manh dat
    length: {
        type: Number
    },
    //Chieu rong manh dat
    width: {
        type: Number
    },
    direction: { //1. Đông, 2. Tây, 3. Nam, 4. Bắc
        //5. Đông Nam, 6. Đông Bắc, 7. Tây Nam, 8. Tây Bắc
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    //Độ rộng đường trước nhà
    roadAhead: {
        type: Number
    },
    //Số lầu, số tầng
    floorNumber: {
        type: Number
    },
    //Số phòng ngủ
    bedroomNumber: {
        type: Number
    },
    legal: {//1. Sổ đỏ/sổ hồng, 2. Giấy tờ hợp lệ, 3. giấy phép xây dựng,  4. Giấy phép kinh doanh
        type: Number,
        enum: [1, 2, 3, 4]
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);
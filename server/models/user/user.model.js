const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {//Role: 1. new user none actived, 2. user actived, 3: admin
        type: Number,
        enum: [1, 2, 3],
        default: 2 //actived
    },
    post: [{
        type: Schema.Types.ObjectId
    }],
    avatar: {
        type: String
    }
},{
    timestamps: true,
});

UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model('User', UserSchema);
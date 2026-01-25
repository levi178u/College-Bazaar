import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    college_name: {
        type: String,
        default: 'National Institute of Technology, Rourkela',
    },
    password: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    wishlist: [String],
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    list: [
        {
            item_name: {
                type: String,
            },
            item_price: {
                type: Number,
            },
            item_age: {
                type: Number,
            },
            item_condition: {
                type: Number,
            },
            item_image: {
                type: String,
            },
            item_tag: {
                type: String,
                enum: [
                    'Others',
                    'Clothing_essentials',
                    'Books',
                    'Daily-use',
                    'Sports',
                    'Stationary',
                ],
            },
            item_description: {
                type: String,
            },
            item_status: {
                type: String,
                enum: ['under_approval', 'approved', 'deleted', 'blacklisted'],
            },
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token_ = String(jwt.sign({ _id: this._id }, `${process.env.JWT_KEY}`));
        const token = { token: token_ };
        this.tokens.push(token);
        await this.save();
        return token_;
    } catch (err) {
        console.log(err);
    }
};

const User = mongoose.model('Main_Collection', userSchema);
export default User;
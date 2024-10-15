import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const userSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        avatar : {
            type : String,
        },
        isShopKeeper : {
            type : Boolean,
            default : false
        },
        shopImages : [
            {
                type : String
            }
        ],
        post : [
            {
                type : Schema.Types.ObjectId,
                ref : "Post"
            }
        ],
        notification : [
            {
                type : Schema.Types.ObjectId,
                ref : "Notification"
            }
        ]
    }
) 

userSchema.pre("save",async(next)=>{
    if(!this?.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = (name, email, _id) => {

    const payLoad = {
        _id,
        name,
        email
    }

    const options = {
        expiresIn: '30d' // 30 days for 1 month expiration
    };

    return jwt.sign(payLoad,  process.env.JWT_TOKEN_SECRET, options);
}




const User = mongoose.model("User", userSchema);

export default User;
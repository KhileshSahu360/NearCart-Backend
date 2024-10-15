import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        productName : {
            type : String,
            required : true
        },
        postImage : {
            type : String,
            required : true
        },
        postQuantity : {
            type : Number,
        },
        isAvailable : {
            type : Boolean,
            default : false
        },
        availableTo : {
            type : Schema.Types.ObjectId,
            ref : "ShopKeeper"
        },
        price : {
            type : Number,
            default : 0
        },
        productImage : {
            type : String,
            default : ""
        },
        productQuantity : {
            type : Number,
            default : 0
        },
        phoneNo : {
            type : Number,
            default : 0
        }
    }
) 

export const Post = mongoose.model("Post", postSchema);
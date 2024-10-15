import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema(
    {
        content : {
            type : String,
            required : true
        },
        rating : {
            type : Number,
            default : 0
        },
        from : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        to : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    }
)

export const Review = mongoose.model("Review", reviewSchema);
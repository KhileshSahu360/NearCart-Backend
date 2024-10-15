import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema(
    {
        message : {
            type : String,
            required : true
        },
        sender : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        receiver : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        seen : {
            type : Boolean,
            default : false
        }
    }
)

export const Chat = mongoose.model("Chat", chatSchema);
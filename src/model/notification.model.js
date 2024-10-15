import mongoose, {Schema} from "mongoose"

const notificationSchema = new Schema(
    {
        type : {
            type : String,
            required : true,
            enum : ['sharePost', 'availableTo', 'message', 'review']
        },
        from : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        to : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        seen : {
            type : Boolean,
            default : false
        }
    }
)

export const Notification = mongoose.model("Notification", notificationSchema);
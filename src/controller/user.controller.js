import User from "../model/user.model.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, location, isShopKeeper } = req.body;

    if (
        [email, name, password, location].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if (existedUser) {
        throw new ApiError(409, "email already exists")
    }

    const user = new User({
        name,
        email, 
        password,
        location,
        isShopKeeper 
    })

    await user.save();

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, "User registered Successfully", createdUser)
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "both fields are required")
    }

    const  user = await User.findOne({ email });

    if(!user) throw new ApiError(400, "email is incorrect or user not exist")

    const isPasswordCorrect = user.isPasswordCorrect(password);

    if(!isPasswordCorrect) throw new ApiError(400, "password is incorrect");

    const token = user.generateAccessToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: false, // Allows JavaScript access to the cookie
        secure: false,   // Should be true if using HTTPS in production
        sameSite: 'lax', // Helps protect against CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    };

    return res
    .status(200)
    .cookie("access_token", token, options)
    .json(
        new ApiResponse(200, "User Login Successfully", {user:loggedInUser, token})
    )

})

const uploadPhoto = asyncHandler(async (req, res) => {
    console.log(req.file);
    await uploadonCloudinary();
})

export {
    registerUser,
    loginUser,
    uploadPhoto
}
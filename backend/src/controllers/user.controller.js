import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js" 
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler( async (req,res) => {
     const {userName, fullName, password, email, role} = req.body

     if([userName, fullName, email, password, role].some((ele) => ele?.trim() === "")){
        return res.status(400).json(new ApiError(400, "all fields are required!")) 
     }

     const isExists = await User.findOne({$or: [{userName}, {email}]})

     if(isExists){
        return res.status(400).json(new ApiError(400, "User already exists with userName or email!"))
     }

     const user = await User.create({
        userName,
        fullName,
        password,
        email,
        role
     })

     const newUser = await User.findById(user._id).select("-password")

     if(!newUser){
        return res.status(500).json(new ApiError(500, "some error occured while creating a User !"))
     }

     return res.status(200).json(
        new ApiResponse(201,"User Created Successfully!",newUser)
     )

})

const loginUser = asyncHandler(async (req,res) => {
       const {email, password} = req.body 

       if(!email || !password){
        return res.status(400).json(new ApiError(400, "all fields are required!"))
       }

       const ifExists = await User.findOne({email})

       if(!ifExists){
        return res.status(400).json(new ApiError(400, "incorrect email!"))
       }

       const isValid = await ifExists.isPasswordValid(password)

       if(!isValid){
        return res.status(400).json(new ApiError(400, "Invalid User Credentials!"))
       }

       const generateAccessToken = function(){
         return jwt.sign({
             id: ifExists._id,
             email: ifExists.email,
             password: ifExists.password,
             role: ifExists.role
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
             expiresIn: '60m'
         }) 
         }

       const accessToken = generateAccessToken()

       const newUser = await User.findById(ifExists._id).select("-password")

       const options = {
        httpOnly: true,
        secure: true
       }

       return res.status(200)
       .cookie("accessToken",accessToken,options)
       .json(new ApiResponse(200, "User logged Successfully!", {
        user: newUser,
        accessToken
       }))
})

const logoutUser = asyncHandler(async (req,res) => {
   
     const options = {
      httpOnly: true,
      secure: true
     }

     return res.status(200)
     .clearCookie("accessToken", options)
     .json(new ApiResponse(200,"User logout successfully!",{}))
})



export {
   registerUser,
   loginUser,
   logoutUser,
}
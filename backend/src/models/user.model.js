import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"]
    }
},{timestamps: true})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,12)

    next()
})

userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User", userSchema)
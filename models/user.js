import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    uid: String,
    name: String,
    photo: String,
})

const User = mongoose.model('User', userSchema);

export default User
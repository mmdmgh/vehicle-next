import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Must provide a username."],
        unique: [true, "Must provide a unique username."]
    },
    email:{
        type: String,
        required:[true,"Must provide a email."],
        unique: [true, "Must provide a unique email."]
    },
    password:{
        type: String,
        required:[true,"Must provide a password."],
    }
},
{
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
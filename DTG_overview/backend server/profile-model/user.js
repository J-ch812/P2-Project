import mongoose, { Schema }   from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            miniLength: 1,
            maxLength: 40,
        },

        password:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            miniLength: 8,
            maxLengthth: 40,

        },

        email:{
               type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },

    },
    {
        timestamps: true
    }
    
);
userSchema.pre("save"), async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
    
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    
}

export const User = mongoose.model("User",userSchema);







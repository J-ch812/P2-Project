import mongoose, { Schema }   from "mongoose";
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

export const User= mongoose.model("User",userSchema);







import mongoose, { Schema }   from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 40,
        },

        password:{
            type:String,
            required: true,
            minLength: 8,
            maxLength: 40,

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

userSchema.pre("save", async function() {
    console.log("pre-save hook fired");
 
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    
    
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    
}

export const User = mongoose.model("User",userSchema);








<<<<<<< HEAD
=======

>>>>>>> 6b328b3b93ee8ac91d4ffb7d9bd1b22df8ca551f

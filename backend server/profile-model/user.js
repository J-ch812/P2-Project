import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
      maxLength: 20,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 40,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    semester: {
      type: String,
      default: "",
    },

    fieldofstudy: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  console.log("pre-save hook fired"); //Delte when done

  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
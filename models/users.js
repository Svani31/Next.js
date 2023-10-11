import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
  },
);


const Users = mongoose.models.Users || mongoose.model("Users",UserSchema)

export default Users
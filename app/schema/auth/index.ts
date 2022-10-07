import mongoose from "mongoose";
import { IUser } from "../../../types/auth";

const UserSchema = new mongoose.Schema<IUser>({
  full_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false },
  phone_number: { type: String, default: null },
  profile_picture: { type: String, default: null },
  token: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

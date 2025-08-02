import mongoose from "mongoose";
import { cartCollection } from "./cartModel.js";

const usersCollection = "users";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: Number,
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: cartCollection,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;

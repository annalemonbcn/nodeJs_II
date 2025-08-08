import mongoose from "mongoose";
import { cartCollection, productCollection, usersCollection } from "./index.js";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: usersCollection,
    required: true,
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: productCollection,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

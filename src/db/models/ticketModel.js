import mongoose from "mongoose";
import {
  productCollection,
  ticketCollection,
  usersCollection,
} from "./index.js";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: { type: Number, required: true },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: usersCollection,
    required: true,
  },
  productsSnapshot: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: productCollection,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);
export default TicketModel;

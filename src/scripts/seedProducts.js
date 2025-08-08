import mongoose from "mongoose";
import productModel from "../db/models/productModel.js";
import connectToDatabase from "../db/config/index.js";

const sampleProducts = [
  {
    title: "Trail Running Shoes X",
    description: "Durable mountain running shoes",
    code: "ZX-001",
    price: 89.99,
    stock: 10,
    category: "footwear",
    thumbnails: [],
  },
  {
    title: "DryFit T-Shirt",
    description: "Breathable training t-shirt",
    code: "CF-002",
    price: 25.5,
    stock: 30,
    category: "clothing",
    thumbnails: [],
  },
  {
    title: "20L Backpack",
    description: "Lightweight 20-liter backpack",
    code: "MK-003",
    price: 45.0,
    stock: 15,
    category: "accessories",
    thumbnails: [],
  },
  {
    title: "UV Protection Cap",
    description: "Sun protection cap",
    code: "GR-004",
    price: 18.0,
    stock: 5,
    category: "accessories",
    thumbnails: [],
  },
  {
    title: "Trekking Poles",
    description: "Adjustable aluminum trekking poles",
    code: "BT-005",
    price: 60.0,
    stock: 0,
    category: "accessories",
    thumbnails: [],
  },
  {
    title: "Windproof Jacket",
    description: "Lightweight windproof jacket",
    code: "CH-006",
    price: 70.0,
    stock: 2,
    category: "clothing",
    thumbnails: [],
  },
];

const seedProducts = async () => {
  try {
    await connectToDatabase();
    await productModel.insertMany(sampleProducts);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedProducts();

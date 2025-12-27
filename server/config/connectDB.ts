import mongoose from "mongoose";

export async function connectDB() {
  const url = process.env.DATABASE_URL as string;
  try {
    await mongoose.connect(url);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Failed", error);
  }
}
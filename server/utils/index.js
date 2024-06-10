import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection active");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    //only true in production
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

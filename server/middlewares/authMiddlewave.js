import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    //token from cookies
    let token = req.cookies?.token;
    if (token) {
      const decodedTokens = jwt.verify(token, process.env.JWT_SECRET);

      const resp = await User.findById(decodedTokens.userId).select(
        "isAdmin email"
      );
      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedTokens.userId,
      };
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorised. Try login" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

// adding admin restrictions for regular users
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try logging in as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };

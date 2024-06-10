import User from "../models/User.js";
import { createJWT } from "../utils/index.js";

//REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }
    // if the user doesnt exist we create it now
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });

    if (user) {
      isAdmin ? createJWT(res, user._id) : null;
      user.password = undefined;
      res.status(201).json(user);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//LOGIN USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated.",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined;
      res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//LOGOUT USER

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//getTeamList

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role isActive");
    res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getNotificationList = async (req, res) => {
  try {
    const { userId } = req.user;
    const notice
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// export const logoutUser = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(400).json({ status: false, message: error.message });
//   }
// };

import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import {
    getNotificationList,
  getTeamList,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// register user POST
router.post("/register", registerUser);
// login user POST
router.post("/login", loginUser);
// logout user POST
router.post("/logout", logoutUser);

//GET users, team, notifications as admin
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationList);

//PUT - access your profile as a logged-in user (that's why we use protectedRoute)
// router.put("/profile", protectRoute, updateUserProfile);
// router.put("/read-noti", protectRoute, markNotificationRead);
// router.put("/change-password", protectRoute, changeUserPassword);

// ADMIN ONLY

// router
//   .route("/:id")
//   .put(protectRoute, isAdminRoute, activateUserProfile)
//   .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;

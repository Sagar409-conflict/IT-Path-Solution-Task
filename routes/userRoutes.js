import express from "express";
import { check } from "express-validator";
import UserController from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/registerUser",
  [
    check("name", "Username is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  UserController.registerUser
);

router.post(
  "/login-user",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  UserController.loginUser
);

router.put(
  "/update",
  authMiddleware,
  [
    check("name", "Username is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
  ],

  UserController.updateUser
);
router.get("/get-user-details/:userId", UserController.getUserDetails);

export default router;

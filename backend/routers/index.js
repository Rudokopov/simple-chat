import express from "express";
import { checkAuth } from "../middlewares/auth.js";
// User controllers
import {
  login,
  register,
  getUserMe,
  getUsers,
} from "../controllers/UserController.js";
// MessageControllers
import {
  create,
  getMessage,
  loadMessages,
} from "../controllers/MessageController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.get("/users/me", checkAuth, getUserMe);
router.get("/users", getUsers);

router.post("/messages/send", checkAuth, create);
router.post("/messages", checkAuth, loadMessages);

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"));
});

export { router };

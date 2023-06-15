import express from "express";
import { checkAuth } from "../middlewares/auth.js";
// User controllers
import { login, register } from "../controllers/UserController.js";
// MessageControllers
import { create, getMessage } from "../controllers/MessageController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);

router.post("/messages/send", checkAuth, create);
router.get("/messages", checkAuth, getMessage);

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"));
});

export { router };

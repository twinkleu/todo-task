import { Router } from "express";
const router = Router({ caseSensitive: true });
import { login, register } from "./userController";

router.post("/register", register);

router.post("/login", login);

export default router;

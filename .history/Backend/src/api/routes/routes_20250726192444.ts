import { registerUser } from "../controllers/register/register";
import { login } from "../controllers/login/login";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);

export default router;

import { registerUser } from "../controllers/register/register";
import { login } from "../controllers/login/login";
import { novaTarefa } from "../controllers/novaTarefa/novaTarefa";
import { Router } from "express";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", login);

export default router;

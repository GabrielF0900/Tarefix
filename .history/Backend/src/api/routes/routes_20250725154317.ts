import { registerUser } from "../controllers/register/register";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);

export default router;

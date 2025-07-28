import { registerUser } from "../controllers/register/register";
import { login } from "../controllers/login/login";
import { novaTarefa, listarTarefas } from "../controllers/novaTarefa/novaTarefa";
import { Router } from "express";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/nova-tarefa", novaTarefa);
router.post("/auth/login", login);

router.get("/auth/tarefas", listarTarefas);

export default router;

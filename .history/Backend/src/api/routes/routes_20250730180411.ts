import { registerUser } from "../controllers/register/register";
import { login } from "../controllers/login/login";
import { novaTarefa, listarTarefas } from "../controllers/novaTarefa/novaTarefa";
import { updateAtividade } from "../controllers/crud/updateAtividade";
import { deleteAtividade } from "../controllers/crud/deleteAtividade";
import { Router } from "express";

const router = Router();

router.post("/api/auth/register", registerUser);
router.post("/api/auth/nova-tarefa", novaTarefa);
router.post("/api/auth/login", login);


router.get("/tarefas", listarTarefas);
router.put("/tarefas/:id", updateAtividade);
router.delete("/tarefas/:id", deleteAtividade);

export default router;

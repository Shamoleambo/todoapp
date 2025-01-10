import { Router } from "express";
import { adaptController } from "./controllerAdapter";
import { makeCreateTodoController } from "./controllerFactories/CreateTodoFactory";

const router = Router();

router.post("/api/create-todo", adaptController(makeCreateTodoController()));

export default router;

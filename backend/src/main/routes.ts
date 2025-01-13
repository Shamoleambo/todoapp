import { Router } from "express";
import { adaptController } from "./controllerAdapter";
import { makeCreateTodoController } from "./controllerFactories/CreateTodoFactory";
import { makeGetAllTodos } from "./controllerFactories/GetAllTodosFactory";

const router = Router();

router.post("/api/create-todo", adaptController(makeCreateTodoController()));
router.get("/api/todos", adaptController(makeGetAllTodos()));

export default router;

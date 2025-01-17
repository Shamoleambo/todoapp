import { Router } from "express";
import { adaptController } from "./controllerAdapter";
import { makeCreateTodoController } from "./controllerFactories/CreateTodoFactory";
import { makeGetAllTodos } from "./controllerFactories/GetAllTodosFactory";
import { makeEditTodo } from "./controllerFactories/EditTodoFactory";
import { makeDeleteTodo } from "./controllerFactories/DeleteTodoFactory";

const router = Router();

router.post("/api/create-todo", adaptController(makeCreateTodoController()));
router.get("/api/todos", adaptController(makeGetAllTodos()));
router.put("/api/todos/:id", adaptController(makeEditTodo()));
router.delete("/api/todos/:id", adaptController(makeDeleteTodo()));

export default router;

import express from "express";
import {
	getAllTodosController,
	createTodoController,
	getSingleTodoController,
	updateTodoController,
	deleteTodoController,
} from "../controllers/todo.controller";

const todoRouter = express.Router();

// GET /api/v1/todos
todoRouter.route("/").get(getAllTodosController).post(createTodoController);

// GET/DELETE/PATCH /api/v1/tasks/:id
todoRouter
	.route("/:id")
	.get(getSingleTodoController)
	.put(updateTodoController)
	.delete(deleteTodoController);

export default todoRouter;

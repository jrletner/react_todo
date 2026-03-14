import { Request, Response } from "express";
import {
	getAllTodos,
	getSingleTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} from "../services/todo.service";

// get all todos
export const getAllTodosController = (req: Request, res: Response) =>
	getAllTodos(req, res);

// get single todo
export const getSingleTodoController = (req: Request, res: Response) =>
	getSingleTodo(req, res);

// create todo
export const createTodoController = (req: Request, res: Response) => {
	const { title } = req.body;
	if (!title)
		return res
			.status(400)
			.json({ success: false, payload: "Title is required" });
	createTodo(req, res);
};

// update todo
export const updateTodoController = (req: Request, res: Response) => {
	const { title } = req.body;
	if (!title)
		return res.status(400).json({
			success: false,
			payload: "Title is required",
		});
	updateTodo(req, res);
};

// delete todo
export const deleteTodoController = (req: Request, res: Response) => {
	deleteTodo(req, res);
};

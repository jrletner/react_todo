import { Todo, ITodo } from "../models/Todo.model";
import { Request, Response } from "express";

// INTERFACES

// Get all todos interface
interface GetAllTodosResponse {
	success: boolean;
	payload: ITodo[] | string;
}

// Get single todo interface
interface GetSingleTodoResponse {
	success: boolean;
	payload: ITodo | string | null;
}

// Create todo response interface
interface CreateTodoResponse {
	success: boolean;
	payload: ITodo | string;
}

// update todo interface
interface UpdateTodoResponse {
	success: boolean;
	payload: ITodo | string | null;
	prevTodo?: ITodo;
}

// delete todo interface
interface DeleteTodoResponse {
	success: boolean;
	payload: ITodo | string | null;
	deletedTodo?: ITodo;
}

// CRUD OPERATIONS

// get all todos
export const getAllTodos = async (
	req: Request,
	res: Response<GetAllTodosResponse>,
) => {
	try {
		const todos = await Todo.find({});
		res.status(200).json({ success: true, payload: todos });
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({
			success: false,
			payload: errMsg,
		});
	}
};

// get single todo
export const getSingleTodo = async (
	req: Request,
	res: Response<GetSingleTodoResponse>,
) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findById(id);
		if (!todo)
			return res
				.status(404)
				.json({ success: false, payload: "Todo not found" });
		return res.status(200).json({ success: true, payload: todo });
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ success: false, payload: errMsg });
	}
};

// create todo
export const createTodo = async (
	req: Request,
	res: Response<CreateTodoResponse>,
) => {
	try {
		const todo = await Todo.create(req.body);
		res.status(201).json({ success: true, payload: todo });
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ success: false, payload: errMsg });
	}
};

// update todo
export const updateTodo = async (
	req: Request,
	res: Response<UpdateTodoResponse>,
) => {
	try {
		const id = req.params.id;
		const prevTodo = await Todo.findById(id);
		if (!prevTodo)
			return res
				.status(404)
				.json({ success: false, payload: "Todo not found" });
		const todo = await Todo.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ success: true, payload: todo, prevTodo: prevTodo });
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ success: false, payload: errMsg });
	}
};

// delete todo
export const deleteTodo = async (
	req: Request,
	res: Response<DeleteTodoResponse>,
) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findByIdAndDelete(id);
		if (!todo)
			return res
				.status(404)
				.json({ success: false, payload: "Todo not found" });
		console.log(todo);
		res.status(200).json({
			success: true,
			payload: "Todo successfully deleted",
			deletedTodo: todo,
		});
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ success: false, payload: errMsg });
	}
};

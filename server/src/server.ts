import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/connectDB";
import todoRouter from "./routes/todo.routes";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json()); // allow json body from request

// todo routes
app.use("/api/v1/todos", todoRouter);

// start the DB and server
const startServer = async () => {
	try {
		await connectDB();
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (err) {
		console.error("Failed to start server due to DB error.");
	}
};

startServer();

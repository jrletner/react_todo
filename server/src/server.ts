import express from "express";
import { connectDB } from "./db/connectDB";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Welcome to the React-ToDo App!");
});

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

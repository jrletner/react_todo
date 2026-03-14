import dotEnv from "dotenv";
dotEnv.config();
import express from "express";
import connectDB from "./db/connect";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello from Express + TypeScript!");
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

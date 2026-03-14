import mongoose, { Document, Model } from "mongoose";

const TodoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title must be provided"],
		trim: true,
		maxLength: [120, "Title cannot be more than 120 characters"],
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
});

export interface ITodo extends Document {
	title: string;
	isCompleted: boolean;
}

export const Todo: Model<ITodo> = mongoose.model<ITodo>("Todo", TodoSchema);

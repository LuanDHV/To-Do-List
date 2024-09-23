import mongoose, { Schema, Document } from "mongoose";
import { ITodo } from "./types/interface";

const todoSchema: Schema = new Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;

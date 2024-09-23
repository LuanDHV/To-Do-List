import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./todoController";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", getTodos);
app.post("/todos", addTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

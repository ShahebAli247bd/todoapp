import express from "express";
import {
  addTodo,
  getTodoByTodoId,
  getAllTodosByUserId,
  deleteTodoByTodoId,
  editTodo,
} from "../controller/todos.controller.js";

const router = express.Router();

router.post("/", addTodo);
router.get("/", getAllTodosByUserId);
router.get("/:todoId", getTodoByTodoId);
router.delete("/:todoId", deleteTodoByTodoId);
router.patch("/:todoId", editTodo);

export default router;

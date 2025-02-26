import express from "express";
import {
    addTodo,
    getTodoByTodoId,
    getAllTodosByUserId,
    deleteTodoByTodoId,
} from "../controller/todos.controller.js";

const router = express.Router();

router.post("/", addTodo);
router.get("/all", getAllTodosByUserId);
router.get("/:todoId", getTodoByTodoId);
router.delete("/:todoId", deleteTodoByTodoId);

export default router;

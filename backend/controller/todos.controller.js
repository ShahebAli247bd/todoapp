import Todos from "./../models/todos.model.js";
import { ENV_VARS } from "./../config/envVars.js";
import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";

export const addTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title) {
            return res
                .status(404)
                .json({ success: false, message: "All field are required" });
        }

        const token = req.cookies[ENV_VARS.JWT_AUTH_TOKEN];
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);

        if (!token || !decoded) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid user" });
        }

        const checkExistsTodo = await Todos.findOne({
            userId: decoded.userId,
            title,
        }).lean();

        if (checkExistsTodo) {
            return res
                .status(401)
                .json({ success: false, message: "Todo already exists" });
        }

        const newTodo = new Todos({
            userId: decoded.userId,
            title,
            completed,
        });

        await newTodo.save();

        res.status(201).json({
            success: true,
            todo: {
                ...newTodo._doc,
                message: "Todo Created Successfully",
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all todos
 * @param {Object} req
 * @param {Object} res
 * @returns Object with success or Error
 *
 * @throws {Error} internal server error 500
 */
export const getAllTodosByUserId = async (req, res) => {
    try {
        const token = req.cookies[ENV_VARS.JWT_AUTH_TOKEN];
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);

        const userWiseAllTodos = await Todos.find({
            userId: decoded.userId,
        });

        if (userWiseAllTodos.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No todo found" });
        }

        res.status(200).json({
            success: true,
            data: {
                userWiseAllTodos,
                message: "All todos",
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get todo by todo id
 * @param {Object} req
 * @param {Object} res
 * @returns Object with success or Error
 *
 * @throws {Error} internal server error 500
 */

export const getTodoByTodoId = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await Todos.findById(todoId);

        if (!todo) {
            return res
                .status(404)
                .json({ success: false, message: "Todo not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                todo,
                message: "1 todo found",
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTodoByTodoId = async (req, res) => {
    try {
        const { todoId } = req.params;
        if (!todoId) {
            return res
                .status(404)
                .json({ success: false, message: "Todo ID required" });
        }
        // ObjectId বৈধ কিনা চেক করুন
        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID format",
            });
        }

        const findTodoById = await Todos.findById(todoId);
        if (!findTodoById) {
            return res
                .status(404)
                .json({ success: false, message: "Todo not found" });
        }
        const deletedTodo = await Todos.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "1 Todo deleted successfully ",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

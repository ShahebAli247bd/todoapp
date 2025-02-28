import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { ProtectedRoute } from "./middleware/ProtectedRoute.js";
import AuthRouter from "./routes/auth.route.js";
import TodosRouter from "./routes/todo.route.js";
import cors from "cors";

//initialize express app
const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PATCH,DELETE,PUT",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true, // Allow sending cookies
    })
);
app.use(express.json());
//Backedn home route
app.get("/", (req, res) => {
    res.send("<h1>Backend is live</h1>");
});

//route for Auth

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/todos", ProtectedRoute, TodosRouter);

//ProtectedRoute

//Server Listening
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
    connectDB();
});

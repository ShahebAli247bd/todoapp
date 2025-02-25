import express from "express";
import { connectDB } from "./config/db.js";
import AuthRouter from "./routes/auth.route.js";

//initialize express app
const app = express();

//Backedn home route
app.get("/", (req, res) => {
    res.send("<h1>Backend is live</h1>");
});

//route for Auth

app.use("/api/v1/auth", AuthRouter);

//Server Listening
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
    connectDB();
});

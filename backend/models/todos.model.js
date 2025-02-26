import mongoose from "mongoose";

const todosSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            unique: true,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timeStamps: true,
    }
);

const Todos = mongoose.model("todos", todosSchema);
export default Todos;

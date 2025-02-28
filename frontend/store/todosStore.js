import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useTodosStore = create((set) => ({
  todos: null,
  isTodosFetching: false,
  getAllTodosByUser: async () => {
    set({ isTodosFetching: true });
    try {
      const response = await axios.get(
        import.meta.env.VITE_HOST + "/api/v1/todos/",
        { withCredentials: true }
      );
      console.log(response);
      set({ todos: response.data.todos, isTodosFetching: true });
    } catch (error) {
      toast.error(
        error.response.data.message || "Todo not found for this user"
      );
    }
  },
}));

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../../store/authStore";
import { useTodosStore } from "../../../store/todosStore";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { signout } = useAuthStore();

  const { getAllTodosByUser, todos } = useTodosStore();
  const signOutHandler = () => {
    signout(); // Perform signout
    <Navigate to={"/"} />;
    toast.success("Signing out...");
  };

  useEffect(() => {
    const renderTodos = async () => {
      const todos = await getAllTodosByUser();
      console.log(todos);
    };
    renderTodos();
  }, []);

  return (
    <div>
      dashboard <Button onClick={signOutHandler}>Logout</Button>
      <ul>
        {todos?.map(({ title, completed }) => (
          <li>
            {title} {completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

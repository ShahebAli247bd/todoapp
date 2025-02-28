import "./App.css";
import { Forget } from "./components/auth/forget";
import { SignIn } from "./components/auth/signin";
import { SignUp } from "./components/auth/signup";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import IndexPage from "./components/home";
import Header from "./components/home/header";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../frontend/store/authStore";
import { useEffect } from "react";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  const { authcheck } = useAuthStore();
  const { user } = useAuthStore();
  //   console.log("I am user:" + user);
  useEffect(() => {
    authcheck();
  }, []);
  return (
    <>
      <BrowserRouter>
        {<Header />}
        <Routes>
          {/* {user && <Route path="/dashboard" element={<Dashboard />} />} */}
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to={"/dashboard"} />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to={"/dashboard"} />}
          />
          <Route
            path="/forget"
            element={!user ? <Forget /> : <Navigate to={"/dashboard"} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;

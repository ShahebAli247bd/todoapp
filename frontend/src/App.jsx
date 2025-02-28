import "./App.css";
import { Forget } from "./components/auth/forget";
import { SignIn } from "./components/auth/signin";
import { SignUp } from "./components/auth/signup";

import { BrowserRouter, Routes, Route } from "react-router";
import IndexPage from "./components/home";
import Header from "./components/home/header";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../frontend/store/authStore";
import { useEffect } from "react";

function App() {
    const { authcheck } = useAuthStore();
    useEffect(() => {
        authcheck();
    }, []);
    return (
        <>
            <BrowserRouter>
                {<Header />}
                <Routes>
                    <Route path="/" element={<IndexPage />} />

                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forget" element={<Forget />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    );
}

export default App;

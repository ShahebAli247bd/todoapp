import { Forget } from "./forget";
import { SignIn } from "./signin";
import { SignUp } from "./signup";

import HomePage from "../home/Home";

const AuthPage = () => {
    const urlSlag = new URL(document.location);
    console.log(urlSlag);

    return (
        <div className="flex flex-col">
            {urlSlag.pathname == "/signin" ? (
                <SignIn />
            ) : urlSlag.pathname == "/signup" ? (
                <SignUp />
            ) : urlSlag.pathname == "/signup" ? (
                <Forget />
            ) : (
                <HomePage />
            )}
        </div>
    );
};

export default AuthPage;

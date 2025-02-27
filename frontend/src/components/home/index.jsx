import AuthPage from "../auth/auth";

import HomePage from "./Home";

const IndexPage = () => {
    const user = false;
    return (
        <>
            {user ? (
                <div>
                    <AuthPage />
                </div>
            ) : (
                <HomePage />
            )}
        </>
    );
};

export default IndexPage;

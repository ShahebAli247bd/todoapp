import { Link } from "react-router";

const HomePage = () => {
    return (
        <div>
            <h1>User based Todo APP</h1>
            <h2>
                Want to login <Link to="/signin">Click</Link> here
            </h2>
        </div>
    );
};

export default HomePage;

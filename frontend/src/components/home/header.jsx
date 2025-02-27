import { Link } from "react-router";

import { Home } from "lucide-react";

const Header = () => {
    return (
        <div className="p-2 flex justify-center">
            <h2 className="flex">
                <Link to={"/"} className="text-blue-400 flex">
                    <Home />
                </Link>{" "}
            </h2>
        </div>
    );
};

export default Header;

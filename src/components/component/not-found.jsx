import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function Component() {
    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center items-center">
                <div className="text-4xl font-bold mb-5">404 Not found</div>
                <NavLink to="/" className="text-blue-500">Back to Home</NavLink>
            </div>
        </>
    );
}
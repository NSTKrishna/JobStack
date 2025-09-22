import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-black p-4">
            <div className="container flex justify-between mx-auto">
                <Link to="/" className="text-white text-2xl">My App</Link>
                <ul className="flex space-x-4 mt-2">
                    <Link className="text-gray-300 hover:text-white" to='/Job_page'>Find Job</Link>
                    <Link className="text-gray-300 hover:text-white" to='/Company_page'>Companies</Link>
                    <Link className="text-gray-300 hover:text-white" to='/Post_job'>Post a Job</Link>
                </ul>
                <div>
                    <Link className="bg-white text-black px-4 py-2 rounded" to='/Sign Up'>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
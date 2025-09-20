import React from "react";
function Navbar() {
    return (
        <nav className="bg-black p-4">
            <div className="container flex justify-between mx-auto">
                <h1 className="text-white text-2xl">My App</h1>
                <ul className="flex space-x-4 mt-2">
                    <li><a href="#" className="text-gray-300 hover:text-white">Find Jobs</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Companies</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Post a Job</a></li>
                </ul>
                <div>
                    <button className="bg-white text-black px-4 py-2 rounded">Login</button>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
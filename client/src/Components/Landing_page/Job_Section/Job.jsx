import React  from "react";
import { Testimonials } from "../../Effects/Marquee";
function Jobs() {
    return (
        <div className="Container">
            <div className="text-center mt-5"> 
                <p className="text-[4rem] font-bold m-2">Featured Jobs</p>
                <p>Discover hand-picked opportunities from top companies Discover hand-picked opportunities from top companies</p>
            </div>
            <div className="grid grid-cols-3 gap-4 p-10">
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">AI Researcher</h2>
                    <p className="text-gray-700 mb-4">Company: Tech Innovations</p>
                    <p className="text-gray-700 mb-4">Location: Remote</p>
                    <p className="text-gray-700 mb-4">Experience: 3+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">Machine Learning Engineer</h2>
                    <p className="text-gray-700 mb-4">Company: AI Solutions</p>
                    <p className="text-gray-700 mb-4">Location: New York, NY</p>
                    <p className="text-gray-700 mb-4">Experience: 2+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">Data Scientist</h2>
                    <p className="text-gray-700 mb-4">Company: Data Insights</p>
                    <p className="text-gray-700 mb-4">Location: San Francisco, CA</p>
                    <p className="text-gray-700 mb-4">Experience: 4+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>    
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">AI Researcher</h2>
                    <p className="text-gray-700 mb-4">Company: Tech Innovations</p>
                    <p className="text-gray-700 mb-4">Location: Remote</p>
                    <p className="text-gray-700 mb-4">Experience: 3+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">Machine Learning Engineer</h2>
                    <p className="text-gray-700 mb-4">Company: AI Solutions</p>
                    <p className="text-gray-700 mb-4">Location: New York, NY</p>
                    <p className="text-gray-700 mb-4">Experience: 2+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>
                <div className="border-2 border-black rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-2">Data Scientist</h2>
                    <p className="text-gray-700 mb-4">Company: Data Insights</p>
                    <p className="text-gray-700 mb-4">Location: San Francisco, CA</p>
                    <p className="text-gray-700 mb-4">Experience: 4+ years</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
                </div>  
            </div>
            <div className="text-center mb-10">
               <button className="bg-blue-500 text-white px-4 py-2 rounded">Views All Jobs</button> 
            </div>
            <div className="Testimonials text-center mb-10 mt-30">
                <p className="" >Testimonials</p>
                <p className="text-[4rem] font-bold mt-3" >What Our Users Say</p>
                <p className="text-[1rem]" >Hear what employers and job seekers are saying about us.</p>
                <Testimonials />
            </div>
        </div>
    )
}
export default Jobs;
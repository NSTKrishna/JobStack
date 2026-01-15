import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

const CompanyCard = ({ company, index, onClick, getColorForIndex, getIconForIndustry }) => {

    const name = company.companyName || company.name || company.Company_Name || "Unnamed Company";
    const description = company.description || company.Description || "No description available.";
    const industry = company.industry || "General";
    const location = company.location || "Remote";
    const size = company.size;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
                y: -8,
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15)",
                borderColor: "rgb(147, 197, 253)"
            }}
            onClick={() => onClick(company)}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer group relative overflow-hidden transition-all duration-300 flex flex-col h-full"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform`} />

            <div
                className={`w-16 h-16 ${getColorForIndex(
                    index
                )} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:scale-105 transition-transform duration-300 relative z-10`}
            >
                {getIconForIndustry(industry)}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1 relative z-10">
                {name}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-gray-500 relative z-10">
                <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-600 font-medium text-xs border border-gray-100">
                    {industry}
                </span>
                {size && (
                    <span className="bg-blue-50 px-2 py-1 rounded-md text-blue-600 font-medium text-xs border border-blue-100 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {size}
                    </span>
                )}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow relative z-10">
                {description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 relative z-10 mt-auto">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{location.split(',')[0]}</span>
                    </div>
                </div>
                <span className="text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                    View Profile →
                </span>
            </div>
        </motion.div>
    );
};

export default CompanyCard;

import clsx from "clsx";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ title, value, icon, trend, trendValue, color = "blue", subtext }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
        red: "bg-red-50 text-red-600",
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
                        {trend && (
                            <span
                                className={clsx(
                                    "flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
                                    trend === "up"
                                        ? "text-green-700 bg-green-50"
                                        : "text-red-700 bg-red-50"
                                )}
                            >
                                {trend === "up" ? (
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {trendValue}
                            </span>
                        )}
                    </div>
                </div>
                <div className={clsx("p-3 rounded-xl", colors[color])}>
                    {icon}
                </div>
            </div>
            {subtext && <p className="text-sm text-gray-400">{subtext}</p>}
        </div>
    );
}

import { Building2, Users, TrendingUp, Star, CodeXml } from "lucide-react";
import Marquee from "../../Effects/Marquee";

function HeroSection() {
  const stats = [
    { icon: Building2, label: "Companies", value: "2,500+" },
    { icon: Users, label: "Job Seekers", value: "50,000+" },
    { icon: TrendingUp, label: "Jobs Posted", value: "15,000+" },
    { icon: Star, label: "Success Rate", value: "94%" },
  ];
  return (
    <div className="Container p-[4rem] animate-slide-in-blur">
      <div className="Content text-center py-5">
        <div className="flex flex-row justify-center items-center gap-3">
          <CodeXml className="h-8 w-8 text-primary" />
          <h1 className="text-[1rem]">
            Your #1 Destination for Development Industry Jobs
          </h1>
        </div>

        <p className="py-4 text-[5rem] font-inter font-bold text-5xl leading-tight">
          Discover endless career opportunities in development industries today.
        </p>
        <p className="py-5 text-[2rem]">
          Discover the best jobs in development.
        </p>
      </div>
      <div className="ButtonContainer flex gap-8 py-10 justify-center">
        <button>
          <a
            href="#"
            className="px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 hover:-translate-y-1 transition"
          >
            Browse all Jobs
          </a>
        </button>
        <button>
          <a
            href="#"
            className="px-6 py-3 rounded-full bg-neutral-800 text-white font-semibold border border-neutral-700 hover:bg-neutral-700"
          >
            Post a Job
          </a>
        </button>
      </div>
      <div className="grid grid-col-2 md:grid-cols-4 gap-8 py-10">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="Slider py-5">
        Trusted by top companies:
        <Marquee />
      </div>
    </div>
  );
}
export default HeroSection;

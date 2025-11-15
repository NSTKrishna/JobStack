import {Testimonials} from "../../Effects/Marquee";
import { MapPin, Briefcase, Clock, ArrowRight, Bookmark } from "lucide-react";

function Jobs() {
  const jobListings = [
    {
      title: "AI Researcher",
      company: "Tech Innovations",
      location: "Remote",
      experience: "3+ years",
      type: "Full Time",
      salary: "$120k - $180k",
      tags: ["AI", "Machine Learning", "Research"],
    },
    {
      title: "Machine Learning Engineer",
      company: "AI Solutions",
      location: "New York, NY",
      experience: "2+ years",
      type: "Full Time",
      salary: "$100k - $150k",
      tags: ["Python", "TensorFlow", "ML"],
    },
    {
      title: "Data Scientist",
      company: "Data Insights",
      location: "San Francisco, CA",
      experience: "4+ years",
      type: "Full Time",
      salary: "$130k - $190k",
      tags: ["Data Analysis", "Statistics", "Python"],
    },
    {
      title: "Full Stack Developer",
      company: "Tech Innovations",
      location: "Remote",
      experience: "3+ years",
      type: "Contract",
      salary: "$110k - $160k",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Austin, TX",
      experience: "5+ years",
      type: "Full Time",
      salary: "$140k - $200k",
      tags: ["AWS", "Docker", "Kubernetes"],
    },
    {
      title: "Frontend Developer",
      company: "Design Co",
      location: "Los Angeles, CA",
      experience: "2+ years",
      type: "Full Time",
      salary: "$90k - $140k",
      tags: ["React", "TypeScript", "CSS"],
    },
  ];

  return (
    <div
      className="Container bg-gradient-to-b from-white to-gray-50 py-20"
      id="jobs"
    >
      <div className="text-center max-w-3xl mx-auto px-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
          <Briefcase className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">
            Featured Opportunities
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Featured Jobs
        </h2>
        <p className="text-lg text-gray-600">
          Discover hand-picked opportunities from top companies and kickstart
          your dream career today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 lg:px-20 mb-12">
        {jobListings.map((job, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-600" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{job.experience}</span>
                <span className="mx-2">•</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                  {job.type}
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-900 mt-2">
                {job.salary}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              Apply Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mb-20">
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold border-2 border-gray-200 rounded-full hover:border-blue-600 hover:shadow-xl transition-all duration-300">
          View All Jobs
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="Testimonials text-center px-6 py-16 bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl mx-6 md:mx-10 lg:mx-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
          <span className="text-sm font-medium text-blue-600">
            ⭐ Testimonials
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Hear success stories from employers and job seekers who found their
          perfect match through JobStack
        </p>
      </div>
      <Testimonials />
    </div>
  );
}
export default Jobs;

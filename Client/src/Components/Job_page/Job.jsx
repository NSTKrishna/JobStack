import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  X,
  Building2,
  Clock,
  CheckCircle2,
} from "lucide-react";

const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Sample job data with full details
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      department: "Engineering",
      type: "Full-time",
      remote: "Remote",
      description:
        "We're looking for a senior frontend developer to join our growing team...",
      fullDescription:
        "We're seeking an experienced Senior Frontend Developer to join our innovative team at TechCorp Inc. In this role, you'll be responsible for building and maintaining high-performance web applications that serve millions of users worldwide. You'll work closely with our design and backend teams to create seamless user experiences and implement new features that drive business growth.",
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React and TypeScript",
        "Strong understanding of modern JavaScript (ES6+)",
        "Experience with Next.js and server-side rendering",
        "Proficiency in CSS, Sass, and responsive design",
        "Experience with testing frameworks (Jest, React Testing Library)",
        "Strong problem-solving and communication skills",
        "Bachelor's degree in Computer Science or equivalent experience",
      ],
      responsibilities: [
        "Design and implement new user-facing features",
        "Build reusable code and libraries for future use",
        "Ensure technical feasibility of UI/UX designs",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers and designers",
        "Participate in code reviews and mentor junior developers",
      ],
      skills: ["React", "TypeScript", "Next.js"],
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      department: "Product Development",
      type: "Full-time",
      remote: "Remote",
      description:
        "Join our innovative team building the next generation of web applications...",
      fullDescription:
        "StartupXYZ is looking for a talented Full Stack Engineer to help us build revolutionary products. You'll have the opportunity to work across the entire stack and make significant contributions to our platform.",
      requirements: [
        "3+ years of full-stack development experience",
        "Strong knowledge of Node.js and Express",
        "Experience with React and modern frontend frameworks",
        "Proficiency with MongoDB or other NoSQL databases",
        "Understanding of RESTful APIs and microservices",
        "Experience with Git and CI/CD pipelines",
        "Excellent problem-solving abilities",
      ],
      responsibilities: [
        "Develop and maintain both frontend and backend components",
        "Design and implement RESTful APIs",
        "Work with databases and optimize queries",
        "Write clean, maintainable, and testable code",
        "Participate in architectural decisions",
      ],
      skills: ["Node.js", "React", "MongoDB"],
      location: "Austin, TX",
      salary: "$100k - $140k",
      postedDate: "1 day ago",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataSystems Ltd.",
      department: "Infrastructure",
      type: "Full-time",
      remote: "Hybrid",
      description:
        "Looking for an experienced backend developer to work on scalable systems...",
      fullDescription:
        "DataSystems Ltd. is seeking a skilled Backend Developer to build and maintain our robust backend infrastructure. You'll work on high-traffic applications and help shape our technical architecture.",
      requirements: [
        "4+ years of backend development experience",
        "Expert knowledge of Python and Django",
        "Strong understanding of PostgreSQL and database design",
        "Experience with Redis and caching strategies",
        "Knowledge of Docker and containerization",
        "Understanding of security best practices",
        "Experience with AWS or similar cloud platforms",
      ],
      responsibilities: [
        "Design and develop scalable backend systems",
        "Optimize database queries and improve performance",
        "Implement security measures and data protection",
        "Work with DevOps team on deployment strategies",
        "Monitor and troubleshoot production issues",
      ],
      skills: ["Python", "Django", "PostgreSQL"],
      location: "New York, NY",
      salary: "$110k - $150k",
      postedDate: "3 days ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      department: "Operations",
      type: "Full-time",
      remote: "Remote",
      description:
        "Seeking a DevOps engineer to manage our cloud infrastructure...",
      fullDescription:
        "CloudTech Solutions is looking for a talented DevOps Engineer to manage and optimize our cloud infrastructure. You'll play a critical role in ensuring our systems are reliable, scalable, and secure.",
      requirements: [
        "3+ years of DevOps or SRE experience",
        "Strong knowledge of AWS services (EC2, S3, RDS, Lambda)",
        "Experience with Docker and Kubernetes",
        "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
        "Strong scripting skills (Python, Bash)",
        "Experience with CI/CD tools (Jenkins, GitLab CI)",
        "Understanding of monitoring and logging tools",
      ],
      responsibilities: [
        "Manage and optimize cloud infrastructure",
        "Implement and maintain CI/CD pipelines",
        "Monitor system performance and reliability",
        "Automate deployment and scaling processes",
        "Ensure security compliance and best practices",
      ],
      skills: ["AWS", "Docker", "Kubernetes"],
      location: "Seattle, WA",
      salary: "$130k - $170k",
      postedDate: "5 days ago",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "DesignHub",
      department: "Design",
      type: "Full-time",
      remote: "Remote",
      description:
        "Creative UI/UX designer needed to craft beautiful user experiences...",
      fullDescription:
        "DesignHub is seeking a creative and detail-oriented UI/UX Designer to join our design team. You'll be responsible for creating intuitive and visually appealing interfaces for our products.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Expert knowledge of Figma and design systems",
        "Strong portfolio demonstrating design skills",
        "Understanding of user research and usability testing",
        "Experience with prototyping and wireframing",
        "Knowledge of accessibility standards (WCAG)",
        "Excellent communication and presentation skills",
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Collaborate with developers to ensure design implementation",
        "Maintain and evolve design systems",
      ],
      skills: ["Figma", "Sketch", "Adobe XD"],
      location: "Los Angeles, CA",
      salary: "$90k - $120k",
      postedDate: "1 week ago",
    },
    {
      id: 6,
      title: "Product Manager",
      company: "InnovateCo",
      department: "Product",
      type: "Full-time",
      remote: "Hybrid",
      description:
        "Experienced product manager to lead our flagship product development...",
      fullDescription:
        "InnovateCo is looking for an experienced Product Manager to lead the development of our flagship products. You'll work closely with engineering, design, and business teams to deliver exceptional products.",
      requirements: [
        "5+ years of product management experience",
        "Strong understanding of Agile methodologies",
        "Experience with product analytics tools",
        "Excellent stakeholder management skills",
        "Data-driven decision making abilities",
        "Strong technical background preferred",
        "MBA or equivalent experience",
      ],
      responsibilities: [
        "Define product vision and strategy",
        "Manage product roadmap and prioritization",
        "Work with cross-functional teams to deliver features",
        "Analyze user feedback and product metrics",
        "Communicate product updates to stakeholders",
      ],
      skills: ["Agile", "Product Strategy", "Analytics"],
      location: "Boston, MA",
      salary: "$140k - $180k",
      postedDate: "4 days ago",
    },
  ];

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Next Job
            </h1>
            <p className="text-gray-600">
              Discover {jobs.length} opportunities that match your skills and
              interests
            </p>

            <div className="mt-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-64 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                            {job.type}
                          </span>
                          {job.remote && (
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                              {job.remote}
                            </span>
                          )}
                          <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedDate}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{job.company}</span>
                        </div>

                        <p className="text-gray-600 mb-4">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {selectedJob.type}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {selectedJob.remote}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span className="font-medium">{selectedJob.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <span>{selectedJob.department}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    <p className="text-xs text-blue-100 uppercase font-semibold">
                      Location
                    </p>
                  </div>
                  <p className="text-white font-medium">
                    {selectedJob.location}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-xs text-blue-100 uppercase font-semibold">
                      Salary Range
                    </p>
                  </div>
                  <p className="text-white font-medium">{selectedJob.salary}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-xs text-blue-100 uppercase font-semibold">
                      Job Type
                    </p>
                  </div>
                  <p className="text-white font-medium">{selectedJob.type}</p>
                </div>
              </div>
            </div>

            <div className="p-8">

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedJob.fullDescription}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {selectedJob.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-base">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedJob.responsibilities && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-base">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium rounded-lg border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-200 transition-all">
                  Apply Now
                </button>
                <button className="px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Job;

function CompanyView() {
  const company = [
    {
      Name: "Applio",
      Icon: "💜",
      bgColor: "bg-purple-600",
      Description: "Applio is a next-generation AI company building smarter tools for tomorrow's world for today's workforce.",
    },
    {
      Name: "AudioKraft",
      Icon: "🎵",
      bgColor: "bg-blue-600",
      Description: "AudioKraft is a pioneering force in audio innovation, crafting the next generation of sonic experiences.",
    },
    {
      Name: "Bantropic",
      Icon: "🐻",
      bgColor: "bg-pink-600",
      Description: "Bantropic is a global innovation company shaping the future with sustainable and intelligent solutions.",
    },
    {
      Name: "Bugzapper",
      Icon: "🐛",
      bgColor: "bg-yellow-500",
      Description: "BugZapper is a tech-driven company on a mission to protect your home from pests with precision and efficiency.",
    },
    {
      Name: "Codebrick",
      Icon: "��",
      bgColor: "bg-purple-700",
      Description: "CodeBrick is a cutting-edge software development company building the future, one line of code at a time.",
    },
    {
      Name: "Datekart",
      Icon: "🎯",
      bgColor: "bg-gray-600",
      Description: "DateKart is a dynamic dating platform designed to help you find meaningful connections, effortlessly.",
    },
    {
      Name: "Dressia",
      Icon: "👗",
      bgColor: "bg-gray-700",
      Description: "Dressia is an auto brand that empowers you to express yourself through luxury lifestyle.",
    },
    {
      Name: "DubSync",
      Icon: "🎬",
      bgColor: "bg-red-600",
      Description: "DubSync is a cutting-edge technology company revolutionizing multimedia synchronization for creators worldwide.",
    },
    {
      Name: "Flaude",
      Icon: "✨",
      bgColor: "bg-gray-600",
      Description: "Flaude is a premium beauty brand offering sophisticated solutions for radiant and healthy skin.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <div className="text-center pt-20 pb-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Browse Top AI Companies
        </h1>
        <p className="text-gray-600 text-lg">
          Discover companies currently looking for talented AI professionals
        </p>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 hover:bg-zinc-800 transition-all duration-300 cursor-pointer group border"
            >
              {/* Company Icon */}
              <div className={`w-16 h-16 ${data.bgColor} rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {data.Icon}
              </div>
              
              {/* Company Name */}
              <h3 className="text-xl font-semibold mb-3">{data.Name}</h3>
              
              {/* Company Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {data.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyView;

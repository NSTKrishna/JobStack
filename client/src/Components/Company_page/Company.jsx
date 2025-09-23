function CompanyView() {
  const company = [
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
    {
      Name: "Apple",
      Logo: "https://via.placeholder.com/150",
      Company:
        "Apple is a next-generation AI company building smarter tools for tomorrow’s world for today's workforce.",
    },
  ];
  return (
    <div className="Container">
      <div className="text-center">
        <p className ="text-[5rem] font-bold m-20">Browse Top AI Companies</p>
        <p className="text-[1.5rem] mb-10">
          Discover companies currently looking for talented AI professionals
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 p-10">
        {
          company.map((data)=>(
            <div className="border p-10 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img src={data.Logo} alt="Company Logo" className="w-20 h-20 mb-4" />
              <p>{data.Name}</p>
              <p>{data.Company}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
export default CompanyView;

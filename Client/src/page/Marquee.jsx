import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const logos = [
  {
    name: "TailwindCSS",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Next.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  {
    name: "AWS",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Motion",
    src: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png",
  },
  {
    name: "React",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Node.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: "Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  },
  {
    name: "PostgreSQL",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
  },
  {
    name: "Docker",
    src: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
  },
  {
    name: "Kubernetes",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
  },
  {
    name: "GitHub",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
];

const testimonials = [
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Andrew Smith",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "I am amazed by the quality of candidates we've attracted through this platform. It's a game-changer for our recruitment.",
    name: "Donald Johnson",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    quote:
      "This platform has revolutionized how we connect with candidates. The quality of applicants has significantly improved.",
    name: "Emily Davis",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    quote:
      "I got my dream job through this platform! The application process was smooth, and the support team was fantastic.",
    name: "Michael Brown",
    role: "Devops Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    quote:
      "The intuitive design and powerful features of this platform have made our recruitment process seamless and effective.",
    name: "Sarah Wilson",
    role: "SWE Intern",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    quote:
      "I highly recommend this platform to any company looking to enhance their hiring process. It's efficient and user-friendly.",
    name: "Lorraine Taylor",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    quote:
      "Getting hired through this platform was a breeze. The job matches were spot on, and I felt supported throughout the process.",
    name: "Krishna Gehlot",
    role: "Quant Developer",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    quote:
      "Finally, a platform that understands both employers and job seekers. Highly efficient and effective!",
    name: "Jean Paul",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];

export function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-white py-10">
      <div className="flex animate-marquee whitespace-nowrap">
        {logos.map((logo) => (
          <div className="flex items-center justify-center min-w-[150px] mx-8">
            <img src={logo.src} alt={logo.name} className="h-6 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 px-5">
      <div className="max-w-7xl mx-auto">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">

                <div className="text-blue-600 mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                  {data.quote}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                  <img
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-100"
                    src={data.image}
                    alt={data.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3B82F6&color=fff&size=200`;
                    }}
                  />
                  <div>
                    <p className="font-bold text-gray-900">{data.name}</p>
                    <p className="text-sm text-gray-600">{data.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

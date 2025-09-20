import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules"; 

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
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote:
      "Using this platform has transformed our hiring process. We've found top talent quickly and efficiently.",
    name: "Khuswant Rajat Kevish",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

export default function Marquee() {
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
    <div className="w-full bg-white py-10 px-5">
      <Swiper
        modules={[Autoplay]} 
        spaceBetween={15}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false,}}
      >
        {testimonials.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center items-center p-4 text-center border rounded-lg shadow-lg">
              <p className="my-2">{data.quote}</p>
              <p className="font-semibold">{data.name}</p>
              <img
                className="h-12 w-12 rounded-full my-2"
                src={data.image}
                alt={data.name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

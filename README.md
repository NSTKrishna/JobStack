# JobStack - Job Portal Application

JobStack is a modern full-stack job portal application that connects talented developers with innovative companies. Built with React, Node.js, and Prisma, it provides a seamless experience for both job seekers and employers.

## 🚀 Features

### For Job Seekers
- **User Authentication** - Secure signup/login with college email verification
- **Job Search & Discovery** - Browse and filter jobs by location, type, and keywords
- **Application Tracking** - Track all job applications in one place
- **Save Jobs** - Bookmark interesting opportunities for later
- **Profile Management** - Create and manage professional profiles
- **CV Upload** - Upload and manage resumes

### For Companies
- **Company Authentication** - Secure signup/login with CIN verification
- **Job Posting** - Create and manage job listings
- **Application Management** - Review and track candidate applications
- **Company Profile** - Showcase company information and culture
- **Dashboard Analytics** - Track job postings and applications

### General Features
- **Responsive Design** - Mobile-first, works on all devices
- **Company Directory** - Browse top AI and tech companies
- **Testimonials** - Real user success stories
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation and routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Swiper** - Touch slider/carousel

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **Multer** - File upload handling

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Client Setup

```bash
# Navigate to client directory
cd Client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Server Setup

```bash
# Navigate to server directory
cd Server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run Prisma migrations
npx prisma migrate dev

# Start server
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `Server` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/jobstack"
JWT_SECRET="your-secret-key"
PORT=3000
```

### Client Configuration

The client connects to the API at `http://localhost:3000/api` by default. Update [`Client/src/Api/api.js`](Client/src/Api/api.js) if needed.

## 📁 Project Structure

```
JobStack/
├── Client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── Api/           # API integration and state management
│   │   ├── Components/    # React components
│   │   │   ├── Auth_Page/       # Authentication components
│   │   │   ├── Dashboard/       # Dashboard layouts
│   │   │   ├── Company_page/    # Company listing
│   │   │   ├── Job_page/        # Job listings
│   │   │   ├── Effects/         # UI effects (Marquee, etc.)
│   │   │   ├── Footer/          # Footer component
│   │   │   └── Navbar/          # Navigation
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
└── Server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    │   ├── User_Auth/     # User authentication
    │   ├── Company_Auth/  # Company authentication
    │   ├── Jobs/          # Job management
    │   └── ...
    ├── db/               # Database configuration
    ├── middlewares/      # Express middlewares
    ├── prisma/           # Prisma schema and migrations
    ├── routes/           # API routes
    ├── uploads/          # Uploaded files
    ├── utils/            # Utility functions
    └── server.js         # Server entry point
```

## 🎨 Key Components

### Pages
- [`Landings`](Client/src/Components/Landing_page/Landing.jsx) - Landing page with hero section
- [`Job`](Client/src/Components/Job_page/Job.jsx) - Job search and listings
- [`CompanyView`](Client/src/Components/Company_page/Company.jsx) - Company directory
- [`LoginStudent`](Client/src/Components/Auth_Page/Login.jsx) - User/Company login
- [`SignUpPage`](Client/src/Components/Auth_Page/Signup.jsx) - User/Company registration
- [`StudentDash`](Client/src/Components/Dashboard/StudentDash.jsx) - Student dashboard
- [`CompanyDash`](Client/src/Components/Dashboard/CompanyDash.jsx) - Company dashboard

### API Integration
- [`api.js`](Client/src/Api/api.js) - Axios instance and API functions
- [`store.js`](Client/src/Api/store.js) - Zustand state management
- [`hooks.js`](Client/src/Api/hooks.js) - Custom React hooks for API calls

## 🚦 Available Scripts

### Client

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server

```bash
npm start            # Start server
npm run dev          # Start with nodemon (development)
```

## 🔐 Authentication

The application supports two types of users:

1. **Job Seekers** - Students/professionals looking for jobs
   - Requires college email and enrollment ID
   
2. **Companies** - Organizations posting jobs
   - Requires company email and CIN verification

Authentication is handled via JWT tokens stored in cookies.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Chat functionality between employers and candidates
- [ ] Interview scheduling
- [ ] Skills assessment tests
- [ ] Email notifications
- [ ] Advanced analytics dashboard

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Swiper](https://swiperjs.com/) for the testimonial carousel
- All contributors and testers

---

Built with ❤️ by the JobStack Team

# 🚀 JobStack - Job Portal Platform

![CI Pipeline](https://github.com/YOUR_USERNAME/JobStack/workflows/CI%20Pipeline/badge.svg)

A modern full-stack job portal connecting students with companies for career opportunities in the development industry.

## ✨ Features

### For Students

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 💼 **Job Search** - Browse and filter available job opportunities
- 📝 **Easy Applications** - Apply to jobs with cover letters
- 📄 **CV Management** - Upload and manage resumes
- 👤 **Profile Management** - Create and update professional profiles
- � **Application Tracking** - Monitor application status in real-time
- 🔔 **Real-time Notifications** - Get instant updates via WebSocket

### For Companies

- 🏢 **Company Portal** - Dedicated dashboard for recruiters
- 💼 **Job Posting** - Create and manage job listings
- � **Dashboard Analytics** - Track active jobs, applications, and metrics
- 👥 **Candidate Management** - View applicant profiles and resumes
- ✅ **Application Processing** - Shortlist, reject, or hire candidates
- � **Email Notifications** - Automated welcome emails
- 🔔 **Real-time Updates** - Instant notifications for new applications

### General Features

- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🌓 **Dark Mode Support** - Eye-friendly interface options
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔄 **Real-time Updates** - WebSocket-powered notifications
- 🔒 **Secure** - JWT authentication and bcrypt password hashing
- ⚡ **Fast** - Optimized performance with React 18 and Vite

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Socket.io-client** - Real-time WebSocket communication
- **Lucide React** - Beautiful icon library

### Backend

- **Node.js & Express** - Server framework
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **Socket.io** - WebSocket server
- **Nodemailer** - Email sending
- **Cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

### DevOps

- **GitHub Actions** - CI/CD pipeline
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- Git installed
- Gmail account (for email notifications)

## 🚀 Quick Start

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/JobStack.git
cd JobStack
```

2. **Setup Backend**

```bash
cd Server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration:
# - DATABASE_URL="postgresql://user:password@localhost:5432/jobstack"
# - JWT_SECRET="your-secret-key"
# - EMAIL_USER="your-email@gmail.com"
# - EMAIL_PASS="your-app-password"

# Run database migrations
npx prisma generate
npx prisma migrate dev

# Start the server
npm run dev
```

3. **Setup Frontend**

```bash
cd Client
npm install

# Create .env file (optional)
cp .env.example .env

# Install socket.io-client for real-time notifications
npm install socket.io-client clsx tailwind-merge

# Start the development server
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

## 📁 Project Structure

```
JobStack/
├── Client/                          # Frontend React application
│   ├── src/
│   │   ├── Api/                    # API integration layer
│   │   │   ├── api.js              # Axios instance & API endpoints
│   │   │   ├── hooks.js            # Custom React hooks
│   │   │   ├── store.js            # Zustand state management
│   │   │   └── socket.js           # WebSocket client
│   │   ├── components/             # Reusable components
│   │   │   ├── dashboard/          # Dashboard components
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Topbar.jsx
│   │   │   └── grid.jsx            # UI components
│   │   ├── page/                   # Page components
│   │   │   ├── Landing.jsx         # Landing page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Registration
│   │   │   ├── StudentDash.jsx     # Student dashboard
│   │   │   ├── CompanyDash.jsx     # Company dashboard
│   │   │   ├── Jobs.jsx            # Job listings
│   │   │   ├── application.jsx     # Applications view
│   │   │   ├── Userprofile.jsx     # User profile
│   │   │   └── ...
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── public/                     # Static assets
│   ├── .env.example                # Environment variables template
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── vite.config.js              # Vite configuration
│   └── package.json
│
├── Server/                          # Backend Node.js application
│   ├── controllers/                # Route controllers
│   │   ├── Auth/                   # Authentication controllers
│   │   ├── Company_Dashboard/      # Company-specific controllers
│   │   │   ├── job.controllers.js
│   │   │   ├── application.controllers.js
│   │   │   └── profile.controllers.js
│   │   ├── User_Dashboard/         # User-specific controllers
│   │   │   ├── application.controllers.js
│   │   │   ├── profile.controllers.js
│   │   │   └── cv.controllers.js
│   │   └── Jobs/                   # Job-related controllers
│   ├── routes/                     # API routes
│   │   ├── Auth/                   # Authentication routes
│   │   ├── Dashboard/              # Dashboard routes
│   │   ├── Jobs/                   # Job routes
│   │   └── mainRoute.js            # Main router
│   ├── middlewares/                # Express middlewares
│   │   ├── auth.Middleware.js      # JWT authentication
│   │   └── upload.Middleware.js    # File upload handling
│   ├── prisma/                     # Database schema & migrations
│   │   ├── schema.prisma           # Prisma schema
│   │   └── migrations/             # Database migrations
│   ├── utils/                      # Utility functions
│   │   ├── email.js                # Email configuration
│   │   ├── sendEmail.js            # Email sending utility
│   │   └── validator.js            # Input validation
│   ├── db/                         # Database configuration
│   │   └── config.js               # Prisma client
│   ├── websocket.js                # Socket.io configuration
│   ├── server.js                   # Express server entry point
│   ├── .env.example                # Environment variables template
│   └── package.json
│
└── .github/
    └── workflows/                   # CI/CD pipelines
        └── ci.yml                   # GitHub Actions workflow
```

## 🔐 Database Schema

### Models

- **User** - Student accounts with profile information
- **Company** - Company accounts with organization details
- **Job** - Job postings created by companies
- **Applications** - Job applications from users
- **Profile_user** - Extended user profile information
- **Profile_companies** - Extended company profile information
- **Document** - User uploaded CVs and resumes
- **College** - College/University information

## 🔄 API Endpoints

### Authentication

- `POST /api/auth/signup/user` - User registration
- `POST /api/auth/signup/company` - Company registration
- `POST /api/auth/login/user` - User login
- `POST /api/auth/login/company` - Company login

### Jobs (Public)

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID

### User Dashboard (Protected)

- `GET /api/User_dashboard/profile` - Get user profile
- `POST /api/User_dashboard/profile` - Update user profile
- `POST /api/User_dashboard/cv` - Upload CV
- `POST /api/User_dashboard/apply/:jobId` - Apply to job
- `GET /api/User_dashboard/applications` - Get user applications

### Company Dashboard (Protected)

- `GET /api/Company_dashboard/overview` - Get company overview
- `POST /api/Company_dashboard/post_job` - Create job posting
- `GET /api/Company_dashboard/jobs` - Get company jobs
- `GET /api/Company_dashboard/applications` - Get all applications
- `PUT /api/Company_dashboard/applications/:id/status` - Update application status
- `GET /api/Company_dashboard/profile` - Get company profile
- `POST /api/Company_dashboard/profile` - Update company profile

## 🔄 CI/CD Pipeline

This project includes automated CI pipeline that:

- ✅ Builds both frontend and backend
- ✅ Runs linting checks
- ✅ Executes tests
- ✅ Verifies deployment readiness
- ✅ Uploads build artifacts

Pipeline runs on every push and pull request to main/master/develop branches.

## 🔔 WebSocket Integration

### Real-time Notifications

The application uses Socket.io for real-time notifications:

- Automatic connection on user login
- JWT-based authentication for WebSocket
- Real-time job posting notifications
- Application status updates
- Browser notifications support

### Implementation

```javascript
// Client automatically connects on login
useNotifications(); // Custom hook handles connection

// Server sends notifications
notifyUser(userId, {
  title: "New Job Posted",
  message: "Check out the latest opportunities!",
  createdAt: new Date(),
});
```

## 📧 Email Notifications

Automated emails are sent for:

- Welcome emails on signup (both students and companies)
- Job application confirmations
- Application status updates
- Password reset (if implemented)

## 🧪 Running Tests

```bash
# Frontend tests
cd Client
npm test

# Backend tests
cd Server
npm test
```

## 📝 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jobstack"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Server
PORT=3000
NODE_ENV=development

# Email (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"  # Use App Password, not regular password

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)

```env
# API URL
VITE_API_URL="http://localhost:3000/api"

# WebSocket URL
VITE_SOCKET_URL="http://localhost:3000"
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Railway/Render/Heroku)

1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Deploy the server

## 🔒 Security Features

- JWT-based authentication
- Bcrypt password hashing (10 rounds)
- Role-based access control (RBAC)
- Protected routes with middleware
- CORS configuration
- Cookie-based session management
- Input validation and sanitization

## 📊 Key Features Breakdown

### Dashboard System

- **Student Dashboard**: Track applications, manage profile, upload CV
- **Company Dashboard**: Post jobs, view applications, hire candidates
- **Analytics**: Real-time metrics and statistics
- **Responsive Design**: Mobile-friendly interface

### Application System

- **Easy Apply**: One-click application with cover letter
- **Status Tracking**: PENDING → SHORTLISTED → HIRED/REJECTED
- **Resume Viewing**: Companies can view candidate resumes
- **Bulk Actions**: Mark all as read, clear notifications

### Job Management

- **Create Jobs**: Post new opportunities
- **Edit Jobs**: Update job details
- **Delete Jobs**: Remove listings
- **Job Filters**: Search and filter by criteria

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- None at the moment. Please report issues on GitHub.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- Krishna Gehlot - [@krishnagehlot](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Built with ❤️ using React and Node.js
- UI inspired by modern job portals like LinkedIn and Indeed
- Icons by Lucide Icons
- Animations and UI components inspired by Aceternity UI

## 📞 Support

For support, email krishnagehlot@example.com or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Add advanced search filters
- [ ] Implement chat system between companies and candidates
- [ ] Add video interview scheduling
- [ ] Resume parsing with AI
- [ ] Job recommendations based on user profile
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

Made with 💙 by Krishna Gehlot

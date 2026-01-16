# 🚀 JobStack - Job Portal Platform

![CI Pipeline](https://github.com/YOUR_USERNAME/JobStack/workflows/CI%20Pipeline/badge.svg)

A full-stack job portal connecting students with companies for career opportunities.

## ✨ Features

- 🔐 **Dual Authentication** - Separate portals for Students and Companies
- 💼 **Job Management** - Companies can post, edit, and manage job listings
- 📝 **Application System** - Students can apply with cover letters and CVs
- 📊 **Dashboard Analytics** - Real-time insights for companies
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔄 **Real-time Updates** - Application status tracking

## 🛠️ Tech Stack

### Frontend

- React 18 + Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Axios
- Lucide Icons

### Backend

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cookie-based Sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Git installed

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
cp .env.example .env
# Edit .env with your database credentials
npx prisma generate
npx prisma migrate dev
npm run dev
```

3. **Setup Frontend**

```bash
cd Client
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📁 Project Structure

```
JobStack/
├── Client/                 # Frontend React app
│   ├── src/
│   │   ├── Api/           # API calls and state management
│   │   ├── components/    # Reusable components
│   │   ├── page/          # Page components
│   │   └── App.jsx
│   └── package.json
├── Server/                # Backend Node.js app
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth & validation
│   ├── prisma/           # Database schema
│   └── package.json
└── .github/
    └── workflows/        # CI/CD pipelines
```

## 🔄 CI/CD Pipeline

This project includes automated CI pipeline that:

- ✅ Builds both frontend and backend
- ✅ Runs linting checks
- ✅ Executes tests
- ✅ Verifies deployment readiness
- ✅ Uploads build artifacts

Pipeline runs on every push and pull request to main/master/develop branches.

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

See `.env.example` files in both Client and Server directories for required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

- Your Name - [@your_handle](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Built with ❤️ using React and Node.js
- UI inspired by modern job portals
- Icons by Lucide

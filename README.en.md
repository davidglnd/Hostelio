# 🏨 Hostelio

> Web platform for business expense management

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Lit](https://img.shields.io/badge/Lit-3.x-324FFF?style=flat-square&logo=lit&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## 📋 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Design System](#-design-system)
- [Frontend Architecture](#-frontend-architecture)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 📖 Description

**Hostelio** is a full-stack web application that allows business owners to record, view, and analyze their operating expenses in a simple and efficient way.

It offers an interactive dashboard with monthly statistics, expense evolution charts, a filterable records table, and full user account management with secure JWT authentication.

---

## 🖼️ Preview

![Index + Login](./docs/login.gif)
![Page Navigation](./docs/flow.gif)
![Profile](./docs/profile.gif)

---

## ✨ Features

- 🔐 **Secure Authentication** — Login and registration with JWT stored in an `httpOnly` cookie, XSS and CSRF protection
- 📊 **Interactive Dashboard** — Three views (Summary, Statistics, Monthly) with sidebar navigation
- 📈 **Expense Charts** — Monthly visualization using Chart.js (bars grouped by period)
- 🧾 **Expense Logging** — Form with fields: supplier, amount, date, concept, and notes
- 👤 **User Profile** — Edit personal data with dynamic avatar, password change with strength indicator, danger zone for account deletion
- 🎨 **Custom Design System** — Design tokens, warm neutral palette with burnt orange accent, Playfair Display + Inter typography
- 🧩 **Web Components** — Reusable components with Lit (`app-header`, `sidebar-nav`, `expenses-card`, `stats-card`, `table-expenses`, `main-header`)
- 📱 **Responsive** — Adapted for mobile and desktop screens

---

## 🛠️ Technologies

### Backend

| Technology | Version | Use |
|---|---|---|
| Node.js | ≥ 20 | Runtime |
| Express | 5.x | HTTP Framework |
| MongoDB + Mongoose | 9.x | Database |
| JSON Web Token | 9.x | Authentication |
| bcrypt | 6.x | Password hashing |
| express-validator | 7.x | Input validation |
| cookie-parser | 1.x | Cookie handling |

### Frontend

| Technology | Version | Use |
|---|---|---|
| Vite | 8.x | Bundler and dev server |
| Lit | 3.x | Web Components |
| Axios | 1.x | HTTP client |
| Chart.js | 4.x | Charts and visualizations |

---

## 📁 Project Structure

```
hostelio/
├── frontend/
│   ├── index.html                  # Landing page
│   ├── 404.html                    # Error page
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── expenses.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   └── profile.html
│   ├── js/
│   │   ├── main.js                 # Entry point, page router
│   │   ├── classes/
│   │   │   └── User.js             # User model class
│   │   ├── components/             # Web Components (Lit)
│   │   │   ├── app-header.js
│   │   │   ├── sidebar-nav.js
│   │   │   ├── main-header.js
│   │   │   ├── table-expenses.js
│   │   │   └── cards/
│   │   │       ├── expensesCard.js
│   │   │       └── statsCard.js
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── login.js
│   │   │   │   ├── signup.js
│   │   │   │   └── logout.js
│   │   │   ├── dashboardViews/
│   │   │   │   ├── summaryView.js
│   │   │   │   ├── monthlyView.js
│   │   │   │   └── statsView.js
│   │   │   ├── stores/
│   │   │   │   └── expensesStore.js  # Session expense cache
│   │   │   ├── dashboard.js
│   │   │   └── expenses.js
│   │   └── utils/
│   │       ├── strings.js
│   │       └── dataUtils.js
│   └── styles/
│       ├── main.css                # CSS entry point with @layer
│       ├── base/
│       │   ├── tokens.css          # Design tokens (colors, typography, spacing)
│       │   ├── reset.css
│       │   └── typography.css
│       └── layout/
│           ├── grid.css            # Main layout with CSS Grid
│           └── dashboard.css
│
├── server/
│   ├── server.js                   # Express configuration
│   ├── db.js                       # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── expenses.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── expenses.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js      # JWT verification
│   └── validators/
│       └── login.validator.js
│
├── vite.config.mjs
├── nodemon.json
├── vercel.json                     # Rewrites for Vercel deployment
└── package.json
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v20 or higher
- **MongoDB** (local or MongoDB Atlas instance)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/davidglnd/Hostelio.git
cd hostelio

# 2. Install all dependencies
npm install

# 3. Create the environment variables file
cp .env.example .env
# Edit .env with your values (see next section)

# 4. Start the development server (backend with nodemon)
npm start

# 5. In another terminal, start the frontend with Vite
npm run dev
```

The backend will be available at `http://localhost:3000` and the Vite frontend at `http://localhost:5173` with automatic proxy to the API.

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# MongoDB connection
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<db_name>

# Secret for signing JWTs (use a long, random string in production)
JWT_SECRET=your_secure_secret_here

# Execution environment
NODE_ENV=development
```

> ⚠️ **Never** commit the `.env` file to the repository. It is included in `.gitignore`.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm start` | Starts the Express server with nodemon (auto-reload) |
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Generates the production bundle in `frontend/dist/` |

---

## 🔌 API Reference

All protected routes require a valid `token` cookie (set automatically on login).

### Authentication — `/api/auth`

| Method | Route | Protected | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | No | Logs in. Returns JWT cookie. |
| `POST` | `/api/auth/logout` | No | Logs out. Deletes the cookie. |
| `GET` | `/api/auth/me` | ✅ Yes | Returns authenticated user data. |

**Body — `POST /api/auth/login`**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Successful response — `GET /api/auth/me`**

```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "david"
  }
}
```

---

### Expenses — `/api/expenses`

| Method | Route | Protected | Description |
|---|---|---|---|
| `GET` | `/api/expenses` | ✅ Yes | Retrieves all expenses for the authenticated user. |
| `POST` | `/api/expenses` | ✅ Yes | Creates a new expense. |

**Body — `POST /api/expenses`**

```json
{
  "supplier": "Mercadona",
  "amount": 150.75,
  "date": "2025-06-01",
  "concept": "Food",
  "description": "Weekly supply purchase"
}
```

---

### User Profile — `/api/user/me`

| Method | Route | Protected | Description |
|---|---|---|---|
| `PATCH` | `/api/user/me` | ✅ Yes | Updates authenticated profile data (name, email, password) |
| `DELETE` | `/api/user/me` | ✅ Yes | Permanently deletes the account and all its data. |

**Body — `PATCH /api/user/me`**

```json
{
  "name": "example",
  "email": "someone@example.com"
}
```

---

## 🎨 Design System

Design tokens are defined in `frontend/styles/base/tokens.css` as CSS custom properties.

### Color Palette

| Token | Value | Use |
|---|---|---|
| `--color-accent-600` | `#C95B2A` | Main accent color (burnt orange) |
| `--color-bg` | `#F2EFE9` | Page background |
| `--color-surface` | `#FFFFFF` | Cards and panels |
| `--color-text-primary` | `#1A1A18` | Primary text |
| `--color-text-muted` | `#A09C94` | Secondary text / labels |

### Typography

- **Headings:** Playfair Display (400, 500, 600, 700)
- **Body:** Inter (400, 500, 600)
- **Mono:** JetBrains Mono / Fira Code

### CSS Layers (`@layer`)

The CSS follows an explicit cascade architecture with `@layer`:

```
reset → base → layout → components → utilities
```

---

## 🏗️ Frontend Architecture

### Page Router (`main.js`)

Routing is simple and based on the `data-page` attribute of the `<body>`. On `DOMContentLoaded`, `main.js` reads this attribute and initializes the corresponding module:

```javascript
// Each page declares its identity:
// <body data-page="dashboard">

switch (page) {
  case "dashboard": initDashboard(); break;
  case "login":     initLogin();    break;
  // ...
}
```

### Expense Cache (`expensesStore.js`)

To avoid duplicate requests, expenses are cached in memory during the session using a simple store pattern:

```javascript
// Only fetches if no cached data exists
export async function getExpenses() {
  if (expenses) return expenses.data;
  expenses = await axios.get("/api/expenses");
  return expenses.data;
}
```

### Web Components

UI components are built with **Lit** and follow the Web Components standard. Internal styles use global CSS custom properties to maintain consistency with the design system.

---

## 🌐 Deployment

The project is configured for a **split** deployment:

- **Frontend** → [Vercel](https://vercel.com) (static files from the Vite build)
- **Backend** → [Render](https://render.com) (Express server + MongoDB Atlas)

The `vercel.json` file automatically rewrites `/api/*` requests to the backend on Render:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://hostelio.onrender.com/api/:path*"
    }
  ]
}
```

### Production Build

```bash
npm run build
# Generates the bundle in frontend/dist/
# Deploy the contents of dist/ to Vercel
```

---

## 🤝 Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Make your changes and commit (`git commit -m 'feat: add new feature'`)
4. Push the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC** license. See the `package.json` file for more details.

---

David Galindo — [davidglnd](https://github.com/davidglnd)
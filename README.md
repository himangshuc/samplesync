# SampleSync

**Product sampling marketplace connecting brands with consumers.**

Brands create sampling campaigns, consumers sign up with their preferences, and SampleSync matches & delivers products every 2 weeks. Consumers provide feedback to stay eligible; brands get rich insights.

---

## Tech Stack

| Layer        | Technology                        |
|-------------|-----------------------------------|
| Backend     | Node.js + Express + PostgreSQL    |
| Web App     | React + Vite + Tailwind CSS       |
| Mobile App  | React Native (Expo)               |
| Auth        | JWT (JSON Web Tokens)             |
| Validation  | express-validator                  |

---

## Project Structure

```
samplesync/
├── backend/              # Express API server
│   └── src/
│       ├── config/       # DB connection, migrations, seed
│       ├── middleware/    # JWT auth middleware
│       └── routes/       # auth, users, campaigns, feedback
├── web/                  # React web frontend (Vite)
│   └── src/
│       ├── components/   # Navbar, shared UI
│       ├── hooks/        # useAuth context
│       ├── pages/        # Landing, Login, Signup, Dashboards
│       └── utils/        # Axios API client
├── mobile/               # React Native app (Expo)
│   └── src/
│       ├── screens/      # Login, Signup, Home, Samples, Profile
│       └── utils/        # API client
└── docs/                 # Documentation
```

---

## Prerequisites

Before you start, make sure you have installed:

1. **Node.js** (v18+) — https://nodejs.org
2. **PostgreSQL** (v14+) — https://www.postgresql.org/download/
3. **Git** — https://git-scm.com
4. **VS Code** — https://code.visualstudio.com
5. **Expo CLI** (for mobile) — `npm install -g expo-cli`

---

## Setup Instructions

### 1. Clone / Initialize the repo

If you downloaded this project as a zip, or want to push to GitHub:

```bash
cd samplesync
git init
git add .
git commit -m "Initial commit: SampleSync full-stack app"
```

To push to GitHub:

```bash
# Create a new repo on github.com (do NOT initialize with README)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/samplesync.git
git branch -M main
git push -u origin main
```

### 2. Set Up PostgreSQL

Open your terminal (or pgAdmin) and create the database:

```bash
psql -U postgres
```

```sql
CREATE DATABASE samplesync;
\q
```

### 3. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your actual PostgreSQL credentials:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/samplesync
DB_PASSWORD=YOUR_PASSWORD
JWT_SECRET=pick-a-long-random-string-here
```

### 4. Install Dependencies

From the project root:

```bash
# Install root dependencies
npm install

# Install backend
cd backend && npm install && cd ..

# Install web
cd web && npm install && cd ..

# Install mobile
cd mobile && npm install && cd ..
```

Or use the shortcut:

```bash
npm run install:all
```

### 5. Run Database Migrations

```bash
npm run db:migrate
```

This creates all tables: `users`, `brands`, `campaigns`, `sample_assignments`, `feedback`, `payments`.

### 6. Seed Sample Data (Optional)

```bash
npm run db:seed
```

This inserts test users, brands, and campaigns. Test credentials:
- **User:** alice@example.com / password123
- **Brand:** hello@glowlabs.com / password123

### 7. Start Development Servers

**Backend + Web (both at once):**

```bash
npm run dev
```

This starts:
- API server → http://localhost:4000
- Web app → http://localhost:3000

**Mobile (separate terminal):**

```bash
cd mobile
npx expo start
```

Scan the QR code with Expo Go app on your phone. For the mobile app to connect to the backend, update `mobile/src/utils/api.js` with your computer's local IP:

```js
const API_BASE = 'http://192.168.x.x:4000/api'; // your local IP
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/auth/user/signup | Register consumer  |
| POST   | /api/auth/user/login  | Login consumer     |
| POST   | /api/auth/brand/signup| Register brand     |
| POST   | /api/auth/brand/login | Login brand        |

### Users (requires auth, role: user)
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | /api/users/me      | Get my profile      |
| PUT    | /api/users/me      | Update profile      |
| GET    | /api/users/samples | My sample history   |

### Campaigns (requires auth)
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| POST   | /api/campaigns                 | Create campaign (brand)  |
| GET    | /api/campaigns/my              | My campaigns (brand)     |
| GET    | /api/campaigns/active          | Browse active campaigns  |
| GET    | /api/campaigns/:id             | Get campaign detail      |
| PUT    | /api/campaigns/:id             | Update campaign (brand)  |
| GET    | /api/campaigns/:id/insights    | Feedback insights (brand)|

### Feedback (requires auth)
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| POST   | /api/feedback         | Submit feedback       |
| GET    | /api/feedback/my      | My feedback history   |
| GET    | /api/feedback/pending | Samples needing review|

---

## VS Code Recommended Extensions

Open VS Code and install these for the best experience:

- **ESLint** — dbaeumer.vscode-eslint
- **Prettier** — esbenp.prettier-vscode
- **Tailwind CSS IntelliSense** — bradlc.vscode-tailwindcss
- **ES7+ React Snippets** — dsznajder.es7-react-js-snippets
- **PostgreSQL** — ckolkman.vscode-postgres
- **Thunder Client** — rangav.vscode-thunder-client (API testing)

Create a workspace file to open all three projects:

```bash
# In project root, VS Code will auto-detect the workspaces
code .
```

---

## Deployment

### Backend
- **Railway** or **Render**: Connect GitHub repo, set root directory to `backend/`, add env vars
- **Database**: Use Railway PostgreSQL or Neon (free tier)

### Web
- **Vercel**: Connect repo, set root to `web/`, framework preset "Vite"
- Add env var: `VITE_API_URL=https://your-backend.railway.app/api`

### Mobile
- **Expo EAS**: `npx eas build` to create iOS/Android builds
- Update `API_BASE` in mobile config for production URL

---

## Next Steps

Here are features you can add to extend SampleSync:

- [ ] Stripe/PayPal integration for brand payments
- [ ] Email notifications (SendGrid/Resend) for sample delivery & feedback reminders
- [ ] Admin dashboard for SampleSync operators
- [ ] Image upload for product photos and feedback photos (AWS S3/Cloudinary)
- [ ] Smart matching algorithm (preferences → campaign targeting)
- [ ] Push notifications on mobile (Expo Notifications)
- [ ] Analytics dashboard with charts (Recharts)
- [ ] Rate limiting and security hardening (helmet, rate-limit)

---

## License

MIT

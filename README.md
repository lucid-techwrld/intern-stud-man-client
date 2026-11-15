# Student Management UI

React 18 + Vite 5 + TypeScript + lucide-react (works on Node 18).

```bash
cp .env.example .env
npm install
npm run dev      # http://localhost:5173  (proxies /api to http://localhost:4000)
npm run build
```

All backend calls live in `src/api/`. Features: enrollment hero with a live course breakdown, search, course and status filters, card grid with pagination, a student profile drawer, add/edit/delete with field-level validation, and light and dark themes.

## Deploy
Build command `npm install && npm run build`, publish directory `dist`. Set `VITE_API_URL` to your API's URL ending in `/api` before building.

## Sign in
The app is an admin dashboard. Sign in with the admin email shown on the login screen (it is fixed) and your Intern ID as the password. Sessions use an httpOnly cookie set by the API, so the API's `CORS_ORIGIN` must match this app's origin, and in production both should be served over HTTPS.

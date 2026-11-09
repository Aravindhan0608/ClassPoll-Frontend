# ClassPoll+ — Frontend (Complete)

React 19 + Vite + Tailwind CSS frontend for ClassPoll+. All three role-based dashboards are now built and wired to the live backend + Socket.io.

## What's new in this stage

- **`AdminLayout`** — same sidebar/topbar/drawer pattern, with Dashboard / Users / Classes / Analytics / Settings nav
- **Admin Dashboard** — platform-wide stat cards (students, teachers, active classes, live polls, total votes, pending questions)
- **Manage Users** — role tabs (All/Students/Teachers), debounced search, pagination, activate/deactivate toggle, delete — admin accounts are simply not returned by these role filters, matching the backend's protection
- **Manage Classes** — platform-wide class list, search, archive any class
- **Analytics** — a Recharts bar chart of new signups over the last 14 days, breakdown cards for users-by-role / polls-by-status / questions-by-status, and the top 5 most-enrolled classes
- **Settings** — admin account details, with a short explanatory note on why there's only one admin and why it isn't editable here

## Frontend is now feature-complete

Every page from the spec exists: Landing, Login, Student Register, Teacher Register, 404, and the full Student / Teacher / Admin dashboards, all sharing one design system, one socket layer, and one API service layer.

## Getting Started

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Requires the backend running. To see every role: register a teacher, create a class; register a student, join it; seed an admin on the backend (`npm run seed:admin`) and log in as them to see the admin views.

## Not yet built
Final deployment pass — Render/Vercel deployment guide, ER diagram, and architecture diagram (the last item in the original project spec). Say "continue" for that.

## Design Tokens

| Token | Value | Use |
|---|---|---|
| `base` | `#0B0E17` | Page background |
| `base-surface` | `#131826` | Card/panel background |
| `base-elevated` | `#1A2033` | Raised surfaces, modals |
| `brand-500` | `#6366F1` | Primary actions, teacher accent |
| `pulse-500` | `#22D3C7` | Live/real-time indicators |
| `amber-500` | `#F59E0B` | Pending/attention states |
| Display font | Space Grotesk | Headlines |
| Body font | Inter | Everything else |
| Mono font | JetBrains Mono | Join codes, vote tallies, timestamps |

## Not yet built
Final deployment pass — Render/Vercel deployment guide, ER diagram, and architecture diagram. Say "continue" for that.

## Folder Structure

```
client/
  src/
    assets/{images,icons,logos}/
    components/
      common/       Button, Input, Card, LoadingScreen, EmptyState, Logo
      layout/       PublicNavbar, Footer, AuthLayout, Sidebar, Topbar
      poll/         LivePollMock, PollBallot, PollResultsBars, CreatePollForm, PollCard
      class/        ClassCard, ClassTabs, JoinClassModal, CreateClassModal
      question/     QuestionItem, AskQuestionForm, TeacherQuestionItem
      notification/ NotificationBell
      cards/        StatCard
      modals/        Modal
    context/       AuthContext.jsx
    hooks/         useClassRoom, usePollRoom, useSocketEvent
    layouts/       StudentLayout.jsx, TeacherLayout.jsx, AdminLayout.jsx
    pages/
      auth/        Login, StudentRegister, TeacherRegister
      shared/      Landing, NotFound
      student/     Dashboard, MyClasses, ActivePoll, PollHistory, Questions, Notifications, Profile
      teacher/     Dashboard, Classes, ClassDetail, PollResults, Questions, Profile
      admin/       Dashboard, Users, Classes, Analytics, Settings
    routes/        ProtectedRoute, RoleRoute, AppRoutes
    services/      axios, socket, auth, class, poll, vote, question, notification, admin .service.js
    utils/         constants.js, validators.js, helpers.js
    App.jsx
    main.jsx
    index.css
```

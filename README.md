# HRMS Recruitment Admin Panel

A complete, production-ready HR Management System (HRMS) recruitment admin panel built with **Next.js, React, Tailwind CSS, and shadcn/ui** featuring full **multi-role RBAC** (Role-Based Access Control) and **real-time SLA tracking**.

## 🎯 Overview

This is a fully functional admin panel designed for managing recruitment workflows with three distinct user roles:

- **Super Admin**: System-wide management and oversight
- **Staff (Recruiters)**: Job assignment and candidate suggestions
- **Customer (Company HR)**: Company-specific recruitment management

## ✨ Key Features

### Multi-Role System ✅
- **3 distinct roles** with separate dashboards and menus
- **Role-based data filtering** - each user sees only their authorized data
- **18+ unique routes** with proper permission checks
- **Automatic role-based redirects** on login

### Real-Time Features ⚡
- **SLA Timer Countdown** for interview deadlines
- Color-coded urgency levels (green → yellow → red)
- Live countdown updates every second

### Rich Dashboards 📊
- **Statistics cards** showing key metrics
- **Activity logs** for audit trails
- **Interview queues** with SLA tracking
- **Company performance** views

### Professional UI 🎨
- Clean, modern design with dark sidebar
- Responsive layout (mobile to desktop)
- shadcn/ui components for consistency
- Lucide icons throughout
- Smooth transitions and interactions

### Data Management 🗄️
- Mock in-memory database with realistic data
- 5 main entities: Companies, Jobs, Candidates, Interviews, Offers
- Pre-populated demo data
- Ready for real backend integration

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the project
cd project-name

# Install dependencies
npm install
# or
pnpm install
```

### 2. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Login with Demo Account

Visit `/login` and click on any of the three user cards:

| Role | Email | Password | Company |
|------|-------|---------|---------|
| **Super Admin** | admin@hrms.com | 123456 | System |
| **Staff** | recruiter@hrms.com | 123456 | Recruiter |
| **Hr** | hr@hrms.com | 123456 | Company HR |

No password required - just click to login!

## 📚 Documentation

Start here for complete information:

## 🏗️ Architecture

### Tech Stack
```
Frontend Framework: Next.js 14+ (App Router)
UI Library: React 18+
Styling: Tailwind CSS
Component Library: shadcn/ui
State Management: Zustand
Icons: Lucide React
Type Safety: TypeScript
Form Handling: React Hook Form ready
```

### Project Structure
```
app/
├── (auth)/login              # Login page
└── (admin)/
    ├── super-admin/          # Admin routes & pages
    ├── staff/                # Recruiter routes & pages
    └── customer/             # Company routes & pages

components/
├── admin/                    # Admin-specific components
├── layout/                   # Layout components
└── ui/                       # shadcn/ui components

lib/
├── auth/                     # Authentication & permissions
├── db/                       # Mock database
├── hooks/                    # Custom React hooks
├── routes/                   # Route configuration
└── utils/                    # Utilities & helpers
```

## 🔐 Authentication & Authorization

### Zustand Auth Store
```typescript
// Easy to use in any component
const { currentUser, login, logout, hasPermission } = useAuth();

// Check permissions
if (useAuth().hasPermission('manage:offers')) {
  // Show offer management UI
}
```

### Role-Based Data Filtering
```typescript
// Automatically filters data based on user role
const jobs = filterJobsByRole(allJobs, currentUser.role, currentUser.id);

// Super Admin sees all jobs
// Staff sees only assigned jobs
// Customer sees only their company's jobs
```

## 📊 Data Models

### Entities
- **Company**: Organization profiles
- **Job**: Job postings with requirements
- **Candidate**: Applicant profiles
- **Suggestion**: Staff recommendations
- **Interview**: Scheduled interviews with SLA deadlines
- **Offer**: Job offers extended to candidates
- **ActivityLog**: Audit trail of actions

### Mock Data Included
- 3 Companies
- 3 Job Postings
- 4 Candidates
- 2 Suggestions
- 2 Scheduled Interviews (with SLA)
- 1 Active Offer

## 🎯 Role Capabilities

### Super Admin
- View all data across all companies
- Manage companies and staff
- Post and manage jobs
- View all candidates
- Track all interviews with SLA
- Generate reports
- Configure system settings
- **18 menu items** | **12 unique pages**

### Staff (Recruiter)
- View assigned jobs only
- Manage candidates for assigned jobs
- Create and track suggestions
- Schedule interviews
- View performance metrics
- **9 menu items** | **9 unique pages**

### Customer (Company HR)
- View company-specific data only
- Post and manage jobs
- View suggested candidates
- Schedule interviews
- Manage offers
- **5 menu items** | **6 unique pages**

## ⚡ Bonus Features

### SLA Timer Countdown
Real-time countdown for interview deadlines with visual urgency indicators.

```typescript
// In interview queue page
<SLATimer deadline={interview.sla_deadline} />
// Updates every second, shows green/yellow/red
```

### Activity Logging
Tracks all actions in the system for audit purposes.

```typescript
logActivity(
  userId,
  userName,
  'create',
  'suggestion',
  suggestionId,
  'Created suggestion for Alice Rodriguez'
);
```

### Role-Based Data Filtering
Each role automatically sees filtered data without extra configuration.

```typescript
// Automatically works for any entity
const items = filterDataByRole(data, role, userId);
```

## 🔧 Configuration

### Adding a New Role
1. Add role to `lib/auth/types.ts`
2. Create mock user in `lib/auth/mockUsers.ts`
3. Add permissions to `lib/auth/permissions.ts`
4. Define routes in `lib/routes/roleRoutes.ts`
5. Create role folder in `app/(admin)/[role]/`
6. Add filtering logic if needed

### Adding a New Feature
1. Update data types in `lib/db/types.ts`
2. Add to mock database in `lib/db/mockDb.ts`
3. Add routes to `lib/routes/roleRoutes.ts`
4. Create page components
5. Add filtering in `lib/utils/dataFiltering.ts`

### Migrating to Real Backend
1. Replace `mockDb` with API calls
2. Integrate real authentication (NextAuth.js)
3. Connect to database (Supabase, Neon, etc.)
4. Update permission checks
5. Keep component structure unchanged

## 📱 Responsive Design

- **Mobile first** approach
- **Collapsible sidebar** on small screens
- **Responsive grids** that adapt to viewport
- **Touch-friendly** buttons and interactions
- **Tested** on mobile, tablet, and desktop

## 🎨 Design System

### Colors
```
Primary:     Blue (#3b82f6)
Success:     Green (#10b981)
Warning:     Amber (#f59e0b)
Danger:      Red (#ef4444)
Info:        Cyan (#06b6d4)
Background: Gray-50
Sidebar:    Gray-900
```

### Typography
- Headings: Bold, 24-32px
- Body: Regular, 14-16px
- Labels: Medium, 12-14px
- Monospace: Code snippets

## 🧪 Testing

Ready for testing with:
- Pre-configured test users
- Mock data that persists per session
- Clear error messages
- Loading states on all operations

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
# Via CLI
vercel

# Via GitHub
Connect repo to Vercel dashboard
```

### Environment Variables
```env
# Optional for production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📈 Performance

- **Fast page loads** with Next.js optimization
- **Client-side filtering** eliminates API calls
- **Lazy loading** of images
- **Efficient state** with Zustand
- **Component memoization** ready

## 🔒 Security

- **Type-safe** with TypeScript
- **Input validation** ready
- **Permission checks** on routes and data
- **No sensitive data** in localStorage (can be added)
- **XSS protection** with React escaping

## 🐛 Troubleshooting

### Routes not showing?
→ Check `lib/routes/roleRoutes.ts` for correct role configuration

### Data not filtering?
→ Verify `lib/utils/dataFiltering.ts` has correct role logic

### Auth not working?
→ Check browser console, ensure Zustand store is initialized

### SLA timer not updating?
→ Check useEffect in `components/admin/SLATimer.tsx`

## 📞 Support

- Check documentation files for detailed guides
- Review code comments for implementation details
- Inspect mock data in `lib/db/mockDb.ts` for format

## 📝 License

This project is open source and available for learning and development.

## 🎓 Learning Resources

This project demonstrates:
-  Next.js App Router patterns
-  Advanced React hooks usage
-  Zustand state management
-  TypeScript best practices
-  Tailwind CSS implementation
-  shadcn/ui component usage
-  Role-based access control
-  Complex data filtering
-  Real-time features
-  Professional UI design

Perfect for learning modern React/Next.js development!

---


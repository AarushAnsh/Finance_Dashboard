# Finance Dashboard UI

This project is my assignment submission for the Frontend Developer Intern role.

I kept the approach simple and practical:
- clean dashboard layout
- reusable React components
- clear state flow with Context
- good UX for loading, empty states, and role-based behavior

The assignment allowed mock data, so I implemented everything on frontend without backend dependency.

## Tech Stack

- React (functional components)
- Vite
- Recharts
- Context API
- CSS (custom, no UI library)

## Run the Project

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Features Implemented

### Dashboard Overview
- Summary cards: `Net Balance`, `Money In`, `Money Out`
- Time-based chart: balance trend line chart
- Category chart: expense breakdown pie chart

### Transactions Section
- Table fields: `date`, `amount`, `category`, `type`
- Search by category
- Filter by transaction type
- Sort by date/amount with asc/desc
- Empty state when no data matches

### Basic Role-Based UI
- Role switcher: `Viewer` / `Admin`
- Viewer can only see data
- Admin can add transactions via modal form

### Insights Section
- Highest spending category
- Month-over-month expense comparison
- One auto-generated observation from current data

### State Management
- Managed with `FinanceContext`
- Global state includes:
  - transactions
  - selected role
  - filters
- Shared handlers for add transaction, role switch, and filters

## Responsive Behavior

The layout is responsive and tested for desktop, tablet, and mobile:
- Desktop: sidebar + main content in two columns
- Tablet: cards and sections reflow into fewer columns
- Mobile: single-column layout, header actions stack, controls become full-width
- Charts resize based on available width
- Table remains usable with horizontal overflow handling

## UX Touches

- Loading state with skeleton placeholders
- Empty states for table/charts
- Hover and transition effects
- Dark mode toggle
- Transaction persistence with localStorage

## How It Works

1. On load, app reads transactions from localStorage (fallback to mock data).
2. `FinanceContext` provides shared state to cards, charts, table, and role controls.
3. Any transaction update immediately reflects across dashboard sections.
4. Updated transactions are saved back to localStorage.

## Folder Structure

```text
src/
├── components/
├── context/
├── pages/
└── utils/
```

## Notes

- Mock/static data is used intentionally (as per assignment scope).
- No backend or authentication flow is implemented.
- Focus is on frontend architecture, usability, and clarity.

## Future Improvements

- Edit/delete transaction actions
- Better form validation with inline messages
- Persist role + theme preferences
- CSV export

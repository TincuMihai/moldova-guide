# Plan de Commit-uri GitHub

## Commit 1: `feat: project foundation — types, constants, data`
```bash
git add src/types/ src/constants/ src/data/
git commit -m "feat: types, constants, mock data (11 types, 3 demo accounts, 8 attractions, 4 tours)"
```

## Commit 2: `feat: services layer — simulated backend`
```bash
git add src/services/
git commit -m "feat: 6 async services with localStorage persistence (auth, tours, bookings, trips, saved, attractions)"
```

## Commit 3: `feat: auth context and hooks`
```bash
git add src/context/ src/hooks/
git commit -m "feat: AuthContext, SidebarContext, useLoadingState, useConfirm"
```

## Commit 4: `feat: layout system — sidebar, header, footer`
```bash
git add src/components/layout/
git commit -m "feat: sidebar navigation, responsive header, footer, dashboard layout"
```

## Commit 5: `feat: reusable UI components`
```bash
git add src/components/ui/ src/components/common/
git commit -m "feat: ProtectedRoute, LoadingSpinner, Modal, ConfirmDialog, StatusBadge, cards"
```

## Commit 6: `feat: public pages (5)`
```bash
git add src/pages/public/
git commit -m "feat: Home, Explore, AttractionDetails, BrowseTours, TourDetails"
```

## Commit 7: `feat: auth pages`
```bash
git add src/pages/auth/
git commit -m "feat: Login/Register with validation, role selection, demo accounts"
```

## Commit 8: `feat: user dashboard pages (6)`
```bash
git add src/pages/user/
git commit -m "feat: Dashboard, Bookings, Trips, Planner, SavedPlaces, Profile"
```

## Commit 9: `feat: guide management pages (3)`
```bash
git add src/pages/guide/
git commit -m "feat: GuideDashboard, CreateTour wizard, MyTours management"
```

## Commit 10: `feat: error pages (4)`
```bash
git add src/pages/errors/
git commit -m "feat: 401, 403, 404, 500 error pages"
```

## Commit 11: `feat: app router and entry point`
```bash
git add src/App.tsx src/main.tsx src/index.css src/vite-env.d.ts
git commit -m "feat: 19 routes, protected routes, global styles, entry point"
```

## Conturi demo
- tourist@demo.md / tourist1236
- tourist@demo.md / tourist1235
- admin@demo.md / admin123
- admin@demo.md / admin123
- admin@demo.md / admin123
- admin@demo.md / admin123

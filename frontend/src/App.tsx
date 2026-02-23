import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import ExplorePage from './pages/public/ExplorePage';
import AttractionDetailsPage from './pages/public/AttractionDetailsPage';
import BrowseToursPage from './pages/public/BrowseToursPage';
import TourDetailsPage from './pages/public/TourDetailsPage';

// Auth
import LoginPage from './pages/auth/LoginPage';

// User pages
import UserDashboard from './pages/user/UserDashboard';
import MyBookingsPage from './pages/user/MyBookingsPage';
import MyTripsPage from './pages/user/MyTripsPage';
import TripPlannerPage from './pages/user/TripPlannerPage';
import SavedPlacesPage from './pages/user/SavedPlacesPage';
import UserProfilePage from './pages/user/UserProfilePage';

// Guide pages
import GuideDashboard from './pages/guide/GuideDashboard';
import CreateTourPage from './pages/guide/CreateTourPage';
import MyToursPage from './pages/guide/MyToursPage';

// Error pages
import Page401 from './pages/errors/Page401';
import Page403 from './pages/errors/Page403';
import Page404 from './pages/errors/Page404';
import Page500 from './pages/errors/Page500';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* === Public pages (5) === */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:slug" element={<AttractionDetailsPage />} />
          <Route path="/tours" element={<BrowseToursPage />} />
          <Route path="/tours/:slug" element={<TourDetailsPage />} />

          {/* === Auth === */}
          <Route path="/login" element={<LoginPage />} />

          {/* === User pages (7) — all roles === */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/bookings" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <MyBookingsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/trips" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <MyTripsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/planner" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <TripPlannerPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/saved" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <SavedPlacesPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
              <UserProfilePage />
            </ProtectedRoute>
          } />

          {/* === Guide pages (3) — guide only === */}
          <Route path="/guide/dashboard" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <GuideDashboard />
            </ProtectedRoute>
          } />
          <Route path="/guide/create-tour" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <CreateTourPage />
            </ProtectedRoute>
          } />
          <Route path="/guide/my-tours" element={
            <ProtectedRoute allowedRoles={['guide']}>
              <MyToursPage />
            </ProtectedRoute>
          } />

          {/* === Error pages (4) === */}
          <Route path="/401" element={<Page401 />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

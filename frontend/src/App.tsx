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

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTours from './pages/admin/AdminTours';
import AdminAttractions from './pages/admin/AdminAttractions';
import AdminSettings from './pages/admin/AdminSettings';
import AdminErrorPages from './pages/admin/AdminErrorPages';

// 404 catch-all
import Page404 from './pages/errors/Page404';

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

          {/* === User pages (6) — tourist + guide === */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/bookings" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
              <MyBookingsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/trips" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
              <MyTripsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/planner" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
              <TripPlannerPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/saved" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
              <SavedPlacesPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute allowedRoles={['tourist', 'guide']}>
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

          {/* === Admin pages (6) — admin only === */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/tours" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminTours />
            </ProtectedRoute>
          } />
          <Route path="/admin/attractions" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAttractions />
            </ProtectedRoute>
          } />
          <Route path="/admin/error-pages" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminErrorPages />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          } />

          {/* === 404 catch-all === */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

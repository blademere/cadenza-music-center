import { Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

import LandingPage from "@/features/landing/pages/LandingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

//Admin Pages
import DashboardPage from "@/features/admin/pages/DashboardPage";
import StudentsPage from "@/features/admin/pages/StudentsPage";
import InstructorsPage from "@/features/admin/pages/InstructorsPage";
import CoursesPage from "@/features/admin/pages/CoursesPage";
import EnrollmentsPage from "@/features/admin/pages/EnrollmentsPage";
import ClassSchedulePage from "@/features/admin/pages/ClassSchedulePage";
import RoomsPage from "@/features/admin/pages/RoomsPage";
import RoomRentalsPage from "@/features/admin/pages/RoomRentalsPage";
import InstrumentsPage from "@/features/admin/pages/InstrumentsPage";
import InstrumentRentalsPage from "@/features/admin/pages/InstrumentRentalsPage";
import AttendancePage from "@/features/admin/pages/AttendancePage";
import PaymentsPage from "@/features/admin/pages/PaymentsPage";
import EnrollmentRatesPage from "@/features/admin/pages/EnrollmentRatesPage";
import UserManagementPage from "@/features/admin/pages/UserManagementPage";
import ReportsPage from "@/features/admin/pages/ReportsPage";
import SettingsPage from "@/features/admin/pages/SettingsPage";
import AdminProfilePage from "@/features/admin/pages/AdminProfilePage";
import NotificationsPage from "@/features/admin/pages/NotificationsPage";
import HelpPage from "@/features/admin/pages/HelpPage";

//Front Desk Pages
import FrontDeskDashboardPage from "@/features/front-desk/pages/FrontDeskDashboardPage";
import FrontDeskClassSchedulePage from "@/features/front-desk/pages/FrontDeskClassSchedulePage";
import FrontDeskStudentsPage from "@/features/front-desk/pages/FrontDeskStudentsPage";
import FrontDeskEnrollmentsPage from "@/features/front-desk/pages/FrontDeskEnrollmentsPage";
import FrontDeskInstructorsPage from "@/features/front-desk/pages/FrontDeskInstructorsPage";
import FrontDeskNotificationsPage from "@/features/front-desk/pages/FrontDeskNotificationsPage";
import FrontDeskProfilePage from "@/features/front-desk/pages/FrontDeskProfilePage";
import FrontDeskInstrumentRentalsPage from "@/features/front-desk/pages/FrontDeskInstrumentRentalsPage";
import FrontDeskRoomBookings from "@/features/front-desk/pages/FrontDeskRoomBookings";
import BillingPayments from "@/features/front-desk/pages/FrontDeskBillingPayments";

import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<AppLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      {/* Admin */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="admin">
          <Route index element={<DashboardPage />} />

          <Route path="students" element={<StudentsPage />} />
          <Route path="instructors" element={<InstructorsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="schedule" element={<ClassSchedulePage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="room-rentals" element={<RoomRentalsPage />} />
          <Route path="instruments" element={<InstrumentsPage />} />
          <Route
            path="instrument-rentals"
            element={<InstrumentRentalsPage />}
          />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="enrollment-rates" element={<EnrollmentRatesPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="reports" element={<ReportsPage />} />

          {/* Admin Profile & Notifications */}
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />

          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Route>

      {/* Front Desk */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="front-desk">
          <Route index element={<FrontDeskDashboardPage />} />

          <Route path="students" element={<FrontDeskStudentsPage />} />
          <Route path="instructors" element={<FrontDeskInstructorsPage />} />
          <Route path="enrollments" element={<FrontDeskEnrollmentsPage />} />
          <Route path="schedule" element={<FrontDeskClassSchedulePage />} />
          <Route path="instrument-rentals" element={<FrontDeskInstrumentRentalsPage />} />
          <Route path="room-bookings" element={<FrontDeskRoomBookings />} />
          <Route path="billing" element={<BillingPayments />} />

          {/* Front Desk Profile & Notifications */}
          <Route path="profile" element={<FrontDeskProfilePage />} />
          <Route path="notifications" element={<FrontDeskNotificationsPage />} />

          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

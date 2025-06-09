import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Index from "@/pages/Index";
import Projects from "@/pages/portfolio/Projects";
import Contact from "@/pages/portfolio/Contact";
import NotFound from "@/pages/NotFound";
import Project from "@/pages/portfolio/Project";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import Inquiry from "@/pages/portfolio/inqury";
import ReviewsPage from "./pages/portfolio/ReviewsPage";
import InquirerDashboard from "./pages/inquirer/InquirerDashboard";
import Payments from "./pages/inquirer/Payments";
import Hosting from "./pages/inquirer/Hosting";
import SubmitReview from "./pages/inquirer/SubmitReview";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllPayments from "./pages/admin/AllPayments";
import ManageReviews from "./pages/admin/ManageReviews";
import AllInquiries from "./pages/admin/AllInquiries";
import AllUsers from "./pages/admin/AllUsers";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";


const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/inqury" element={<Inquiry />} />

              {/* LEGAL SHISH */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* PUBLIC LOGIN PAGE */}
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />

              {/* PUBLIC REVIEWS PAGE */}
              <Route path="/reviews" element={<ReviewsPage />} />

              {/* INQUIRER DASHBOARD */}
              <Route path="/inquirer" element={<InquirerDashboard />}>
                <Route index element={<Navigate to="payments" replace />} />
                <Route path="payments" element={<Payments />} />
                <Route path="hosting" element={<Hosting />} />
                <Route path="submit-review" element={<SubmitReview />} />
              </Route>

              {/* ADMIN DASHBOARD */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<Navigate to="users" replace />} />
                <Route path="payments" element={<AllPayments />} />
                <Route path="reviews" element={<ManageReviews />} />
                <Route path="inquiries" element={<AllInquiries />} />
                <Route path="users" element={<AllUsers />} />
              </Route>


              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;

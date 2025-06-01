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
import ReviewsPage from "./pages/ReviewsPage";
import InquirerDashboard from "./pages/inquirer/InquirerDashboard";
import Payments from "./pages/inquirer/Payments";
import Hosting from "./pages/inquirer/Hosting";
import SubmitReview from "./pages/inquirer/SubmitReview";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllHosting from "./pages/admin/AllHosting";
import AllPayments from "./pages/admin/AllPayments";
import ManageReviews from "./pages/admin/ManageReviews";


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
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/inqury" element={<Inquiry />} />
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
                <Route index element={<Navigate to="payments" replace />} />
                <Route path="payments" element={<AllPayments />} />
                <Route path="hosting" element={<AllHosting />} />
                <Route path="reviews" element={<ManageReviews />} />
              </Route>


              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;

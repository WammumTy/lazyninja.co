import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import Projects from "@/pages/portfolio/Projects";
import Contact from "@/pages/portfolio/Contact";
import NotFound from "@/pages/NotFound";
import Project from "@/pages/portfolio/Project";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import Inquiry from "@/pages/freelance/inqury";
import SignupPage from "@/pages/accounts/SignupPage";
import LoginPage from "@/pages/accounts/LoginPage";
import BlogList from "./pages/blogs/BlogList";
import BlogPost from "./pages/blogs/BlogPost";
import PostBlog from "./pages/blogs/PostBlog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequireAdmin from "./components/admin/RequireAdmin";
import Dashboard from "./pages/accounts/Dashboard";

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
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user" element={<Dashboard />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/blog/post" element={<PostBlog />} />
              <Route path="/admin" element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              } />


              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;

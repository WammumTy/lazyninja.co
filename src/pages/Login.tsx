// src/pages/Login.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { token, role, needsPasswordChange } = await loginRequest({
        email,
        password,
      });

      // Store the token (you may also store userEmail if you like)
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      // If backend indicates the user must change their password, redirect to that page
      if (needsPasswordChange) {
        // Pass along the role so ChangePassword knows where to go afterward
        navigate("/change-password", { state: { role } });
        return;
      }

      // Otherwise, go straight to the correct dashboard
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/inquirer");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
    <div className="min-h-dvh flex items-center justify-center bg-brown-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mb-32">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-brown-700 text-white font-medium rounded-md hover:bg-brown-00 disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
          
           <p className="text-center text-lg text-brown-800 mb-3">
              Dont have a account? {' '}
              <NavLink to="/inqury" className="text-brown-700 hover:text-gray-700 transition-colors">
                Fill out a inqury!
              </NavLink>
          </p>
        </form>
      </div>
    </div>
    </PageLayout>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import ProtectedRoute from "./components/ProtectedRoute";


function Login() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Login Page </h2>
      <p>Auth not connected yet</p>
    </div>
  );
}

function Register() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Register Page </h2>
      <p>Auth not connected yet</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />

          {/* Default landing page */}
          <Route path="*" element={<Login />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
// App.js
import './App.css';
import axios from "axios";

// Pages
import BudgetPage from './pages/BudgetPage.jsx';
import Dashboard from './pages/Dashboard.js';
import ExpensePage from "./pages/ExpensePage";

// Components
import ExpenseNav from "./components/expense/ExpenseNav";

// Auth screens
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';

// React & Context
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext'; // adjust path

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { user, logout } = useContext(AuthContext); // get user & logout from context
  const [view, setView] = useState('login'); // login/signup/forgotPassword view

  // Load users for testing or other purposes
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/users");
        setUsers(result.data || []);
        
      } catch (err) {
        console.error("Failed loading users:", err);
      }
    };
    loadUsers();
  }, []);

  // Navigation helpers for auth screens
  const navigateToForgotPassword = () => setView('forgotPassword');
  const navigateToSignUp = () => setView('signup');
  const navigateToLogin = () => setView('login');

  // AUTH SCREENS

  if (!user) {
    return (
      <div className="App">
        {view === 'login' && (
          <Login
            onForgotPasswordClick={navigateToForgotPassword}
            onSignUpClick={navigateToSignUp}
            onLoginSuccess={() => setView('login')} // optional callback
          />
        )}
        {view === 'forgotPassword' && (
          <ForgotPassword onBackToLogin={navigateToLogin} />
        )}
        {view === 'signup' && (
          <SignUp onBackToLogin={navigateToLogin} />
        )}
      </div>
    );
  }

 
  // MAIN APP ROUTES
  return (
    <Router>
      <ExpenseNav onLogout={logout} /> {/* logout function in AuthContext */}
      <Routes>
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} /> {/* default route */}
      </Routes>
    </Router>
  );
}

export default App;

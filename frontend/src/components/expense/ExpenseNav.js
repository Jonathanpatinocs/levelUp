// Import Logo
import logo from '../../assets/levelUp-logo.png';
import { Link } from "react-router-dom";
// Import css File
import './ExpenseNav.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// Expense NavBar Component Function
export default function ExpenseNav() {
 
  // Function - Logout
function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return <button onClick={logout}>Logout</button>;
}
  

  // Top Navigation Display
  return (
    <header className="expense-nav">
      <div className="expense-nav-inner">
        {/*====Left Navigation. Note "aria" provides accessiblity for ambiguous labels.===*/}
        <a href="/" className="levelUp-brand" aria-label="LevelUp home">
          {/*Use levelUp-brand-text css class for Level Up*/}
           <img src={logo} alt="Logo"/>
          <span className="levelUp-brand-text">LevelUp</span>
          <span className="levelUp-brand-arrow" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#ffffff"
            >
              <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
            </svg>
          </span>
        </a>

        {/*===================Center Navigation===========*/}
        {/*'nav' is more specific than 'div' here though both can be used."*/}
        <nav className="expense-links" aria-label="Primary Navigation">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/budget">Budget</Link>
          <Link to="/expense">Expense</Link>
        </nav>

        {/*===================Right Navigation===========*/}
        <div className="expense-logout">
          <LogoutButton className="btn btn--outline" href="#!" >
            Log Out
          </LogoutButton>
        </div>
      </div>
    </header>
  );
}

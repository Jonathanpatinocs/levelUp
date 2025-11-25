import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <span style={styles.logo}>
          Level<span style={styles.logoAccent}>Up</span>
        </span>
      </div>

      <nav style={styles.nav}>
        <Link
          to="/dashboard"
          style={{
            ...styles.navLink,
            ...(isActive("/dashboard") ? styles.navLinkActive : {}),
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/income"
          style={{
            ...styles.navLink,
            ...(isActive("/income") ? styles.navLinkActive : {}),
          }}
        >
          Income
        </Link>
        <Link
          to="/expenses"
          style={{
            ...styles.navLink,
            ...(isActive("/expenses") ? styles.navLinkActive : {}),
          }}
        >
          Expenses
        </Link>
      </nav>

      <div style={styles.right}>
        <Link to="/register" style={styles.ghostButton}>
          Sign Up
        </Link>
        <Link to="/login" style={styles.solidButton}>
          Log In
        </Link>
      </div>
    </header>
  );
}

const BRAND_RED = "#A41727";
const BRAND_PINK = "#FF7A7B";
const DARK_GRAY = "#333333";

const styles = {
  header: {
    width: "100%",
    backgroundColor: BRAND_RED,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 2.5rem",
    position: "sticky",
    top: 0,
    zIndex: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: 800,
    letterSpacing: "0.03em",
  },
  logoAccent: {
    color: BRAND_PINK,
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  navLink: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#fde8e8",
    paddingBottom: "0.2rem",
    borderBottom: "2px solid transparent",
    transition: "color 150ms ease, border-color 150ms ease",
  },
  navLinkActive: {
    color: "#ffffff",
    borderBottomColor: "#ffffff",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  solidButton: {
    padding: "0.5rem 1.3rem",
    borderRadius: "999px",
    backgroundColor: DARK_GRAY,
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 600,
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "background-color 150ms ease, transform 120ms ease",
  },
  ghostButton: {
    padding: "0.5rem 1.3rem",
    borderRadius: "999px",
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 600,
    border: `2px solid #ffffff`,
    cursor: "pointer",
    transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
  },
};
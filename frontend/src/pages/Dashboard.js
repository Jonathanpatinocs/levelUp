import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

const COLORS = ["#511D43", "#901E3E", "#DC2525", "#EAEBD0", "#075B5E"];

function BudgetPieChart() {
  const { user, token } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = useCallback(async () => {
    if (!user || !token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/budgets?userId=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setBudgets(data);
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  }, [user, token]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  if (!user) return <p>Loading user info...</p>;
  if (budgets.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <PieChart width={300} height={350}>
      <Pie
        data={budgets}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={110}
        label
      >
        {budgets.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default function Dashboard() {
  return (
    <div style={styles.page}>
      
      <main style={styles.main}>
        {/* Hero section */}
        <section style={styles.heroSection}>
          <div style={styles.heroText}>
            <p style={styles.kicker}>PERSONAL FINANCE • LEVELUP</p>
            <h1 style={styles.heroTitle}>
              Take Control Of Your{" "}
              <span style={styles.heroHighlight}>Finances</span>
              <br />
              With LevelUp
            </h1>
            <p style={styles.heroBody}>
              Personal finance shouldn&apos;t be a headache. Use LevelUp to bring
              all your income, budgets, and expenses into one simple, visual
              dashboard.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/budget">
                <button style={styles.primaryButton}>View Budgets</button>
              </Link>
              <Link to="/expense">
                <button style={styles.secondaryButton}>View Spending</button>
              </Link>
              
            </div>
          </div>
          <div style={styles.heroPlaceholder}>
            <div style={styles.heroCard}>
              <h3 style={styles.heroCardTitle}>This is your dashboard</h3>
              <p style={styles.heroCardBody}>
                
              </p>
              <div style={{marginTop: "20px"}}>
                  <BudgetPieChart />
              </div>
              
            </div>
          </div>
        </section>

        {/* Dark secondary section */}
        <section style={styles.darkSection}>
          <div style={styles.darkInner}>
            <h2 style={styles.darkTitle}>
              A Comprehensive Financial Portal
              <br />
              At Your Fingertips
            </h2>
            <p style={styles.darkBody}>
              LevelUp will provide income tracking, spending insights, personal
              budgets, and alerts.
            </p>
            <button style={styles.outlineLightButton}>Learn More</button>
          </div>
        </section>
      </main>
    </div>
  );
}

const BRAND_RED = "#A41727";
const BRAND_PINK = "#FF7A7B";
const DARK_SECTION = "#333333";

const styles = {
  page: {
    minHeight: "100vh",
    minWidth: "850px",
    backgroundColor: "#f3f3f3",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem 3rem",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
    gap: "2.5rem",
    alignItems: "center",
    marginBottom: "3rem",
  },
  heroText: {
    paddingRight: "1rem",
  },
  kicker: {
    fontSize: "0.8rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: BRAND_RED,
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  heroTitle: {
    fontSize: "2.4rem",
    lineHeight: 1.15,
    fontWeight: 800,
    marginBottom: "1rem",
  },
  heroHighlight: {
    backgroundColor: BRAND_PINK,
    padding: "0 0.2rem",
  },
  heroBody: {
    fontSize: "0.98rem",
    lineHeight: 1.6,
    color: "#4b5563",
    maxWidth: "32rem",
    marginBottom: "1.5rem",
  },
  heroButtons: {
    display: "flex",
    gap: "0.75rem",
  },
  primaryButton: {
    padding: "0.75rem 1.6rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: BRAND_RED,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "0.75rem 1.6rem",
    borderRadius: "999px",
    border: `2px solid ${BRAND_RED}`,
    backgroundColor: "#ffffff",
    color: BRAND_RED,
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  heroPlaceholder: {
    display: "flex",
    justifyContent: "center",
  },
  heroCard: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: "#ffffff",
    borderRadius: "1.25rem",
    padding: "1.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  },
  heroCardTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  heroCardBody: {
    fontSize: "0.9rem",
    color: "#4b5563",
    lineHeight: 1.5,
  },
  darkSection: {
    marginTop: "1rem",
    backgroundColor: DARK_SECTION,
    borderRadius: "1.5rem",
    padding: "2.5rem 2rem",
  },
  darkInner: {
    maxWidth: "40rem",
  },
  darkTitle: {
    color: "#ffffff",
    fontSize: "1.8rem",
    fontWeight: 800,
    marginBottom: "1rem",
  },
  darkBody: {
    color: "#e5e7eb",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
  },
  outlineLightButton: {
    padding: "0.75rem 1.8rem",
    borderRadius: "999px",
    border: "2px solid #ffffff",
    backgroundColor: "transparent",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
};
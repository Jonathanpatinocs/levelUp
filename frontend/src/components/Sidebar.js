import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>LevelUp</h2>
      <ul style={styles.links}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/income">Income</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#f1f1f1",
    padding: "20px",
    minHeight: "100vh",
  },
  links: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};
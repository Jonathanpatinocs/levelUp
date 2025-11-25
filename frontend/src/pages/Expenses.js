import Navbar from "../components/Navbar";

export default function Expenses() {
  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <section style={styles.card}>
          <h1 style={styles.title}>Expenses</h1>
          <p style={styles.body}>
            expense tracking UI (tables,charts, filters).
          </p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f3f3",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1.5rem 3rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: "0.75rem",
  },
  body: {
    fontSize: "0.96rem",
    lineHeight: 1.6,
    color: "#4b5563",
  },
};
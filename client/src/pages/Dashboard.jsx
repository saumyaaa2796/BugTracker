import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2>Loading Dashboard...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <DashboardCard
            title="Total Projects"
            value={stats.totalProjects}
          />

          <DashboardCard
            title="Total Bugs"
            value={stats.totalBugs}
          />

          <DashboardCard
            title="Open Bugs"
            value={stats.openBugs}
          />

          <DashboardCard
            title="In Progress"
            value={stats.inProgressBugs}
          />

          <DashboardCard
            title="Resolved Bugs"
            value={stats.resolvedBugs}
          />

          <DashboardCard
            title="Closed Bugs"
            value={stats.closedBugs}
          />

          <DashboardCard
            title="Critical Bugs"
            value={stats.criticalBugs}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
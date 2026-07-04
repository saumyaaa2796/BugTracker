import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BugCard from "../components/BugCard";

function Bugs() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data);

      if (res.data.length > 0) {
        setSelectedProject(res.data[0]._id);
        fetchBugs(res.data[0]._id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchBugs = async (projectId) => {
    setLoading(true);

    try {
      const res = await api.get(`/bugs/project/${projectId}`);
      setBugs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (e) => {
    const id = e.target.value;
    setSelectedProject(id);
    fetchBugs(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bugs", {
        ...formData,
        project: selectedProject,
      });

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
      });

      fetchBugs(selectedProject);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const updateStatus = async (bugId, status) => {
    try {
      await api.put(`/bugs/${bugId}/status`, {
        status,
      });

      fetchBugs(selectedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch = bug.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || bug.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      bug.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2>Loading Bugs...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Bugs</h1>

        <h3>Select Project</h3>

        <select
          value={selectedProject}
          onChange={handleProjectChange}
        >
          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.name}
            </option>
          ))}
        </select>

        <hr />

        <h2>Report Bug</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Bug Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            required
          />

          <br />
          <br />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            required
          />

          <br />
          <br />

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value,
              })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <br />
          <br />

          <button type="submit">
            Report Bug
          </button>
        </form>

        <hr />

        <h2>Search & Filter</h2>

        <input
          type="text"
          placeholder="Search bugs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <br />
        <br />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          style={{ marginLeft: "10px" }}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <hr />

        {filteredBugs.length === 0 ? (
          <h3>No Bugs Found</h3>
        ) : (
          filteredBugs.map((bug) => (
            <BugCard
              key={bug._id}
              bug={bug}
              updateStatus={updateStatus}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Bugs;
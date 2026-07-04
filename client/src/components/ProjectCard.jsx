function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2>{project.name}</h2>

      <p>{project.description}</p>

      <p>
        <strong>Owner:</strong> {project.owner?.name || "You"}
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ProjectCard;
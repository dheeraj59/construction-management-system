import { useState } from "react";
function Projects({ projects, onProjectsChange, onProjectSelect }) {
      

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  client: "",
  location: "",
  supervisor: "",
  startDate: "",
  expectedCompletion: "",
  contractValue: "",
  projectType: "",
});
    const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const handleFormChange = (event) => {
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

const handleAddProject = (event) => {
  event.preventDefault();

  if (!formData.name.trim()) {
    alert("Please enter the project name.");
    return;
  }

  if (!formData.client.trim()) {
    alert("Please enter the client name.");
    return;
  }

  if (!formData.location.trim()) {
    alert("Please enter the project location.");
    return;
  }

  if (!formData.supervisor.trim()) {
    alert("Please enter the supervisor name.");
    return;
  }

  if (!formData.projectType) {
    alert("Please select a project type.");
    return;
  }

  if (!formData.startDate) {
    alert("Please select the project start date.");
    return;
  }

  if (!formData.expectedCompletion) {
    alert("Please select the expected completion date.");
    return;
  }

  if (formData.expectedCompletion < formData.startDate) {
    alert("Expected completion date cannot be before start date.");
    return;
  }

  if (
    formData.contractValue === "" ||
    Number(formData.contractValue) <= 0
  ) {
    alert("Contract value must be greater than 0.");
    return;
  }
  const newProject = {
    id: Date.now(),
    name: formData.name,
    client: formData.client,
    location: formData.location,
    status: "In Progress",
    progress: 0,
    supervisor: formData.supervisor,
    startDate: formData.startDate,
    expectedCompletion: formData.expectedCompletion,
    contractValue: Number(formData.contractValue),
    projectType: formData.projectType,
  };

  onProjectsChange((previousProjects) => [
  ...previousProjects,
  newProject,
]);

  setFormData({
    name: "",
    client: "",
    location: "",
    supervisor: "",
    startDate: "",
    expectedCompletion: "",
    contractValue: "",
    projectType: "",
  });

  setShowForm(false);
};
  return (
       <div>
      <div className="page-header">
        <div>
          <h2>Projects</h2>
          <p className="dashboard-subtitle">
            Manage all construction projects
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Project
        </button>
      </div>

      <div className="project-summary-grid">
        <div className="stat-card">
          <span>Total Projects</span>
          <strong>{projects.length}</strong>
        </div>

        <div className="stat-card">
          <span>In Progress</span>
          <strong>
            {projects.filter(
              (project) => project.status === "In Progress"
            ).length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Delayed</span>
          <strong>
            {projects.filter(
              (project) => project.status === "Delayed"
            ).length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>
            {projects.filter(
              (project) => project.status === "Completed"
            ).length}
          </strong>
        </div>
      </div>

      <div className="project-controls">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Delayed">Delayed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="project-list">
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>Try changing your search or status filter.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
  className="project-card"
  key={project.id}
  onClick={() => onProjectSelect(project)}
>
              <div className="project-card-header">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.client}</p>
                </div>

                <span
                  className={`status-badge ${project.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-details">
                <span>
                  <strong>Location:</strong> {project.location}
                </span>

                <span>
                  <strong>Supervisor:</strong> {project.supervisor}
                </span>
              </div>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddProject}>
            <div className="modal-header">
              <h2>Add Project</h2>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <p className="dashboard-subtitle">
              Project creation form will be connected to the database later.
            </p>

            <div className="form-group">
              <label>Project Name</label>
             <input
  type="text"
  name="name"
  placeholder="Enter project name"
  value={formData.name}
  onChange={handleFormChange}
  required
/>
            </div>

            <div className="form-group">
              <label>Client</label>
             <input
  type="text"
  name="client"
  placeholder="Enter client name"
  value={formData.client}
  onChange={handleFormChange}
  required
/>
            </div>

            <div className="form-group">
              <label>Location</label>
             <input
  type="text"
  name="location"
  placeholder="Enter project location"
  value={formData.location}
  onChange={handleFormChange}
  required
/>
            </div>

            <div className="form-group">
              <label>Supervisor</label>
             <input
  type="text"
  name="supervisor"
  placeholder="Enter supervisor name"
  value={formData.supervisor}
  onChange={handleFormChange}
  required
/>
            </div>
            <div className="form-group">
  <label>Project Type</label>

  <select
    name="projectType"
    value={formData.projectType}
    onChange={handleFormChange}
    required
  >
    <option value="">Select project type</option>
    <option value="Building">Building</option>
    <option value="Water Tank">Water Tank</option>
    <option value="Renovation">Renovation</option>
    <option value="Other">Other</option>
  </select>
</div>
<div className="form-group">
  <label>Start Date</label>

  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleFormChange}
    required
  />
</div>

<div className="form-group">
  <label>Expected Completion</label>

  <input
    type="date"
    name="expectedCompletion"
    value={formData.expectedCompletion}
    onChange={handleFormChange}
    min={formData.startDate}
    required
  />
</div>

<div className="form-group">
  <label>Contract Value</label>

  <input
    type="number"
    name="contractValue"
    placeholder="Enter contract value"
    value={formData.contractValue}
    onChange={handleFormChange}
    min="0"
    required
  />
</div>

            <button
  type="submit"
  className="primary-button full-width"
>
  Save Project
</button>
</form>


          </div>
          
        </div>
      )}
      
    </div>
  );
}

export default Projects;
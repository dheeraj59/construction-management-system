function AdminDashboard({ projects, employees }) {

    const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const delayedProjects = projects.filter(
    (project) => project.status === "Delayed"
  ).length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const overallProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((total, project) => total + project.progress, 0) /
            projects.length
        )
      : 0;

  return (
    <div>
  <h2>Business Overview</h2>
  <p className="dashboard-subtitle">
    Overall status of your construction business
  </p>

  <div className="stats-grid">
    <div className="stat-card">
      <span>Active Projects</span>
      <strong>{activeProjects}</strong>
    </div>

    <div className="stat-card">
      <span>Completed Projects</span>
      <strong>{completedProjects}</strong>
    </div>

    <div className="stat-card">
      <span>Total Employees</span>
      <strong>{employees.length}</strong>
    </div>

    <div className="stat-card">
      <span>Present Today</span>
      <strong>142</strong>
    </div>

    <div className="stat-card">
      <span>Total Expenses</span>
      <strong>₹42.5L</strong>
    </div>

    <div className="stat-card">
      <span>Pending Payments</span>
      <strong>₹18L</strong>
    </div>

    <div className="stat-card">
      <span>Projects Delayed</span>
      <strong>{delayedProjects}</strong>
    </div>

    <div className="stat-card">
      <span>Overall Progress</span>
      <strong>{overallProgress}%</strong>
    </div>
  </div>

  <div className="dashboard-section">
  <h3>Project Status</h3>

  <div className="activity-list">
    {projects.map((project) => (
      <div className="activity-item" key={project.id}>
        <strong>{project.name}</strong>
        <span>
          {project.status} • {project.progress}% completed
        </span>
      </div>
    ))}
  </div>
</div>
</div>
  );
}

export default AdminDashboard;
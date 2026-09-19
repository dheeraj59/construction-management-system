function Reports({ projects = [], employees = [] }) {
  const totalProjects = projects.length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const delayedProjects = projects.filter(
    (project) => project.status === "Delayed"
  ).length;

  const totalContractValue = projects.reduce(
    (total, project) =>
      total + Number(project.contractValue || 0),
    0
  );

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Reports</h2>

          <p className="dashboard-subtitle">
            Overview of projects, finances and workforce
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Project Overview</h3>
            <p className="dashboard-subtitle">
              Current project status summary
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Projects</span>
            <strong>{totalProjects}</strong>
          </div>

          <div className="stat-card">
            <span>In Progress</span>
            <strong>{inProgressProjects}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedProjects}</strong>
          </div>

          <div className="stat-card">
            <span>Delayed</span>
            <strong>{delayedProjects}</strong>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Financial Overview</h3>
            <p className="dashboard-subtitle">
              Overall project contract value
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Contract Value</span>
            <strong>{formatCurrency(totalContractValue)}</strong>
          </div>

          <div className="stat-card">
            <span>Projects With Contract</span>
            <strong>
              {
                projects.filter(
                  (project) => Number(project.contractValue || 0) > 0
                ).length
              }
            </strong>
          </div>
        </div>
      </div>

      {/* Workforce Overview */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Workforce Overview</h3>
            <p className="dashboard-subtitle">
              Current employee summary
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
          </div>

          <div className="stat-card">
            <span>Active Employees</span>
            <strong>{activeEmployees}</strong>
          </div>

          <div className="stat-card">
            <span>Inactive Employees</span>
            <strong>{inactiveEmployees}</strong>
          </div>
        </div>
      </div>

      {/* Project-wise Report */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h3>Project-wise Report</h3>
            <p className="dashboard-subtitle">
              Summary of every project
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects available</h3>
            <p>
              Add projects first to generate the project report.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Contract Value</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <strong>{project.name}</strong>
                    </td>

                    <td>{project.client}</td>

                    <td>
                      <span
                        className={`status-badge ${project.status
                          ?.toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td>{project.progress || 0}%</td>

                    <td>
                      {formatCurrency(project.contractValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
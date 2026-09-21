function SupervisorDashboard({
  projects,
  employees,
  dailyWorkRecords,
  attendanceRecords,
}) {
   const supervisorName = "Raj Kumar";

  const assignedProjects = projects.filter(
    (project) => project.supervisor === supervisorName
  );

  const assignedProject = assignedProjects[0];

  const projectWorkers = assignedProject
    ? employees.filter(
        (employee) => employee.project === assignedProject.name
      )
    : [];

  const activeWorkers = projectWorkers.filter(
    (employee) => employee.status === "Active"
  ).length;

  const projectDailyWorkRecords = assignedProject
  ? dailyWorkRecords.filter(
      (record) => record.projectId === assignedProject.id
    )
  : [];

const latestDailyWork = projectDailyWorkRecords[0];
const today = new Date().toISOString().split("T")[0];

const presentToday = assignedProject
  ? projectWorkers.filter((employee) =>
      attendanceRecords.some(
        (record) =>
          record.employeeId === employee.id &&
          record.date === today &&
          record.status === "Present"
      )
    ).length
  : 0;

  return (
    <div>
  <h2>Site Overview</h2>
  <p className="dashboard-subtitle">
    Today's work and workforce status
  </p>

  <div className="stats-grid">
  <div className="stat-card">
    <span>Assigned Project</span>
    <strong>
      {assignedProject ? assignedProject.name : "No Project"}
    </strong>
  </div>

  <div className="stat-card">
    <span>Total Workers</span>
    <strong>{activeWorkers}</strong>
  </div>

  <div className="stat-card">
    <span>Present Today</span>
    <strong>{presentToday}</strong>
  </div>

  <div className="stat-card">
    <span>Work Progress</span>
    <strong>
      {assignedProject ? `${assignedProject.progress}%` : "0%"}
    </strong>
  </div>
</div>

  <div className="dashboard-section">
  <h3>Latest Site Update</h3>

  {latestDailyWork ? (
    <div className="activity-list">
      <div className="activity-item">
        <strong>Work Date</strong>
        <span>{latestDailyWork.date}</span>
      </div>

      <div className="activity-item">
        <strong>Work Status</strong>
        <span>{latestDailyWork.status}</span>
      </div>

      <div className="activity-item">
        <strong>Progress</strong>
        <span>{latestDailyWork.progress}%</span>
      </div>

      <div className="activity-item">
        <strong>Workers Present</strong>
        <span>{latestDailyWork.workersPresent}</span>
      </div>

      <div className="activity-item">
        <strong>Work Completed</strong>
        <span>{latestDailyWork.description}</span>
      </div>

      {latestDailyWork.notes && (
        <div className="activity-item">
          <strong>Notes</strong>
          <span>{latestDailyWork.notes}</span>
        </div>
      )}
    </div>
  ) : (
    <p>No daily work updates available yet.</p>
  )}
</div>

  <div className="dashboard-section">
    <h3>Site Alerts</h3>

    <div className="activity-list">
      <div className="activity-item">
        <strong>Material Request</strong>
        <span>Steel required</span>
      </div>

      <div className="activity-item">
        <strong>Delay</strong>
        <span>Rain caused 2-hour delay</span>
      </div>
    </div>
  </div>
</div>
  );
}

export default SupervisorDashboard;
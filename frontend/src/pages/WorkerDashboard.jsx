function WorkerDashboard() {
  return (
    <div>
  <h2>My Dashboard</h2>
  <p className="dashboard-subtitle">
    Your work and attendance information
  </p>

  <div className="stats-grid">
    <div className="stat-card">
      <span>Assigned Project</span>
      <strong>ABC Building</strong>
    </div>

    <div className="stat-card">
      <span>This Month Attendance</span>
      <strong>24 Days</strong>
    </div>

    <div className="stat-card">
      <span>Today's Status</span>
      <strong>Present</strong>
    </div>

    <div className="stat-card">
      <span>Payment Status</span>
      <strong>Paid</strong>
    </div>
  </div>

  <div className="dashboard-section">
    <h3>My Work</h3>

    <div className="activity-list">
      <div className="activity-item">
        <strong>Today's Assignment</strong>
        <span>Brick work - Block A</span>
      </div>

      <div className="activity-item">
        <strong>Supervisor</strong>
        <span>Raj Kumar</span>
      </div>

      <div className="activity-item">
        <strong>Work Location</strong>
        <span>ABC Building Site</span>
      </div>
    </div>
  </div>
</div>
  );
}

export default WorkerDashboard;
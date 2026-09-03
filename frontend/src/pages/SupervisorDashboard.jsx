function SupervisorDashboard() {
  return (
    <div>
  <h2>Site Overview</h2>
  <p className="dashboard-subtitle">
    Today's work and workforce status
  </p>

  <div className="stats-grid">
    <div className="stat-card">
      <span>Assigned Project</span>
      <strong>ABC Building</strong>
    </div>

    <div className="stat-card">
      <span>Total Workers</span>
      <strong>18</strong>
    </div>

    <div className="stat-card">
      <span>Present Today</span>
      <strong>16</strong>
    </div>

    <div className="stat-card">
      <span>Work Progress</span>
      <strong>65%</strong>
    </div>
  </div>

  <div className="dashboard-section">
    <h3>Today's Work</h3>

    <div className="activity-list">
      <div className="activity-item">
        <strong>Foundation Work</strong>
        <span>Completed</span>
      </div>

      <div className="activity-item">
        <strong>Brick Work</strong>
        <span>120 sq.ft completed</span>
      </div>

      <div className="activity-item">
        <strong>Cement Usage</strong>
        <span>25 bags used</span>
      </div>
    </div>
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
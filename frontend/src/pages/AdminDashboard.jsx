function AdminDashboard() {
  return (
    <div>
  <h2>Business Overview</h2>
  <p className="dashboard-subtitle">
    Overall status of your construction business
  </p>

  <div className="stats-grid">
    <div className="stat-card">
      <span>Active Projects</span>
      <strong>12</strong>
    </div>

    <div className="stat-card">
      <span>Completed Projects</span>
      <strong>8</strong>
    </div>

    <div className="stat-card">
      <span>Total Employees</span>
      <strong>156</strong>
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
      <strong>3</strong>
    </div>

    <div className="stat-card">
      <span>Overall Progress</span>
      <strong>68%</strong>
    </div>
  </div>

  <div className="dashboard-section">
    <h3>Recent Project Updates</h3>

    <div className="activity-list">
      <div className="activity-item">
        <strong>ABC Building</strong>
        <span>Progress updated to 65%</span>
      </div>

      <div className="activity-item">
        <strong>XYZ Water Tank</strong>
        <span>Material request submitted</span>
      </div>

      <div className="activity-item">
        <strong>Green Residency</strong>
        <span>Project delayed by 2 days</span>
      </div>
    </div>
  </div>
</div>
  );
}

export default AdminDashboard;
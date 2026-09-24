function WorkerDashboard({
  projects,
  employees,
  attendanceRecords,
  dailyWorkRecords,
  workerPayments,
}) {
  const workerName = "Kamal";

const worker = employees.find(
  (employee) => employee.name === workerName
);

const assignedProject = worker
  ? projects.find((project) => project.name === worker.project)
  : null;

const today = new Date().toISOString().split("T")[0];

const todayAttendance = worker
  ? attendanceRecords.find(
      (record) =>
        record.employeeId === worker.id &&
        record.date === today
    )
  : null;

const currentMonth = today.slice(0, 7);

const monthlyPresentDays = worker
  ? attendanceRecords.filter(
      (record) =>
        record.employeeId === worker.id &&
        record.date.startsWith(currentMonth) &&
        record.status === "Present"
    ).length
  : 0;

  const monthlyEarned = worker
  ? monthlyPresentDays * worker.dailyWage
  : 0;

const monthlyPaid = worker
  ? workerPayments
      .filter(
        (payment) =>
          payment.employeeId === worker.id &&
          payment.date.startsWith(currentMonth)
      )
      .reduce((total, payment) => total + payment.amount, 0)
  : 0;

const paymentStatus =
  !worker
    ? "No Worker"
    : monthlyEarned === 0
    ? "No Attendance"
    : monthlyPaid >= monthlyEarned
    ? "Paid"
    : monthlyPaid > 0
    ? "Partial"
    : "Pending";

const workerDailyWorkRecords = assignedProject
  ? dailyWorkRecords.filter(
      (record) => record.projectId === assignedProject.id
    )
  : [];

const latestDailyWork = workerDailyWorkRecords[0];
  return (
    <div>
  <h2>My Dashboard</h2>
  <p className="dashboard-subtitle">
    Your work and attendance information
  </p>

  <div className="stats-grid">
    <div className="stat-card">
      <span>Assigned Project</span>
      <strong>
  {assignedProject ? assignedProject.name : "No Project"}
</strong>
    </div>

    <div className="stat-card">
      <span>This Month Attendance</span>
    <strong>{monthlyPresentDays} Days</strong>
    </div>

    <div className="stat-card">
      <span>Today's Status</span>
      <strong>
  {todayAttendance ? todayAttendance.status : "Not Marked"}
</strong>
    </div>

    <div className="stat-card">
      <span>Payment Status</span>
      <strong>{paymentStatus}</strong>
    </div>
  </div>

  <div className="dashboard-section">
    <h3>My Work</h3>

    <div className="activity-list">
      <div className="activity-item">
        <strong>Today's Assignment</strong>
        <span>
  {latestDailyWork
    ? latestDailyWork.description
    : "No assignment available"}
</span>
      </div>

      <div className="activity-item">
        <strong>Supervisor</strong>
        <span>
  {assignedProject ? assignedProject.supervisor : "No Supervisor"}
</span>
      </div>

      <div className="activity-item">
        <strong>Work Location</strong>
        <span>
  {assignedProject ? assignedProject.location : "No Location"}
</span>
      </div>
    </div>
  </div>
</div>
  );
}

export default WorkerDashboard;
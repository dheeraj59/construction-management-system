import { useState } from "react";

function Attendance({
  role,
  projects,
  employees,
  attendanceRecords,
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [projectFilter, setProjectFilter] = useState("All");

  // Temporary Phase 1 demo worker
  const workerName = "Kamal";

  // --------------------------------------------------
  // WORKER VIEW
  // --------------------------------------------------

  if (role === "Worker") {
    const worker = employees.find(
      (employee) => employee.name === workerName
    );

    const workerAttendance = worker
      ? attendanceRecords
          .filter(
            (record) => record.employeeId === worker.id
          )
          .sort((a, b) => b.date.localeCompare(a.date))
      : [];

    return (
      <div>
        <h2>Attendance</h2>

        <p className="dashboard-subtitle">
          View your attendance records
        </p>

        {!worker ? (
          <div className="page-placeholder">
            <h3>Worker Not Found</h3>
            <p>No worker record is available.</p>
          </div>
        ) : (
          <>
            <div className="detail-card">
              <h3>{worker.name}</h3>

              <p>
                <strong>Role:</strong> {worker.role}
              </p>

              <p>
                <strong>Project:</strong> {worker.project}
              </p>
            </div>

            <div className="detail-card">
              <h3>My Attendance</h3>

              {workerAttendance.length === 0 ? (
                <p>No attendance records available.</p>
              ) : (
                <div className="activity-list">
                  {workerAttendance.map((record) => (
                    <div
                      className="activity-item"
                      key={record.id}
                    >
                      <div>
                        <strong>{record.date}</strong>
                      </div>

                      <span
  className={`attendance-status ${record.status.toLowerCase()}`}
>
  {record.status}
</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // --------------------------------------------------
  // ADMIN / SUPERVISOR OVERVIEW
  // --------------------------------------------------

  const filteredEmployees = employees.filter((employee) => {
    if (projectFilter === "All") {
      return true;
    }

    return employee.project === projectFilter;
  });

  const getAttendanceStatus = (employeeId) => {
    const record = attendanceRecords.find(
      (record) =>
        record.employeeId === employeeId &&
        record.date === selectedDate
    );

    return record ? record.status : "Not Marked";
  };

  const presentCount = filteredEmployees.filter(
    (employee) =>
      getAttendanceStatus(employee.id) === "Present"
  ).length;

  const absentCount = filteredEmployees.filter(
    (employee) =>
      getAttendanceStatus(employee.id) === "Absent"
  ).length;

  const notMarkedCount = filteredEmployees.filter(
    (employee) =>
      getAttendanceStatus(employee.id) === "Not Marked"
  ).length;

  return (
    <div>
      <h2>Attendance</h2>

      <p className="dashboard-subtitle">
        Overall employee attendance overview
      </p>

      {/* Filters */}
      <div className="detail-card">
        <h3>Attendance Filters</h3>

        <div className="form-group">
          <label>Attendance Date</label>

          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Project</label>

          <select
            value={projectFilter}
            onChange={(event) =>
              setProjectFilter(event.target.value)
            }
          >
            <option value="All">All Projects</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.name}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Workers</span>
          <strong>{filteredEmployees.length}</strong>
        </div>

        <div className="stat-card">
          <span>Present</span>
          <strong>{presentCount}</strong>
        </div>

        <div className="stat-card">
          <span>Absent</span>
          <strong>{absentCount}</strong>
        </div>

        <div className="stat-card">
          <span>Not Marked</span>
          <strong>{notMarkedCount}</strong>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="detail-card">
        <h3>
          Attendance for {selectedDate}
        </h3>

        {filteredEmployees.length === 0 ? (
          <p>No workers found.</p>
        ) : (
          <div className="activity-list">
            {filteredEmployees.map((employee) => {
              const status = getAttendanceStatus(
                employee.id
              );

              return (
                <div
                  className="activity-item"
                  key={employee.id}
                >
                  <div>
                    <strong>{employee.name}</strong>

                    <p>
                      {employee.role} • {employee.project}
                    </p>
                  </div>

                  <span
  className={`attendance-status ${status
    .toLowerCase()
    .replace(" ", "-")}`}
>
  {status}
</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
import { useState } from "react";

function ProjectDetails({ project, employees, onBack, onProjectUpdate }) {
  const [showWorkers, setShowWorkers] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);

const [attendanceDate, setAttendanceDate] = useState(
  new Date().toISOString().split("T")[0]
);

const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [status, setStatus] = useState(project.status);
  const [progress, setProgress] = useState(project.progress);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "Labour",
      amount: 300000,
      date: "2026-08-20",
      paidTo: "Workers",
      note: "Labour payments",
    },
    {
      id: 2,
      category: "Materials",
      amount: 320000,
      date: "2026-08-21",
      paidTo: "ABC Suppliers",
      note: "Cement and steel",
    },
    {
      id: 3,
      category: "Equipment",
      amount: 50000,
      date: "2026-08-21",
      paidTo: "Equipment Rental",
      note: "Mixer rental",
    },
    {
      id: 4,
      category: "Transport",
      amount: 30000,
      date: "2026-08-22",
      paidTo: "Transport Service",
      note: "Material transportation",
    },
    {
      id: 5,
      category: "Fuel",
      amount: 25000,
      date: "2026-08-22",
      paidTo: "Fuel Station",
      note: "Diesel",
    },
    {
      id: 6,
      category: "Other",
      amount: 25000,
      date: "2026-08-23",
      paidTo: "Miscellaneous",
      note: "Other site expenses",
    },
  ]);

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    category: "",
    amount: "",
    date: "",
    paidTo: "",
    note: "",
  });

  const [editForm, setEditForm] = useState({
    name: project.name,
    client: project.client,
    location: project.location,
    supervisor: project.supervisor,
    projectType: project.projectType,
    startDate: project.startDate,
    expectedCompletion: project.expectedCompletion,
    contractValue: project.contractValue,
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const projectEmployees = employees.filter(
  (employee) => employee.project === project.name
);

const getAttendance = (employeeId) => {
  const record = attendanceRecords.find(
    (record) =>
      record.employeeId === employeeId &&
      record.date === attendanceDate
  );

  return record ? record.status : "";
};

const markAttendance = (employeeId, newStatus) => {
  setAttendanceRecords((previousRecords) => {
    const existingRecord = previousRecords.find(
      (record) =>
        record.employeeId === employeeId &&
        record.date === attendanceDate
    );

    if (existingRecord) {
      return previousRecords.map((record) =>
        record.employeeId === employeeId &&
        record.date === attendanceDate
          ? {
              ...record,
              status: newStatus,
            }
          : record
      );
    }

    return [
      ...previousRecords,
      {
        id: Date.now() + employeeId,
        employeeId,
        date: attendanceDate,
        status: newStatus,
      },
    ];
  });
};

const presentCount = projectEmployees.filter(
  (employee) => getAttendance(employee.id) === "Present"
).length;

const absentCount = projectEmployees.filter(
  (employee) => getAttendance(employee.id) === "Absent"
).length;

const notMarkedCount =
  projectEmployees.length - presentCount - absentCount;

  const handleEditProject = (event) => {
    event.preventDefault();

    if (editForm.expectedCompletion < editForm.startDate) {
      alert("Expected completion date cannot be before start date.");
      return;
    }

    onProjectUpdate({
      ...project,
      ...editForm,
      contractValue: Number(editForm.contractValue),
    });

    setShowEditForm(false);
  };

  const handleDeleteProject = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    onProjectUpdate(null);
    onBack();
  };

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;

    setExpenseForm((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleDeleteExpense = (expenseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
      return;
    }

    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    if (editingExpenseId !== null) {
      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editingExpenseId
            ? {
                ...expenseForm,
                id: editingExpenseId,
                amount: Number(expenseForm.amount),
              }
            : expense
        )
      );

      setEditingExpenseId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        ...expenseForm,
        amount: Number(expenseForm.amount),
      };

      setExpenses((previousExpenses) => [
        ...previousExpenses,
        newExpense,
      ]);
    }

    setExpenseForm({
      category: "",
      amount: "",
      date: "",
      paidTo: "",
      note: "",
    });

    setShowExpenseForm(false);
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);

    setExpenseForm({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      paidTo: expense.paidTo,
      note: expense.note || "",
    });

    setShowExpenseForm(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back to Projects
          </button>

          <h2>{project.name}</h2>

          <p className="dashboard-subtitle">
            Detailed information about this construction project
          </p>
        </div>

        <div>
          <button
            className="primary-button"
            onClick={() => setShowEditForm(true)}
          >
            Edit Project
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteProject}
          >
            Delete Project
          </button>

          <select
            className={`status-select ${status
              .toLowerCase()
              .replace(" ", "-")}`}
            value={status}
            onChange={(event) => {
              const newStatus = event.target.value;

              setStatus(newStatus);

              onProjectUpdate({
                ...project,
                status: newStatus,
                progress,
              });
            }}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="project-details-grid">
        <div className="detail-card">
          <span>Client</span>
          <strong>{project.client}</strong>
        </div>

        <div className="detail-card">
          <span>Location</span>
          <strong>{project.location}</strong>
        </div>

        <div className="detail-card">
          <span>Supervisor</span>
          <strong>{project.supervisor}</strong>
        </div>

        <div className="detail-card">
          <span>Current Progress</span>
          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="detail-card">
        <span>Project Type</span>
        <strong>{project.projectType}</strong>
      </div>

      <div className="detail-card">
        <span>Start Date</span>
        <strong>{project.startDate}</strong>
      </div>

      <div className="detail-card">
        <span>Expected Completion</span>
        <strong>{project.expectedCompletion}</strong>
      </div>

      <div className="detail-card">
        <span>Contract Value</span>
        <strong>
          ₹{project.contractValue?.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="dashboard-section">
        <h3>Financial Summary</h3>

        <div className="financial-summary-grid">
          <div className="financial-card">
            <span>Contract Value</span>
            <strong>
              ₹{project.contractValue?.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="financial-card">
            <span>Amount Received</span>
            <strong>
              ₹{project.amountReceived?.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="financial-card">
            <span>Total Expenses</span>
            <strong>
              ₹{totalExpenses.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="financial-card">
            <span>Pending From Client</span>
            <strong>
              ₹
              {Math.max(
                0,
                project.contractValue - project.amountReceived
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="financial-card">
            <span>Estimated Profit</span>
            <strong>
              ₹
              {(
                project.contractValue - totalExpenses
              ).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>
      </div>

      <div className="expense-breakdown">
        <h3>Expense Breakdown</h3>

        <div className="section-action">
          <button
            className="primary-button"
            onClick={() => setShowExpenseForm(true)}
          >
            + Add Expense
          </button>
        </div>

        <div className="expense-list">
          {expenses.map((expense) => (
            <div className="expense-row" key={expense.id}>
              <div>
                <strong>{expense.category}</strong>

                <small>
                  {expense.paidTo} • {expense.date}
                </small>
              </div>

              <div>
                <strong>
                  ₹{expense.amount.toLocaleString("en-IN")}
                </strong>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditExpense(expense)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="expense-delete-button"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Project Progress</h3>

        <div className="progress-bar large">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => {
            const newProgress = Number(event.target.value);

            setProgress(newProgress);

            onProjectUpdate({
              ...project,
              status,
              progress: newProgress,
            });
          }}
          className="progress-slider"
        />

        <p className="progress-text">
          {project.progress}% completed
        </p>
      </div>

      <div className="dashboard-section">
        <h3>Project Modules</h3>

        <div className="project-module-grid">
          <div
            className="module-card"
            onClick={() => setShowWorkers(true)}
          >
            <strong>Workers</strong>
            <span>Manage assigned workers</span>
          </div>

          <div
  className="module-card"
  onClick={() => setShowAttendance(true)}
>
  <strong>Attendance</strong>
  <span>View project attendance</span>
</div>

          <div className="module-card">
            <strong>Materials</strong>
            <span>Track project materials</span>
          </div>

          <div
            className="module-card"
            onClick={() => setShowExpenseForm(true)}
          >
            <strong>Expenses</strong>
            <span>Track project expenses</span>
          </div>

          <div className="module-card">
            <strong>Payments</strong>
            <span>Track client payments</span>
          </div>

          <div className="module-card">
            <strong>Daily Work</strong>
            <span>View daily site reports</span>
          </div>
        </div>
      </div>

      {showExpenseForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editingExpenseId !== null
                  ? "Edit Expense"
                  : "Add Expense"}
              </h2>

              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  setShowExpenseForm(false);
                  setEditingExpenseId(null);
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={expenseForm.category}
                  onChange={handleExpenseChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Labour">Labour</option>
                  <option value="Materials">Materials</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Transport">Transport</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  min="0"
                  placeholder="Enter amount"
                  value={expenseForm.amount}
                  onChange={handleExpenseChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={expenseForm.date}
                  onChange={handleExpenseChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Paid To</label>

                <input
                  type="text"
                  name="paidTo"
                  placeholder="Who received the payment?"
                  value={expenseForm.paidTo}
                  onChange={handleExpenseChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Note</label>

                <input
                  type="text"
                  name="note"
                  placeholder="Optional note"
                  value={expenseForm.note}
                  onChange={handleExpenseChange}
                />
              </div>

              <button
                type="submit"
                className="primary-button full-width"
              >
                {editingExpenseId !== null
                  ? "Save Changes"
                  : "Save Expense"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleEditProject}>
              <div className="modal-header">
                <h2>Edit Project</h2>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowEditForm(false)}
                >
                  ×
                </button>
              </div>

              <div className="form-group">
                <label>Project Name</label>

                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Client</label>

                <input
                  type="text"
                  value={editForm.client}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      client: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  value={editForm.location}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      location: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Supervisor</label>

                <input
                  type="text"
                  value={editForm.supervisor}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      supervisor: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Project Type</label>

                <select
                  value={editForm.projectType}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      projectType: event.target.value,
                    })
                  }
                >
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
                  value={editForm.startDate}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      startDate: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Expected Completion</label>

                <input
                  type="date"
                  value={editForm.expectedCompletion}
                  min={editForm.startDate}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      expectedCompletion: event.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Contract Value</label>

                <input
                  type="number"
                  min="0"
                  value={editForm.contractValue}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      contractValue: event.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="primary-button full-width"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {showWorkers && (
        <div className="dashboard-section">
          <div className="section-header">
            <div>
              <h3>Project Workers</h3>

              <p className="dashboard-subtitle">
                Workers assigned to {project.name}
              </p>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={() => setShowWorkers(false)}
            >
              ×
            </button>
          </div>

          {employees.filter(
            (employee) => employee.project === project.name
          ).length === 0 ? (
            <p>No workers assigned yet.</p>
          ) : (
            <div className="employee-list">
              {employees
                .filter(
                  (employee) => employee.project === project.name
                )
                .map((employee) => (
                  <div
                    className="employee-card"
                    key={employee.id}
                  >
                    <div className="employee-main">
                      <div className="employee-avatar">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3>{employee.name}</h3>
                        <p>{employee.role}</p>
                      </div>
                    </div>

                    <div className="employee-info">
                      <span>
                        <strong>Phone:</strong> {employee.phone}
                      </span>

                      <span>
                        <strong>Daily Wage:</strong> ₹
                        {employee.dailyWage.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <span
                      className={`employee-status ${employee.status.toLowerCase()}`}
                    >
                      {employee.status}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {showAttendance && (
  <div className="dashboard-section">
    <div className="section-header">
      <div>
        <h3>Project Attendance</h3>

        <p className="dashboard-subtitle">
          Attendance for {project.name}
        </p>
      </div>

      <button
        type="button"
        className="modal-close"
        onClick={() => setShowAttendance(false)}
      >
        ×
      </button>
    </div>

    <div className="attendance-controls">
      <div className="form-group">
        <label>Attendance Date</label>

        <input
          type="date"
          value={attendanceDate}
          onChange={(event) =>
            setAttendanceDate(event.target.value)
          }
        />
      </div>
    </div>

    <div className="attendance-summary-grid">
      <div className="stat-card">
        <span>Total Workers</span>
        <strong>{projectEmployees.length}</strong>
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

    <div className="attendance-list">
      {projectEmployees.length === 0 ? (
        <div className="empty-state">
          <h3>No workers assigned</h3>
          <p>
            Assign workers to this project before marking
            attendance.
          </p>
        </div>
      ) : (
        projectEmployees.map((employee) => {
          const employeeAttendance = getAttendance(
            employee.id
          );

          return (
            <div
              className="attendance-row"
              key={employee.id}
            >
              <div className="employee-main">
                <div className="employee-avatar">
                  {employee.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{employee.name}</h3>
                  <p>{employee.role}</p>
                </div>
              </div>

              <div className="attendance-actions">
                <button
                  type="button"
                  className={
                    employeeAttendance === "Present"
                      ? "attendance-button present selected"
                      : "attendance-button present"
                  }
                  onClick={() =>
                    markAttendance(
                      employee.id,
                      "Present"
                    )
                  }
                >
                  Present
                </button>

                <button
                  type="button"
                  className={
                    employeeAttendance === "Absent"
                      ? "attendance-button absent selected"
                      : "attendance-button absent"
                  }
                  onClick={() =>
                    markAttendance(
                      employee.id,
                      "Absent"
                    )
                  }
                >
                  Absent
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>

    <div className="attendance-records">
      <h3>Attendance Records</h3>

      {attendanceRecords.filter(
        (record) =>
          record.date === attendanceDate &&
          projectEmployees.some(
            (employee) =>
              employee.id === record.employeeId
          )
      ).length === 0 ? (
        <p>No attendance records for this date.</p>
      ) : (
        attendanceRecords
          .filter(
            (record) =>
              record.date === attendanceDate &&
              projectEmployees.some(
                (employee) =>
                  employee.id === record.employeeId
              )
          )
          .map((record) => {
            const employee = projectEmployees.find(
              (item) => item.id === record.employeeId
            );

            return (
              <div
                className="attendance-record-row"
                key={record.id}
              >
                <div>
                  <strong>{employee?.name}</strong>
                  <small>{record.date}</small>
                </div>

                <span
                  className={`attendance-record-status ${record.status.toLowerCase()}`}
                >
                  {record.status}
                </span>
              </div>
            );
          })
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default ProjectDetails;
import { useState } from "react";
function Employees({ projects, employees, setEmployees }) {
   

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  role: "",
  dailyWage: "",
  project: "",
});
    const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    return (
      employee.name.toLowerCase().includes(search) ||
      employee.role.toLowerCase().includes(search) ||
      employee.project.toLowerCase().includes(search)
    );
  });
  const handleFormChange = (event) => {
  const { name, value } = event.target;

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

const handleAddEmployee = (event) => {
  event.preventDefault();

  const newEmployee = {
    id: Date.now(),
    name: formData.name,
    phone: formData.phone,
    role: formData.role,
    dailyWage: Number(formData.dailyWage),
    project: formData.project,
    status: "Active",
  };

  setEmployees((previousEmployees) => [
    ...previousEmployees,
    newEmployee,
  ]);

  setFormData({
    name: "",
    phone: "",
    role: "",
    dailyWage: "",
    project: "",
  });

  setShowForm(false);
};

const handleEditEmployee = (event) => {
  event.preventDefault();

  setEmployees((previousEmployees) =>
    previousEmployees.map((employee) =>
      employee.id === editEmployee.id
        ? {
            ...employee,
            name: editEmployee.name,
            phone: editEmployee.phone,
            role: editEmployee.role,
            dailyWage: Number(editEmployee.dailyWage),
            project: editEmployee.project,
          }
        : employee
    )
  );

  setEditEmployee(null);
  setShowEditForm(false);
};

const handleDeleteEmployee = (employeeId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  setEmployees((previousEmployees) =>
    previousEmployees.filter(
      (employee) => employee.id !== employeeId
    )
  );
};
  return (
    
        <div>
      <div className="page-header">
        <div>
          <h2>Employees</h2>

          <p className="dashboard-subtitle">
            Manage workers and supervisors
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Employee
        </button>
      </div>

      <div className="project-summary-grid">
        <div className="stat-card">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>

        <div className="stat-card">
          <span>Active</span>
          <strong>
            {
              employees.filter(
                (employee) => employee.status === "Active"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Masons</span>
          <strong>
            {
              employees.filter(
                (employee) => employee.role === "Mason"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <span>Labour</span>
          <strong>
            {
              employees.filter(
                (employee) => employee.role === "Labour"
              ).length
            }
          </strong>
        </div>
      </div>

      <div className="project-controls">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="employee-list">
        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            <h3>No employees found</h3>
            <p>Try a different search.</p>
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <div className="employee-card" key={employee.id}>
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
                  <strong>Project:</strong> {employee.project}
                </span>

                <span>
                  <strong>Daily Wage:</strong> ₹
                  {employee.dailyWage.toLocaleString("en-IN")}
                </span>
              </div>

              <select
  className={`employee-status-select ${
    employee.status.toLowerCase()
  }`}
  value={employee.status}
  onChange={(event) => {
    const newStatus = event.target.value;

    setEmployees((previousEmployees) =>
      previousEmployees.map((item) =>
        item.id === employee.id
          ? { ...item, status: newStatus }
          : item
      )
    );
  }}
>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>
<button
  type="button"
  className="edit-button"
  onClick={() => {
    setEditEmployee(employee);
    setShowEditForm(true);
  }}
>
  Edit 
</button>
<button
  type="button"
  className="expense-delete-button"
  onClick={() => handleDeleteEmployee(employee.id)}
>
  Delete
</button>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleAddEmployee}>
            <div className="modal-header">
              <h2>Add Employee</h2>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <p className="dashboard-subtitle">
              Employee form will be connected to the database later.
            </p>

            <div className="form-group">
              <label>Employee Name</label>
              <input
  type="text"
  name="name"
  placeholder="Enter employee name"
  value={formData.name}
  onChange={handleFormChange}
  required
/>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
  type="tel"
  name="phone"
  placeholder="Enter phone number"
  value={formData.phone}
  onChange={handleFormChange}
  required
/>
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
  name="role"
  value={formData.role}
  onChange={handleFormChange}
  required
>
                <option value="">Select role</option>
                <option value="Mason">Mason</option>
                <option value="Labour">Labour</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Plumber">Plumber</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Daily Wage</label>
              <input
  type="number"
  name="dailyWage"
  placeholder="Enter daily wage"
  value={formData.dailyWage}
  onChange={handleFormChange}
  min="0"
  required
/>
            </div>

            <div className="form-group">
  <label>Assigned Project</label>

  <select
    name="project"
    value={formData.project}
    onChange={handleFormChange}
    required
  >
    <option value="">Select project</option>

    {projects.map((project) => (
      <option key={project.id} value={project.name}>
        {project.name}
      </option>
    ))}
  </select>
</div>

            <button
  type="submit"
  className="primary-button full-width"
>
  Save Employee
</button>
</form>

          </div>
        </div>
      )}

      {showEditForm && editEmployee && (
  <div className="modal-overlay">
    <div className="modal">
      <form onSubmit={handleEditEmployee}>
        <div className="modal-header">
          <h2>Edit Employee</h2>

          <button
            type="button"
            className="modal-close"
            onClick={() => {
              setShowEditForm(false);
              setEditEmployee(null);
            }}
          >
            ×
          </button>
        </div>

        <div className="form-group">
          <label>Employee Name</label>

          <input
            type="text"
            value={editEmployee.name}
            onChange={(event) =>
              setEditEmployee({
                ...editEmployee,
                name: event.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            value={editEmployee.phone}
            onChange={(event) =>
              setEditEmployee({
                ...editEmployee,
                phone: event.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>

          <select
            value={editEmployee.role}
            onChange={(event) =>
              setEditEmployee({
                ...editEmployee,
                role: event.target.value,
              })
            }
            required
          >
            <option value="Mason">Mason</option>
            <option value="Labour">Labour</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Plumber">Plumber</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Daily Wage</label>

          <input
            type="number"
            min="0"
            value={editEmployee.dailyWage}
            onChange={(event) =>
              setEditEmployee({
                ...editEmployee,
                dailyWage: event.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Assigned Project</label>

          <select
            value={editEmployee.project}
            onChange={(event) =>
              setEditEmployee({
                ...editEmployee,
                project: event.target.value,
              })
            }
            required
          >
            <option value="">Select project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
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
    </div>

    
  );
}

export default Employees;
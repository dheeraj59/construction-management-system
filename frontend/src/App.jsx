import Projects from "./pages/projects";
import ProjectDetails from "./pages/ProjectDetails";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AdminDashboard from "./pages/AdminDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Reports from "./pages/Reports";

import { useState } from "react";
import "./App.css";

function App() {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([
  {
    id: 1,
    name: "Kamal",
    phone: "9876543210",
    role: "Mason",
    dailyWage: 500,
    project: "ABC Building",
    status: "Active",
  },
  {
    id: 2,
    name: "Hariom",
    phone: "9876543211",
    role: "Labour",
    dailyWage: 400,
    project: "ABC Building",
    status: "Active",
  },
  {
    id: 3,
    name: "Golu",
    phone: "9876543212",
    role: "Labour",
    dailyWage: 400,
    project: "XYZ Water Tank",
    status: "Active",
  },
  {
    id: 4,
    name: "Lalsing Sen",
    phone: "9876543213",
    role: "Mason",
    dailyWage: 550,
    project: "Green Residency",
    status: "Inactive",
  },
]);
  const [projects, setProjects] = useState([
  {
    id: 1,
    name: "ABC Building",
    client: "ABC Constructions",
    location: "Nalkheda",
    status: "In Progress",
    progress: 65,
    supervisor: "Raj Kumar",
    startDate: "2026-07-01",
    expectedCompletion: "2026-12-15",
    contractValue: 1800000,
    projectType: "Building",
    amountReceived: 1000000,
    totalExpenses: 750000,
  },
  {
    id: 2,
    name: "XYZ Water Tank",
    client: "XYZ Industries",
    location: "Agar Malwa",
    status: "In Progress",
    progress: 45,
    supervisor: "Amit Sharma",
    startDate: "2026-06-15",
    expectedCompletion: "2026-10-20",
    contractValue: 1200000,
    projectType: "Water Tank",
    amountReceived: 2000000,
    totalExpenses: 650000,
  },
  {
    id: 3,
    name: "Green Residency",
    client: "Green Developers",
    location: "Susner",
    status: "Delayed",
    progress: 35,
    supervisor: "Sandeep Kumar",
    startDate: "2026-05-10",
    expectedCompletion: "2026-11-30",
    contractValue: 2500000,
    projectType: "Building",
    amountReceived: 2000000,
    totalExpenses: 650000,
  },
  {
    id: 4,
    name: "Community Hall",
    client: "Municipal Corporation",
    location: "Amla",
    status: "Completed",
    progress: 100,
    supervisor: "Raj Kumar",
    startDate: "2026-01-15",
    expectedCompletion: "2026-08-01",
    contractValue: 1500000,
    projectType: "Building",
    amountReceived: 2000000,
    totalExpenses: 650000,
  },
]);
  const [dailyWorkRecords, setDailyWorkRecords] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [workerPayments, setWorkerPayments] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


const handleLogin = (event) => {
  event.preventDefault();

  setError("");

  const username = event.target.username.value.trim();
  const password = event.target.password.value.trim();

  if (!username) {
    setError("Please enter your phone number or email.");
    return;
  }

  if (!password) {
    setError("Please enter your password.");
    return;
  }

  // Basic email/phone validation
  const isEmail = username.includes("@");
  const isPhone = /^\d{10}$/.test(username);

  if (!isEmail && !isPhone) {
    setError("Please enter a valid 10-digit phone number or email address.");
    return;
  }

  if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
    setIsLoggedIn(true);
  }, 1000);
};

const handleLogout = () => {
  setIsLoggedIn(false);
  setCurrentPage("dashboard");
  setSelectedProject(null);
};
  return (
  <>
    {!isLoggedIn ? (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h1>Construction Management System</h1>
            <p>Manage your construction work in one place</p>
          </div>

          <h2>Login</h2>

          <div className="role-section">
            <p className="field-label">Select Role</p>

            <div className="role-buttons">
              <button
                type="button"
                className={
                  selectedRole === "Admin"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() => setSelectedRole("Admin")}
              >
                Admin / Contractor
              </button>

              <button
                type="button"
                className={
                  selectedRole === "Supervisor"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() => setSelectedRole("Supervisor")}
              >
                Supervisor
              </button>

              <button
                type="button"
                className={
                  selectedRole === "Worker"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() => setSelectedRole("Worker")}
              >
                Worker
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Phone / Email</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter phone number or email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setPasswordVisible(!passwordVisible)
                  }
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div className="app-layout">
   <Sidebar
  role={selectedRole}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  onLogout={handleLogout}
/>

        <div className="main-section">
          <Topbar role={selectedRole} />

       <main className="dashboard-content">
  {currentPage === "dashboard" && (
    <>
      {selectedRole === "Admin" && (
 <AdminDashboard
  projects={projects}
  employees={employees}
  attendanceRecords={attendanceRecords}
/>
)}

   {selectedRole === "Supervisor" && (
 <SupervisorDashboard
  projects={projects}
  employees={employees}
  dailyWorkRecords={dailyWorkRecords}
  attendanceRecords={attendanceRecords}
/>
)}
      {selectedRole === "Worker" && (
  <WorkerDashboard
    projects={projects}
    employees={employees}
    attendanceRecords={attendanceRecords}
    dailyWorkRecords={dailyWorkRecords}
    workerPayments={workerPayments}
  />
)}
    </>
  )}

  {currentPage === "projects" && (selectedRole === "Admin" || selectedRole === "Supervisor") &&(
  <Projects
  projects={projects}
  onProjectsChange={setProjects}
  onProjectSelect={(project) => {
    setSelectedProject(project);
    setCurrentPage("project-details");
  }}
/>
)}

{currentPage === "project-details" &&
  selectedProject &&
  (selectedRole === "Admin" || selectedRole === "Supervisor") && (
  <ProjectDetails
    project={selectedProject}
     employees={employees}
     dailyWorkRecords={dailyWorkRecords}
     onDailyWorkRecordsChange={setDailyWorkRecords}
     attendanceRecords={attendanceRecords}
     onAttendanceRecordsChange={setAttendanceRecords}
     workerPayments={workerPayments}
    onWorkerPaymentsChange={setWorkerPayments}
    
    onBack={() => {
      setSelectedProject(null);
      setCurrentPage("projects");
    }}
   onProjectUpdate={(updatedProject) => {
  if (updatedProject === null) {
    setProjects((previousProjects) =>
      previousProjects.filter(
        (project) => project.id !== selectedProject.id
      )
    );

    setSelectedProject(null);
    return;
  }

  setProjects((previousProjects) =>
    previousProjects.map((project) =>
      project.id === updatedProject.id
        ? updatedProject
        : project
    )
  );

  setSelectedProject(updatedProject);
}}
  />
)}

  {currentPage === "employees" && (selectedRole === "Admin" || selectedRole === "Supervisor") && (
  <Employees
  projects={projects}
  employees={employees}
  setEmployees={setEmployees}
/>
)}

  {currentPage === "attendance" && <Attendance />}
  {currentPage === "reports" && (selectedRole === "Admin" || selectedRole === "Supervisor") && (
  <Reports
    projects={projects}
    employees={employees}
  />
)}
</main>
        </div>
      </div>
    )}
  </>
);
}

export default App;

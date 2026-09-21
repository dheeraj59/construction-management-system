function Sidebar({ role, currentPage, onPageChange, onLogout }) {
  const navigationItems = {
  Admin: [
    { label: "Dashboard", page: "dashboard" },
    { label: "Projects", page: "projects" },
    { label: "Employees", page: "employees" },
    { label: "Attendance", page: "attendance" },
     { label: "Reports", page: "reports" },
  ],

  Supervisor: [
    { label: "Dashboard", page: "dashboard" },
    { label: "Projects", page: "projects" },
    { label: "Employees", page: "employees" },
    { label: "Attendance", page: "attendance" },
     { label: "Reports", page: "reports" },
  ],

  Worker: [
    { label: "Dashboard", page: "dashboard" },
    { label: "Attendance", page: "attendance" },
  ],
};
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CMS</h2>
        <p>Construction Management</p>
      </div>

      <nav className="sidebar-nav">
        
        
        
        {navigationItems[role].map((item) => (
  <button
    key={item.page}
    className={currentPage === item.page ? "active-nav" : ""}
    onClick={() => onPageChange(item.page)}
  >
    {item.label}
  </button>
))}
      </nav>
      <button
  className="logout-button"
  onClick={onLogout}
>
  Logout
</button>

      <div className="sidebar-user">
        <strong>{role}</strong>
        <span>Logged in</span>
      </div>
    </aside>
  );
}

export default Sidebar;
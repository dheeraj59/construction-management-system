function Sidebar({ role, currentPage, onPageChange })  {
  const navigationItems = {
  Admin: [
    { label: "Dashboard", page: "dashboard" },
    { label: "Projects", page: "projects" },
    { label: "Employees", page: "employees" },
    { label: "Attendance", page: "attendance" },
  ],

  Supervisor: [
    { label: "Dashboard", page: "dashboard" },
    { label: "Projects", page: "projects" },
    { label: "Employees", page: "employees" },
    { label: "Attendance", page: "attendance" },
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

      <div className="sidebar-user">
        <strong>{role}</strong>
        <span>Logged in</span>
      </div>
    </aside>
  );
}

export default Sidebar;
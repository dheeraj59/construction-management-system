function Topbar({ role }) {
  return (
    <header className="topbar">
      <div>
        <h1>{role} Dashboard</h1>
        <p>Welcome back</p>
      </div>

      <div className="topbar-user">
        <span>🔔</span>
        <span>{role}</span>
      </div>
    </header>
  );
}

export default Topbar;
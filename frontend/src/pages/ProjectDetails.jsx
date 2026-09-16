import { useState } from "react";

function ProjectDetails({ project, employees, onBack, onProjectUpdate }) {
  const [showWorkers, setShowWorkers] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showDailyWork, setShowDailyWork] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [workerPayments, setWorkerPayments] = useState([]);
const [showPaymentForm, setShowPaymentForm] = useState(false);
const [editingPaymentId, setEditingPaymentId] = useState(null);

const [paymentForm, setPaymentForm] = useState({
  employeeId: "",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  note: "",
});
 
  const [editingDailyWorkId, setEditingDailyWorkId] = useState(null);

const [dailyWorkRecords, setDailyWorkRecords] = useState([]);

const [dailyWorkForm, setDailyWorkForm] = useState({
  date: new Date().toISOString().split("T")[0],
  description: "",
  status: "",
  progress: project.progress || 0,
  workersPresent: "",
  notes: "",
});
 const [showMaterials, setShowMaterials] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
const [editingMaterialId, setEditingMaterialId] = useState(null);
const [materialForm, setMaterialForm] = useState({
  name: "",
  category: "",
  quantity: "",
  unit: "",
  unitPrice: "",
  supplier: "",
  purchaseDate: new Date().toISOString().split("T")[0],
  notes: "",
});
const handleMaterialChange = (event) => {
  const { name, value } = event.target;

  setMaterialForm((previousForm) => ({
    ...previousForm,
    [name]: value,
  }));
};

const resetMaterialForm = () => {
  setMaterialForm({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    unitPrice: "",
    supplier: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  setEditingMaterialId(null);
};

const handleSaveMaterial = () => {
  if (!materialForm.name.trim()) { alert("Please enter material name."); return; }
  if (!materialForm.category) { alert("Please select a material category."); return; }
  if (!materialForm.quantity || Number(materialForm.quantity) <= 0) { alert("Quantity must be greater than 0."); return; }
  if (!materialForm.unit) { alert("Please select a unit."); return; }
  if (!materialForm.unitPrice || Number(materialForm.unitPrice) < 0) { alert("Please enter a valid unit price."); return; }
  if (!materialForm.supplier.trim()) { alert("Please enter supplier name."); return; }

  const materialData = {
    name: materialForm.name.trim(), category: materialForm.category,
    quantity: Number(materialForm.quantity), unit: materialForm.unit,
    unitPrice: Number(materialForm.unitPrice), supplier: materialForm.supplier.trim(),
    purchaseDate: materialForm.purchaseDate, notes: materialForm.notes.trim(),
  };

  if (editingMaterialId !== null) {
    setMaterials((previousMaterials) => previousMaterials.map((material) =>
      material.id === editingMaterialId ? { ...material, ...materialData } : material
    ));
  } else {
    setMaterials((previousMaterials) => [...previousMaterials, { id: Date.now(), ...materialData }]);
  }

  resetMaterialForm();
  setShowMaterialForm(false);
};

const handlePaymentChange = (event) => {
  const { name, value } = event.target;
  setPaymentForm((previousForm) => ({ ...previousForm, [name]: value }));
};

const resetPaymentForm = () => {
  setPaymentForm({ employeeId: "", date: new Date().toISOString().split("T")[0], amount: "", note: "" });
  setEditingPaymentId(null);
};

const handleSavePayment = () => {
  if (!paymentForm.employeeId) { alert("Please select a worker."); return; }
  if (!paymentForm.amount || Number(paymentForm.amount) <= 0) { alert("Payment amount must be greater than 0."); return; }
  if (!paymentForm.date) { alert("Please select a payment date."); return; }
  const today = new Date().toISOString().split("T")[0];
  if (paymentForm.date > today) { alert("Payment date cannot be in the future."); return; }

  const paymentData = { employeeId: Number(paymentForm.employeeId), date: paymentForm.date, amount: Number(paymentForm.amount), note: paymentForm.note.trim() };

  if (editingPaymentId !== null) {
    setWorkerPayments((previousPayments) => previousPayments.map((payment) =>
      payment.id === editingPaymentId ? { ...payment, ...paymentData } : payment
    ));
  } else {
    setWorkerPayments((previousPayments) => [...previousPayments, { id: Date.now(), ...paymentData }]);
  }
  resetPaymentForm();
  setShowPaymentForm(false);
};

const handleEditPayment = (payment) => {
  setEditingPaymentId(payment.id);
  setPaymentForm({ employeeId: payment.employeeId, date: payment.date, amount: payment.amount, note: payment.note || "" });
  setShowPaymentForm(true);
};

const handleDeletePayment = (paymentId) => {
  if (!window.confirm("Are you sure you want to delete this payment?")) return;
  setWorkerPayments((previousPayments) => previousPayments.filter((payment) => payment.id !== paymentId));
};

const handleEditMaterial = (material) => {
  setEditingMaterialId(material.id);

  setMaterialForm({
    name: material.name,
    category: material.category,
    quantity: material.quantity,
    unit: material.unit,
    unitPrice: material.unitPrice,
    supplier: material.supplier,
    purchaseDate: material.purchaseDate,
    notes: material.notes || "",
  });

  setShowMaterialForm(true);
};

const handleDeleteMaterial = (materialId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this material?"
  );

  if (!confirmed) {
    return;
  }

  setMaterials((previousMaterials) =>
    previousMaterials.filter((material) => material.id !== materialId)
  );
};
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
  const handleDailyWorkChange = (event) => {
  const { name, value } = event.target;

  setDailyWorkForm((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

const handleSaveDailyWork = (event) => {
  event.preventDefault();

  if (!dailyWorkForm.description.trim()) {
    alert("Please enter the work description.");
    return;
  }

  if (!dailyWorkForm.status) {
    alert("Please select the work status.");
    return;
  }

  if (Number(dailyWorkForm.progress) < 0 || Number(dailyWorkForm.progress) > 100) {
    alert("Progress must be between 0 and 100.");
    return;
  }

  if (
    Number(dailyWorkForm.workersPresent) < 0 ||
    Number(dailyWorkForm.workersPresent) > projectEmployees.length
  ) {
    alert(
      `Workers present cannot be more than ${projectEmployees.length}.`
    );
    return;
  }

  if (dailyWorkForm.date > new Date().toISOString().split("T")[0]) {
    alert("Daily work date cannot be in the future.");
    return;
  }

  if (editingDailyWorkId !== null) {
    setDailyWorkRecords((previousRecords) =>
      previousRecords.map((record) =>
        record.id === editingDailyWorkId
          ? {
              ...record,
              ...dailyWorkForm,
              progress: Number(dailyWorkForm.progress),
              workersPresent: Number(dailyWorkForm.workersPresent),
            }
          : record
      )
    );
  } else {
    const newRecord = {
      id: Date.now(),
      ...dailyWorkForm,
      progress: Number(dailyWorkForm.progress),
      workersPresent: Number(dailyWorkForm.workersPresent),
    };

    setDailyWorkRecords((previousRecords) => [
      newRecord,
      ...previousRecords,
    ]);
  }

  // Update project's current progress
  const newProgress = Number(dailyWorkForm.progress);

  setProgress(newProgress);

  onProjectUpdate({
    ...project,
    status,
    progress: newProgress,
  });

  setDailyWorkForm({
    date: new Date().toISOString().split("T")[0],
    description: "",
    status: "",
    progress: newProgress,
    workersPresent: "",
    notes: "",
  });

  setEditingDailyWorkId(null);
  setShowDailyWork(false);
};

const handleEditDailyWork = (record) => {
  setEditingDailyWorkId(record.id);

  setDailyWorkForm({
    date: record.date,
    description: record.description,
    status: record.status,
    progress: record.progress,
    workersPresent: record.workersPresent,
    notes: record.notes || "",
  });

  setShowDailyWork(true);
};

const handleDeleteDailyWork = (recordId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this daily work report?"
  );

  if (!confirmDelete) {
    return;
  }

  setDailyWorkRecords((previousRecords) =>
    previousRecords.filter((record) => record.id !== recordId)
  );
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
         {progress}% completed
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

     <div
  className="module-card"
  onClick={() => {
    resetMaterialForm();
    setShowMaterials(true);
  }}
>
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

          <div
  className="module-card"
  onClick={() => setShowPayments(true)}
>
  <strong>Payments</strong>
  <span>Track project payments</span>
</div>

       <div
  className="module-card"
  onClick={() => {
    setEditingDailyWorkId(null);

    setDailyWorkForm({
      date: new Date().toISOString().split("T")[0],
      description: "",
      status: "",
      progress: project.progress || 0,
      workersPresent: "",
      notes: "",
    });

    setShowDailyWork(true);
  }}
>
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

      {showDailyWork && (
  <div className="dashboard-section daily-work-section">
    <div className="section-header">
      <div>
        <h3>
          {editingDailyWorkId !== null
            ? "Edit Daily Work Report"
            : "Daily Work / Site Update"}
        </h3>

        <p className="dashboard-subtitle">
          Record daily work progress for {project.name}
        </p>
      </div>

      <button
        type="button"
        className="modal-close"
        onClick={() => {
          setShowDailyWork(false);
          setEditingDailyWorkId(null);
        }}
      >
        ×
      </button>
    </div>

    <form onSubmit={handleSaveDailyWork}>
      <div className="daily-work-form-grid">

        <div className="form-group">
          <label>Work Date</label>

          <input
            type="date"
            name="date"
            value={dailyWorkForm.date}
            min={project.startDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleDailyWorkChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Work Status</label>

          <select
            name="status"
            value={dailyWorkForm.status}
            onChange={handleDailyWorkChange}
            required
          >
            <option value="">Select status</option>
            <option value="Started">Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="form-group">
          <label>Project Progress (%)</label>

          <input
            type="number"
            name="progress"
            min="0"
            max="100"
            value={dailyWorkForm.progress}
            onChange={handleDailyWorkChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Workers Present</label>

          <input
            type="number"
            name="workersPresent"
            min="0"
            max={projectEmployees.length}
            placeholder={`Maximum ${projectEmployees.length}`}
            value={dailyWorkForm.workersPresent}
            onChange={handleDailyWorkChange}
            required
          />

          <small>
            Assigned workers: {projectEmployees.length}
          </small>
        </div>

      </div>

      <div className="form-group">
        <label>Work Description</label>

        <textarea
          name="description"
          rows="4"
          placeholder="Describe the work completed today..."
          value={dailyWorkForm.description}
          onChange={handleDailyWorkChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Notes</label>

        <textarea
          name="notes"
          rows="3"
          placeholder="Any issues, delays, observations or additional notes..."
          value={dailyWorkForm.notes}
          onChange={handleDailyWorkChange}
        />
      </div>

      <button
        type="submit"
        className="primary-button"
      >
        {editingDailyWorkId !== null
          ? "Save Changes"
          : "Save Daily Report"}
      </button>
    </form>

    <div className="daily-work-records">
      <div className="section-header">
        <div>
          <h3>Previous Site Reports</h3>
          <p className="dashboard-subtitle">
            Daily work history for this project
          </p>
        </div>
      </div>

      {dailyWorkRecords.length === 0 ? (
        <div className="empty-state">
          <h3>No daily work reports yet</h3>
          <p>
            Add the first daily site report for this project.
          </p>
        </div>
      ) : (
        <div className="daily-work-list">
          {dailyWorkRecords.map((record) => (
            <div
              className="daily-work-card"
              key={record.id}
            >
              <div className="daily-work-card-header">
                <div>
                  <h3>{record.date}</h3>

                  <span
                    className={`daily-work-status ${record.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {record.status}
                  </span>
                </div>

                <div className="daily-work-actions">
                  <button
  type="button"
  className="edit-button"
  onClick={(event) => {
    event.stopPropagation();
    handleEditDailyWork(record);
  }}
>
  Edit
</button>
                  <button
  type="button"
  className="expense-delete-button"
  onClick={(event) => {
    event.stopPropagation();
    handleDeleteDailyWork(record.id);
  }}
>
  Delete
</button>
                </div>
              </div>

              <div className="daily-work-details">
                <div>
                  <span>Progress</span>
                  <strong>{record.progress}%</strong>
                </div>

                <div>
                  <span>Workers Present</span>
                  <strong>{record.workersPresent}</strong>
                </div>
              </div>

              <div className="daily-work-description">
                <strong>Work Completed</strong>
                <p>{record.description}</p>
              </div>

              {record.notes && (
                <div className="daily-work-notes">
                  <strong>Notes</strong>
                  <p>{record.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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

      {showPayments && (
  <div className="module-overlay">
    <div className="module-panel">

      <div className="module-panel-header">
        <div>
          <h2>Worker Payments</h2>
          <p>{project.name}</p>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={() => {
            setShowPayments(false);
            setShowPaymentForm(false);
            resetPaymentForm();
          }}
        >
          ✕
        </button>
      </div>

      {/* Payment Summary */}

      <div className="payment-summary-grid">

        <div className="summary-card">
          <span>Total Workers</span>
          <strong>{projectEmployees.length}</strong>
        </div>

        <div className="summary-card">
          <span>Total Earned</span>
          <strong>
            ₹
            {projectEmployees
              .reduce(
                (total, employee) =>
                  total +
                  employee.dailyWage *
                    attendanceRecords.filter(
                      (record) =>
                        record.employeeId === employee.id &&
                        record.status === "Present"
                    ).length,
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="summary-card">
          <span>Total Paid</span>
          <strong>
            ₹
            {workerPayments
              .reduce(
                (total, payment) =>
                  total + Number(payment.amount),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="summary-card">
          <span>Remaining Balance</span>
          <strong>
            ₹
            {(
              projectEmployees.reduce(
                (total, employee) =>
                  total +
                  employee.dailyWage *
                    attendanceRecords.filter(
                      (record) =>
                        record.employeeId === employee.id &&
                        record.status === "Present"
                    ).length,
                0
              ) -
              workerPayments.reduce(
                (total, payment) =>
                  total + Number(payment.amount),
                0
              )
            ).toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

      {/* Add Payment */}

      {!showPaymentForm && (
        <button
          type="button"
          className="add-button"
          onClick={() => {
            resetPaymentForm();
            setShowPaymentForm(true);
          }}
        >
          + Add Worker Payment
        </button>
      )}

      {/* Payment Form */}

      {showPaymentForm && (
        <div className="payment-form">

          <div className="section-header">
            <h3>
              {editingPaymentId !== null
                ? "Edit Worker Payment"
                : "Add Worker Payment"}
            </h3>
          </div>

          <div className="payment-form-grid">

            <div className="form-group">
              <label>Worker</label>

              <select
                name="employeeId"
                value={paymentForm.employeeId}
                onChange={handlePaymentChange}
              >
                <option value="">Select Worker</option>

                {projectEmployees.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name} - ₹{employee.dailyWage}/day
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Payment Date</label>

              <input
                type="date"
                name="date"
                value={paymentForm.date}
                max={new Date().toISOString().split("T")[0]}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="form-group">
              <label>Amount Paid (₹)</label>

              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                value={paymentForm.amount}
                onChange={handlePaymentChange}
                placeholder="e.g. 5000"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Payment Note</label>

            <textarea
              name="note"
              value={paymentForm.note}
              onChange={handlePaymentChange}
              rows="3"
              placeholder="e.g. Weekly wage payment"
            />
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                resetPaymentForm();
                setShowPaymentForm(false);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-button"
              onClick={handleSavePayment}
            >
              {editingPaymentId !== null
                ? "Update Payment"
                : "Save Payment"}
            </button>

          </div>

        </div>
      )}

      {/* Worker Balance */}

      <div className="worker-payment-summary">

        <div className="section-header">
          <h3>Worker Payment Summary</h3>
        </div>

        {projectEmployees.length === 0 ? (
          <div className="empty-state">
            <p>No workers assigned to this project.</p>
          </div>
        ) : (
          <div className="worker-payment-list">

            {projectEmployees.map((employee) => {

              const presentDays = attendanceRecords.filter(
                (record) =>
                  record.employeeId === employee.id &&
                  record.status === "Present"
              ).length;

              const totalEarned =
                presentDays * employee.dailyWage;

              const totalPaid = workerPayments
                .filter(
                  (payment) =>
                    payment.employeeId === employee.id
                )
                .reduce(
                  (total, payment) =>
                    total + Number(payment.amount),
                  0
                );

              const remaining = totalEarned - totalPaid;

              return (
                <div
                  className="worker-payment-card"
                  key={employee.id}
                >

                  <div>
                    <h3>{employee.name}</h3>

                    <span>
                      Daily Wage: ₹{employee.dailyWage}
                    </span>
                  </div>

                  <div className="worker-payment-values">

                    <div>
                      <span>Present Days</span>
                      <strong>{presentDays}</strong>
                    </div>

                    <div>
                      <span>Earned</span>
                      <strong>
                        ₹{totalEarned.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Paid</span>
                      <strong>
                        ₹{totalPaid.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Remaining</span>
                      <strong>
                        ₹{remaining.toLocaleString("en-IN")}
                      </strong>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Payment History */}

      <div className="payment-records">

        <div className="section-header">
          <h3>Payment History</h3>
        </div>

        {workerPayments.length === 0 ? (

          <div className="empty-state">
            <p>No worker payments recorded yet.</p>
          </div>

        ) : (

          <div className="payment-list">

            {workerPayments
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((payment) => {

                const employee = projectEmployees.find(
                  (item) => item.id === payment.employeeId
                );

                return (
                  <div
                    className="payment-card"
                    key={payment.id}
                  >

                    <div className="payment-card-header">

                      <div>
                        <h3>
                          {employee
                            ? employee.name
                            : "Unknown Worker"}
                        </h3>

                        <span>
                          {payment.date}
                        </span>
                      </div>

                      <div className="payment-actions">

                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            handleEditPayment(payment)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDeletePayment(payment.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                    <div className="payment-amount">
                      ₹{Number(payment.amount).toLocaleString("en-IN")}
                    </div>

                    {payment.note && (
                      <div className="payment-note">
                        <strong>Note</strong>
                        <p>{payment.note}</p>
                      </div>
                    )}

                  </div>
                );
              })}

          </div>
        )}

      </div>

    </div>
  </div>
)}

      {showMaterials && (
  <div className="module-overlay">
    <div className="module-panel">

      <div className="module-panel-header">
        <div>
          <h2>Project Materials</h2>
          <p>{project.name}</p>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={() => {
            setShowMaterials(false);
            setShowMaterialForm(false);
            resetMaterialForm();
          }}
        >
          ✕
        </button>
      </div>

      {/* Material Summary */}

      <div className="material-summary-grid">

        <div className="summary-card">
          <span>Total Materials</span>
          <strong>{materials.length}</strong>
        </div>

        <div className="summary-card">
          <span>Total Quantity</span>
          <strong>
            {materials.reduce(
              (total, material) => total + Number(material.quantity),
              0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>Total Material Cost</span>
          <strong>
            ₹
            {materials
              .reduce(
                (total, material) =>
                  total +
                  Number(material.quantity) *
                    Number(material.unitPrice),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

      {/* Add Material Button */}

      {!showMaterialForm && (
        <button
          type="button"
          className="add-button"
          onClick={() => {
            resetMaterialForm();
            setShowMaterialForm(true);
          }}
        >
          + Add Material
        </button>
      )}

      {/* Material Form */}

      {showMaterialForm && (
        <div className="material-form">

          <div className="section-header">
            <h3>
              {editingMaterialId !== null
                ? "Edit Material"
                : "Add Material"}
            </h3>
          </div>

          <div className="material-form-grid">

            <div className="form-group">
              <label>Material Name</label>

              <input
                type="text"
                name="name"
                value={materialForm.name}
                onChange={handleMaterialChange}
                placeholder="e.g. Cement"
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={materialForm.category}
                onChange={handleMaterialChange}
              >
                <option value="">Select Category</option>
                <option value="Cement">Cement</option>
                <option value="Steel">Steel</option>
                <option value="Bricks">Bricks</option>
                <option value="Sand">Sand</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                min="0"
                step="0.01"
                value={materialForm.quantity}
                onChange={handleMaterialChange}
                placeholder="e.g. 50"
              />
            </div>

            <div className="form-group">
              <label>Unit</label>

              <select
                name="unit"
                value={materialForm.unit}
                onChange={handleMaterialChange}
              >
                <option value="">Select Unit</option>
                <option value="Bags">Bags</option>
                <option value="Kg">Kg</option>
                <option value="Ton">Ton</option>
                <option value="Pieces">Pieces</option>
                <option value="Cubic Feet">Cubic Feet</option>
                <option value="Litres">Litres</option>
                <option value="Meters">Meters</option>
              </select>
            </div>

            <div className="form-group">
              <label>Unit Price (₹)</label>

              <input
                type="number"
                name="unitPrice"
                min="0"
                step="0.01"
                value={materialForm.unitPrice}
                onChange={handleMaterialChange}
                placeholder="e.g. 420"
              />
            </div>

            <div className="form-group">
              <label>Supplier</label>

              <input
                type="text"
                name="supplier"
                value={materialForm.supplier}
                onChange={handleMaterialChange}
                placeholder="Supplier name"
              />
            </div>

            <div className="form-group">
              <label>Purchase Date</label>

              <input
                type="date"
                name="purchaseDate"
                value={materialForm.purchaseDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleMaterialChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Notes</label>

            <textarea
              name="notes"
              value={materialForm.notes}
              onChange={handleMaterialChange}
              rows="3"
              placeholder="Additional information about this material..."
            />
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                resetMaterialForm();
                setShowMaterialForm(false);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-button"
              onClick={handleSaveMaterial}
            >
              {editingMaterialId !== null
                ? "Update Material"
                : "Save Material"}
            </button>

          </div>

        </div>
      )}

      {/* Material Records */}

      <div className="material-records">

        <div className="section-header">
          <h3>Material Records</h3>
        </div>

        {materials.length === 0 ? (

          <div className="empty-state">
            <p>No materials added for this project yet.</p>
          </div>

        ) : (

          <div className="material-list">

            {materials.map((material) => {

              const totalCost =
                Number(material.quantity) *
                Number(material.unitPrice);

              return (
                <div
                  className="material-card"
                  key={material.id}
                >

                  <div className="material-card-header">

                    <div>
                      <h3>{material.name}</h3>

                      <span className="material-category">
                        {material.category}
                      </span>
                    </div>

                    <div className="material-actions">

                      <button
                        type="button"
                        className="edit-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditMaterial(material);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteMaterial(material.id);
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                  <div className="material-details">

                    <div>
                      <span>Quantity</span>
                      <strong>
                        {material.quantity} {material.unit}
                      </strong>
                    </div>

                    <div>
                      <span>Unit Price</span>
                      <strong>
                        ₹{Number(material.unitPrice).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Total Cost</span>
                      <strong>
                        ₹{totalCost.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Purchase Date</span>
                      <strong>{material.purchaseDate}</strong>
                    </div>

                  </div>

                  <div className="material-supplier">
                    <span>Supplier</span>
                    <strong>{material.supplier}</strong>
                  </div>

                  {material.notes && (
                    <div className="material-notes">
                      <strong>Notes</strong>
                      <p>{material.notes}</p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
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
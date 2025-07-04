const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: totalTasks, color: "#2196f3" },
    { label: "Completed", value: completedTasks, color: "#4caf50" },
    { label: "Pending", value: pendingTasks, color: "#ff9800" },
    { label: "High Priority", value: highPriorityTasks, color: "#f44336" },
    { label: "Overdue", value: overdueTasks, color: "#d32f2f" },
  ];

  return (
    <div className="task-stats">
      <h4>Task Overview</h4>
      <div className="stats-grid">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className="stat-value" style={{ color }}>
              {value}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
      <div className="completion-rate">
        <span>Completion Rate: {completionRate}%</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskStats;

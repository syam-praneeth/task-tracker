const TaskFilter = ({ filter, onFilterChange, tasks }) => {
  const getTaskCount = (filterType) => {
    if (filterType === "all") return tasks.length;
    if (filterType === "completed")
      return tasks.filter((task) => task.completed).length;
    if (filterType === "pending")
      return tasks.filter((task) => !task.completed).length;
    if (filterType === "high")
      return tasks.filter((task) => task.priority === "high").length;
    if (filterType === "overdue") {
      return tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false;
        return new Date(task.dueDate) < new Date();
      }).length;
    }
    return 0;
  };

  const filters = [
    { key: "all", label: "All Tasks" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
    { key: "high", label: "High Priority" },
    { key: "overdue", label: "Overdue" },
  ];

  return (
    <div className="task-filter">
      <h4>Filter Tasks:</h4>
      <div className="filter-buttons">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`filter-btn ${filter === key ? "active" : ""}`}
          >
            {label} ({getTaskCount(key)})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;

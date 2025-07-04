import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  const priorityOptions = [
    { value: "high", label: "High Priority", color: "#f44336" },
    { value: "medium", label: "Medium Priority", color: "#ff9800" },
    { value: "low", label: "Low Priority", color: "#4caf50" },
  ];

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="task-title-input"
          />
          <label htmlFor="Due Date">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-date-input"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        <div className="priority-selector">
          <label>Priority:</label>
          <div className="priority-options">
            {priorityOptions.map(({ value, label, color }) => (
              <label key={value} className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={priority === value}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <span className="priority-label" style={{ borderColor: color }}>
                  <span
                    className="priority-dot"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

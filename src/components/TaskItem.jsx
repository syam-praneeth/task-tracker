import { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editPriority, setEditPriority] = useState(task.priority || "medium");
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const handleToggleComplete = () =>
    onUpdate(task.id, { completed: !task.completed });
  const handleDelete = () =>
    window.confirm("Are you sure you want to delete this task?") &&
    onDelete(task.id);

  const handleSave = () => {
    if (!editTitle.trim()) return alert("Task title cannot be empty");
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "medium");
    setEditDueDate(task.dueDate || "");
    setIsEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") handleCancel();
  };

  const getPriorityColor = (p) =>
    ({ high: "#f44336", medium: "#ff9800", low: "#4caf50" }[p] || "#ff9800");
  const getPriorityLabel = (p) =>
    ({ high: "High", medium: "Medium", low: "Low" }[p] || "Medium");

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date),
      today = new Date(),
      tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return d.toLocaleDateString();
  };

  const getDueDateClass = (date) => {
    if (!date) return "";
    const due = new Date(date),
      today = new Date(),
      diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (due < today && !task.completed) return "overdue";
    if (diff <= 3 && diff >= 0) return "due-soon";
    return "";
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKey}
                className="edit-title"
                placeholder="Task title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKey}
                className="edit-description"
                placeholder="Task description (optional)"
                rows="2"
              />
              <div className="edit-row">
                <div className="edit-priority">
                  <label>Priority:</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="edit-priority-select"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div className="edit-due-date">
                  <label>Due Date:</label>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="edit-date-input"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  ✓ Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-title-row">
                <h4>{task.title}</h4>
                <div className="task-meta">
                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor: getPriorityColor(
                        task.priority || "medium"
                      ),
                    }}
                  >
                    {getPriorityLabel(task.priority || "medium")}
                  </span>
                  {task.dueDate && (
                    <span
                      className={`due-date-badge ${getDueDateClass(
                        task.dueDate
                      )}`}
                    >
                      📅 {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <button
                  onClick={handleToggleComplete}
                  className={`toggle-btn ${
                    task.completed ? "complete" : "incomplete"
                  }`}
                  title={
                    task.completed ? "Mark as pending" : "Mark as complete"
                  }
                >
                  {task.completed ? "✓" : "○"}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-btn"
                  title="Edit task"
                >
                  ✏️
                </button>
                <button
                  onClick={handleDelete}
                  className="delete-btn"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </>
          )}
        </div>
        {!isEditing && task.description && (
          <p className="task-description">{task.description}</p>
        )}
        {!isEditing && (
          <div className="task-footer">
            <small className="task-date">
              Created: {new Date(task.createdAt).toLocaleDateString()} at{" "}
              {new Date(task.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
            <small
              className={`task-status ${
                task.completed ? "completed" : "pending"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

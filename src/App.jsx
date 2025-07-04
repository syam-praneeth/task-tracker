import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskSearch from "./components/TaskSearch";
import TaskStats from "./components/TaskStats";
import {
  isLoggedIn,
  getUsername,
  clearUsername,
  getTasks,
  saveTasks,
} from "./utils/localStorage";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    if (isLoggedIn()) {
      setUser(getUsername());
      // Load tasks from localStorage
      const savedTasks = getTasks();
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user) {
      saveTasks(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username) => {
    setUser(username);
    // Load tasks after login
    const savedTasks = getTasks();
    setTasks(savedTasks);
  };

  const handleLogout = () => {
    clearUsername();
    setUser(null);
    setTasks([]);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status and other criteria
    const statusFilter = () => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      if (filter === "high") return task.priority === "high";
      if (filter === "overdue") {
        if (!task.dueDate || task.completed) return false;
        return new Date(task.dueDate) < new Date();
      }
      return true;
    };

    // Filter by search term
    const searchFilter = () => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        (task.description &&
          task.description.toLowerCase().includes(searchLower))
      );
    };

    return statusFilter() && searchFilter();
  });

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Priority order: high -> medium -> low
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const aPriority = priorityOrder[a.priority] || 1;
    const bPriority = priorityOrder[b.priority] || 1;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // If same priority, sort by due date (earlier dates first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // If no due dates, sort by creation date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskTracker</h1>
        <div className="user-info">
          <span>Welcome, {user}!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-row">
          <TaskStats tasks={tasks} />
          <TaskForm onAddTask={addTask} />
        </div>
        <TaskSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <TaskFilter filter={filter} onFilterChange={setFilter} tasks={tasks} />
        <TaskList
          tasks={sortedTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;

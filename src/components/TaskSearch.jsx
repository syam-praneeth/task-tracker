import { useState } from "react";

const TaskSearch = ({ onSearchChange, searchTerm }) => {
  return (
    <div className="task-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
};

export default TaskSearch;

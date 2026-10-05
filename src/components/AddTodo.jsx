import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addTodo } from "../api/apiService";

function AddTodo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a todo title.");
      return;
    }

    const newTodo = {
      title: title.trim(),
      status: status
    };

    try {
      await addTodo(newTodo);
      navigate("/todos");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <Link to="/todos" className="back-link">
          ← Back to tasks
        </Link>

        <div className="form-header">
          <p className="eyebrow">NEW TASK</p>
          <h1>Create something.</h1>
          <p> Add a task to your workspace.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Task title</label>
            <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select  value={status} onChange={(e) => setStatus(e.target.value)} >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Add Task
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
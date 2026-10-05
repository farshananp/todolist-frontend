import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from "../api/apiService";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodoById(id);

        setTitle(response.data.title);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a todo title.");
      return;
    }

    const updatedTodo = {
      title: title.trim(),
      status: status
    };

    try {
      await updateTodo(id, updatedTodo);
      navigate("/todos");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <Link to="/todos" className="back-link">
          ← Back to tasks
        </Link>
        <div className="form-header">
          <p className="eyebrow">EDIT TASK</p>
          <h1>Make a change.</h1>
          <p> Update the task details below.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task title</label>
            <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)}            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Save Changes
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTodo, getTodos } from "../api/apiService";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="todo-container">

        <header className="main-header">
          <div>
            <p className="eyebrow">PERSONAL WORKSPACE</p>
            <h1>Things to do.</h1>
            <p className="header-description">
              Keep track of your tasks and stay organized.
            </p>
          </div>

          <Link to="/add-todo" className="new-task-btn">
            <span>+</span>
            New Task
          </Link>
        </header>

        <div className="list-heading">
          <span>YOUR TASKS</span>
          <span>{todos.length} items</span>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">○</div>
              <h2>No tasks yet</h2>
              <p>Create your first task to get started.</p>

              <Link to="/add-todo" className="empty-button">
                Create Task
              </Link>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div className="todo-card" key={todo.id}>

                <div className="task-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="todo-content">
                  <h2>{todo.title}</h2>

                  <span className={ todo.status === "Completed"  ? "status completed"  : "status pending"  }  >
                    <span className="status-dot"></span>
                    {todo.status}
                  </span>
                </div>
               <div className="actions">
                  <Link  to={`/edit-todo/${todo.id}`} className="edit-button" >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
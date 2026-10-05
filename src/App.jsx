import React from "react";
import { Routes, Route } from "react-router-dom";

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <Routes>
      <Route path="/todos" element={<TodoList />} />
      <Route path="/add-todo" element={<AddTodo />} />
      <Route path="/edit-todo/:id" element={<EditTodo />} />
    </Routes>
  );
}

export default App;
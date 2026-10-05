import axiosInstance from "./axiosinstance";

export const getTodos = () => {
  return axiosInstance.get("/todos");
};

export const getTodoById = (id) => {
  return axiosInstance.get(`/todos/${id}`);
};

export const addTodo = (todo) => {
  return axiosInstance.post("/todos", todo);
};

export const updateTodo = (id, todo) => {
  return axiosInstance.patch(`/todos/${id}`, todo);
};

export const deleteTodo = (id) => {
  return axiosInstance.delete(`/todos/${id}`);
};
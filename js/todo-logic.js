// js/todo-logic.js
// Pure functions — no DOM, no localStorage

export function createTodo(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function addTodo(todos, text) {
  const trimmed = text.trim();
  if (trimmed === "") return todos;
  return [...todos, createTodo(trimmed)];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function countActive(todos) {
  return todos.filter((t) => !t.completed).length;
}

export function clearCompleted(todos) {
  return todos.filter((t) => !t.completed);
}

export function updateTodoText(todos, id, newText) {
  const trimmed = newText.trim();
  if (trimmed === "") return todos;
  return todos.map((todo) =>
    todo.id === id ? { ...todo, text: trimmed } : todo
  );
}

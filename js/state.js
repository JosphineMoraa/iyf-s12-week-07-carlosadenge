// js/state.js
import { getFromStorage, saveToStorage } from "./storage.js";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  updateTodoText,
} from "./todo-logic.js";

const TODOS_KEY = "todos";
const FILTER_KEY = "filter";

export const state = {
  todos: getFromStorage(TODOS_KEY, []),
  filter: getFromStorage(FILTER_KEY, "all"),
};

function commit() {
  saveToStorage(TODOS_KEY, state.todos);
  saveToStorage(FILTER_KEY, state.filter);
}

export function setFilter(filter) {
  state.filter = filter;
  commit();
}

export function add(text) {
  state.todos = addTodo(state.todos, text);
  commit();
}

export function toggle(id) {
  state.todos = toggleTodo(state.todos, id);
  commit();
}

export function remove(id) {
  state.todos = deleteTodo(state.todos, id);
  commit();
}

export function clearDone() {
  state.todos = clearCompleted(state.todos);
  commit();
}

export function edit(id, newText) {
  state.todos = updateTodoText(state.todos, id, newText);
  commit();
}

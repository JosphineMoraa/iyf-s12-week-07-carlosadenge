// js/app.js
import { state, add, toggle, remove, clearDone, setFilter, edit } from "./state.js";
import { render } from "./ui.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  add(input.value);
  input.value = "";
  render();
});

// Event delegation: toggle + delete
todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains("todo-text")) {
    toggle(id);
    render();
  }

  if (e.target.classList.contains("delete-btn")) {
    remove(id);
    render();
  }
});

// Double-click to edit
todoList.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("todo-text")) return;

  const li = e.target.closest(".todo-item");
  const id = Number(li.dataset.id);
  const todo = state.todos.find((t) => t.id === id);
  if (!todo) return;

  const editInput = document.createElement("input");
  editInput.className = "edit-input";
  editInput.value = todo.text;
  e.target.replaceWith(editInput);
  editInput.focus();

  function save() {
    edit(id, editInput.value);
    render();
  }

  editInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") save();
    if (ev.key === "Escape") render();
  });

  editInput.addEventListener("blur", save);
});

// Filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter);
    render();
  });
});

// Clear completed
clearBtn.addEventListener("click", () => {
  clearDone();
  render();
});

// Initial render
render();

// js/ui.js
import { state } from "./state.js";
import { filterTodos, countActive } from "./todo-logic.js";

const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filterBtns = document.querySelectorAll(".filter-btn");

export function render() {
  todoList.innerHTML = "";

  const visible = filterTodos(state.todos, state.filter);

  visible.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  const active = countActive(state.todos);
  itemsLeft.textContent =
    active === 1 ? "1 item left" : `${active} items left`;

  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === state.filter);
  });
}

import { describe, it, expect } from "vitest";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  filterTodos,
  countActive,
  clearCompleted,
  updateTodoText,
  createTodo,
} from "../js/todo-logic.js";

describe("todo-logic", () => {
  it("creates a todo with text and completed false", () => {
    const todo = createTodo("Buy milk");
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeTypeOf("number");
  });

  it("adds a todo", () => {
    const todos = addTodo([], "Learn JS");
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe("Learn JS");
  });

  it("refuses empty text", () => {
    const todos = addTodo([], "   ");
    expect(todos).toHaveLength(0);
  });

  it("toggles completed", () => {
    const todos = [{ id: 1, text: "Task", completed: false }];
    const result = toggleTodo(todos, 1);
    expect(result[0].completed).toBe(true);
  });

  it("deletes a todo", () => {
    const todos = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: false },
    ];
    const result = deleteTodo(todos, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters active and completed", () => {
    const todos = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: true },
    ];
    expect(filterTodos(todos, "active")).toHaveLength(1);
    expect(filterTodos(todos, "completed")).toHaveLength(1);
    expect(filterTodos(todos, "all")).toHaveLength(2);
  });

  it("counts active items", () => {
    const todos = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: true },
    ];
    expect(countActive(todos)).toBe(1);
  });

  it("clears completed", () => {
    const todos = [
      { id: 1, text: "A", completed: false },
      { id: 2, text: "B", completed: true },
    ];
    const result = clearCompleted(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("updates todo text", () => {
    const todos = [{ id: 1, text: "Old", completed: false }];
    const result = updateTodoText(todos, 1, "New");
    expect(result[0].text).toBe("New");
  });
});

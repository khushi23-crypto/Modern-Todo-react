import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Add a new task
  const addTask = () => {
    if (task.trim() === '') return; // Prevent empty tasks
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setTask('');
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited task
  const saveEdit = (id) => {
    if (editingText.trim() === '') return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="todo-app">
      <h1>Add a Todo</h1>
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="todo-add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            {/* Checkbox for marking completed */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {/* Editable text */}
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' ? saveEdit(todo.id) : null
                }
              />
            ) : (
              <span>{todo.text}</span>
            )}

            <div className="todo-actions">
              {/* Edit / Save Button */}
              {editingId === todo.id ? (
                <button
                  className="todo-btn edit"
                  onClick={() => saveEdit(todo.id)}
                >
                  💾
                </button>
              ) : (
                <button
                  className="todo-btn edit"
                  onClick={() => startEditing(todo.id, todo.text)}
                >
                  ✏️
                </button>
              )}

              {/* Delete Button */}
              <button
                className="todo-btn delete"
                onClick={() => deleteTask(todo.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

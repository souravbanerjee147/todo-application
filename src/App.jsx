import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddTodo from './components/AddTodo';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Apply theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearAllTodos = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTodos([]);
    }
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app">
      <div className="container">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        
        <div className="header">
          <div className="header-content">
            <h1>To-Do List</h1>
            <p>Organize your life, one task at a time</p>
          </div>
        </div>
        
        <AddTodo addTodo={addTodo} />
        <ToDoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        
        {/* Show stats only if there are todos */}
        {todos.length > 0 && (
          <>
            <div className="stats">
              <p>
                <span>{todos.length}</span>
                Total Tasks
              </p>
              <p>
                <span>{todos.filter(t => t.completed).length}</span>
                Completed
              </p>
              <p>
                <span>{todos.filter(t => !t.completed).length}</span>
                Pending
              </p>
            </div>

            <button 
              onClick={clearCompletedTodos}
              className="clear-btn"
              disabled={todos.filter(t => t.completed).length === 0}
            >
               Clear Completed Tasks
            </button>

            <button 
              onClick={clearAllTodos}
              className="clear-btn"
              disabled={todos.length === 0}
            >
               Clear All Tasks
            </button>
          </>
        )}

        <div className="footer">
          <p>Your tasks are saved automatically ✨</p>
          <p>Theme preference saved • Tasks: {todos.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
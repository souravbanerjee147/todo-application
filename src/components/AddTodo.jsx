import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setError('Task cannot be empty');
      return;
    }

    if (trimmedInput.length > 100) {
      setError('Task is too long (max 100 characters)');
      return;
    }

    setError('');
    addTodo(trimmedInput);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div style={{ flex: 1, position: 'relative' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleSubmit(e);
            }
          }}
          placeholder="What needs to be done?"
          className="todo-input"
          maxLength={100}
        />
        {error && (
          <div style={{
            color: '#f56565',
            fontSize: '0.8rem',
            marginTop: '5px',
            position: 'absolute',
            bottom: '-20px',
            left: '0'
          }}>
            ⚠️ {error}
          </div>
        )}
        <div style={{
          fontSize: '0.8rem',
          color: '#a0aec0',
          textAlign: 'right',
          marginTop: '5px'
        }}>
          {input.length}/100
        </div>
      </div>
      <button type="submit" className="add-btn">
        ➕ Add Task
      </button>
    </form>
  );
};

export default AddTodo;
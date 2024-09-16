// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setErrors('Both name and description are required');
      return;
    }
    onSave({ ...task, name, description });
    setName('');
    setDescription('');
    setErrors('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      {errors && <p className="error">{errors}</p>}
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{task ? 'Save Changes' : 'Add Task'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default TaskForm;

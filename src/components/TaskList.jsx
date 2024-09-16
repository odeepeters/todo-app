// src/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks from local storage on mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setEditingTask(null);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      {editingTask ? (
        <TaskForm task={editingTask} onSave={updateTask} onCancel={() => setEditingTask(null)} />
      ) : (
        <TaskForm onSave={addTask} onCancel={() => setEditingTask(null)} />
      )}
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggle={toggleTaskCompletion}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

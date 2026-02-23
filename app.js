const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory tasks
const tasks = [];

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CI/CD demo service is running' });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Task text is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    text,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = app;

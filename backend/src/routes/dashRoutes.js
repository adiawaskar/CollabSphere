const express = require("express");
const router = express.Router();
const { Task, Column, Project } = require("../models");

router.post(
  "projects/:projectId/columns/:columnId/tasks",
  async (req, res) => {
    try {
      const { projectId, columnId } = req.params;
      const { name, description, storyPoints } = req.body;

      const newTask = new Task({
        name,
        description,
        storyPoints,
        column: columnId,
      });
      await newTask.save();

      const column = await Column.findById(columnId);
      column.tasks.push(newTask._id);
      await column.save();

      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  }
);

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { column } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const previousColumn = await Column.findById(task.column);
    previousColumn.tasks.pull(taskId);
    await previousColumn.save();

    task.column = column;
    await task.save();

    const newColumn = await Column.findById(column);
    newColumn.tasks.push(taskId);
    await newColumn.save();

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports = router;
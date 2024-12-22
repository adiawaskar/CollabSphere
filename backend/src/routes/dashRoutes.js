import express from "express";
import { Task } from "../models/task.model.js";

const router = express.Router();

// 1. GET /api/tasks (Retrieve all tasks, optionally filtered by status/column)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // Use 'status' to filter
    const filter = status ? { status } : {};
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST /api/tasks (Create a new task)
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:taskName", async (req, res) => {
  // Use :taskName as the parameter
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { name: req.params.taskName }, // Find by name
      req.body,
      { new: true, runValidators: true } // Important: run validators to ensure the update is valid
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.name === 1
    ) {
      return res.status(400).json({ message: "Task name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

// 4. DELETE /api/tasks/:taskId (Delete a task)
router.delete("/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
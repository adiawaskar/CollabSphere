import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const taskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    project_id: { type: String, ref: "Project", required: true }, // Referencing by UUID string
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    assigned_to: { type: String, ref: "User" }, // Referencing by UUID string
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    due_date: { type: Date },
  },
  { timestamps: true, _id: false }
);

export const Task = mongoose.model("Task", taskSchema);
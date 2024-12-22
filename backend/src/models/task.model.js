import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  storyPoints: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  column: { type: String, ref: "Column", required: true },
});


export const Task = mongoose.model("Task", taskSchema);
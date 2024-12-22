import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: { type: String, ref: "Project", required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export const Column = mongoose.model("Column", columnSchema);
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    leader_id: { type: String, ref: "User", required: true }, // Referencing by UUID string
    team_members: [{ type: String, ref: "User" }], // Referencing by UUID string
    tasks: [{ type: String, ref: "Task" }], // Referencing by UUID string
    documents: [{ type: String, ref: "Document" }], // Referencing by UUID string
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
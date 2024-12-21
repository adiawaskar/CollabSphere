import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    leader_id: { type: String, ref: "User", required: true }, // Referencing by UUID string
    team_members: [{ type: String, ref: "User" }], // Referencing by UUID string
    tasks: [{ type: String, ref: "Task" }], // Referencing by UUID string
    documents: [{ type: String, ref: "Document" }], // Referencing by UUID string
  },
  { timestamps: true, _id: false }
);

export const Project = mongoose.model("Project", projectSchema);
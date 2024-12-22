import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    leader_email: { type: String, ref: "User", required: true },
    team_members: [{ type: String, ref: "User" }],
    tasks: [{ type: String, ref: "Task" }],
    documents: [{ type: String, ref: "Document" }],
    team_id: { type: String, required: true, unique: true },
    total_story_points: { type: Number, default: 0 },
    completed_story_points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
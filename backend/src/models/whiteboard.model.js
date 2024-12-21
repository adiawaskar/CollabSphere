import mongoose from "mongoose";

const whiteboardSessionSchema = new mongoose.Schema(
  {
    project_id: { type: String, ref: "Project", required: true }, // Referencing by UUID string
    session_name: { type: String, required: true, trim: true },
    active_users: [{ type: String, ref: "User" }], // Referencing by UUID string
    snapshot_url: { type: String },
  },
  { timestamps: true }
);

export const WhiteboardSession = mongoose.model(
  "WhiteboardSession",
  whiteboardSessionSchema
);

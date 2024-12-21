import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const whiteboardSessionSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    project_id: { type: String, ref: "Project", required: true }, // Referencing by UUID string
    session_name: { type: String, required: true, trim: true },
    active_users: [{ type: String, ref: "User" }], // Referencing by UUID string
    snapshot_url: { type: String },
  },
  { timestamps: true, _id: false }
);

export const WhiteboardSession = mongoose.model(
  "WhiteboardSession",
  whiteboardSessionSchema
);

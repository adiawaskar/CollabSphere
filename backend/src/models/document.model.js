import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const documentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    project_id: { type: String, ref: "Project", required: true }, // Referencing by UUID string
    name: { type: String, required: true, trim: true },
    type: { type: String },
    url: { type: String },
    version_history: [
      {
        version: { type: Number },
        editor_id: { type: String, ref: "User" }, // Referencing by UUID string
        edited_at: { type: Date },
        changes_summary: { type: String },
      },
    ],
  },
  { timestamps: true, _id: false }
);

export const Document = mongoose.model("Document", documentSchema);
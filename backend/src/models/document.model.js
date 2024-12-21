import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    project_id: { type: String, ref: "Project", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String },
    url: { type: String },
    version_history: [
      {
        version: { type: Number },
        editor_id: { type: String, ref: "User" },
        edited_at: { type: Date },
        changes_summary: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);
import mongoose from "mongoose";

const videoConferenceSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  projectId: { type: String, ref: "Project" },
  participants: [{ type: String, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export const VideoConference = mongoose.model("VideoConference", videoConferenceSchema); 
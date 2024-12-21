import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Team Leader", "Team Member"],
      default: "Team Member",
    },
    profile_picture: { type: String, default: null },
    projects: [{ type: String, ref: "Project" }],
  },
  { timestamps: true, _id: false }
);

export const User = mongoose.model("User", userSchema);

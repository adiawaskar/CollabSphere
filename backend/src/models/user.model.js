import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    createdProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    collaboratedProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

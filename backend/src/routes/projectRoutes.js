import express from "express";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

function generateTeamCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

router.post("/create", async (req, res) => {
  try {
    const { name, description, leader_email, team_members } = req.body;

    const leader = await User.findOne({ email: leader_email });
    if (!leader) {
      return res.status(400).json({ message: "Project leader not found" });
    }

    const existingTeamMembers = [];
    if (team_members && team_members.length > 0) {
      for (const memberEmail of team_members) {
        const member = await User.findOne({ email: memberEmail });
        if (!member) {
          return res
            .status(400)
            .json({
              message: `Team member with email ${memberEmail} not found`,
            });
        }
        existingTeamMembers.push(member.email);
      }
    }

    let team_id;
    let isCodeUnique = false;
    while (!isCodeUnique) {
      team_id = generateTeamCode();
      const existingProject = await Project.findOne({ team_id });
      if (!existingProject) {
        isCodeUnique = true;
      }
    }

    const newProject = new Project({
      name,
      description,
      leader_email: leader.email,
      team_members: existingTeamMembers,
      team_id: team_id,
    });

    await newProject.save();

    leader.createdProjects.push(newProject._id);
    await leader.save();

    if (existingTeamMembers.length > 0) {
      for (const memberEmail of existingTeamMembers) {
        const member = await User.findOne({ email: memberEmail });
        member.collaboratedProjects.push(newProject._id);
        await member.save();
      }
    }

    res
      .status(201)
      .json({
        message: "Project created successfully",
        project: newProject,
        team_id,
      });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/join/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { member_email } = req.body;

    const project = await Project.findOne({ team_id: teamId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const member = await User.findOne({ email: member_email });
    if (!member) {
      return res.status(400).json({ message: "User not found" });
    }

    project.team_members.push(member.email);
    await project.save();

    member.collaboratedProjects.push(project._id);
    await member.save();

    res.json({ message: "Team member added successfully", project });
  } catch (error) {
    console.error("Error adding team member:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/collaborated/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const collaboratedProjectIds = user.collaboratedProjects;
    const collaboratedProjects = await Project.find({
      _id: { $in: collaboratedProjectIds },
    }).select("name description");

    res.json(collaboratedProjects);
  } catch (error) {
    console.error("Error fetching collaborated projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/personal/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const personalProjectIds = user.createdProjects;
    const personalProjects = await Project.find({
      _id: { $in: personalProjectIds },
    }).select("name description");

    res.json(personalProjects);
  } catch (error) {
    console.error("Error fetching personal projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
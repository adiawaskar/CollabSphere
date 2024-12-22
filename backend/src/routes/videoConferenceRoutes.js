import express from "express";
import { VideoConference } from "../models/videoConference.model.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const generateUniqueSessionId = () => {
  return uuidv4();
};

router.post("/start", async (req, res) => {
  try {
    const { projectId, participants } = req.body;
    const sessionId = generateUniqueSessionId();

    const newConference = new VideoConference({
      sessionId,
      projectId,
      participants,
    });

    await newConference.save();
    res.status(201).json({ sessionId, conference: newConference });
  } catch (error) {
    console.error("Error creating conference:", error);
    res.status(500).json({ message: "Failed to create conference session" });
  }
});

router.get("/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const conference = await VideoConference.findOne({ sessionId });
    
    if (!conference) {
      return res.status(404).json({ message: "Conference session not found" });
    }
    
    res.json(conference);
  } catch (error) {
    console.error("Error fetching conference:", error);
    res.status(500).json({ message: "Failed to fetch conference details" });
  }
});

router.put("/:sessionId/join", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participant } = req.body;

    const conference = await VideoConference.findOne({ sessionId });
    if (!conference) {
      return res.status(404).json({ message: "Conference session not found" });
    }

    if (!conference.participants.includes(participant)) {
      conference.participants.push(participant);
      await conference.save();
    }

    res.json(conference);
  } catch (error) {
    console.error("Error joining conference:", error);
    res.status(500).json({ message: "Failed to join conference" });
  }
});

router.delete("/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    await VideoConference.deleteOne({ sessionId });
    res.status(204).send();
  } catch (error) {
    console.error("Error ending conference:", error);
    res.status(500).json({ message: "Failed to end conference" });
  }
});

export default router; 
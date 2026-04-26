import express from "express";
import { generateAiResponse } from "../controllers/aiController.js";
import { protectRoute } from "../middleware/auth.js";

const aiRouter = express.Router();

aiRouter.post("/chat", protectRoute, generateAiResponse);

export default aiRouter;

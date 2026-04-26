import Message from "../models/Message.js";
import { runAiAssistant } from "../lib/aiService.js";

const supportedTasks = ["smart-reply", "summarize", "rewrite", "translate"];

export const generateAiResponse = async (req, res) => {
  try {
    const { selectedUserId, task = "smart-reply", draft = "", targetLanguage = "English" } = req.body;
    const currentUserId = req.user._id.toString();

    if (!selectedUserId) {
      return res.json({ success: false, message: "selectedUserId is required" });
    }

    if (!supportedTasks.includes(task)) {
      return res.json({ success: false, message: "Unsupported AI task" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: currentUserId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    const enrichedMessages = messages
      .reverse()
      .map((message) => ({ ...message, currentUserId }));

    const ai = await runAiAssistant({
      task,
      draft,
      targetLanguage,
      messages: enrichedMessages,
    });

    res.json({ success: true, ...ai });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

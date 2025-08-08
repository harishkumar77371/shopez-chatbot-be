import type { Request, Response } from "express";
import { getResponseFromLangchain } from "../services/langchainService.js";
import { saveSession } from "../utils/sessionManager.js";

export const handleChat = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "Missing message or sessionId" });
  }

  try {
    const langchainRes = await getResponseFromLangchain(message, sessionId);
    await saveSession(sessionId, message, langchainRes.results[0]?.text || "");
    res.json(langchainRes);
  } catch (err) {
    console.error("Langchain error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

import mongoose, { Schema, Document, Model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";

mongoose.connect(uri, { dbName: process.env.MONGODB_DB || "shopez" })
  .then(() => console.log("Connected to MongoDB Atlas via Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

export interface MessageHistory {
  user: string;
  bot: string;
  timestamp: Date;
}

export interface SessionDocument extends Document {
  sessionId: string;
  createdAt: Date;
  history: MessageHistory[];
}

const MessageHistorySchema = new Schema<MessageHistory>({
  user: { type: String, required: true },
  bot: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

const SessionSchema = new Schema<SessionDocument>({
  sessionId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  history: { type: [MessageHistorySchema], default: [] }
});

const SessionModel: Model<SessionDocument> = mongoose.model("Session", SessionSchema);

export const saveSession = async (
  sessionId: string,
  userMessage: string,
  botResponse: string
) => {
  const timestamp = new Date();
  const message: MessageHistory = { user: userMessage, bot: botResponse, timestamp };

  await SessionModel.updateOne(
    { sessionId },
    {
      $push: { history: message },
      $setOnInsert: { sessionId, createdAt: timestamp }
    },
    { upsert: true }
  );
};

export const getSessionHistory = async (sessionId: string) => {
  const session = await SessionModel.findOne({ sessionId });
  return session?.history || [];
};
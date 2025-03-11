import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    sessionid: { type: Number, required: true },
    username: { type: String, required: true },
    sessionname: { type: String, required: true },
    interactions: [
      {
        prompt: { type: String, required: true },
        reply: { type: String, required: true },
      },
    ],
  },
  { versionKey: false }
);

const History = mongoose.model("History", historySchema);
export default History;

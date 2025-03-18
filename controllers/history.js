import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  sessionid: {
    type: Number,
    required: true,
    unique: true, // Ensure no duplicate session IDs
  },
  username: {
    type: String,
    required: true, // Each session belongs to a user
  },
  sessionname: {
    type: String,
    required: true, // A descriptive name for the session
  },
  interactions: [
    {
      prompt: { type: String }, // User's message
      reply: { type: String },  // Bot's reply
    },
  ],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

export default mongoose.model("History", historySchema);

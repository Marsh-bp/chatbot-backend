import History from "../models/history.js";
import chatbot from "./chatbot.js";

const generateSessionName = (prompt) => {
  const words = prompt.split(" ");
  const sessionName = words.slice(0, 5).join(" ");
  return sessionName.length > 0 ? sessionName : "New Session";
};

const chatinteract = async (req, res) => {
  const { sessionid, username, prompt } = req.body;
  console.log(req.body);
  try {
    const reply = await chatbot(prompt);
    let session;
    if (sessionid) {
      session = await History.findOne({ sessionid, username });
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      session.interactions.push({ prompt, reply });
      await session.save();
    } else {
      const lastSession = await History.findOne({ username })
        .sort({ sessionid: -1 })
        .limit(1);
      const newSessionId = lastSession ? lastSession.sessionid + 1 : 1;

      const sessionname = generateSessionName(prompt);

      session = new History({
        sessionid: newSessionId,
        username,
        sessionname,
        interactions: [{ prompt, reply }],
      });

      await session.save();
    }
    res.status(200).json({
      message: "Interaction added",
      reply,
      sessionid: session.sessionid,
      sessionname: session.sessionname,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error handling interaction",
      error: err.message,
    });
  }
};

export default chatinteract;

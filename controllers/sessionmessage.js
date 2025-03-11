import History from "../models/history.js";
const sessionmessage = async (req, res) => {
  const { sessionid, username } = req.body;

  try {
    const session = await History.findOne({ sessionid, username });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching session", error: err.message });
  }
};
export default sessionmessage;

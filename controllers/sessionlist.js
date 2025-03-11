import History from "../models/history.js";
const sessionlist = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  try {
    const sessions = await History.find(
      { username },
      "sessionid sessionname interactions username"
    );
    console.log(sessions);
    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for this username" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching sessions", error: err.message });
  }
};
export default sessionlist;

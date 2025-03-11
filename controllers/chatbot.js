import { GoogleGenerativeAI } from "@google/generative-ai";

const chatbot = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.API_KEY
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log("Chatbot Response: ", result.response.text());

    if (result && result.response && result.response.text) {
      return result.response.text();
    }

    console.error("Response does not have expected 'text' property.");
    return "Failed to generate a valid response.";
  } catch (error) {
    console.error("Error with chatbot API:", error);
    throw new Error("Error with the chatbot API.");
  }
};

export default chatbot;

require("dotenv").config();
;
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser"); // Import body-parser

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const corsOptions = {
  origin:['http://localhost:5173','http://localhost:5174']

}
app.use(cors(corsOptions));

app.use(bodyParser.json()); // Parse JSON bodies

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//!Generate COntent Route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to Generate content");
  }
});

// Start
app.listen(8080, () => console.log("Server is Running"));

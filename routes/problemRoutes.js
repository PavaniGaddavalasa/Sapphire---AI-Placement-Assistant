const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { topic, difficulty } = req.body;

  const prompt = `Generate a ${difficulty} level DSA problem on ${topic} with solution in Java`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    res.status(500).json("Error generating problem");
  }
});

module.exports = router;
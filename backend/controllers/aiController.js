const axios = require("axios");

const Candidate = require("../models/Candidate");

exports.aiShortlist = async (req, res) => {
  try {
    // Check API key
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(400).json({
        message: "OpenRouter API key missing",
      });
    }

    // Fetch candidates from DB
    const candidates = await Candidate.find();

    // AI Prompt
    const prompt = `
You are an AI recruiter.

Analyze these candidates for a React + Node.js Developer role.

Candidates:
${candidates
  .map(
    (c, index) => `
${index + 1}. ${c.name}
Skills: ${c.skills.join(", ")}
Experience: ${c.experience} years
Bio: ${c.bio || "No bio"}
`
  )
  .join("\n")}

Rank the best candidates and explain why they are suitable.
`;

    // OpenRouter API Request
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send AI Result
    res.json({
      success: true,
      result:
        response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "AI Shortlisting Failed",
    });
  }
};
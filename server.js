const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/improve", async (req, res) => {

    const { prompt } = req.body;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Improve this AI prompt professionally.

Prompt:
${prompt}

Return only the improved prompt.`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response received.";

        res.json({
            success: true,
            result: answer
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server Running : http://localhost:3000");
});

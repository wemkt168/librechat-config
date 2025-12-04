const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const AIMLAPI_KEY = process.env.AI_ML_API_KEY;
if (!AIMLAPI_KEY) {
  console.warn("Missing AI_ML_API_KEY env var, video proxy will not work correctly.");
}

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Video proxy is running. Use POST /video/generate to create a video.");
});

// Main endpoint for generating video
// This proxy is designed to be as "transparent" as possible:
// - It forwards the request body to AIMLAPI without changing field names.
// - This lets us follow the official AIMLAPI docs directly from Postman.
app.post("/video/generate", async (req, res) => {
  try {
    // Forward the body exactly as the client (e.g. Postman / LibreChat) sends it.
    const payload = req.body || {};

    // Debug logs: what we收到 & 转发
    console.log("[video-proxy] Incoming request body:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "https://api.aimlapi.com/v2/video/generations",
      payload,
      {
        headers: {
          Authorization: `Bearer ${AIMLAPI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("[video-proxy] AIMLAPI response status:", response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error calling AIMLAPI video API:",
      error.response?.status,
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to generate video via AIMLAPI",
      status: error.response?.status,
      detail: error.response?.data || error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Video proxy listening on port ${port}`);
});



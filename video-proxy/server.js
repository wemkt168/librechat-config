const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

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

// 健康检查
app.get("/", (req, res) => {
  res.send("Video proxy is running. Use POST /video/generate to create a video.");
});

// 生成视频的主接口
app.post("/video/generate", async (req, res) => {
  try {
    const { model, prompt, duration, resolution } = req.body || {};

    const finalModel = model || "google/veo-3.1-t2v";
    const finalPrompt = prompt || "A short demo video.";
    const finalDuration = duration || 5;
    const finalResolution = resolution || "720p";

    const response = await axios.post(
      "https://api.aimlapi.com/v2/video/generations",
      {
        model: finalModel,
        input: finalPrompt,
        duration: finalDuration,
        resolution: finalResolution
      },
      {
        headers: {
          Authorization: `Bearer ${AIMLAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

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
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Video proxy listening on port ${port}`);
});
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const AIMLAPI_KEY = process.env.AI_ML_API_KEY;
if (!AIMLAPI_KEY) {
  console.warn("Missing AI_ML_API_KEY env var, video proxy will not work correctly.");
}

app.use(express.json());

// 健康检查
app.get("/", (req, res) => {
  res.send("Video proxy is running. Use POST /video/generate to create a video.");
});

// 生成视频的主接口
app.post("/video/generate", async (req, res) => {
  try {
    const { model, prompt, duration, resolution } = req.body || {};

    const finalModel = model || "google/veo-3.1-t2v";
    const finalPrompt = prompt || "A short demo video.";
    const finalDuration = duration || 5;
    const finalResolution = resolution || "720p";

    const response = await axios.post(
      "https://api.aimlapi.com/v2/video/generations",
      {
        model: finalModel,
        input: finalPrompt,
        duration: finalDuration,
        resolution: finalResolution
        // 如果 AIMLAPI 官方还要求其他字段（例如 aspect_ratio 等），后续我们再补
      },
      {
        headers: {
          Authorization: `Bearer ${AIMLAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

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
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Video proxy listening on port ${port}`);
});

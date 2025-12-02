const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const {
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_PATH,
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !GITHUB_PATH) {
  console.warn("Missing required GitHub env vars. Please set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_PATH.");
}

app.get("/config", async (req, res) => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    // 直接拿 raw 內容（因為 Accept 設成 raw）
    const yamlText = typeof response.data === "string"
      ? response.data
      : Buffer.from(response.data.content, "base64").toString("utf8");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(yamlText);
  } catch (error) {
    console.error("Error fetching config from GitHub:", error.response?.status, error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch config from GitHub",
      status: error.response?.status,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy config service is running. Use /config to get the librechat.yaml.");
});

app.listen(port, () => {
  console.log(`Proxy config service listening on port ${port}`);
});

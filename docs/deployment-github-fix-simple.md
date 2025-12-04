# 修复 GitHub 仓库中的 video-proxy 代码 - 简单指令

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成修复并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我修复 GitHub 仓库 wemkt168/librechat-config 中 video-proxy/ 目录的代码错误。

【问题】
当前 video-proxy/server.js 文件有 191 行，包含大量重复内容，导致语法错误。
需要完全替换为正确的代码（65 行）。

【任务】
1. 完全替换 video-proxy/server.js 文件内容（使用下面提供的正确代码）
2. 完全替换 video-proxy/package.json 文件内容（使用下面提供的正确配置）
3. 验证修复后提交

【正确的 server.js 文件内容（65 行，直接替换）】

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

【正确的 package.json 文件内容（直接替换）】

{
  "name": "video-proxy",
  "version": "1.0.0",
  "description": "Proxy service for AIMLAPI /v2/video/generations",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "dotenv": "^16.4.5",
    "express": "^4.21.1"
  }
}

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 完全替换 video-proxy/server.js 文件内容（使用上面提供的代码，确保只有 65 行）
3. 完全替换 video-proxy/package.json 文件内容（使用上面提供的配置）
4. 执行语法检查：node --check video-proxy/server.js（应该通过）
5. 验证文件行数：wc -l video-proxy/server.js（应该是 65 行）
6. 执行 git add video-proxy/server.js video-proxy/package.json
7. 执行 git commit -m "fix: replace duplicate code in video-proxy/server.js with correct 65-line version"
8. 执行 git push
9. 验证修复结果

【验证要求】
修复后必须确认：
- ✅ server.js 文件行数：65 行（不是 191 行）
- ✅ 语法检查：node --check 通过（没有错误）
- ✅ package.json：name 是 "video-proxy"，依赖版本正确
- ✅ 文件已提交到 GitHub

【反馈要求】
请完成后反馈：
1. ✅ 修复后的 server.js 行数（应该是 65）
2. ✅ 语法检查结果（应该显示成功/通过）
3. ✅ package.json 内容确认（name 和版本）
4. ✅ Git commit 信息（commit hash 和 message）
5. ⚠️ 如有任何问题，请详细说明
```

---

## ✅ 这个指令的特点

- **简单直接**：直接提供正确代码，让 GitHub Copilot 替换
- **明确要求**：完全替换，不要修改或合并
- **验证步骤**：修复后必须验证行数和语法

---

**最后更新**：2025-12-05 01:08


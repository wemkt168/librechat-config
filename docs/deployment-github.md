# 部署到 GitHub - 给 GitHub Copilot 的完整指令

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我执行以下代码部署任务：

【任务描述】
将 video-proxy 服务部署到 GitHub 仓库 wemkt168/librechat-config，确保所有文件正确提交。

【代码文件清单】

1. video-proxy/server.js
```javascript
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
```

2. video-proxy/package.json
```json
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
```

3. video-proxy/README.md
```markdown
# Video Proxy for AIMLAPI

This is a small Node.js/Express service that proxies video generation
requests to AIMLAPI's `/v2/video/generations` endpoint.

## Prerequisites

- Node.js 18+ and npm installed locally.
- A valid `AI_ML_API_KEY` from AIMLAPI.

## Install dependencies

```bash
cd video-proxy
npm install
```

## Run locally

On Windows PowerShell:

```powershell
cd video-proxy
$env:AI_ML_API_KEY="YOUR_AIMLAPI_KEY_HERE"
npm start
```

You should see:

```text
Video proxy listening on port 8080
```

## Test with Thunder Client or Postman

- Method: `POST`
- URL: `http://localhost:8080/video/generate`
- Body: JSON

```json
{
  "model": "google/veo-3.1-text-to-video",
  "prompt": "A 5-second video of a cute cat playing with a ball, cinematic, 4k.",
  "duration": 5,
  "resolution": "720p"
}
```

If everything is configured correctly, the proxy will forward this request
to AIMLAPI and return the JSON response.
```

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 创建 video-proxy/ 目录（如果不存在）
3. 创建或更新 video-proxy/server.js 文件（使用上面的完整代码）
4. 创建或更新 video-proxy/package.json 文件（使用上面的完整代码）
5. 创建或更新 video-proxy/README.md 文件（使用上面的完整代码）
6. 确认 .gitignore 文件包含 node_modules/（如果不存在则创建）
7. 执行 git add video-proxy/
8. 执行 git commit -m "feat: add video-proxy service for AIMLAPI video generation"
9. 执行 git push
10. 确认所有文件已正确提交到 GitHub

【注意事项】
- 不要提交 node_modules/ 目录（应该在 .gitignore 中）
- 不要提交 .env 文件（应该在 .gitignore 中）
- 确保所有代码文件完整，没有截断
- 确保 package.json 中的依赖版本正确

【初步测试要求】
1. 语法检查：确认 server.js 没有语法错误
2. 文件完整性检查：确认所有三个文件都已创建
3. Git 状态检查：确认 git status 显示正确的文件状态
4. 远程仓库检查：确认文件已推送到 GitHub

【反馈要求】
请完成后反馈：
1. ✅ 所有文件创建状态（列出已创建的文件）
2. ✅ Git commit 信息（commit hash 和 message）
3. ✅ GitHub 仓库链接（确认文件已上传）
4. ⚠️ 如有任何警告或问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- Git commit hash 和 message
- GitHub 仓库中 video-proxy/ 目录的文件列表
- 执行结果摘要（成功/失败）
```

---

## ✅ 完成检查清单

- [ ] GitHub 仓库中 video-proxy/ 目录存在
- [ ] GitHub 仓库中包含 server.js, package.json, README.md
- [ ] Git commit 已成功推送
- [ ] 所有文件内容完整无误

---

**最后更新**：2025-12-05 01:08


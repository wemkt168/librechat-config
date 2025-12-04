# 部署指令总览

## 📋 当前进度

- ✅ Video-Proxy 代码已完成
- ✅ 本地测试通过（服务器运行在 8080 端口）
- ⏳ 待部署到 GitHub
- ⏳ 待部署到 Zeabur

---

## 📁 独立指令文件

为了便于复制粘贴，指令已分成两个独立文件：

1. **[部署到 GitHub](deployment-github.md)** - 给 GitHub Copilot 的完整指令
2. **[部署到 Zeabur](deployment-zeabur.md)** - 给 Zeabur AI IDE 的完整指令

**使用方法**：直接打开对应的文件，全选复制整个指令块，粘贴到对应的 AI IDE 中执行。

---

## 🚀 步骤 1：部署到 GitHub

### 给 GitHub Copilot 的指令

👉 **请打开 [deployment-github.md](deployment-github.md) 文件，复制完整指令**

原指令内容（已移至独立文件）：

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

## 🚀 步骤 2：部署到 Zeabur

### 给 Zeabur AI IDE 的指令

**注意**：请先完成步骤 1（GitHub 部署），然后再执行此步骤。

👉 **请打开 [deployment-zeabur.md](deployment-zeabur.md) 文件，复制完整指令**

原指令内容（已移至独立文件）：

```text
请帮我部署以下服务：

【服务信息】
- 服务名称：video-proxy
- 仓库：wemkt168/librechat-config
- 工作目录：video-proxy
- 入口文件：server.js
- 运行环境：Node.js 18+

【部署配置】
1. 从 GitHub 仓库 wemkt168/librechat-config 的 video-proxy/ 目录拉取代码
2. 使用 package.json 作为依赖配置
3. 安装命令：npm install
4. 启动命令：npm start
5. 容器端口：8080
6. 环境变量：
   - AI_ML_API_KEY=[从 LibreChat UI 服务复制相同的值]
   - PORT=8080（可选，默认 8080）

【域名配置】
- 自动生成域名：video-proxy-[随机字符串].zeabur.app
- 或者使用自定义域名（如果已配置）

【注意事项】
- 确保环境变量 AI_ML_API_KEY 已正确设置
- 确保端口映射为 8080
- 确保工作目录设置为 video-proxy（不是根目录）
- 如果已有 librechat-config 项目，请在此项目下创建新服务

【初步测试要求】
部署完成后，请执行以下测试：
1. 健康检查测试：GET https://[域名]/
   - 预期响应：200 OK，内容包含 "Video proxy is running"
2. 服务状态检查：确认服务状态为 Running
3. 日志检查：查看服务日志，确认没有错误信息

【反馈要求】
请完成后反馈：
1. ✅ 服务部署状态（Running / Failed）
2. ✅ 域名信息（完整 URL）
3. ✅ 健康检查测试结果（HTTP 状态码和响应内容）
4. ✅ 服务日志（前 10 行，确认启动成功）
5. ⚠️ 如有任何错误或警告，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- 服务的完整 URL（例如：https://video-proxy-xxx.zeabur.app）
- 健康检查响应（GET / 的响应内容）
- 服务状态信息（Running / Failed）
- 环境变量配置确认（AI_ML_API_KEY 已设置）
```

---

## 📝 执行顺序

1. **先执行步骤 1**：部署到 GitHub
   - 使用 GitHub Copilot 执行
   - 等待确认所有文件已提交

2. **再执行步骤 2**：部署到 Zeabur
   - 使用 Zeabur AI IDE 执行
   - 等待确认服务已部署并运行

3. **最后测试**：验证功能
   - 测试健康检查接口
   - 测试视频生成接口

---

## ✅ 完成检查清单

- [ ] GitHub 仓库中 video-proxy/ 目录存在
- [ ] GitHub 仓库中包含 server.js, package.json, README.md
- [ ] Zeabur 服务已部署并运行
- [ ] Zeabur 服务域名可访问
- [ ] 健康检查接口返回正确响应
- [ ] 环境变量 AI_ML_API_KEY 已配置

---

**最后更新**：2025-12-05 01:08


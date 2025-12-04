# 修复 GitHub 仓库中的 video-proxy 代码错误

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成修复并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我修复 GitHub 仓库 wemkt168/librechat-config 中 video-proxy/ 目录的代码错误。

【问题描述】
检查发现 video-proxy/server.js 文件有严重问题：
1. 文件有 191 行（应该是 65 行）
2. 有大量重复内容（代码被重复多次）
3. 语法错误：Identifier 'express' has already been declared
4. package.json 的 name 和依赖版本与标准不一致

【修复任务】
1. 清理 server.js，删除所有重复内容，只保留一份完整正确的代码
2. 修正 package.json，使其与标准一致
3. 确保代码可以正常运行

【正确的代码内容】

1. video-proxy/server.js（完整正确的代码，65 行）
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

2. video-proxy/package.json（正确的配置）
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

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 读取 video-proxy/server.js 文件，确认当前内容
3. **完全替换** video-proxy/server.js 文件内容（使用上面提供的正确代码，确保只有 65 行，没有重复）
4. **完全替换** video-proxy/package.json 文件内容（使用上面提供的正确配置）
5. 执行语法检查：node --check video-proxy/server.js
6. 验证 package.json：node -e "JSON.parse(require('fs').readFileSync('video-proxy/package.json', 'utf8'))"
7. 确认文件行数：server.js 应该是 65 行（不是 191 行）
8. 执行 git add video-proxy/server.js video-proxy/package.json
9. 执行 git commit -m "fix: clean up video-proxy server.js duplicate code and update package.json"
10. 执行 git push
11. 再次验证修复后的代码

【重要注意事项】
- ⚠️ **必须完全替换** server.js 文件，删除所有重复内容
- ⚠️ **确保文件只有 65 行**，不要有任何重复的代码
- ⚠️ **确保语法正确**，修复后必须通过 node --check 检查
- ⚠️ **package.json 的 name 必须改为 "video-proxy"**（不是 "aimlapi-video-proxy"）
- ⚠️ **依赖版本必须更新为标准版本**

【验证要求】
修复完成后，请验证：
1. ✅ server.js 文件行数：应该是 65 行（不是 191 行）
2. ✅ 语法检查：node --check 应该通过（没有错误）
3. ✅ 文件内容：没有重复的 require 语句
4. ✅ package.json：name 是 "video-proxy"，依赖版本正确
5. ✅ 文件已提交到 GitHub

【反馈要求】
请完成后反馈：
1. ✅ 修复前的问题确认（server.js 行数、重复内容位置）
2. ✅ 修复后的文件状态：
   - server.js 行数（应该是 65 行）
   - 语法检查结果（应该通过）
   - package.json 内容确认
3. ✅ Git commit 信息（commit hash 和 message）
4. ✅ 修复验证结果（所有检查应该通过）
5. ⚠️ 如有任何问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- 修复后的 server.js 行数（应该是 65）
- 语法检查结果（应该显示成功）
- package.json 的完整内容（确认 name 和版本正确）
- Git commit hash 和 message
- 修复验证结果（所有检查通过）
```

---

## ⚠️ 重要提醒

这次修复会：
1. **完全替换** server.js（删除所有重复内容）
2. **修正** package.json（name 和依赖版本）
3. **确保** 代码可以正常运行

修复后，代码应该：
- server.js：65 行，无重复，语法正确
- package.json：name 为 "video-proxy"，依赖版本正确

---

**最后更新**：2025-12-05 01:08


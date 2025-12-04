# 检查 GitHub 仓库中的 video-proxy 代码

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成检查并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我检查 GitHub 仓库 wemkt168/librechat-config 中 video-proxy/ 目录的代码是否完整、可运行，并与标准代码对比。

【检查任务】
检查 video-proxy/ 目录下的所有文件，确认：
1. 文件是否完整（没有截断）
2. 代码语法是否正确
3. 依赖配置是否正确
4. 文件内容是否符合标准

【需要检查的文件】

1. video-proxy/server.js
标准代码应该是：
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
标准代码应该是：
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
应该包含基本的使用说明和测试方法。

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 检查 video-proxy/ 目录是否存在
3. 读取 video-proxy/server.js 文件内容
4. 读取 video-proxy/package.json 文件内容
5. 读取 video-proxy/README.md 文件内容（如果存在）
6. 对比文件内容是否与标准代码一致
7. 执行语法检查：node --check video-proxy/server.js
8. 检查 package.json 格式是否正确：node -e "JSON.parse(require('fs').readFileSync('video-proxy/package.json', 'utf8'))"
9. 列出 video-proxy/ 目录下的所有文件

【检查要求】
1. ✅ 文件完整性检查：
   - server.js 是否完整（应该有 65 行左右）
   - package.json 是否完整（应该有所有必需的字段）
   - README.md 是否存在

2. ✅ 代码正确性检查：
   - server.js 语法是否正确（使用 node --check）
   - package.json JSON 格式是否正确
   - 依赖版本是否正确

3. ✅ 内容一致性检查：
   - server.js 内容是否与标准代码一致
   - package.json 内容是否与标准代码一致
   - 是否有任何修改或缺失

4. ✅ 可运行性检查：
   - package.json 中是否有 start 脚本
   - 依赖是否完整（express, axios, dotenv）
   - 入口文件是否正确（server.js）

【反馈要求】
请完成后反馈：
1. ✅ video-proxy/ 目录文件列表（列出所有文件）
2. ✅ server.js 文件状态：
   - 文件是否存在
   - 行数（总行数）
   - 语法检查结果（通过/失败）
   - 内容是否与标准代码一致
3. ✅ package.json 文件状态：
   - 文件是否存在
   - JSON 格式是否正确
   - 内容是否与标准代码一致
   - 依赖版本是否正确
4. ✅ README.md 文件状态：
   - 文件是否存在
   - 内容是否完整
5. ⚠️ 如有任何不一致、缺失或错误，请详细说明
6. ⚠️ 如有任何警告或问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- video-proxy/ 目录的完整文件列表
- server.js 的前 10 行和后 10 行（确认文件完整）
- package.json 的完整内容
- 语法检查结果（成功/失败）
- 与标准代码的差异（如果有）
```

---

## ✅ 检查清单

- [ ] video-proxy/ 目录存在
- [ ] server.js 文件完整（65 行左右）
- [ ] package.json 文件完整且格式正确
- [ ] README.md 文件存在
- [ ] 代码语法正确
- [ ] 与标准代码一致

---

**最后更新**：2025-12-05 01:08


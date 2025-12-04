# 强制修复 video-proxy/server.js - 完全替换

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成修复并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请强制完全替换 video-proxy/server.js 文件，确保文件只有 65 行，没有任何重复或残留代码。

【问题】
当前 server.js 文件有 190 行，前 65 行是正确的，但第 66-190 行还有重复的旧代码。
需要强制删除所有内容，只保留下面提供的 65 行正确代码。

【执行方式】
必须完全替换，不要追加或合并。删除文件所有内容，然后写入下面提供的代码。

【正确的 server.js 文件内容（只有这 65 行，不要任何其他内容）】

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

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. **删除 video-proxy/server.js 文件的所有内容**
3. **写入上面提供的 65 行代码**（不要添加任何其他内容）
4. 执行验证：
   - wc -l video-proxy/server.js（必须显示 65 行）
   - node --check video-proxy/server.js（必须通过，没有错误）
5. 如果行数不是 65 行，说明替换不完整，请重新执行步骤 2-3
6. 确认只有 65 行后，执行：
   - git add video-proxy/server.js
   - git commit -m "fix: force replace server.js with correct 65-line version, remove all duplicate code"
   - git push

【验证要求】
修复后必须确认：
- ✅ server.js 文件行数：**必须是 65 行**（不是 190 行）
- ✅ 语法检查：node --check 必须通过（没有错误）
- ✅ 文件内容：只有上面提供的 65 行代码，没有任何重复

【反馈要求】
请完成后反馈：
1. ✅ 修复后的 server.js 行数（必须是 65）
2. ✅ 语法检查结果（必须显示成功/通过）
3. ✅ 确认文件只有 65 行，没有重复内容
4. ✅ Git commit 信息（commit hash 和 message）
5. ⚠️ 如果行数不是 65，请说明原因并重新执行
```

---

## 📝 给 GitHub Copilot 的回复

如果 GitHub Copilot 问"是否继续？"，请回复：

**"是的，请继续。强制完全替换 server.js 文件，删除所有内容，只保留上面提供的 65 行代码。确保文件只有 65 行，没有任何重复或残留代码。"**

或者直接使用上面的新指令文件。

---

**最后更新**：2025-12-05 01:08


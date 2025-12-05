# Video Proxy 401 错误完整诊断 - 三方比对

**日期**：2025-12-05  
**问题**：Video Proxy 服务返回 401 Unauthorized  
**服务域名**：https://video-proxy-wemkt.zeabur.app

---

## 📋 当前架构

### Zeabur 项目结构
```
Project: librechat-config
├── Service: proxy-config
│   └── 代码目录: proxy-config/
│   └── 环境变量: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_PATH, PORT
│
└── Service: video-proxy
    └── 代码目录: video-proxy/
    └── 环境变量: AI_ML_API_KEY, PORT
    └── 域名: https://video-proxy-wemkt.zeabur.app
```

---

## 🔍 代码检查（本地代码）

### video-proxy/server.js（当前版本）

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
} else {
  console.log("[video-proxy] AI_ML_API_KEY loaded, length:", AIMLAPI_KEY.length, "prefix:", AIMLAPI_KEY.substring(0, 15) + "...");
}

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Video proxy is running. Use POST /video/generate to create a video.");
});

// Main endpoint for generating video
app.post("/video/generate", async (req, res) => {
  try {
    const payload = req.body || {};
    console.log("[video-proxy] Incoming request body:", JSON.stringify(payload, null, 2));

    // Debug: Log API Key status before making request
    if (!AIMLAPI_KEY) {
      console.error("[video-proxy] ERROR: AI_ML_API_KEY is missing!");
      return res.status(500).json({
        error: "Server configuration error: AI_ML_API_KEY not set"
      });
    }

    console.log("[video-proxy] Making request to AIMLAPI with API Key (length:", AIMLAPI_KEY.length, ")");

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

**关键点**：
- ✅ 使用 `process.env.AI_ML_API_KEY` 读取环境变量
- ✅ 使用 `Authorization: Bearer ${AIMLAPI_KEY}` 认证
- ✅ 端点：`https://api.aimlapi.com/v2/video/generations`
- ✅ 有调试日志输出

---

## 🧪 给 Postman AI 的完整测试指令

```text
请帮我完整测试 video-proxy 服务，并进行详细诊断。

【服务信息】
- 服务域名：https://video-proxy-wemkt.zeabur.app
- 健康检查：GET https://video-proxy-wemkt.zeabur.app/
- 视频生成：POST https://video-proxy-wemkt.zeabur.app/video/generate

【测试 1：健康检查】
1. Method: GET
2. URL: https://video-proxy-wemkt.zeabur.app/
3. 预期响应：
   - Status: 200 OK
   - Body: "Video proxy is running. Use POST /video/generate to create a video."

【测试 2：视频生成接口】
1. Method: POST
2. URL: https://video-proxy-wemkt.zeabur.app/video/generate
3. Headers:
   - Content-Type: application/json
4. Body (raw, JSON):
{
  "model": "google/veo-3.1-text-to-video",
  "prompt": "A 5-second video of a cute cat playing with a ball, cinematic, 4k.",
  "duration": 5,
  "resolution": "720p"
}

【当前问题】
- 返回 401 Unauthorized
- 错误信息：This request requires a valid API key

【诊断要求】
1. 测试健康检查接口（确认服务运行正常）
2. 测试视频生成接口（记录完整响应）
3. 检查请求头是否正确
4. 分析 401 错误的原因

【反馈要求】
请完成后反馈：
1. ✅ 健康检查测试结果（状态码和响应）
2. ✅ 视频生成接口测试结果（状态码和完整响应内容）
3. ✅ 请求头信息（确认 Content-Type 等）
4. 🔍 401 错误分析（可能的原因）
```

---

## 🔧 给 Zeabur AI IDE 的完整诊断指令

```text
请帮我诊断 video-proxy 服务的 401 错误问题。

【服务信息】
- Project: librechat-config
- Service: video-proxy
- 域名: https://video-proxy-wemkt.zeabur.app
- 状态: Running

【问题描述】
- 健康检查正常（GET / 返回 200）
- 视频生成接口返回 401 Unauthorized
- Runtime Logs 为空（无法查看日志）

【诊断任务】

1. 检查环境变量配置：
   - 进入 Service video-proxy → Variable
   - 确认以下环境变量存在且格式正确：
     * AI_ML_API_KEY（必需）
     * PORT（可选，默认 8080）
   - 检查环境变量格式：
     * 应该是：AI_ML_API_KEY=sk-aimlapi-xxx（没有引号，没有空格）
     * 不应该有：AI_ML_API_KEY="sk-..." 或 AI_ML_API_KEY = sk-...

2. 检查服务日志：
   - 进入 Service video-proxy → Logs → Runtime Logs
   - 查看是否有以下日志：
     * "[video-proxy] AI_ML_API_KEY loaded, length: XX, prefix: sk-aimlapi-xxx..."
     * "Video proxy listening on port 8080"
     * "[video-proxy] Incoming request body: ..."
     * "[video-proxy] Making request to AIMLAPI with API Key (length: XX)"
   - 如果日志为空，尝试：
     * 重启服务
     * 发送测试请求后立即查看日志

3. 检查服务配置：
   - 进入 Service video-proxy → Settings
   - 确认：
     * Root Directory: video-proxy
     * Build Type: Node.js
     * Port: 8080

4. 验证 API Key 有效性：
   - 确认 AI_ML_API_KEY 的值是否与 librechat 项目的 LibreChat UI 服务中的相同
   - 确认 API Key 是否在 AIMLAPI 平台有效

【如果无法通过 API 操作】
请提供详细的手动操作步骤：
1. 如何检查环境变量
2. 如何查看服务日志
3. 如何重启服务
4. 如何验证 API Key

【反馈要求】
请完成后反馈：
1. ✅ 环境变量配置状态（是否存在，格式是否正确）
2. ✅ 服务日志内容（特别是关于 AI_ML_API_KEY 的日志）
3. ✅ 服务配置状态（Root Directory, Build Type, Port）
4. 🔍 401 错误的可能原因分析
5. 💡 解决方案建议
```

---

## 🔄 三方比对

### 比对 1：代码 vs 架构文档

| 项目 | 代码（server.js） | 架构文档 | 状态 |
|------|------------------|----------|------|
| 端点 | `/v2/video/generations` | `/v2/video/generations` | ✅ 一致 |
| 认证方式 | `Bearer ${AIMLAPI_KEY}` | `Bearer ${AIMLAPI_KEY}` | ✅ 一致 |
| 环境变量 | `AI_ML_API_KEY` | `AI_ML_API_KEY` | ✅ 一致 |
| 端口 | `PORT || 8080` | `8080` | ✅ 一致 |

### 比对 2：代码 vs Zeabur 配置

| 项目 | 代码 | Zeabur 配置 | 状态 |
|------|------|-------------|------|
| 工作目录 | `video-proxy/` | `video-proxy` | ✅ 一致 |
| 构建类型 | Node.js (package.json) | Node.js (zbpack.json) | ✅ 一致 |
| 环境变量 | `AI_ML_API_KEY` | `AI_ML_API_KEY` | ⚠️ 需验证值 |
| 端口 | `8080` | `8080` | ✅ 一致 |

### 比对 3：架构文档 vs Zeabur 实际状态

| 项目 | 架构文档 | Zeabur 实际 | 状态 |
|------|----------|-------------|------|
| Project | `librechat-config` | `librechat-config` | ✅ 一致 |
| Service 名 | `video-proxy` | `video-proxy` | ✅ 一致 |
| 代码目录 | `video-proxy/` | `video-proxy` | ✅ 一致 |
| 环境变量 | `AI_ML_API_KEY`, `PORT` | `AI_ML_API_KEY`, `PORT`, `PROXY_CONFIG_HOST` | ⚠️ 多了一个自动生成的变量 |

---

## 🚨 发现的问题

### 问题 1：Runtime Logs 为空
- **现象**：无法查看服务日志
- **可能原因**：
  1. 日志系统延迟
  2. 服务启动失败但没有日志输出
  3. Zeabur 日志系统问题

### 问题 2：401 错误但代码逻辑正确
- **现象**：代码逻辑正确，但返回 401
- **可能原因**：
  1. 环境变量 `AI_ML_API_KEY` 值不正确或为空
  2. 环境变量格式有问题（多余空格、引号等）
  3. 服务未重启，未读取新的环境变量
  4. API Key 本身无效或已过期

### 问题 3：zeabur.json 中有占位符
- **发现**：`zeabur.json` 中有 `"AI_ML_API_KEY": "<your-aimlapi-key>"`
- **问题**：这是占位符，不应该在配置文件中
- **影响**：可能被 Zeabur 读取，覆盖了正确的环境变量

---

## ✅ 修复方案

### 修复 1：清理 zeabur.json

`zeabur.json` 不应该包含敏感信息（API Key），应该移除：

```json
{
  "services": {
    "video-proxy": {
      "root": "video-proxy",
      "build": {
        "builder": "nodejs"
      },
      "ports": [
        {
          "port": 8080,
          "type": "http"
        }
      ],
      "env": {
        "PORT": "8080"
      }
    }
  }
}
```

**注意**：移除 `"AI_ML_API_KEY": "<your-aimlapi-key>"` 这一行！

### 修复 2：验证环境变量

在 Zeabur 控制台：
1. 进入 Service `video-proxy` → Variable → Edit Raw Variables
2. 确认格式：
   ```
   PORT=8080
   AI_ML_API_KEY=sk-aimlapi-xxxxxxxxxxxxx
   ```
3. 保存后重启服务

### 修复 3：使用 Command 面板直接测试

如果 Runtime Logs 一直为空，使用 Command 面板：
1. 进入 Service `video-proxy` → Command
2. 执行：
   ```bash
   echo $AI_ML_API_KEY
   ```
3. 检查是否输出 API Key 值

---

## 📝 执行清单

- [ ] 修复 `zeabur.json`，移除 `AI_ML_API_KEY` 占位符
- [ ] 验证 Zeabur 环境变量格式正确
- [ ] 重启服务
- [ ] 使用 Postman 测试
- [ ] 查看 Runtime Logs 或使用 Command 面板验证环境变量
- [ ] 如果还是 401，检查 API Key 是否有效

---

**最后更新**：2025-12-05


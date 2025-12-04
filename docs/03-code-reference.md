# 代码参考

## Video-Proxy 服务

### 文件位置
- `video-proxy/server.js`：主服务文件
- `video-proxy/package.json`：依赖配置
- `video-proxy/README.md`：使用文档

### 关键代码片段

#### 环境变量读取
```javascript
const AIMLAPI_KEY = process.env.AI_ML_API_KEY;
const port = process.env.PORT || 8080;
```

#### 健康检查接口
```javascript
app.get("/", (req, res) => {
  res.send("Video proxy is running. Use POST /video/generate to create a video.");
});
```

#### 视频生成接口
```javascript
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
    // 错误处理...
  }
});
```

### 部署信息
- **GitHub 仓库**：wemkt168/librechat-config
- **工作目录**：video-proxy/
- **Zeabur Project**：librechat-config
- **域名**：video-proxy-wemkt.zeabur.app（待确认）
- **端口**：8080

### 依赖包
```json
{
  "dependencies": {
    "axios": "^1.7.0",
    "dotenv": "^16.4.0",
    "express": "^4.19.0"
  }
}
```

---

## LibreChat 配置

### 文件位置
- `librechat.yaml`：LibreChat 配置文件

### 关键配置

#### AIMLAPI 端点配置
```yaml
endpoints:
  custom:
    - name: "AIMLAPI"
      apiKey: "${AI_ML_API_KEY}"
      baseURL: "https://api.aimlapi.com/v1"
      models:
        default:
          - "openai/gpt-5-chat-latest"
          # ... 其他模型
```

#### 模型规格配置
```yaml
modelSpecs:
  enforce: false
  prioritize: true
  list:
    - name: "Chat · GPT-5 Chat Latest · OpenAI"
      label: "[聊天] GPT-5 Chat Latest - 文字理解強，適合多種聊天任務"
      preset:
        endpoint: "AIMLAPI"
        model: "openai/gpt-5-chat-latest"
```

### 配置路径
- **GitHub Raw URL**：https://raw.githubusercontent.com/wemkt168/librechat-config/main/librechat.yaml
- **环境变量**：`CONFIG_PATH`（在 LibreChat UI 服务中设置）

---

## AIMLAPI 模型 ID 参考

### Chat 模型（已验证）
- `openai/gpt-5-chat-latest`
- `openai/o3-2025-04-16`
- `openai/gpt-4.1-2025-04-14`
- `anthropic/claude-opus-4.5`
- `anthropic/claude-opus-4.1`
- `anthropic/claude-sonnet-4`
- `google/gemini-2.5-pro`
- `google/gemini-2.5-flash`
- `google/gemini-3-pro-preview`
- `x-ai/grok-4`
- `x-ai/grok-4-fast-non-reasoning`
- `perplexity/sonar-pro`
- `perplexity/sonar`

### Video 模型（已验证，使用 `/v2/video/generations`）
- `google/veo-3.1-t2v`：文本转视频
- `google/veo-3.1-i2v`：图片转视频
- `google/veo-3.1-first-last-image-to-video`：首尾图转视频
- `google/veo-3.1-reference-to-video`：参考图转视频
- `google/veo-3.1-t2v-fast`：快速文本转视频
- `klingai/v2.1-master-text-to-video`：Kling 文本转视频
- `klingai/v2.1-master-image-to-video`：Kling 图片转视频
- `klingai/v2.5-turbo-pro-text-to-video`：Kling 快速文本转视频
- `bytedance/seedance-1-0-pro-t2v`：字节跳动文本转视频
- `bytedance/seedance-1-0-pro-i2v`：字节跳动图片转视频

### Image 模型（部分已验证）
- `google/imagen-4.0-ultra-generate-001`
- `google/imagen-4.0-generate-001`
- `flux/kontext-pro/text-to-image`
- `bytedance/seedream-v4-text-to-image`
- 更多模型见 AIMLAPI `/v1/models` 响应

### 重要发现
- **Video 模型**：使用 `/v2/video/generations` 端点，不能通过 LibreChat 配置系统直接使用
- **Chat 模型**：使用 `/v1/chat/completions` 端点，可以通过 LibreChat 配置
- **Image 模型**：使用 `/v1/images/generations` 端点，可以通过 LibreChat 配置

---

## API 端点参考

### AIMLAPI
- **基础 URL**：https://api.aimlapi.com
- **Chat 端点**：`/v1/chat/completions`
- **Image 端点**：`/v1/images/generations`
- **Video 端点**：`/v2/video/generations`
- **模型列表**：`/v1/models`

### Video-Proxy
- **健康检查**：`GET /`
- **视频生成**：`POST /video/generate`
- **请求体示例**：
  ```json
  {
    "model": "google/veo-3.1-t2v",
    "prompt": "一段 3 秒钟的夕阳海边短片",
    "duration": 3,
    "resolution": "720p"
  }
  ```

---

## 环境变量参考

### LibreChat UI
```bash
AI_ML_API_KEY=your_aimlapi_key
CONFIG_PATH=https://raw.githubusercontent.com/wemkt168/librechat-config/main/librechat.yaml
```

### Video-Proxy
```bash
AI_ML_API_KEY=your_aimlapi_key
PORT=8080
```

---

**最后更新**：2025-12-05 01:08







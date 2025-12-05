# Video-Proxy 401 错误 - 当前问题追踪

**日期**：2025-12-05  
**状态**：进行中  
**优先级**：高

---

## 🚨 问题描述

### 现象
- **服务状态**：Running ✅
- **健康检查**：正常 ✅（GET `/` 返回 200，内容："Video proxy is running..."）
- **视频生成接口**：返回 401 Unauthorized ❌
- **Runtime Logs**：为空（无法查看日志）

### 错误信息
```json
{
  "error": "Failed to generate video via AIMLAPI",
  "status": 401,
  "detail": {
    "requestId": "hRNOI9BMsuLeZ76UNdGhS",
    "statusCode": 401,
    "timestamp": "2025-12-05T13:46:30.569Z",
    "path": "/v2/video/generations",
    "message": "This request requires a valid API key. You can create a new API key on the Billing page: https://aimlapi.com/app/keys"
  }
}
```

---

## 🔍 已完成的诊断

### 代码检查 ✅
- **代码逻辑**：正确
  - 端点：`https://api.aimlapi.com/v2/video/generations` ✅
  - 认证：`Authorization: Bearer ${AIMLAPI_KEY}` ✅
  - 环境变量读取：`process.env.AI_ML_API_KEY` ✅
  - 调试日志：已添加 ✅

### 配置检查 ✅
- **zeabur.json**：已修复（移除占位符）
- **环境变量配置**：已确认（PORT=8080, AI_ML_API_KEY）
- **服务配置**：正确（Root Directory: video-proxy, Build Type: Node.js）

### 架构比对 ✅
- **代码 vs 架构文档**：一致 ✅
- **代码 vs Zeabur 配置**：一致 ✅
- **架构文档 vs Zeabur 实际**：一致 ✅

---

## ⏳ 待执行的诊断步骤

### 步骤 1：验证环境变量（最重要）

在 Zeabur 控制台：
1. 进入 Service `video-proxy` → Command
2. 执行命令：`echo $AI_ML_API_KEY`
3. **预期结果**：
   - 如果输出：`sk-aimlapi-xxx...` → 环境变量已读取 ✅
   - 如果输出：空 → 环境变量未读取 ❌

### 步骤 2：重启服务并查看日志

1. 在 Overview 页面点击 "Restart"
2. 等待重启完成（1-2 分钟）
3. 进入 Logs → Runtime Logs
4. **查看是否有以下日志**：
   - `[video-proxy] AI_ML_API_KEY loaded, length: XX, prefix: sk-aimlapi-xxx...`
   - `Video proxy listening on port 8080`

### 步骤 3：如果日志还是为空

使用 Command 面板：
1. 执行：`node server.js`
2. 查看启动日志
3. 检查是否有 `Missing AI_ML_API_KEY` 警告

---

## 💡 可能的原因和解决方案

### 原因 1：环境变量值不正确
- **症状**：Command 面板 `echo $AI_ML_API_KEY` 输出为空或错误值
- **解决**：
  1. 进入 Variable → Edit Raw Variables
  2. 确认格式：`AI_ML_API_KEY=sk-aimlapi-xxx`（没有引号，没有空格）
  3. 保存并重启服务

### 原因 2：API Key 无效或已过期
- **症状**：环境变量已读取，但 AIMLAPI 返回 401
- **解决**：
  1. 访问 https://aimlapi.com/app/keys
  2. 确认 API Key 是否有效
  3. 如果无效，创建新的 API Key
  4. 更新 Zeabur 环境变量

### 原因 3：服务未重启
- **症状**：修改环境变量后未重启
- **解决**：重启服务

---

## 📋 诊断指令

### 给 Zeabur AI IDE 的指令

```text
请帮我诊断 video-proxy 服务的 401 错误。

【服务信息】
- Project: librechat-config
- Service: video-proxy
- 域名: https://video-proxy-wemkt.zeabur.app

【诊断任务】
1. 使用 Command 面板执行：echo $AI_ML_API_KEY
   - 检查是否输出 API Key 值
2. 重启服务并查看 Runtime Logs
   - 查看是否有 "[video-proxy] AI_ML_API_KEY loaded" 日志
3. 如果日志为空，使用 Command 面板执行：node server.js
   - 查看启动日志

【反馈要求】
请反馈：
1. echo $AI_ML_API_KEY 的输出结果
2. Runtime Logs 的内容（特别是关于 AI_ML_API_KEY 的日志）
3. 401 错误的可能原因分析
```

---

## 📝 相关文档

- 完整诊断指南：`docs/diagnose-video-proxy-401-complete.md`
- 项目完整信息：`docs/10-project-complete-info.md`
- 项目宪章：`docs/07-project-charter.md`

---

**最后更新**：2025-12-05


# Video-Proxy 401 错误 - 完整诊断报告

**日期**：2025-12-05  
**状态**：诊断完成，等待修复  
**优先级**：高

---

## 📊 测试结果总结

### ✅ 健康检查（正常）
- **URL**：`GET https://video-proxy-wemkt.zeabur.app/`
- **状态码**：200 OK
- **响应**：`"Video proxy is running. Use POST /video/generate to create a video."`
- **结论**：服务运行正常 ✅

### ❌ 视频生成接口（失败）
- **URL**：`POST https://video-proxy-wemkt.zeabur.app/video/generate`
- **状态码**：401 Unauthorized
- **错误信息**：
  ```json
  {
    "error": "Failed to generate video via AIMLAPI",
    "status": 401,
    "detail": {
      "message": "This request requires a valid API key. You can create a new API key on the Billing page: https://aimlapi.com/app/keys"
    }
  }
  ```
- **结论**：API Key 无效或未正确加载 ❌

---

## 🔍 问题分析

### 根本原因
**AIMLAPI 返回 401 错误，说明 API Key 无效或未正确传递**

### 可能原因（按概率排序）

#### 1. 环境变量未正确加载（概率：60%）
**症状**：
- Runtime Logs 为空（无法查看日志）
- 健康检查正常（GET `/` 不需要认证）
- 视频生成接口返回 401（需要 API Key）

**可能原因**：
- 环境变量格式错误（有引号、空格等）
- 环境变量设置后未重启服务
- 服务启动时未读取到环境变量

#### 2. API Key 格式错误或无效（概率：25%）
**可能原因**：
- API Key 复制时包含了隐藏字符
- API Key 在 AIMLAPI 平台被撤销或过期
- API Key 权限不足（没有视频生成权限）

#### 3. 代码中 API Key 读取逻辑错误（概率：10%）
**可能原因**：
- 环境变量名称不一致
- 代码未正确处理 undefined

#### 4. 请求头格式错误（概率：5%）
**可能原因**：
- Authorization 头格式不正确（缺少 Bearer 前缀）

---

## 🛠️ 修复方案（按优先级）

### 方案 1：重置环境变量（最优先）⭐

#### 步骤 1：检查当前环境变量
1. 进入 Zeabur Dashboard
2. 选择项目：`librechat-config`
3. 选择服务：`video-proxy`
4. 点击 **Variables** 标签
5. 点击 **Edit Raw Variables**

#### 步骤 2：确认格式正确
**正确格式**：
```
AI_ML_API_KEY=sk-aimlapi-xxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=8080
```

**常见错误**：
- ❌ `AI_ML_API_KEY="sk-aimlapi-xxx"` （有引号）
- ❌ `AI_ML_API_KEY = sk-aimlapi-xxx` （有空格）
- ❌ `AI_ML_API_KEY=sk-aimlapi-xxx ` （末尾有空格）
- ✅ `AI_ML_API_KEY=sk-aimlapi-xxx` （正确格式）

#### 步骤 3：重置环境变量
1. 删除所有现有变量
2. 重新添加（确保格式正确）：
   ```
   AI_ML_API_KEY=sk-aimlapi-xxxxxxxxxx
   PORT=8080
   ```
3. 点击 **Save**

#### 步骤 4：重启服务
1. 进入 **Overview** 页面
2. 点击右上角的 **⋮** (三个点) → **Restart**
3. 等待服务重启完成（状态变为 Running）

#### 步骤 5：验证环境变量
1. 进入 **Command** 标签
2. 执行命令：`echo $AI_ML_API_KEY`
3. **预期输出**：
   - ✅ 应该显示完整的 API Key（`sk-aimlapi-xxx...`）
   - ❌ 如果输出为空，说明环境变量未正确加载

---

### 方案 2：验证 API Key 有效性

#### 步骤 1：在 AIMLAPI 平台验证
1. 访问：https://aimlapi.com/app/keys
2. 检查 API Key 状态：
   - ✅ Active（激活）
   - ✅ 有足够的配额
   - ❌ Expired（过期）
   - ❌ Revoked（已撤销）

#### 步骤 2：使用 Command 面板测试
在 video-proxy 服务的 Command 面板执行：
```bash
curl -X POST https://api.aimlapi.com/v2/video/generations \
  -H "Authorization: Bearer $AI_ML_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "google/veo-3.1-text-to-video", "prompt": "test", "duration": 5}'
```

**预期结果**：
- ✅ 返回 200 或其他非 401 状态码 → API Key 有效
- ❌ 返回 401 → API Key 无效或格式错误

---

### 方案 3：对比正常工作的服务

如果 `librechat` 项目中的 LibreChat UI 服务使用相同 API Key 正常工作：

1. 进入 `librechat` 项目
2. 找到 **LibreChat UI** 服务
3. 查看其 **Variables** 中的 `AI_ML_API_KEY`
4. 复制完全相同的配置到 `video-proxy`
5. 对比两个服务的 **Settings** 配置
6. 确保 Root Directory、Port 等设置一致

---

### 方案 4：检查代码逻辑

检查 `video-proxy/server.js` 文件：

```javascript
// 确认环境变量名称正确
const AIMLAPI_KEY = process.env.AI_ML_API_KEY;

// 确认有错误处理
if (!AIMLAPI_KEY) {
  console.error("[video-proxy] ERROR: AI_ML_API_KEY is not set!");
  // 应该返回错误，而不是继续执行
}

// 确认请求头格式正确
headers: {
  'Authorization': `Bearer ${AIMLAPI_KEY}`,  // 必须有 Bearer 前缀
  'Content-Type': 'application/json'
}
```

---

## 📋 诊断检查清单

请按照以下清单逐项检查并反馈：

### ✅ 环境变量存在且格式正确
- [ ] `AI_ML_API_KEY` 存在
- [ ] 没有引号
- [ ] 没有空格
- [ ] 以 `sk-aimlapi-` 开头

### ✅ Command 面板验证成功
- [ ] `echo $AI_ML_API_KEY` 有输出
- [ ] 输出长度 40+ 字符
- [ ] 前缀正确

### ✅ 服务配置正确
- [ ] Root Directory 设置为 `video-proxy`
- [ ] Port 设置为 `8080`
- [ ] Build Type 正确（Node.js）

### ✅ 重启后有日志输出
- [ ] Runtime Logs 不为空
- [ ] 有 API Key 加载日志：`[video-proxy] AI_ML_API_KEY loaded, length: XX, prefix: sk-aimlapi-xxx...`
- [ ] 有服务启动日志：`Video proxy listening on port 8080`

### ✅ API Key 在 AIMLAPI 平台有效
- [ ] 状态为 Active
- [ ] 有足够配额
- [ ] 权限正确

---

## 🎯 立即执行步骤

### 第一步：重置环境变量
1. 进入 `video-proxy` → Variables → Edit Raw Variables
2. 删除所有现有变量
3. 添加：
   ```
   AI_ML_API_KEY=sk-aimlapi-xxxxxxxxxx
   PORT=8080
   ```
4. 保存

### 第二步：重启服务
1. Overview → Restart
2. 等待重启完成

### 第三步：验证环境变量
1. Command → 执行：`echo $AI_ML_API_KEY`
2. 记录输出结果

### 第四步：查看日志
1. Logs → Runtime Logs
2. 查看是否有启动日志和 API Key 加载日志

### 第五步：重新测试
1. 使用 Postman 发送视频生成请求
2. 查看是否还是 401

---

## 📝 反馈要求

执行上述步骤后，请反馈：

1. ✅ `echo $AI_ML_API_KEY` 的输出（前 20 个字符，如：`sk-aimlapi-xxxxx...`）
2. ✅ Runtime Logs 的内容（特别是启动日志和 API Key 加载日志）
3. ✅ API Key 在 AIMLAPI 平台的状态（Active/Expired/Revoked）
4. ✅ 是否与其他服务（LibreChat UI）的 API Key 一致
5. ✅ 执行方案 1 后的结果（是否还是 401）

---

## 🔗 相关文档

- 完整诊断指南：`docs/diagnose-video-proxy-401-complete.md`
- 当前问题追踪：`docs/12-current-issue-401-error.md`
- 项目完整信息：`docs/10-project-complete-info.md`

---

**最后更新**：2025-12-05


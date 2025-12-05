# 测试 API Key 配置指南

**日期**：2025-12-05  
**目的**：使用测试 API Key 排除环境变量问题，完成开发后再更换为正式 Key

---

## 🔑 测试 API Key

```
AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8
```

**⚠️ 重要提醒**：
- 这是**测试用的 API Key**，仅用于开发阶段
- 开发完成后，需要更换为正式的 API Key
- 不要在生产环境使用此 Key

---

## 📋 配置步骤

### 方法 1：在 Zeabur 控制台配置（推荐）

#### 步骤 1：进入服务配置
1. 登录 Zeabur Dashboard
2. 选择项目：`librechat-config`
3. 选择服务：`video-proxy`
4. 点击 **Variables** 标签
5. 点击 **Edit Raw Variables**

#### 步骤 2：添加环境变量
删除所有现有变量，然后添加：
```
PORT=8080
AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8
```

**注意**：
- ✅ 不要有引号
- ✅ 不要有空格
- ✅ 格式：`AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8`

#### 步骤 3：保存并重启
1. 点击 **Save**
2. 进入 **Overview** 页面
3. 点击右上角的 **⋮** (三个点) → **Restart**
4. 等待服务重启完成（状态变为 Running）

#### 步骤 4：验证环境变量
1. 进入 **Command** 标签
2. 执行命令：`echo $AI_ML_API_KEY`
3. **预期输出**：`06dc84bcbe364c0198dac40d0eca77c8`

#### 步骤 5：查看日志
1. 进入 **Logs** → **Runtime Logs**
2. 查看是否有以下日志：
   - `[video-proxy] AI_ML_API_KEY loaded, length: 32, prefix: 06dc84bcbe364c0...`
   - `Video proxy listening on port 8080`

---

### 方法 2：本地开发测试

#### 步骤 1：创建本地环境变量文件
在 `video-proxy/` 目录下创建 `.env` 文件：
```
PORT=8080
AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8
```

#### 步骤 2：运行服务
```bash
cd video-proxy
npm install
npm start
```

#### 步骤 3：测试接口
使用 Postman 或 curl 测试：
```bash
curl -X POST http://localhost:8080/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/veo-3.1-text-to-video",
    "prompt": "A 5-second video of a cute cat playing with a ball, cinematic, 4k.",
    "duration": 5,
    "resolution": "720p"
  }'
```

---

## ✅ 验证配置

### 1. 健康检查
```bash
curl https://video-proxy-wemkt.zeabur.app/
```
**预期**：返回 `"Video proxy is running. Use POST /video/generate to create a video."`

### 2. 视频生成接口
```bash
curl -X POST https://video-proxy-wemkt.zeabur.app/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/veo-3.1-text-to-video",
    "prompt": "test",
    "duration": 5
  }'
```
**预期**：不再返回 401 错误

---

## 🔄 开发完成后更换正式 Key

### 步骤 1：获取正式 API Key
1. 访问：https://aimlapi.com/app/keys
2. 创建或复制正式的 API Key

### 步骤 2：更新环境变量
1. 进入 Zeabur 控制台
2. 选择服务：`video-proxy`
3. Variables → Edit Raw Variables
4. 更新 `AI_ML_API_KEY` 为正式 Key
5. 保存并重启服务

### 步骤 3：验证
1. 测试视频生成接口
2. 确认功能正常

---

## 📝 检查清单

配置完成后，请确认：

- [ ] 环境变量已正确配置（`AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8`）
- [ ] 服务已重启
- [ ] Command 面板验证：`echo $AI_ML_API_KEY` 输出正确
- [ ] Runtime Logs 显示 API Key 已加载
- [ ] 健康检查正常（200 OK）
- [ ] 视频生成接口不再返回 401

---

## 🚨 故障排除

### 如果还是 401 错误

1. **检查环境变量格式**：
   - ❌ `AI_ML_API_KEY="06dc84bcbe364c0198dac40d0eca77c8"` （有引号）
   - ❌ `AI_ML_API_KEY = 06dc84bcbe364c0198dac40d0eca77c8` （有空格）
   - ✅ `AI_ML_API_KEY=06dc84bcbe364c0198dac40d0eca77c8` （正确）

2. **确认服务已重启**：
   - 修改环境变量后必须重启服务

3. **验证环境变量**：
   - 使用 Command 面板：`echo $AI_ML_API_KEY`
   - 应该输出：`06dc84bcbe364c0198dac40d0eca77c8`

4. **检查日志**：
   - Runtime Logs 应该显示 API Key 已加载

---

## 📚 相关文档

- 完整诊断报告：`docs/13-401-error-diagnosis-complete.md`
- API Key 管理策略：`docs/14-api-key-management-strategy.md`
- 项目完整信息：`docs/10-project-complete-info.md`

---

**最后更新**：2025-12-05


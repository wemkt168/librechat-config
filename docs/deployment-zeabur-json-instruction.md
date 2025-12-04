# 生成 zeabur.json 配置文件 - 给 GitHub Copilot 的指令

## 📋 任务说明

请为 `video-proxy` 服务生成 `zeabur.json` 配置文件，放在仓库根目录。

---

## 第 1 步：分析仓库结构

请读取并分析以下文件：

- `video-proxy/package.json`（完整内容）
- `video-proxy/server.js`（启动文件，不是 index.js）
- `video-proxy/README.md`（如果存在）

---

## 第 2 步：验证项目配置

请确认以下信息：

✅ **package.json 中的 start 脚本**：应该是 `"start": "node server.js"`

✅ **应用监听的默认端口**：8080（从 `process.env.PORT || 8080` 可以看出）

✅ **必需的环境变量**：
- `AI_ML_API_KEY`（必需，用于 AIMLAPI 认证）
- `PORT`（可选，默认 8080）

✅ **依赖项构建要求**：
- 标准 Node.js 项目，使用 `npm install` 安装依赖
- 不需要特殊构建步骤
- 使用 Express.js 框架

---

## 第 3 步：生成 zeabur.json 配置文件

请生成一个 `zeabur.json` 文件，放在**仓库根目录**（与 `librechat.yaml` 同级），内容如下：

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

### ⚠️ 重要配置说明：

1. **服务名称**：`video-proxy`（必须与目录名称一致）
2. **root 目录**：`video-proxy`（指向 `video-proxy/` 子目录）
3. **builder**：`nodejs`（Zeabur 会自动识别 package.json）
4. **端口**：`8080`（与 server.js 中的默认端口一致）
5. **环境变量 PORT**：设置为 `8080`（可选，server.js 已有默认值）

### 📝 关于 AI_ML_API_KEY 环境变量：

- `AI_ML_API_KEY` **不在 zeabur.json 中设置**（敏感信息）
- 需要在 Zeabur 控制台手动配置
- 在 zeabur.json 中只设置非敏感的配置变量（如 PORT）

---

## 第 4 步：生成部署步骤指南

请提供以下信息：

### ✅ 完整的 zeabur.json 配置文件（最终版本）

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

### ✅ 部署前检查清单

- [ ] 确认 `video-proxy/package.json` 存在且包含正确的依赖
- [ ] 确认 `video-proxy/server.js` 存在且可执行
- [ ] 确认 `zeabur.json` 已放在仓库根目录
- [ ] 确认 `zeabur.json` 中的 `root` 设置为 `video-proxy`
- [ ] 确认端口设置为 `8080`
- [ ] 准备 `AI_ML_API_KEY`（需要在 Zeabur 控制台配置）

### ✅ 部署后的验证步骤

1. **健康检查测试**：
   - 访问：`GET https://[服务域名]/`
   - 预期响应：`200 OK`
   - 响应内容：`"Video proxy is running. Use POST /video/generate to create a video."`

2. **服务状态检查**：
   - 在 Zeabur 控制台确认服务状态为 `Running`
   - 查看服务日志，应该看到：`Video proxy listening on port 8080`

3. **环境变量检查**：
   - 在 Zeabur 控制台确认 `AI_ML_API_KEY` 已设置
   - 确认 `PORT` 环境变量（可选，默认 8080）

4. **功能测试**：
   - 使用 Postman 或 curl 测试 `POST /video/generate` 端点
   - 请求体示例：
     ```json
     {
       "model": "google/veo-3.1-text-to-video",
       "prompt": "A 5-second video of a cute cat playing with a ball, cinematic, 4k.",
       "duration": 5,
       "resolution": "720p"
     }
     ```

### ✅ 常见问题排查指南

#### 问题 1：构建失败，提示找不到 package.json

**原因**：`root` 目录设置错误

**解决**：
- 检查 `zeabur.json` 中的 `root` 是否为 `video-proxy`
- 确认 `video-proxy/package.json` 文件存在

#### 问题 2：服务启动后立即停止

**原因**：缺少必需的环境变量 `AI_ML_API_KEY`

**解决**：
- 在 Zeabur 控制台进入服务设置
- 添加环境变量：`AI_ML_API_KEY = [你的 AIMLAPI 密钥]`
- 保存并重启服务

#### 问题 3：端口冲突

**原因**：端口配置错误

**解决**：
- 检查 `zeabur.json` 中的端口是否为 `8080`
- 检查 `server.js` 中的端口配置
- 确认 Zeabur 服务端口映射正确

#### 问题 4：健康检查返回 404

**原因**：服务未正确启动或路由配置错误

**解决**：
- 查看服务日志，确认服务已启动
- 检查 `server.js` 中的路由配置
- 确认访问的是正确的域名

---

## 📝 重要提醒

1. **文件位置**：`zeabur.json` 必须放在**仓库根目录**（与 `librechat.yaml` 同级）
2. **工作目录**：`root: "video-proxy"` 告诉 Zeabur 从 `video-proxy/` 子目录构建服务
3. **环境变量**：`AI_ML_API_KEY` 必须在 Zeabur 控制台手动配置，不要放在 zeabur.json 中
4. **项目结构**：此服务部署到 Zeabur Project `librechat-config`，不是 `librechat`

---

## 🔗 相关文档

- 项目宪章：`docs/07-project-charter.md`
- 项目总览：`docs/00-project-overview.md`
- 部署文档：`docs/deployment-zeabur.md`

---

**最后更新**：2025-12-05



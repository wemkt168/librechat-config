# 部署到 Zeabur - 给 Zeabur AI IDE 的完整指令

## 📋 重要说明

### 🎯 这个指令是针对哪个服务？

**Zeabur Project: `librechat-config`**  
**新服务名称: `video-proxy`**（这是一个新服务，要在现有项目下创建）

### 📍 Zeabur 上的服务结构

**详细规范请参考**：`docs/07-project-charter.md`（项目宪章）

根据项目宪章，你在 Zeabur 上有两个项目：

1. **Zeabur Project: `librechat`**
   - LibreChat UI（前端聊天界面）
   - 状态：✅ 运行中

2. **Zeabur Project: `librechat-config`** ← **这个指令是针对这个项目**
   - LibreChat Config Proxy（配置代理服务）
     - 状态：✅ 运行中
     - 代码位置：`proxy-config/`
   - **Video Proxy（新服务，要部署的）** ← **这是我们要添加的新服务**
     - 状态：🚧 代码已准备，待部署
     - 代码位置：`video-proxy/`

### ⚠️ 关键点

- **项目名称**：`librechat-config`（不是 `librechat`）
- **服务名称**：`video-proxy`（新服务，在 `librechat-config` 项目下创建）
- **工作目录**：`video-proxy`（从 GitHub 仓库的 `video-proxy/` 目录拉取代码）
- **代码仓库**：`wemkt168/librechat-config`

---

## 📋 使用说明

### ⚠️ 部署前检查清单

在开始部署前，请确认：

- [ ] **GitHub 部署已完成**：video-proxy 已成功推送到 GitHub 仓库 `wemkt168/librechat-config`
- [ ] **项目宪章已阅读**：已查看 `docs/07-project-charter.md`，了解项目结构
- [ ] **项目确认**：确认要在 `librechat-config` 项目下创建新服务（不是 `librechat` 项目）
- [ ] **环境变量准备**：已准备好 `AI_ML_API_KEY`（可以从 LibreChat UI 服务复制）

### 📝 执行步骤

1. **先完成 GitHub 部署**：确保 video-proxy 已成功推送到 GitHub 仓库
2. **确认项目**：在 Zeabur 中进入 `librechat-config` 项目（不是 `librechat` 项目）
3. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
4. **粘贴执行**：粘贴到 Zeabur AI IDE 中执行
5. **配置环境变量**：在 Zeabur 控制台中设置 `AI_ML_API_KEY`（重要！）
6. **等待反馈**：等待 Zeabur AI IDE 完成并反馈结果
7. **部署后更新**：部署成功后，更新项目宪章中的服务状态

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我部署以下服务。如果无法通过 API 直接创建，请提供详细的手动操作步骤。

【服务信息】
- 服务名称：video-proxy
- 项目：librechat-config
- 仓库：wemkt168/librechat-config
- 分支：main
- 工作目录：video-proxy（⚠️ 重要：不是根目录）
- 运行环境：Node.js（自动检测，不需要 Dockerfile）

【关键配置点】
1. **工作目录**：必须设置为 `video-proxy`（这样 Zeabur 才能找到 video-proxy/package.json）
2. **构建方式**：选择"自动检测"或"Node.js"，Zeabur 会自动识别 package.json
3. **不要创建 Dockerfile**：这是纯 Node.js 服务，使用 Zeabur 的 Node.js 构建器
4. **端口**：8080
5. **环境变量**：PORT=8080（可选），AI_ML_API_KEY（稍后配置）

【如果 API 调用失败，请提供手动步骤】
如果无法通过 GraphQL 或 API 创建服务，请提供以下手动操作步骤：

步骤 1：进入 Zeabur 控制台
- 打开 https://zeabur.com
- 登录账号
- 进入项目：librechat-config

步骤 2：创建新服务
- 点击 "+ 新建服务" 或 "Add Service"
- 选择 "从 GitHub 部署" 或 "Deploy from GitHub"

步骤 3：选择仓库
- 搜索或选择：wemkt168/librechat-config
- 选择分支：main
- 点击 "下一步"

步骤 4：配置服务（⚠️ 关键步骤）
- 服务名称：video-proxy
- **工作目录**：video-proxy（⚠️ 必须设置，不是根目录）
- 构建方式：选择"自动检测"或"Node.js"
- 端口：8080
- 点击"部署"

步骤 5：配置环境变量（部署后）
- 进入 video-proxy 服务
- 进入"环境变量"或"Settings"
- 添加：AI_ML_API_KEY = [从 LibreChat UI 服务复制]

【如果可以提供 API 调用方式】
如果 Zeabur AI IDE 支持通过 API 创建服务，请使用以下信息：
- 项目 ID：692ec2382938472bdade0bff
- 仓库：wemkt168/librechat-config
- 工作目录：video-proxy
- 构建类型：NODEJS（不是 DOCKER）

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
- Zeabur 项目确认（librechat-config 项目）
- 服务在 Zeabur 项目中的位置（确认与其他服务的关系）
```

---

## ✅ 完成检查清单

### 部署检查
- [ ] Zeabur 服务已部署并运行
- [ ] Zeabur 服务域名可访问
- [ ] 健康检查接口返回正确响应（200 OK）
- [ ] 环境变量 AI_ML_API_KEY 已配置（在 Zeabur 控制台中）
- [ ] 服务日志显示启动成功
- [ ] 端口映射正确（8080）

### 项目结构检查
- [ ] 服务部署在正确的 Zeabur 项目（librechat-config）
- [ ] 服务名称正确（video-proxy）
- [ ] 工作目录设置正确（video-proxy）
- [ ] 与项目宪章中的规范一致

### 文档更新
- [ ] 更新项目宪章（docs/07-project-charter.md）中的服务状态
- [ ] 更新项目总览（docs/00-project-overview.md）中的服务状态
- [ ] 记录部署结果到进度日志（docs/01-progress-log.md）

---

## 🔗 相关链接

- GitHub 仓库：https://github.com/wemkt168/librechat-config
- Zeabur 项目：librechat-config

---

## 📚 相关文档

- **项目宪章**：`docs/07-project-charter.md`（必须参考！）
- **项目总览**：`docs/00-project-overview.md`
- **全局开发规范**：`docs/08-global-development-standards.md`

---

**最后更新**：2025-12-05 01:08  
**遵循规范**：项目宪章（docs/07-project-charter.md）


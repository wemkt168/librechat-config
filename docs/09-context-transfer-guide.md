# 上下文移转指南

## 📋 何时需要移转

当对话的 context 快要用完时（通常显示 "context used" 接近上限），需要开始新对话。

---

## 🔄 快速移转方法（最简单）

### 方法 1：使用移转指南（推荐）

1. 点击 **"New Agent"** 或 **"新对话"**
2. 在新对话中，直接输入：
   ```
   @09-context-transfer-guide.md
   
   请按照移转指南读取项目文档，然后告诉我当前项目状态和下一步工作。
   ```

### 方法 2：直接引用文档

1. 点击 **"New Agent"** 或 **"新对话"**
2. 在新对话中，输入：
   ```
   请读取以下文档了解项目背景：
   - @00-project-overview.md
   - @01-progress-log.md
   - @07-project-charter.md
   
   然后告诉我当前项目状态和下一步工作。
   ```

---

## 📝 新 AI 助手应该做什么

根据 `.cursorrules` 规则，AI 助手应该：
1. ✅ 自动检查项目宪章（`docs/07-project-charter.md`）
2. ✅ 读取项目总览和进度日志
3. ✅ 了解当前状态
4. ✅ 确认当前进行中的任务状态（不要假设已完成）

### 应该能回答的问题
- 当前项目是什么？
- 最近完成了什么工作？
- 下一步要做什么？
- Zeabur 项目结构是什么？
- 当前进行中的任务状态？

---

## 📝 当前项目状态摘要（2025-12-05 最新）

### 项目信息
- **项目名称**：AI聚合器（LibreChat Config）
- **GitHub 仓库**：wemkt168/librechat-config
- **Zeabur 项目**：
  - `librechat`：前端 UI 服务（LibreChat UI）
  - `librechat-config`：后端代理服务（proxy-config + video-proxy）

### 最近完成的工作（2025-12-05）
1. ✅ 修复命名冲突问题（服务名必须等于目录名）
   - 将 `librechat-config` 服务重命名为 `proxy-config`
   - 明确命名规范：服务名 = 目录名
2. ✅ Video-Proxy 服务部署到 Zeabur
   - 服务名：`video-proxy`
   - 域名：`https://video-proxy-wemkt.zeabur.app`
   - 健康检查：✅ 正常（返回 "Video proxy is running..."）
   - 构建类型：✅ 已识别为 Node.js（通过 zbpack.json + nixpacks.toml）
3. ✅ 修复 zeabur.json 占位符问题
   - 移除 `"AI_ML_API_KEY": "<your-aimlapi-key>"` 占位符
   - 环境变量应在 Zeabur 控制台手动配置
4. ✅ 添加调试日志到 server.js
   - 记录 API Key 加载状态
   - 记录请求处理过程

### 当前状态
- **Video-Proxy**：
  - GitHub：✅ 已部署（最新 commit: 9cf7929）
  - Zeabur：✅ 已部署并运行
  - 健康检查：✅ 正常
  - 环境变量：✅ 已配置（PORT=8080, AI_ML_API_KEY）
  - **问题**：⚠️ 视频生成接口返回 401 Unauthorized

### 🚨 当前遇到的问题

#### 问题：Video-Proxy 401 错误
- **现象**：
  - 健康检查正常（GET / 返回 200）✅
  - 视频生成接口返回 401（POST /video/generate）❌
  - Runtime Logs 为空（无法查看日志）⚠️
- **诊断结果**（2025-12-05）：
  - ✅ Postman 测试完成：健康检查正常，视频生成接口 401
  - ✅ Zeabur 诊断完成：提供了详细的手动操作步骤
  - 📋 完整诊断报告：`docs/13-401-error-diagnosis-complete.md`
- **可能原因**（按概率排序）：
  1. 环境变量未正确加载（60%）- 格式错误、未重启
  2. API Key 格式错误或无效（25%）- 隐藏字符、过期、权限不足
  3. 代码中 API Key 读取逻辑错误（10%）
  4. 请求头格式错误（5%）
- **已尝试**：
  - ✅ 添加调试日志
  - ✅ 修复 zeabur.json 占位符
  - ✅ 确认环境变量已配置
  - ✅ 完成 Postman 测试
  - ✅ 完成 Zeabur 诊断
- **下一步操作**（优先级）：
  1. **立即**：重置环境变量（删除后重新添加，确保格式正确）
  2. **立即**：重启服务
  3. **立即**：使用 Command 面板验证环境变量（`echo $AI_ML_API_KEY`）
  4. **立即**：查看 Runtime Logs（重启后应该有日志输出）
  5. **如果还是 401**：验证 API Key 在 AIMLAPI 平台的有效性

### 下一步工作（优先级）
1. **立即**：修复 401 错误
   - 重置环境变量（删除后重新添加，确保格式正确）
   - 重启服务
   - 使用 Command 面板验证环境变量（`echo $AI_ML_API_KEY`）
   - 查看 Runtime Logs（重启后应该有日志输出）
   - 如果还是 401，验证 API Key 在 AIMLAPI 平台的有效性
2. **短期**：完成视频生成接口测试
   - 修复 401 错误后重新测试
   - 验证视频生成功能正常
3. **中期**：建立 Image/Code 代理服务

### 重要规则
- **任务状态确认**：给出指令后，必须等待用户明确反馈才能标记为"已完成"
- **项目宪章**：所有操作必须遵循 `docs/07-project-charter.md`
- **命名规范**：服务名必须等于目录名（⚠️ 关键！）
- **代码质量**：我写代码，AI IDE 执行

---

## 🔑 关键文档位置

### 必须读取的文档
1. `docs/00-project-overview.md` - 项目总览
2. `docs/01-progress-log.md` - 进度日志（最新状态）
3. `docs/07-project-charter.md` - 项目宪章（**必须参考！**）
4. `.cursorrules` - AI 助手规则

### 参考文档
- `docs/08-global-development-standards.md` - 全局开发规范
- `docs/04-collaboration-log.md` - 协作记录
- `docs/02-decisions.md` - 决策记录
- `docs/10-project-complete-info.md` - 项目完整信息
- `docs/12-current-issue-401-error.md` - 当前 401 错误问题追踪
- `docs/13-401-error-diagnosis-complete.md` - 完整诊断报告（包含 Postman 和 Zeabur 反馈）
- `docs/diagnose-video-proxy-401-complete.md` - 完整诊断指南

### 部署指令
- `docs/deployment-zeabur.md` - 部署到 Zeabur 的指令
- `docs/deployment-github.md` - 部署到 GitHub 的指令

---

## ⚠️ 重要提醒

### 给新 AI 助手的提醒

1. **先读文档**：不要假设，先读取项目文档
2. **遵循宪章**：所有操作必须遵循项目宪章
3. **等待反馈**：给出指令后，等待用户明确反馈
4. **不要假设**：不要假设任务已完成

### 当前进行中的任务

- **Video-Proxy 401 错误诊断**：
  - 状态：等待诊断
  - 问题：视频生成接口返回 401 Unauthorized
  - 服务状态：Running，健康检查正常
  - 环境变量：已配置（PORT=8080, AI_ML_API_KEY）
  - Runtime Logs：为空（无法查看）
  - 下一步：使用 Command 面板验证环境变量，重启服务查看日志

---

## 📋 快速恢复检查清单

新对话开始时，AI 助手应该：

- [ ] 读取 `docs/00-project-overview.md`
- [ ] 读取 `docs/01-progress-log.md`（了解最新进度）
- [ ] 读取 `docs/07-project-charter.md`（了解项目结构）
- [ ] 读取 `.cursorrules`（了解 AI 助手规则）
- [ ] 确认当前任务状态（不要假设已完成）
- [ ] 询问用户当前进度

---

## 💡 使用提示

### 最简单的方式

1. 点击 **"New Agent"**
2. 输入：`@09-context-transfer-guide.md`
3. 新 AI 助手会自动读取所有必要文档

### 如果新 AI 助手没有自动读取

手动告诉它：
```
请读取：
- @00-project-overview.md
- @01-progress-log.md  
- @07-project-charter.md
```

---

**最后更新**：2025-12-05（Video-Proxy 已部署，遇到 401 错误）


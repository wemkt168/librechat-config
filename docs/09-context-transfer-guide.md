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

## 📝 当前项目状态摘要（2025-12-05 01:08）

### 项目信息
- **项目名称**：AI聚合器（LibreChat Config）
- **GitHub 仓库**：wemkt168/librechat-config
- **Zeabur 项目**：
  - `librechat`：前端 UI 服务
  - `librechat-config`：后端代理服务

### 最近完成的工作
1. ✅ Video-Proxy 代码准备（已部署到 GitHub，commit: c13c340）
2. ✅ Proxy-Config 文档完善（已部署到 GitHub，commit: a146dbf）
3. ✅ 项目宪章和全局开发规范建立
4. ✅ 修复 video-proxy/server.js 重复代码问题（commit: c06c55b）

### 当前状态
- **Video-Proxy**：
  - GitHub：✅ 已部署（代码已修复）
  - Zeabur：⏳ 等待部署（用户在手动操作，遇到工作目录设置问题）

### 下一步工作
1. 完成 video-proxy 部署到 Zeabur
2. 测试视频生成接口
3. 验证功能

### 重要规则
- **任务状态确认**：给出指令后，必须等待用户明确反馈才能标记为"已完成"
- **项目宪章**：所有操作必须遵循 `docs/07-project-charter.md`
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

- **Video-Proxy 部署到 Zeabur**：
  - 状态：用户正在手动操作
  - 问题：Zeabur 检测为 "static" 而不是 "Node.js"
  - 解决方案：已设置根目录为 `video-proxy`，等待重新检测或手动选择构建类型

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

**最后更新**：2025-12-05 01:08


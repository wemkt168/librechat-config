# 更新 GitHub - 创建/更新 docs/00-project-overview.md

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成并反馈结果

**注意**：这个指令用于创建或更新 `docs/00-project-overview.md` 文件（如果文件不存在则创建，存在则更新项目结构部分）。

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我执行以下 Git 提交任务：

【任务描述】
创建或更新 docs/00-project-overview.md 文件，确保项目结构部分包含 proxy-config/ 目录。

【文件内容】

docs/00-project-overview.md（完整文件内容）
```markdown
# AI 聚合器项目总览

## 项目目标
搭建一个统一的 AI 聚合平台，整合多个 AI 服务（Chat、Image、Video、Code），通过 LibreChat 前端界面和 AIMLAPI 后端服务，提供一站式的 AI 能力访问。

## 技术栈
- **前端/平台**：LibreChat（部署在 Zeabur）
- **后端服务**：AIMLAPI（统一 API 网关）
- **部署平台**：Zeabur
- **代码仓库**：GitHub (wemkt168/librechat-config)
- **配置管理**：YAML 配置文件（librechat.yaml）

## 核心组件

### 1. LibreChat UI
- **功能**：前端聊天界面，用户交互入口
- **部署位置**：Zeabur Project - librechat
- **状态**：✅ 运行中

### 2. LibreChat Config Proxy
- **功能**：配置代理服务，从 GitHub 拉取 librechat.yaml
- **部署位置**：Zeabur Project - librechat-config
- **状态**：✅ 运行中

### 3. Video Proxy（进行中）
- **功能**：视频生成代理服务，代理 AIMLAPI 的 `/v2/video/generations` 接口
- **部署位置**：Zeabur Project - librechat-config
- **代码位置**：video-proxy/
- **状态**：🚧 代码已准备，待部署

## 环境变量

### LibreChat UI
- `AI_ML_API_KEY`：AIMLAPI 密钥
- `CONFIG_PATH`：LibreChat 配置路径（GitHub Raw URL）

### Video Proxy
- `AI_ML_API_KEY`：AIMLAPI 密钥（与 LibreChat UI 相同）
- `PORT`：服务监听端口（默认 8080）

## 重要链接
- **GitHub 仓库**：https://github.com/wemkt168/librechat-config
- **Zeabur Project**：librechat-config
- **AIMLAPI 文档**：https://docs.aimlapi.com
- **AIMLAPI 模型列表**：https://api.aimlapi.com/v1/models

## 项目结构
```
AI聚合器/（Workspace 根目录）
├── librechat.yaml（LibreChat 配置文件）
├── proxy-config/（LibreChat 配置代理服务）
│   └── README.md
├── video-proxy/（视频生成代理服务）
│   ├── server.js
│   ├── package.json
│   └── README.md
└── docs/（项目笔记系统）
    ├── 00-project-overview.md（本文件）
    ├── 01-progress-log.md
    ├── 02-decisions.md
    ├── 03-code-reference.md
    ├── 04-collaboration-log.md
    └── 05-next-steps.md
```

## 支持的 AI 模型类型

### Chat 模型（13 个）
- OpenAI：GPT-5 Chat Latest, O3, GPT-4.1
- Anthropic：Claude Opus 4.5, Claude Opus 4.1, Claude Sonnet 4.1
- Google：Gemini 2.5 Pro Exp, Gemini 2.5 Flash, Gemini 3 Pro Image Preview
- xAI：Grok-4, Grok-4 Fast Non-Reasoning

### Code 模型（6 个）
- OpenAI：O3-mini, O3
- Anthropic：Claude Opus 4.1, Claude Sonnet 4.1
- Google：Gemini 2.5 Pro Exp
- xAI：Grok-4

### Image 模型（9 个）
- Nano Banana：Pro-Edit, Pro
- Flux：Kontext Pro Text-to-Image, Kontext Pro Image-to-Image, Kontext Max Image-to-Image
- Google：Imagen 4.0 Ultra Generate, Imagen 4.0 Generate, Gemini 3 Pro Image Preview
- ByteDance：Seedream V4 Text-to-Image

### Video 模型（10 个）
- Google：Veo 3.1 系列（5 个变体）
- Kling AI：V2.1 Master 系列, V2.5 Turbo Pro
- ByteDance：Seedance 1.0 Pro 系列

## 协作流程
采用标准化协作模式：
1. **我（AI 助手）**：写完整代码，提供清晰指令
2. **GitHub Copilot**：执行代码部署，测试，反馈
3. **Zeabur AI IDE**：执行服务部署，测试，反馈
4. **你（用户）**：确认和决策

## 最后更新
2025-12-03：建立项目笔记系统
```

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 创建 docs/ 目录（如果不存在）
3. 创建或更新 docs/00-project-overview.md 文件（使用上面的完整内容）
4. 执行 git add docs/00-project-overview.md
5. 执行 git commit -m "docs: update project overview with proxy-config structure"
6. 执行 git push
7. 确认文件已正确提交到 GitHub

【注意事项】
- 如果 docs/ 目录不存在，需要先创建
- 如果文件已存在，会完整覆盖（确保项目结构部分正确）
- 确保文件内容完整，没有截断

【反馈要求】
请完成后反馈：
1. ✅ 文件创建/更新状态
2. ✅ Git commit 信息（commit hash 和 message）
3. ✅ GitHub 仓库链接（确认文件已上传）
4. ⚠️ 如有任何警告或问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- Git commit hash 和 message
- GitHub 仓库中 docs/00-project-overview.md 的文件链接
- 执行结果摘要（成功/失败）
```

---

## ✅ 完成检查清单

- [ ] docs/ 目录已创建（如果不存在）
- [ ] docs/00-project-overview.md 已创建/更新
- [ ] 项目结构部分包含 proxy-config/ 目录
- [ ] Git commit 已成功推送

---

**最后更新**：2025-12-05 01:08


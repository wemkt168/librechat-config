# 项目宪章 - 项目结构与组织规范

## 📋 文档位置与作用范围

**文件位置**：`docs/07-project-charter.md`  
**GitHub 仓库**：`wemkt168/librechat-config`  
**项目名称**：AI聚合器（LibreChat Config）

### ⚠️ 重要说明

**这是项目特定的宪章，不是全局的！**

- ✅ **作用范围**：只针对"AI聚合器"项目（GitHub 仓库：`wemkt168/librechat-config`）
- ✅ **适用场景**：在这个项目中创建新服务、部署到 Zeabur 时参考
- ❌ **不适用**：其他项目不会看到这个宪章（除非它们在同一个仓库中）

### 📝 其他项目怎么办？

如果你有其他项目，建议：
1. 参考全局开发规范模板：`docs/08-global-development-standards.md`
2. 在各自项目的 `docs/` 目录下创建自己的宪章文档
3. 根据项目特点定制规范（Zeabur 项目结构、服务组织方式等）
4. 使用类似的命名：`07-project-charter.md` 或 `00-project-charter.md`

### 🤖 AI 助手自动读取规则

**AI 助手应该遵循以下规则**：
1. 进入任何新项目时，优先检查是否存在 `docs/07-project-charter.md` 或 `docs/00-project-charter.md`
2. 如果存在，自动读取并遵循项目宪章
3. 如果不存在，提醒用户创建项目宪章（参考 `docs/08-global-development-standards.md`）
4. 在创建新服务或修改项目结构时，必须参考项目宪章

---

## 📋 目的

本文档明确记录**AI聚合器项目**的组织结构、服务部署规范、代码组织方式，确保未来开发时不会出现代码四散、项目混乱的情况。

---

## 🏗️ Zeabur 项目结构（重要！）

### 项目组织原则

**在 Zeabur 上，我们使用两个独立的项目来组织服务：**

#### 1. Zeabur Project: `librechat`
**用途**：前端用户界面服务

| 服务名称 | 功能 | 状态 | 代码位置 |
|---------|------|------|---------|
| LibreChat UI | 前端聊天界面，用户交互入口 | ✅ 运行中 | 官方模板部署 |

**环境变量**：
- `AI_ML_API_KEY`：AIMLAPI 密钥
- `CONFIG_PATH`：LibreChat 配置路径（GitHub Raw URL）

---

#### 2. Zeabur Project: `librechat-config`
**用途**：后端代理服务和配置服务

| 服务名称（Zeabur） | 功能 | 状态 | 代码位置 | GitHub 目录 |
|-------------------|------|------|---------|------------|
| `proxy-config` | 配置代理服务，从 GitHub 拉取 librechat.yaml | ✅ 运行中 | proxy-config/ | `proxy-config/` |
| `video-proxy` | 视频生成代理服务，代理 AIMLAPI 的 `/v2/video/generations` 接口 | 🚧 待部署 | video-proxy/ | `video-proxy/` |

**⚠️ 重要：服务名称必须等于目录名称！**
- 目录 `proxy-config/` → 服务名必须是 `proxy-config`（不是 `librechat-config`）
- 目录 `video-proxy/` → 服务名必须是 `video-proxy`

**环境变量**（Video Proxy）：
- `AI_ML_API_KEY`：AIMLAPI 密钥（与 LibreChat UI 相同）
- `PORT`：服务监听端口（默认 8080）

---

### ⚠️ 关键规则

1. **项目分离原则**：
   - `librechat` 项目：只放前端 UI 服务
   - `librechat-config` 项目：放所有后端代理服务

2. **服务命名规范**（⚠️ 关键！）：
   - 每个服务都有独立的目录（如 `video-proxy/`、`proxy-config/`）
   - **服务名称必须等于目录名称**（在 Zeabur 中创建服务时，服务名必须和目录名一致）
   - **禁止使用项目名作为服务名**（例如：不能把 `proxy-config` 服务命名为 `librechat-config`）
   - 示例：
     - ✅ 正确：目录 `proxy-config/` → 服务名 `proxy-config`
     - ✅ 正确：目录 `video-proxy/` → 服务名 `video-proxy`
     - ❌ 错误：目录 `proxy-config/` → 服务名 `librechat-config`（会和项目名混淆）

3. **代码组织规范**：
   - 所有代码都在 GitHub 仓库 `wemkt168/librechat-config` 中
   - 每个服务在仓库中有对应的目录
   - 每个服务目录必须包含 `README.md` 说明文档

---

## 📁 GitHub 仓库结构

### 仓库：`wemkt168/librechat-config`

```
librechat-config/
├── librechat.yaml          # LibreChat 配置文件
├── proxy-config/          # LibreChat Config Proxy 服务
│   └── README.md          # 服务说明文档（必须）
├── video-proxy/           # Video Proxy 服务
│   ├── server.js          # 服务入口文件
│   ├── package.json       # 依赖配置
│   └── README.md          # 服务说明文档（必须）
└── docs/                   # 项目文档系统
    ├── 00-project-overview.md
    ├── 01-progress-log.md
    ├── 02-decisions.md
    ├── 03-code-reference.md
    ├── 04-collaboration-log.md
    ├── 05-next-steps.md
    ├── 06-tooling-and-extensions.md
    └── 07-project-charter.md（本文件）
```

---

## 🔄 服务部署映射关系

### 部署流程

```
GitHub 仓库 (wemkt168/librechat-config)
    ↓
    ├── proxy-config/  →  Zeabur Project: librechat-config
    │                     服务名: proxy-config（⚠️ 不是 librechat-config）
    │
    └── video-proxy/   →  Zeabur Project: librechat-config
                          服务名: video-proxy
```

**⚠️ 命名规范提醒**：
- Zeabur 项目名：`librechat-config`
- 服务名：`proxy-config`（对应 `proxy-config/` 目录）
- 服务名：`video-proxy`（对应 `video-proxy/` 目录）
- **服务名绝对不能和项目名重复！**

### 部署规范

1. **工作目录设置**：
   - 在 Zeabur 部署时，必须设置正确的工作目录
   - 例如：`video-proxy/` 服务的工作目录 = `video-proxy`

2. **环境变量管理**：
   - 所有敏感信息（API Key）通过 Zeabur 环境变量配置
   - 不在代码中硬编码任何密钥

3. **服务独立性**：
   - 每个服务都是独立的，可以单独部署、更新、重启
   - 服务之间通过 HTTP API 通信

---

## 📝 代码组织规范

### 1. 服务目录结构

每个服务必须包含以下文件：

```
service-name/
├── server.js（或 app.js）  # 服务入口文件
├── package.json            # 依赖配置（Node.js 服务）
├── README.md               # 服务说明文档（必须）
└── .env.example            # 环境变量示例（可选）
```

### 2. README.md 必须包含

- 服务功能说明
- 部署位置（Zeabur Project 和项目名称）
- 环境变量说明
- API 端点说明
- 相关服务说明

### 3. 命名规范

- **服务目录**：使用小写字母和连字符，如 `video-proxy`、`image-proxy`
- **服务名称**：与目录名称一致
- **文件命名**：使用小写字母和连字符

---

## 🚫 禁止事项

1. **禁止代码四散**：
   - 所有代码必须在 GitHub 仓库中
   - 禁止在 Zeabur 上直接编辑代码
   - 禁止在多个地方维护同一份代码

2. **禁止项目混乱**：
   - 禁止在错误的 Zeabur 项目中创建服务
   - 禁止使用不规范的命名
   - 禁止缺少 README.md 文档

3. **禁止硬编码**：
   - 禁止在代码中硬编码 API Key
   - 禁止在代码中硬编码配置信息
   - 所有配置通过环境变量或配置文件管理

---

## ✅ 新增服务检查清单

在创建新服务时，必须完成以下步骤：

- [ ] 在 GitHub 仓库创建服务目录（如 `image-proxy/`）
- [ ] 创建服务代码文件（`server.js`、`package.json` 等）
- [ ] 创建 `README.md` 说明文档
- [ ] 明确说明部署到哪个 Zeabur 项目
- [ ] 更新 `docs/00-project-overview.md` 添加新服务
- [ ] 更新本宪章文档（如需要）
- [ ] 部署到 GitHub
- [ ] 部署到 Zeabur（正确的项目）
- [ ] 配置环境变量
- [ ] 测试服务功能

---

## 📚 相关文档

- **项目总览**：`docs/00-project-overview.md`
- **进度日志**：`docs/01-progress-log.md`
- **决策记录**：`docs/02-decisions.md`
- **代码参考**：`docs/03-code-reference.md`

---

## 🔄 更新记录

- **2025-12-05 01:08**：修复 video-proxy/server.js 重复代码问题
- **2025-12-03**：创建项目宪章，明确 Zeabur 项目结构和服务组织规范

---

**重要提醒**：每次创建新服务或修改项目结构时，必须更新本文档！


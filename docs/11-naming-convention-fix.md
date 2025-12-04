# 命名规范修复说明

**日期**：2025-12-05  
**问题**：服务命名冲突导致部署混乱

---

## 🚨 问题分析

### 发现的问题

1. **命名冲突**：
   - Zeabur 项目名：`librechat-config`
   - 项目内的服务名：也叫 `librechat-config`（这是 proxy-config 服务）
   - **这导致了严重的混淆！**

2. **实际影响**：
   - 想要部署 `video-proxy` 服务
   - 但实际操作了 `librechat-config` 服务（proxy-config）
   - 从日志看："Proxy config service listening on port 8080" 而不是 "Video proxy listening on port 8080"
   - 导致 video-proxy 服务无法正确部署

3. **根本原因**：
   - 服务名称和项目名称重复
   - 文档中没有明确区分项目名和服务名
   - 导致 AI IDE 执行时选错了服务

---

## ✅ 修复方案

### 命名规范（必须遵守）

#### 1. Zeabur 项目命名
- **项目名**：`librechat-config`（不变）
- **项目名**：`librechat`（前端项目，不变）

#### 2. 服务命名（关键！）
- **服务名必须等于目录名称**
- **服务名绝对不能和项目名重复**

| GitHub 目录 | Zeabur 服务名 | 说明 |
|------------|--------------|------|
| `proxy-config/` | `proxy-config` | ✅ 正确 |
| `video-proxy/` | `video-proxy` | ✅ 正确 |
| `proxy-config/` | `librechat-config` | ❌ **错误！** 会和项目名混淆 |

#### 3. 命名映射表

```
Zeabur Project: librechat-config
├── 服务名: proxy-config
│   └── 代码目录: proxy-config/
│
└── 服务名: video-proxy
    └── 代码目录: video-proxy/
```

---

## 📝 已修复的文档

### 1. 项目宪章（docs/07-project-charter.md）
- ✅ 明确服务名称必须等于目录名称
- ✅ 添加警告：禁止使用项目名作为服务名
- ✅ 更新服务部署映射关系，明确服务名

### 2. zeabur.json
- ✅ 已正确配置：只包含 `video-proxy` 服务
- ✅ 服务名：`video-proxy`（正确）

---

## 🔧 需要手动修复的操作

### 在 Zeabur 控制台

1. **检查现有服务名称**：
   - 进入 `librechat-config` 项目
   - 查看服务列表
   - 确认是否有服务名称为 `librechat-config`（应该改为 `proxy-config`）

2. **如果服务名错误**：
   - 选项 A：重命名服务（如果 Zeabur 支持）
   - 选项 B：删除错误命名的服务，重新创建正确命名的服务
     - 删除：`librechat-config` 服务（如果存在）
     - 重新创建：`proxy-config` 服务（工作目录：`proxy-config`）

3. **创建 video-proxy 服务**：
   - 服务名：`video-proxy`（必须！）
   - 工作目录：`video-proxy`
   - 构建类型：Node.js

---

## ⚠️ 重要提醒

### 给 AI IDE 的指令必须明确

在给 Zeabur AI IDE 或 GitHub Copilot 的指令中，必须明确：

1. **项目名**：`librechat-config`
2. **服务名**：`proxy-config` 或 `video-proxy`（不是 `librechat-config`）
3. **目录名**：`proxy-config/` 或 `video-proxy/`
4. **工作目录**：`proxy-config` 或 `video-proxy`（没有斜杠）

### 禁止的命名

- ❌ 服务名 = 项目名（会导致混淆）
- ❌ 服务名 ≠ 目录名（会导致代码路径错误）
- ❌ 使用描述性名称而不是目录名（如 "LibreChat Config Proxy" 而不是 "proxy-config"）

---

## 📋 验证清单

部署前必须确认：

- [ ] 服务名 = 目录名
- [ ] 服务名 ≠ 项目名
- [ ] 工作目录设置正确（等于目录名，没有斜杠）
- [ ] zeabur.json 中的服务名正确
- [ ] 文档中的服务名正确

---

## 🔄 后续行动

1. **立即修复**：
   - 检查 Zeabur 中的服务名称
   - 如果错误，删除并重新创建正确命名的服务

2. **验证部署**：
   - 确保 `proxy-config` 服务正常运行
   - 创建 `video-proxy` 服务（服务名必须是 `video-proxy`）

3. **更新文档**：
   - 所有部署文档已更新
   - 确保所有指令明确服务名

---

**最后更新**：2025-12-05  
**状态**：已修复文档，等待手动修复 Zeabur 服务名称


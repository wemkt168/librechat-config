# LibreChat Config Proxy

## 📋 概述

LibreChat Config Proxy 是一个配置代理服务，用于从 GitHub 仓库拉取 `librechat.yaml` 配置文件，并提供给 LibreChat UI 使用。

## 🎯 功能

- **配置拉取**：从 GitHub 仓库（wemkt168/librechat-config）拉取 `librechat.yaml` 配置文件
- **配置代理**：作为中间层，将配置文件提供给 LibreChat UI
- **动态更新**：当 GitHub 仓库中的配置文件更新时，LibreChat UI 可以获取最新配置

## 🏗️ 架构说明

```
LibreChat UI
    ↓ (请求配置)
LibreChat Config Proxy (proxy-config)
    ↓ (从 GitHub 拉取)
GitHub Raw URL (librechat.yaml)
```

## 📍 部署信息

- **部署位置**：Zeabur Project - librechat-config
- **状态**：✅ 运行中
- **GitHub 仓库**：wemkt168/librechat-config
- **配置文件路径**：`librechat.yaml`（仓库根目录）

## 🔗 相关服务

- **LibreChat UI**：前端聊天界面，通过 `CONFIG_PATH` 环境变量指向此代理服务
- **Video Proxy**：视频生成代理服务（`video-proxy/` 目录）
- **LibreChat Config**：配置文件本身（`librechat.yaml`）

## 📝 环境变量

### LibreChat UI 需要配置：
- `CONFIG_PATH`：LibreChat 配置路径（GitHub Raw URL 或此代理服务的 URL）

## 🔄 与 Video Proxy 的区别

| 服务 | 功能 | 目录 |
|------|------|------|
| **proxy-config** | 配置代理服务，拉取 `librechat.yaml` | `proxy-config/` |
| **video-proxy** | 视频生成代理服务，代理 AIMLAPI 视频接口 | `video-proxy/` |

## 📚 相关文档

- 项目总览：`docs/00-project-overview.md`
- LibreChat 配置：`librechat.yaml`
- 进度日志：`docs/01-progress-log.md`

## ⚠️ 注意事项

- 此服务与 `video-proxy` 是不同的服务，不要混淆
- 确保 GitHub 仓库中的 `librechat.yaml` 文件可访问
- 如果配置更新，需要确保 LibreChat UI 能够重新加载配置

---

**最后更新**：2025-12-03

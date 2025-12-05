# API Key 管理策略

**日期**：2025-12-05  
**主题**：不同服务是否可以使用不同的 AI_ML_API_KEY

---

## 📋 当前架构

### 使用 AI_ML_API_KEY 的服务

| 服务 | 项目 | 功能 | 是否必需 |
|------|------|------|---------|
| **LibreChat UI** | `librechat` | 前端聊天界面，调用所有 AI 模型（Chat、Image、Code、Video） | ✅ 必需 |
| **video-proxy** | `librechat-config` | 视频生成代理服务，代理 AIMLAPI 的 `/v2/video/generations` | ✅ 必需 |

### 不使用 AI_ML_API_KEY 的服务

| 服务 | 项目 | 功能 | 使用的密钥 |
|------|------|------|----------|
| **proxy-config** | `librechat-config` | 配置代理服务，从 GitHub 拉取 librechat.yaml | `GITHUB_TOKEN` |

---

## ✅ 答案：可以使用不同的 API Key

**结论**：不同服务可以使用不同的 `AI_ML_API_KEY`，**不会造成运行影响**。

### 技术原因

1. **AIMLAPI 架构**：
   - AIMLAPI 是一个统一的 API 网关
   - 每个 API Key 都是独立的认证凭证
   - 不同服务使用不同 Key 在技术上完全可行

2. **服务独立性**：
   - `LibreChat UI` 和 `video-proxy` 是独立的服务
   - 它们各自读取自己的环境变量
   - 互不干扰

3. **API 调用流程**：
   ```
   LibreChat UI → 使用自己的 AI_ML_API_KEY → AIMLAPI
   video-proxy → 使用自己的 AI_ML_API_KEY → AIMLAPI
   ```
   两个服务独立调用，互不影响。

---

## 📊 使用不同 API Key 的优缺点

### ✅ 优点

#### 1. 配额隔离
- **优势**：每个服务有独立的配额
- **场景**：如果 LibreChat UI 用完了配额，video-proxy 仍可正常工作
- **适用**：多用户或高流量场景

#### 2. 成本追踪
- **优势**：可以分别追踪每个服务的 API 调用成本
- **场景**：了解哪个服务消耗更多资源
- **适用**：成本优化和预算管理

#### 3. 权限控制
- **优势**：可以为不同服务设置不同的权限
- **场景**：video-proxy 只需要视频生成权限，不需要其他权限
- **适用**：安全性和权限管理

#### 4. 故障隔离
- **优势**：一个 Key 出现问题不影响其他服务
- **场景**：如果某个 Key 被撤销，只有对应服务受影响
- **适用**：高可用性场景

#### 5. 监控和日志
- **优势**：可以在 AIMLAPI 平台分别查看每个 Key 的使用情况
- **场景**：分别监控每个服务的 API 调用量
- **适用**：运维和监控

### ❌ 缺点

#### 1. 管理复杂度
- **劣势**：需要管理多个 API Key
- **影响**：需要记住哪个服务用哪个 Key
- **缓解**：在文档中明确记录

#### 2. 配额分散
- **劣势**：配额分散到多个 Key，可能造成浪费
- **影响**：如果某个 Key 配额用不完，其他 Key 配额不足
- **缓解**：合理分配配额

#### 3. 成本可能增加
- **劣势**：如果使用不同的计费计划，总成本可能更高
- **影响**：需要分别支付多个 Key 的费用
- **缓解**：统一使用相同的计费计划

---

## 💡 推荐策略

### 方案 1：使用相同的 API Key（推荐用于小型项目）

**适用场景**：
- 个人项目或小型团队
- 配额充足
- 希望简化管理

**配置方式**：
```
LibreChat UI: AI_ML_API_KEY=sk-aimlapi-key-1
video-proxy: AI_ML_API_KEY=sk-aimlapi-key-1  （相同）
```

**优点**：
- ✅ 管理简单
- ✅ 配额集中
- ✅ 成本统一

**缺点**：
- ❌ 配额共享，可能互相影响
- ❌ 无法分别追踪成本

---

### 方案 2：使用不同的 API Key（推荐用于生产环境）

**适用场景**：
- 生产环境
- 需要配额隔离
- 需要分别追踪成本
- 需要权限控制

**配置方式**：
```
LibreChat UI: AI_ML_API_KEY=sk-aimlapi-key-1
video-proxy: AI_ML_API_KEY=sk-aimlapi-key-2  （不同）
```

**优点**：
- ✅ 配额隔离
- ✅ 成本追踪
- ✅ 权限控制
- ✅ 故障隔离

**缺点**：
- ❌ 管理复杂度增加
- ❌ 需要记录每个 Key 的用途

---

### 方案 3：混合策略（推荐用于大型项目）

**适用场景**：
- 大型项目
- 多个服务
- 需要精细化管理

**配置方式**：
```
LibreChat UI: AI_ML_API_KEY=sk-aimlapi-key-1  （主 Key，用于所有功能）
video-proxy: AI_ML_API_KEY=sk-aimlapi-key-2  （专用 Key，只用于视频生成）
image-proxy: AI_ML_API_KEY=sk-aimlapi-key-3  （专用 Key，只用于图像生成）
code-proxy: AI_ML_API_KEY=sk-aimlapi-key-4  （专用 Key，只用于代码生成）
```

**优点**：
- ✅ 完全隔离
- ✅ 精细化管理
- ✅ 独立监控

**缺点**：
- ❌ 管理复杂度最高
- ❌ 需要维护多个 Key

---

## 📝 配置建议

### 如果你有 3 个 Active 的 API Key

**推荐配置**：

```
服务 1：LibreChat UI
AI_ML_API_KEY=sk-aimlapi-key-1
用途：所有 AI 模型调用（Chat、Image、Code、Video）

服务 2：video-proxy
AI_ML_API_KEY=sk-aimlapi-key-2
用途：视频生成专用

服务 3：未来可能的 image-proxy 或 code-proxy
AI_ML_API_KEY=sk-aimlapi-key-3
用途：图像生成或代码生成专用
```

**优势**：
- ✅ 配额隔离：每个服务有独立配额
- ✅ 成本追踪：可以分别查看每个服务的成本
- ✅ 故障隔离：一个 Key 出问题不影响其他服务
- ✅ 监控独立：可以分别监控每个服务的使用情况

---

## ⚠️ 注意事项

### 1. API Key 必须有效
- ✅ 所有 Key 都必须是 **Active** 状态
- ❌ 不能使用 **Expired** 或 **Revoked** 的 Key

### 2. 权限必须足够
- ✅ 确保每个 Key 都有足够的权限
- ✅ video-proxy 的 Key 必须有视频生成权限
- ✅ LibreChat UI 的 Key 需要有所有模型权限

### 3. 配额必须充足
- ✅ 确保每个 Key 都有足够的配额
- ⚠️ 如果配额不足，对应服务会失败

### 4. 文档记录
- ✅ 在文档中明确记录每个服务使用的 Key
- ✅ 建议创建 Key 映射表

---

## 📋 Key 映射表示例

### 推荐在文档中记录

```markdown
## API Key 映射表

| 服务 | 项目 | API Key | 用途 | 状态 |
|------|------|---------|------|------|
| LibreChat UI | librechat | sk-aimlapi-key-1 | 所有 AI 模型调用 | Active |
| video-proxy | librechat-config | sk-aimlapi-key-2 | 视频生成专用 | Active |
| image-proxy | librechat-config | sk-aimlapi-key-3 | 图像生成专用 | Active（未来） |
```

---

## 🔄 迁移指南

### 从相同 Key 迁移到不同 Key

**步骤 1**：在 AIMLAPI 平台创建新的 Key
1. 访问：https://aimlapi.com/app/keys
2. 创建新的 API Key
3. 确保权限和配额足够

**步骤 2**：更新环境变量
1. 进入 Zeabur 控制台
2. 选择目标服务（如 `video-proxy`）
3. Variables → Edit Raw Variables
4. 更新 `AI_ML_API_KEY` 为新 Key
5. 保存并重启服务

**步骤 3**：验证
1. 测试服务是否正常工作
2. 检查 Runtime Logs 确认 Key 已加载
3. 在 AIMLAPI 平台查看使用情况

---

## 📚 相关文档

- 项目完整信息：`docs/10-project-complete-info.md`
- 环境变量配置：`docs/07-project-charter.md`
- 401 错误诊断：`docs/13-401-error-diagnosis-complete.md`

---

## ✅ 总结

1. **可以使用不同的 API Key**：技术上完全可行，不会造成运行影响
2. **推荐策略**：
   - 小型项目：使用相同 Key（简化管理）
   - 生产环境：使用不同 Key（配额隔离、成本追踪）
3. **注意事项**：确保所有 Key 都是 Active 状态，权限和配额足够
4. **文档记录**：建议在文档中明确记录每个服务使用的 Key

---

**最后更新**：2025-12-05


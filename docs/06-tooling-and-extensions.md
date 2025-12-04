## 开发工具与扩展标准清单（全局适用）

> 这份文档不是只给某一个专案使用，而是作为 **长期的开发习惯与工具标准**。  
> 任何新专案、新工作区，都可以优先参考与沿用这里的配置。

---

## 总体原则

- **少装但精装**：优先安装“下载量高 + 评分高 + 有维护”的扩展，避免来源可疑的小众扩展。
- **按场景启用**：当遇到某类任务（YAML、REST API、Docker、Git 追溯等），优先考虑是否已有对应的“主力扩展”可以减少人工操作。
- **安全优先**：对会访问网络、上传代码或资料的扩展（尤其是 AI / 云服务），要明确知道：
  - 资料会发到哪一个服务
  - 是否会用于训练
  - 是否符合当前隐私要求

在与 AI 助手协作时，可以直接说：  
**“这类任务有没有推荐的主力扩展？”**  
让助手从本清单中，结合当下场景提出具体建议。

---

## 主力扩展清单（按场景分类）

### 1. 代码质量与格式化

- **ESLint**（`dbaeumer.vscode-eslint`）
  - **用途**：为 JavaScript / TypeScript 提供即时语法检查、风格规范、潜在错误提示。
  - **适用场景**：
    - Node.js / 前端项目（如 `video-proxy`、前端 UI）开发
    - 希望在运行前就发现常见 bug 与不规范写法
  - **建议**：在含有 `package.json`、`.eslintrc.*` 的专案中默认开启。

- **Prettier - Code formatter**（`esbenp.prettier-vscode`）
  - **用途**：统一格式化 JS / TS / JSON / YAML / Markdown 等，避免缩排和风格争议。
  - **适用场景**：
    - 配置文件较多的项目（如 `librechat.yaml`、各类 JSON 配置）
    - 团队协作或多台机器协作时
  - **特别价值**：可以显著降低 YAML 缩排错误、tab/space 混用等问题。

---

### 2. Git 与协作

- **GitLens – Git supercharged**（`eamodio.gitlens`）
  - **用途**：查看每一行代码的提交记录（谁在什么时候改的）、提交历史、分支对比等。
  - **适用场景**：
    - 追踪某个配置（如 `librechat.yaml` 或 `video-proxy/server.js`）是何时被改坏 / 修复。
    - 分析长期演进历史，理解为什么会做某个改动。
  - **建议**：只要项目使用 Git，建议默认启用。

---

### 3. API 调试 / HTTP 请求

- **REST Client**（`humao.rest-client`）
  - **用途**：在编辑器内以 `.http` / `.rest` 文件编写并发送 HTTP 请求。
  - **适用场景**：
    - 调试 `AIMLAPI` 的 `/v1/models`、`/v1/chat/completions`、`/v2/video/generations` 等端点。
    - 调试 `video-proxy` 的 `POST /video/generate`。
  - **优势**：不必在编辑器与 Postman / curl 间来回切换，测试请求可直接版本管理。

- **Thunder Client**（`rangav.vscode-thunder-client`）
  - **用途**：类似 Postman 的轻量 HTTP 客户端，但内嵌于 VS Code / Cursor。
  - **适用场景**：
    - 需要图形化查看请求 / 响应，但仍希望留在编辑器内操作。
  - **建议**：二选一安装（REST Client 或 Thunder Client），根据个人偏好。

---

### 4. 配置文件 / YAML 支持

- **YAML**（`redhat.vscode-yaml`）
  - **用途**：为 `.yaml` / `.yml` 文件提供语法高亮、自动补全、错误提示。
  - **适用场景**：
    - 处理 `librechat.yaml`、各种 CI/CD 配置、Kubernetes 配置等。
  - **特别价值**：
    - 能提前发现缩排错误、tab 字符、缺少冒号等典型 YAML 问题。

---

### 5. Node.js / 路径智能提示

- **npm Intellisense**（`christian-kohler.npm-intellisense`）
  - **用途**：在 `import` / `require` 时自动补全 `node_modules` 中的包名。
  - **适用场景**：
    - 开发 Node.js 服务（如 `video-proxy`、其它 API 服务）。
  - **价值**：减少拼写错误、快速发现依赖是否已安装。

- **Path Intellisense**（`christian-kohler.path-intellisense`）
  - **用途**：在输入文件路径时自动补全专案内部路径。
  - **适用场景**：
    - 模块间引用较多的项目。
  - **价值**：避免路径手动输入错误，加快文件引用速度。

---

### 6. 容器 / 部署相关

- **Docker**（`ms-azuretools.vscode-docker`）
  - **用途**：在编辑器中查看 / 管理本地 Docker 容器、镜像、Volume 等。
  - **适用场景**：
    - 本地调试基于 Docker 的服务。
    - 快速查看容器日志、重启服务。
  - **备注**：在纯 Zeabur 云端场景中使用价值略低，但如果本地也有 Docker 开发，建议安装。

---

## 使用建议：如何让 AI 主动提醒这些扩展

1. **在新专案或新工作区开局时**，让 AI 先阅读本文件，并告诉它：
   - 「当你发现我在做某类任务时（例如改 YAML、调 API、查 Git 历史），请主动建议我安装 / 使用对应的主力扩展。」
2. **在具体任务中**，如果感觉操作有点繁琐，可以直接问：
   - 「这件事有没有适合的扩展可以减少手动步骤？」
3. **当扩展真正帮上忙时**，可以把经验写回到各专案的 `docs/`（例如在某个专案的 `03-code-reference.md` 中补一句实际使用心得）。

---

## 后续维护约定

- 当引入新的「长期、通用、效果显著」的工具或扩展时，应：
  1. 在本文件中增加对应条目（用途 / 适用场景 / 注意点）。
  2. 在相应项目的文档中（如该项目的 `docs/03-code-reference.md` 或 `00-project-overview.md`）添加与该项目相关的使用说明。
- 与 AI 合作时，可以要求：
  - 「如果你认为某个扩展能明显提升当前这一步的效率，请直接点名它，并简短说明要怎么用。」




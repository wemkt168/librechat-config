# 更新 GitHub - 提交项目宪章和全局开发规范

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我执行以下 Git 提交任务：

【任务描述】
将新创建的项目宪章、全局开发规范和 .cursorrules 文件提交到 GitHub 仓库 wemkt168/librechat-config。

【需要提交的文件】

1. docs/07-project-charter.md（新文件）
请创建完整文件，内容较长，我会分部分提供。

2. docs/08-global-development-standards.md（新文件）
请创建完整文件，内容较长，我会分部分提供。

3. .cursorrules（新文件）
请创建完整文件，内容如下：

# Cursor AI 助手规则

## 📋 项目宪章自动读取规则

### 进入新项目时的行为

1. **优先检查项目宪章**：
   - 检查是否存在 `docs/07-project-charter.md` 或 `docs/00-project-charter.md`
   - 如果存在，自动读取并遵循项目宪章中的所有规范

2. **如果项目宪章不存在**：
   - 提醒用户创建项目宪章
   - 参考 `docs/08-global-development-standards.md`（如果存在）或全局开发规范模板
   - 帮助用户创建项目特定的宪章

3. **创建新服务时**：
   - 必须参考项目宪章中的规范
   - 确认部署到正确的项目和服务
   - 遵循命名规范和代码组织规范

4. **修改项目结构时**：
   - 必须更新项目宪章
   - 确保文档与实际情况一致

### 全局开发规范

- 参考 `docs/08-global-development-standards.md`（如果存在）了解通用开发规范
- 参考 `docs/06-tooling-and-extensions.md`（如果存在）了解开发工具和扩展标准

### 项目特定规范

- 每个项目都应该有自己的项目宪章（`docs/07-project-charter.md` 或 `docs/00-project-charter.md`）
- 项目宪章明确记录：
  - 部署平台项目结构（如 Zeabur Projects）
  - GitHub 仓库结构
  - 服务部署映射关系
  - 代码组织规范
  - 命名规范
  - 禁止事项

### 重要提醒

- **项目宪章是项目特定的**，不是全局的
- **禁止代码四散**：所有代码必须在版本控制中
- **禁止硬编码**：所有敏感信息通过环境变量配置
- **文档必须**：每个服务必须有 README.md，项目必须有项目宪章

4. docs/00-project-overview.md（更新文件）
请更新项目结构部分，添加新文档：
- 在 docs/ 目录列表中添加 `08-global-development-standards.md`

5. docs/01-progress-log.md（更新文件）
请更新进度日志，添加项目宪章相关的工作记录。

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 读取本地文件内容（因为文件较大，请从本地读取）：
   - 读取 docs/07-project-charter.md
   - 读取 docs/08-global-development-standards.md
   - 读取 .cursorrules
3. 创建或更新上述文件
4. 更新 docs/00-project-overview.md 和 docs/01-progress-log.md
5. 执行 git add docs/07-project-charter.md docs/08-global-development-standards.md .cursorrules docs/00-project-overview.md docs/01-progress-log.md
6. 执行 git commit -m "docs: add project charter and global development standards"
7. 执行 git push
8. 确认所有文件已正确提交到 GitHub

【注意事项】
- 文件内容较大，请确保完整读取和创建
- .cursorrules 文件在根目录，不是 docs/ 目录
- 确保所有文件内容完整，没有截断

【反馈要求】
请完成后反馈：
1. ✅ 文件创建/更新状态
2. ✅ Git commit 信息（commit hash 和 message）
3. ✅ GitHub 仓库链接（确认文件已上传）
4. ⚠️ 如有任何警告或问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- Git commit hash 和 message
- GitHub 仓库中新增文件的链接
- 执行结果摘要（成功/失败）
```

---

## ✅ 完成检查清单

- [ ] docs/07-project-charter.md 已创建
- [ ] docs/08-global-development-standards.md 已创建
- [ ] .cursorrules 已创建（根目录）
- [ ] docs/00-project-overview.md 已更新
- [ ] docs/01-progress-log.md 已更新
- [ ] Git commit 已成功推送

---

**最后更新**：2025-12-05 01:08


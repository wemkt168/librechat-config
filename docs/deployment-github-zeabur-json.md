# 提交 zeabur.json 到 GitHub - 给 GitHub Copilot 的完整指令

## 📋 使用说明

1. **全选复制**：选中下方整个代码块（从 ```text 到 ```）
2. **粘贴执行**：粘贴到 GitHub Copilot Chat 中执行
3. **等待反馈**：等待 GitHub Copilot 完成并反馈结果

---

## 🚀 完整指令（复制从这里开始）

```text
请帮我执行以下代码部署任务：

【任务描述】
将 zeabur.json 配置文件和部署指令文档提交到 GitHub 仓库 wemkt168/librechat-config。

【文件清单】

1. zeabur.json（仓库根目录）
```json
{
  "services": {
    "video-proxy": {
      "root": "video-proxy",
      "build": {
        "builder": "nodejs"
      },
      "ports": [
        {
          "port": 8080,
          "type": "http"
        }
      ],
      "env": {
        "PORT": "8080"
      }
    }
  }
}
```

2. docs/deployment-zeabur-json-instruction.md（已存在，需要确认内容）

【执行步骤】
1. 确认当前在 wemkt168/librechat-config 仓库
2. 在仓库根目录创建或更新 zeabur.json 文件（使用上面的完整 JSON 内容）
3. 确认 docs/deployment-zeabur-json-instruction.md 文件存在（如果不存在，需要创建）
4. 执行 git add zeabur.json
5. 执行 git add docs/deployment-zeabur-json-instruction.md（如果文件有变更）
6. 执行 git status 确认文件状态
7. 执行 git commit -m "feat: add zeabur.json configuration for video-proxy service deployment"
8. 执行 git push
9. 确认所有文件已正确提交到 GitHub

【注意事项】
- zeabur.json 必须放在仓库根目录（与 librechat.yaml 同级）
- 确保 JSON 格式正确，没有语法错误
- 确保文件编码为 UTF-8
- 不要提交敏感信息（AI_ML_API_KEY 不在文件中）

【验证要求】
1. JSON 语法检查：确认 zeabur.json 格式正确
2. 文件位置检查：确认 zeabur.json 在仓库根目录
3. Git 状态检查：确认 git status 显示正确的文件状态
4. 远程仓库检查：确认文件已推送到 GitHub

【反馈要求】
请完成后反馈：
1. ✅ zeabur.json 文件创建状态（已创建/已更新）
2. ✅ docs/deployment-zeabur-json-instruction.md 文件状态（已存在/已创建）
3. ✅ Git commit 信息（commit hash 和 message）
4. ✅ GitHub 仓库链接（确认文件已上传）
5. ⚠️ 如有任何警告或问题，请详细说明

【确认点】
完成后，请把以下内容贴给我确认：
- Git commit hash 和 message
- GitHub 仓库根目录中 zeabur.json 文件的存在确认
- docs/deployment-zeabur-json-instruction.md 文件的存在确认
- 执行结果摘要（成功/失败）
```

---

## ✅ 完成检查清单

- [ ] GitHub 仓库根目录中存在 zeabur.json
- [ ] zeabur.json 内容正确（JSON 格式有效）
- [ ] docs/deployment-zeabur-json-instruction.md 已提交
- [ ] Git commit 已成功推送
- [ ] 所有文件内容完整无误

---

**最后更新**：2025-12-05



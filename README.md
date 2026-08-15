<div align="right">
  <a href="./README.en.md"><img alt="English" src="https://img.shields.io/badge/English-2f7bd9?style=for-the-badge"></a>
</div>

# 🎨 dsh-skin-picker

<p align="center">
  <b>DSH（DeepSeek Harness）换肤插件</b><br>
  预设皮肤 · 自然语言换肤 · 自定义背景图片 · 界面控件联动 · 跨设备同步
</p>

<p align="center">
  <a href="https://github.com/Lzh-12/dsh-skin-picker"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Lzh-12/dsh-skin-picker?style=for-the-badge&color=f5a25d"></a>
  <a href="https://github.com/Lzh-12/dsh-skin-picker/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-3f9b4f?style=for-the-badge"></a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.6.0-2f7bd9?style=for-the-badge">
  <a href="https://github.com/Lzh-12/dsh-skin-picker"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-e56a9c?style=for-the-badge"></a>
</p>

---

## ✨ 功能

| 功能 | 说明 |
| --- | --- |
| 🎨 **预设皮肤** | 10 套精心调制的皮肤，亮 / 暗双色板自动跟随 |
| 🗣️ **自然语言换肤** | 输入「赛博朋克霓虹」「日式抹茶」等描述，自动生成配色 |
| 🖼️ **自定义背景图片** | 上传或粘贴 URL 设为页面背景，带可读性蒙层 |
| 🔗 **界面控件联动** | 输入框 / 气泡 / 按钮 / tab / 渐变跟随配色 |
| ☁️ **跨设备同步** | 皮肤选择写入 `settings.yaml`，多设备共享 |

## 🎨 预设皮肤

<p align="center">
  <img alt="海盐蓝" src="https://img.shields.io/badge/海盐蓝-2f7bd9?style=for-the-badge&labelColor=2f7bd9&color=ffffff">
  <img alt="樱花粉" src="https://img.shields.io/badge/樱花粉-e56a9c?style=for-the-badge&labelColor=e56a9c&color=ffffff">
  <img alt="薄荷绿" src="https://img.shields.io/badge/薄荷绿-2fa36a?style=for-the-badge&labelColor=2fa36a&color=ffffff">
  <img alt="暖阳橙" src="https://img.shields.io/badge/暖阳橙-e07b2f?style=for-the-badge&labelColor=e07b2f&color=ffffff">
  <img alt="薰衣草紫" src="https://img.shields.io/badge/薰衣草紫-7a5fd0?style=for-the-badge&labelColor=7a5fd0&color=ffffff">
</p>
<p align="center">
  <img alt="石墨灰" src="https://img.shields.io/badge/石墨灰-3a3f45?style=for-the-badge&labelColor=3a3f45&color=ffffff">
  <img alt="奶油米" src="https://img.shields.io/badge/奶油米-b98a3e?style=for-the-badge&labelColor=b98a3e&color=ffffff">
  <img alt="极光青" src="https://img.shields.io/badge/极光青-17a2b8?style=for-the-badge&labelColor=17a2b8&color=ffffff">
  <img alt="莓果红" src="https://img.shields.io/badge/莓果红-d64545?style=for-the-badge&labelColor=d64545&color=ffffff">
  <img alt="森林绿" src="https://img.shields.io/badge/森林绿-3f9b4f?style=for-the-badge&labelColor=3f9b4f&color=ffffff">
</p>

## 📦 安装

```bash
# 从 GitHub 安装
dsh plugin --profile web add github:Lzh-12/dsh-skin-picker

# 或从本地目录安装
dsh plugin --profile web add file:./dsh-skin-picker
```

安装完成后**重启 `dsh web`**，刷新页面即可在「设置 → 通用」看到「皮肤」行。

## 🚀 使用

1. 打开 **设置 → 通用 →「皮肤」**
2. **预设皮肤**：点色块立即换肤
3. **自然语言换肤**：输入描述（如「赛博朋克霓虹」）点「生成」
4. **背景图片**：点「选择图片」上传，或粘贴 URL 点「设为背景」
5. **恢复默认**：一键回到官方主题

## 🔧 原理

- 浏览器端通过 `theme.overrideTokens(source, tokens)` 叠加令牌层：`tokens` 为 `令牌名 → { light, dark }` 值对，与主题系统、明暗模式天然兼容
- 界面控件联动：派生令牌（`--dsw-specific-*`、`--dsw-static-deepseek-*`、`--dsw-alias-button-*` 等）+ inline `!important` 双保险
- 自然语言换肤：内置 15 组语义关键词库 + 任意文本的确定性 HSL 调色兜底
- 背景图片：写入 `--dsw-alias-bg-base` 的 `background` 栈（蒙层 + 图片 cover）
- host 端用 `settings.register` 注册命名空间 + `connection` RPC 通道做跨设备同步（settings 网关只对白名单命名空间开放第三方读写）

## 📁 结构

```
dsh-skin-picker/
├── package.json      # npm 元数据 + dsh.bundle / dsh.client 声明
├── cordis.patch.yml  # bundle 组合补丁（插入插件行）
├── lib/index.js      # host 半边：settings 命名空间 + config RPC 通道
├── lib/client.js     # 浏览器半边：UI + 令牌覆写 + 生成器 + 同步
└── README.md
```

## 📝 变更记录

- **0.6.0**：图片改为「设为背景」——上传/粘贴图片铺成页面背景（带可读性蒙层），取代图片取色
- **0.5.0**：图片取色换肤（已被 0.6.0 的「背景图片」取代）
- **0.4.0**：自然语言换肤——输入描述自动生成配色（关键词库 + 确定性 HSL 调色），跨设备同步
- **0.3.0**：界面控件联动——派生令牌 + inline 覆盖，输入框/气泡/按钮/tab/渐变跟随皮肤色
- **0.2.0**：皮肤选择跨设备同步（`settings.yaml` + `connection` RPC，localStorage 兜底）
- **0.1.0**：初版，10 套预设皮肤 + 恢复默认，localStorage 持久化

## 📄 License

[MIT](./LICENSE) © Aaron111

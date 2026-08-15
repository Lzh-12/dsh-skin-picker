# dsh-skin-picker

DSH（DeepSeek Harness）Web 换肤插件：**设置 → 通用 →「皮肤」** 行内切换 10 套预设皮肤，localStorage 持久化，纯前端实现、无构建步骤。

## 功能

- **10 套预设皮肤**：海盐蓝 / 樱花粉 / 薄荷绿 / 暖阳橙 / 薰衣草紫 / 石墨灰 / 奶油米 / 极光青 / 莓果红 / 森林绿
- 每套皮肤覆盖 **13 个主题令牌**（背景 / 卡片 / 浮层 / 侧栏 / 文字 / 边框 / 主题色 / 错误 / 成功 / 警告），**亮色与暗色各一套**，自动跟随明暗模式
- **恢复默认**：一键清除皮肤层，回到官方主题
- **持久化**：选择保存在浏览器 localStorage，刷新、重启后自动恢复；加载时校验脏数据
- **零构建**：`lib/client.js` 为手写纯 JS 浏览器包，安装即用

## 安装

```bash
# 从本地目录安装
dsh plugin --profile web add file:./dsh-skin-picker

# 或安装后从 npm / GitHub 安装（发布后）
dsh plugin --profile web add dsh-skin-picker
```

安装完成后**重启 `dsh web`**，刷新页面即可在「设置 → 通用」看到「皮肤」行。

## 使用

1. 打开 **设置 → 通用**，找到「皮肤」行（当前皮肤名显示在右侧）；
2. 点击展开色板网格，点击任意色块立即换肤；
3. 点击「恢复默认」回到官方主题；
4. 亮 / 暗模式切换时皮肤自动跟随对应色板。

## 原理

- 浏览器端通过 `theme.overrideTokens(source, tokens)` 叠加令牌层：`tokens` 为
  `令牌名 → { light, dark }` 值对，与主题系统、明暗模式天然兼容；
- 同 source 重复调用整体替换该层，不与其他插件（如 dsh-skin）的皮肤层互相覆盖；
- 持久化用 localStorage（settings RPC 网关仅对白名单命名空间开放第三方读写）。

## 结构

```
dsh-skin-picker/
├── package.json      # npm 元数据 + dsh.bundle / dsh.client 声明
├── cordis.patch.yml  # bundle 组合补丁（插入插件行）
├── lib/index.js      # host 半边（空激活载体）
├── lib/client.js     # 浏览器半边：设置行 UI + 令牌覆写 + 持久化
└── README.md
```

## License

[MIT](./LICENSE)

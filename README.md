# dsh-skin-picker

DSH（DeepSeek Harness）Web 换肤插件：**设置 → 通用 →「皮肤」** 行内切换 10 套预设皮肤，localStorage 即时缓存 + `settings.yaml` 跨设备同步，纯前端渲染、零构建步骤。

## 功能

- **10 套预设皮肤**：海盐蓝 / 樱花粉 / 薄荷绿 / 暖阳橙 / 薰衣草紫 / 石墨灰 / 奶油米 / 极光青 / 莓果红 / 森林绿
- 每套皮肤覆盖 **13 个主题令牌**（背景 / 卡片 / 浮层 / 侧栏 / 文字 / 边框 / 主题色 / 错误 / 成功 / 警告），**亮色与暗色各一套**，自动跟随明暗模式
- **恢复默认**：一键清除皮肤层，回到官方主题
- **持久化 + 跨设备同步**：选择即时写 localStorage（秒显示、离线兜底），同时通过 host 端 RPC 写入服务器的 `settings.yaml` —— 连到同一台 DSH 的浏览器/设备会自动跟随同一皮肤
- **零构建**：`lib/client.js` 为手写纯 JS 浏览器包，安装即用

## 安装

```bash
# 从本地目录安装
dsh plugin --profile web add file:./dsh-skin-picker

# 或从 npm / GitHub 安装（发布后）
dsh plugin --profile web add github:Lzh-12/dsh-skin-picker
```

安装完成后**重启 `dsh web`**（host 半边需启动加载），刷新页面即可在「设置 → 通用」看到「皮肤」行。

## 使用

1. 打开 **设置 → 通用**，找到「皮肤」行（当前皮肤名显示在右侧）；
2. 点击展开色板网格，点击任意色块立即换肤；
3. 点击「恢复默认」回到官方主题；
4. 亮 / 暗模式切换时皮肤自动跟随对应色板；
5. 换肤会写入服务器设置，其他浏览器/设备刷新后同步。

## 原理

- 浏览器端通过 `theme.overrideTokens(source, tokens)` 叠加令牌层：`tokens` 为
  `令牌名 → { light, dark }` 值对，与主题系统、明暗模式天然兼容；
- 同 source 重复调用整体替换该层，不与其他插件（如 dsh-skin）的皮肤层互相覆盖；
- host 端用 `settings.register` 注册 `skin-picker` 命名空间（`settings.yaml`），
  并暴露 `connection` RPC 通道 `/dsh-skin-picker/config`（get/set）——
  不用 settings 网关，因为它只对白名单命名空间开放第三方读写；
- localStorage 仅作即时缓存，服务器值在加载时覆盖本地值。

## 结构

```
dsh-skin-picker/
├── package.json      # npm 元数据 + dsh.bundle / dsh.client 声明 + peerDependencies
├── cordis.patch.yml  # bundle 组合补丁（插入插件行）
├── lib/index.js      # host 半边：settings 命名空间 + config RPC 通道
├── lib/client.js     # 浏览器半边：设置行 UI + 令牌覆写 + 本地缓存 + 服务端同步
└── README.md
```

## 变更记录

- **0.2.0**：皮肤选择跨设备同步（`settings.yaml` + `connection` RPC，localStorage 兜底）
- **0.1.0**：初版，10 套预设皮肤 + 恢复默认，localStorage 持久化

## License

[MIT](./LICENSE)

<div align="right">
  <a href="./README.md"><img alt="中文" src="https://img.shields.io/badge/中文-e56a9c?style=for-the-badge"></a>
</div>

# 🎨 dsh-skin-picker

<p align="center">
  <b>DeepSeek Harness (DSH) skin / theme plugin</b><br>
  Presets · Natural-language theming · Custom wallpaper · Control theming · Cross-device sync
</p>

<p align="center">
  <a href="https://github.com/Lzh-12/dsh-skin-picker"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Lzh-12/dsh-skin-picker?style=for-the-badge&color=f5a25d"></a>
  <a href="https://github.com/Lzh-12/dsh-skin-picker/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-3f9b4f?style=for-the-badge"></a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.6.0-2f7bd9?style=for-the-badge">
  <a href="https://github.com/Lzh-12/dsh-skin-picker"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-e56a9c?style=for-the-badge"></a>
</p>

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🎨 **Presets** | 10 curated skins with light & dark palettes that follow the color scheme |
| 🗣️ **Natural-language theming** | Type a vibe like "cyberpunk neon" or "matcha" and get a palette |
| 🖼️ **Custom wallpaper** | Set any image as the page background, with a readability veil |
| 🔗 **Control theming** | Inputs, bubbles, buttons, tabs and gradients follow the skin color |
| ☁️ **Cross-device sync** | Skin choice is stored in `settings.yaml`, shared across devices |

## 🎨 Presets

<p align="center">
  <img alt="Sea Salt" src="https://img.shields.io/badge/Sea%20Salt-2f7bd9?style=for-the-badge&labelColor=2f7bd9&color=ffffff">
  <img alt="Sakura" src="https://img.shields.io/badge/Sakura-e56a9c?style=for-the-badge&labelColor=e56a9c&color=ffffff">
  <img alt="Mint" src="https://img.shields.io/badge/Mint-2fa36a?style=for-the-badge&labelColor=2fa36a&color=ffffff">
  <img alt="Sunset" src="https://img.shields.io/badge/Sunset-e07b2f?style=for-the-badge&labelColor=e07b2f&color=ffffff">
  <img alt="Lavender" src="https://img.shields.io/badge/Lavender-7a5fd0?style=for-the-badge&labelColor=7a5fd0&color=ffffff">
</p>
<p align="center">
  <img alt="Graphite" src="https://img.shields.io/badge/Graphite-3a3f45?style=for-the-badge&labelColor=3a3f45&color=ffffff">
  <img alt="Cream" src="https://img.shields.io/badge/Cream-b98a3e?style=for-the-badge&labelColor=b98a3e&color=ffffff">
  <img alt="Aurora" src="https://img.shields.io/badge/Aurora-17a2b8?style=for-the-badge&labelColor=17a2b8&color=ffffff">
  <img alt="Berry" src="https://img.shields.io/badge/Berry-d64545?style=for-the-badge&labelColor=d64545&color=ffffff">
  <img alt="Forest" src="https://img.shields.io/badge/Forest-3f9b4f?style=for-the-badge&labelColor=3f9b4f&color=ffffff">
</p>

## 📦 Install

```bash
# from GitHub
dsh plugin --profile web add github:Lzh-12/dsh-skin-picker

# or from a local folder
dsh plugin --profile web add file:./dsh-skin-picker
```

Restart `dsh web` after installing, then refresh the page. You'll find the "Skin" row under **Settings → General**.

## 🚀 Usage

1. Open **Settings → General → "Skin"**
2. **Presets**: click a swatch to switch instantly
3. **Natural-language theming**: type a description (e.g. "cyberpunk neon") and hit *Generate*
4. **Wallpaper**: click *Choose image* to upload, or paste a URL and hit *Set background*
5. **Reset**: *恢复默认* returns to the official theme

## 🔧 How it works

- The browser half stacks a token layer via `theme.overrideTokens(source, tokens)` where `tokens` is `token-name → { light, dark }` value pairs, natively compatible with the theme system and light/dark modes
- Control theming uses derived tokens (`--dsw-specific-*`, `--dsw-static-deepseek-*`, `--dsw-alias-button-*`, …) plus inline `!important` as a double guarantee
- Natural-language theming: a built-in library of 15 semantic keyword themes plus a deterministic HSL palette generator as a fallback for arbitrary text
- Wallpaper is written into the `--dsw-alias-bg-base` background stack (veil + `cover` image)
- The host half registers a settings namespace and a `connection` RPC channel for cross-device sync (the settings gateway only exposes whitelisted namespaces to third parties)

## 📁 Structure

```
dsh-skin-picker/
├── package.json      # npm metadata + dsh.bundle / dsh.client declaration
├── cordis.patch.yml  # bundle patch (inserts the plugin row)
├── lib/index.js      # host half: settings namespace + config RPC channel
├── lib/client.js     # browser half: UI + token overrides + generators + sync
└── README.md
```

## 📝 Changelog

- **0.6.0**: images now become the page background (with a readability veil), replacing palette extraction
- **0.5.0**: image palette extraction (superseded by the 0.6.0 "background image")
- **0.4.0**: natural-language theming — generate palettes from descriptions (keyword library + deterministic HSL)
- **0.3.0**: control theming — derived tokens + inline overrides
- **0.2.0**: cross-device sync (`settings.yaml` + `connection` RPC)
- **0.1.0**: initial release, 10 presets + reset

## 📄 License

[MIT](./LICENSE) © Aaron111

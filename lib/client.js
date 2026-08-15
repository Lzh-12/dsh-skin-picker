// dsh-skin-picker browser bundle（静态插件，纯手写，无构建步骤）。
// 通过 window.__ModuleLoader__.load 自注册；设置 → 通用 →「皮肤」行：
// 10 套预设皮肤 + 恢复默认，theme.overrideTokens 叠加令牌层，localStorage 持久化。
window.__ModuleLoader__.load({
  id: 'dsh-skin-picker',
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    var React = require('react');

    var CSS = `
.dshsp-head {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 2px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  cursor: pointer;
  text-align: left;
}
.dshsp-head:hover { color: var(--dsw-alias-brand-primary); }
.dshsp-label { font-weight: 600; font-size: 13px; }
.dshsp-value { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.dshsp-chev {
  margin-left: auto;
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
  transition: transform 0.15s ease;
}
.dshsp-chev.open { transform: rotate(180deg); }
.dshsp-body { padding: 10px 2px; }
.dshsp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 8px;
}
.dshsp-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 4px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  font: inherit;
  font-size: 11px;
}
.dshsp-swatch:hover { border-color: var(--dsw-alias-brand-primary); }
.dshsp-swatch.active {
  border-color: var(--dsw-alias-brand-primary);
  box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary);
}
.dshsp-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.dshsp-dot-default {
  background: conic-gradient(#ffffff 0 25%, #3a3a42 25% 50%, #ffffff 50% 75%, #3a3a42 75%);
}
.dshsp-sname {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshsp-nl { display: flex; gap: 8px; margin-bottom: 10px; }
.dshsp-nl-input {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  outline: none;
}
.dshsp-nl-input::placeholder { color: var(--dsw-alias-label-secondary); }
.dshsp-nl-input:focus { border-color: var(--dsw-alias-brand-primary); }
.dshsp-nl-btn {
  flex: none;
  padding: 0 14px;
  border: none;
  border-radius: 8px;
  background: var(--dsw-alias-brand-primary);
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  white-space: nowrap;
}
.dshsp-nl-btn:hover { opacity: 0.9; }
.dshsp-img { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; }
.dshsp-img-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  font-size: 13px;
}
.dshsp-img-btn:hover { border-color: var(--dsw-alias-brand-primary); }
.dshsp-hint { margin: 0 0 8px; color: var(--dsw-alias-state-error-primary); font-size: 12px; }
`;

    if (typeof document !== 'undefined') {
      var styleEl = document.createElement('style');
      styleEl.setAttribute('data-plugin', 'dsh-skin-picker');
      styleEl.textContent = CSS;
      document.head.appendChild(styleEl);
    }

    function apply(ctx) {
      var theme = ctx.get('theme');
      var slots = ctx.get('slots');
      var connection = ctx.get('connection');
      if (slots === undefined || theme === undefined) return;

      var el = React.createElement;
      var SOURCE = 'dsh-skin-picker';
      var STORE_KEY = 'dsh-skin-picker:active';

      var SKINS = {
        seaSalt: {
          name: '海盐蓝',
          light: {
            '--dsw-alias-bg-base': '#eef4fb',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#f3f8fd',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#d8e3f0',
            '--dsw-alias-border-l2': '#c3d4e6',
            '--dsw-alias-brand-primary': '#2f7bd9',
            '--dsw-alias-label-primary': '#1c2b3a',
            '--dsw-alias-label-secondary': '#5c6f82',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#e7eff8',
          },
          dark: {
            '--dsw-alias-bg-base': '#0e1a26',
            '--dsw-alias-bg-layer-1': '#152436',
            '--dsw-alias-bg-layer-2': '#1a2c40',
            '--dsw-alias-bg-overlay': '#16263a',
            '--dsw-alias-border-l1': '#24364a',
            '--dsw-alias-border-l2': '#2f445c',
            '--dsw-alias-brand-primary': '#5ea2f0',
            '--dsw-alias-label-primary': '#e6eef7',
            '--dsw-alias-label-secondary': '#93a7bb',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#122031',
          },
        },
        sakura: {
          name: '樱花粉',
          light: {
            '--dsw-alias-bg-base': '#fdf1f5',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#fdeef3',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#f4d7e2',
            '--dsw-alias-border-l2': '#ecc3d3',
            '--dsw-alias-brand-primary': '#e56a9c',
            '--dsw-alias-label-primary': '#3c2531',
            '--dsw-alias-label-secondary': '#8a6a77',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#fbe6ee',
          },
          dark: {
            '--dsw-alias-bg-base': '#2a1822',
            '--dsw-alias-bg-layer-1': '#3a2130',
            '--dsw-alias-bg-layer-2': '#442639',
            '--dsw-alias-bg-overlay': '#3a2130',
            '--dsw-alias-border-l1': '#55354a',
            '--dsw-alias-border-l2': '#68405a',
            '--dsw-alias-brand-primary': '#f29cc0',
            '--dsw-alias-label-primary': '#fdeef5',
            '--dsw-alias-label-secondary': '#c99ab0',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#331c29',
          },
        },
        mint: {
          name: '薄荷绿',
          light: {
            '--dsw-alias-bg-base': '#eef8f2',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#e9f6ee',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#d0eadb',
            '--dsw-alias-border-l2': '#b8ddc7',
            '--dsw-alias-brand-primary': '#2fa36a',
            '--dsw-alias-label-primary': '#1c3327',
            '--dsw-alias-label-secondary': '#5f7d6c',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2fa36a',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#e4f4ea',
          },
          dark: {
            '--dsw-alias-bg-base': '#0f1f17',
            '--dsw-alias-bg-layer-1': '#172b21',
            '--dsw-alias-bg-layer-2': '#1b3327',
            '--dsw-alias-bg-overlay': '#172b21',
            '--dsw-alias-border-l1': '#2a4736',
            '--dsw-alias-border-l2': '#395c47',
            '--dsw-alias-brand-primary': '#54c491',
            '--dsw-alias-label-primary': '#e7f6ed',
            '--dsw-alias-label-secondary': '#8fb3a0',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#13251c',
          },
        },
        sunsetOrange: {
          name: '暖阳橙',
          light: {
            '--dsw-alias-bg-base': '#fdf3e8',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#fbeee0',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#f3ddc4',
            '--dsw-alias-border-l2': '#eac9a4',
            '--dsw-alias-brand-primary': '#e07b2f',
            '--dsw-alias-label-primary': '#3a2a1a',
            '--dsw-alias-label-secondary': '#8a735c',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#fbe9d6',
          },
          dark: {
            '--dsw-alias-bg-base': '#251a10',
            '--dsw-alias-bg-layer-1': '#332517',
            '--dsw-alias-bg-layer-2': '#3b2b1b',
            '--dsw-alias-bg-overlay': '#332517',
            '--dsw-alias-border-l1': '#4e3a24',
            '--dsw-alias-border-l2': '#634b30',
            '--dsw-alias-brand-primary': '#f0a05c',
            '--dsw-alias-label-primary': '#faf1e6',
            '--dsw-alias-label-secondary': '#c3a98c',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#2c1f13',
          },
        },
        lavender: {
          name: '薰衣草紫',
          light: {
            '--dsw-alias-bg-base': '#f4f1fb',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#f1edfa',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#e0d8f2',
            '--dsw-alias-border-l2': '#cfc2e8',
            '--dsw-alias-brand-primary': '#7a5fd0',
            '--dsw-alias-label-primary': '#2b2440',
            '--dsw-alias-label-secondary': '#6f6690',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#ece7f8',
          },
          dark: {
            '--dsw-alias-bg-base': '#1a1626',
            '--dsw-alias-bg-layer-1': '#241e36',
            '--dsw-alias-bg-layer-2': '#2a2340',
            '--dsw-alias-bg-overlay': '#241e36',
            '--dsw-alias-border-l1': '#3a3154',
            '--dsw-alias-border-l2': '#4b3f6b',
            '--dsw-alias-brand-primary': '#a690e8',
            '--dsw-alias-label-primary': '#f1edfb',
            '--dsw-alias-label-secondary': '#a69ac8',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#1f1930',
          },
        },
        graphite: {
          name: '石墨灰',
          light: {
            '--dsw-alias-bg-base': '#eef0f2',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#f2f4f6',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#d8dcdf',
            '--dsw-alias-border-l2': '#c3c8cd',
            '--dsw-alias-brand-primary': '#3a3f45',
            '--dsw-alias-label-primary': '#20242a',
            '--dsw-alias-label-secondary': '#5d646d',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#e7e9ec',
          },
          dark: {
            '--dsw-alias-bg-base': '#14161a',
            '--dsw-alias-bg-layer-1': '#1c1f24',
            '--dsw-alias-bg-layer-2': '#22252c',
            '--dsw-alias-bg-overlay': '#1c1f24',
            '--dsw-alias-border-l1': '#31353c',
            '--dsw-alias-border-l2': '#41464f',
            '--dsw-alias-brand-primary': '#aab2bc',
            '--dsw-alias-label-primary': '#e8ebee',
            '--dsw-alias-label-secondary': '#8f98a3',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#181b1f',
          },
        },
        cream: {
          name: '奶油米',
          light: {
            '--dsw-alias-bg-base': '#faf6ec',
            '--dsw-alias-bg-layer-1': '#fffdf7',
            '--dsw-alias-bg-layer-2': '#f8f1e2',
            '--dsw-alias-bg-overlay': '#fffdf7',
            '--dsw-alias-border-l1': '#ebe0c8',
            '--dsw-alias-border-l2': '#dfd0ae',
            '--dsw-alias-brand-primary': '#b98a3e',
            '--dsw-alias-label-primary': '#3b3320',
            '--dsw-alias-label-secondary': '#8a7b5c',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#f6eeda',
          },
          dark: {
            '--dsw-alias-bg-base': '#201b10',
            '--dsw-alias-bg-layer-1': '#2b2517',
            '--dsw-alias-bg-layer-2': '#332b1a',
            '--dsw-alias-bg-overlay': '#2b2517',
            '--dsw-alias-border-l1': '#4a4026',
            '--dsw-alias-border-l2': '#5e5133',
            '--dsw-alias-brand-primary': '#d4ab5e',
            '--dsw-alias-label-primary': '#f6f1e2',
            '--dsw-alias-label-secondary': '#b8a885',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#262013',
          },
        },
        aurora: {
          name: '极光青',
          light: {
            '--dsw-alias-bg-base': '#eaf7f8',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#e6f4f5',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#cde8eb',
            '--dsw-alias-border-l2': '#b3d9dd',
            '--dsw-alias-brand-primary': '#17a2b8',
            '--dsw-alias-label-primary': '#16343a',
            '--dsw-alias-label-secondary': '#55757c',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#e0f2f4',
          },
          dark: {
            '--dsw-alias-bg-base': '#0e1d20',
            '--dsw-alias-bg-layer-1': '#16282c',
            '--dsw-alias-bg-layer-2': '#1a2f34',
            '--dsw-alias-bg-overlay': '#16282c',
            '--dsw-alias-border-l1': '#2c474d',
            '--dsw-alias-border-l2': '#3b5c63',
            '--dsw-alias-brand-primary': '#45c2d6',
            '--dsw-alias-label-primary': '#e4f5f7',
            '--dsw-alias-label-secondary': '#85a9af',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#122427',
          },
        },
        berry: {
          name: '莓果红',
          light: {
            '--dsw-alias-bg-base': '#fbefef',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#f9e8e8',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#efd0d0',
            '--dsw-alias-border-l2': '#e4b6b6',
            '--dsw-alias-brand-primary': '#d64545',
            '--dsw-alias-label-primary': '#3a1f1f',
            '--dsw-alias-label-secondary': '#8a6060',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#f7e2e2',
          },
          dark: {
            '--dsw-alias-bg-base': '#261414',
            '--dsw-alias-bg-layer-1': '#351c1c',
            '--dsw-alias-bg-layer-2': '#3d2121',
            '--dsw-alias-bg-overlay': '#351c1c',
            '--dsw-alias-border-l1': '#52302f',
            '--dsw-alias-border-l2': '#67403e',
            '--dsw-alias-brand-primary': '#f07a7a',
            '--dsw-alias-label-primary': '#f9e8e8',
            '--dsw-alias-label-secondary': '#c99a98',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#2e1919',
          },
        },
        forest: {
          name: '森林绿',
          light: {
            '--dsw-alias-bg-base': '#eef6ee',
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': '#e9f3e9',
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': '#d3e8d3',
            '--dsw-alias-border-l2': '#bbd9bb',
            '--dsw-alias-brand-primary': '#3f9b4f',
            '--dsw-alias-label-primary': '#1c3320',
            '--dsw-alias-label-secondary': '#5f7d64',
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#3f9b4f',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': '#e4f1e4',
          },
          dark: {
            '--dsw-alias-bg-base': '#101b12',
            '--dsw-alias-bg-layer-1': '#17261a',
            '--dsw-alias-bg-layer-2': '#1b2d1f',
            '--dsw-alias-bg-overlay': '#17261a',
            '--dsw-alias-border-l1': '#2c442f',
            '--dsw-alias-border-l2': '#3b573f',
            '--dsw-alias-brand-primary': '#5fc26f',
            '--dsw-alias-label-primary': '#e6f5e8',
            '--dsw-alias-label-secondary': '#8fb395',
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#5fc26f',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': '#141f16',
          },
        },
      };

      var ORDER = [
        'seaSalt', 'sakura', 'mint', 'sunsetOrange', 'lavender',
        'graphite', 'cream', 'aurora', 'berry', 'forest',
      ];

      // ---- 自然语言换肤：确定性调色生成器 ----
      function hslToHex(h, s, l) {
        h = ((h % 360) + 360) % 360;
        s = Math.max(0, Math.min(100, s)) / 100;
        l = Math.max(0, Math.min(100, l)) / 100;
        var c = (1 - Math.abs(2 * l - 1)) * s;
        var x = c * (1 - Math.abs((h / 60) % 2 - 1));
        var m = l - c / 2;
        var r = 0, g = 0, b = 0;
        if (h < 60) { r = c; g = x; }
        else if (h < 120) { r = x; g = c; }
        else if (h < 180) { g = c; b = x; }
        else if (h < 240) { g = x; b = c; }
        else if (h < 300) { r = x; b = c; }
        else { r = c; b = x; }
        function toHex(v) {
          var n = Math.round((v + m) * 255);
          var s2 = n.toString(16);
          return s2.length === 1 ? '0' + s2 : s2;
        }
        return '#' + toHex(r) + toHex(g) + toHex(b);
      }

      function textToHue(text) {
        var h = 0;
        for (var i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 360;
        return h;
      }

      // 从色相生成整套 13 令牌皮肤（亮/暗各一套）
      function makePalette(hue, sat) {
        sat = Math.max(20, Math.min(85, sat));
        function c(l) { return hslToHex(hue, sat, l); }
        function n(l, s2) { return hslToHex(hue, s2, l); }
        return {
          name: '生成',
          light: {
            '--dsw-alias-bg-base': n(96, sat * 0.5),
            '--dsw-alias-bg-layer-1': '#ffffff',
            '--dsw-alias-bg-layer-2': n(93, sat * 0.45),
            '--dsw-alias-bg-overlay': '#ffffff',
            '--dsw-alias-border-l1': n(86, sat * 0.4),
            '--dsw-alias-border-l2': n(78, sat * 0.45),
            '--dsw-alias-brand-primary': n(45, sat),
            '--dsw-alias-label-primary': n(18, sat * 0.4),
            '--dsw-alias-label-secondary': n(48, sat * 0.3),
            '--dsw-alias-state-error-primary': '#d64545',
            '--dsw-alias-state-success-primary': '#2e9e6b',
            '--dsw-alias-state-warn-primary': '#d98e2b',
            '--dsw-specific-sidebar-fill': n(94, sat * 0.5),
          },
          dark: {
            '--dsw-alias-bg-base': n(12, sat * 0.7),
            '--dsw-alias-bg-layer-1': n(16, sat * 0.6),
            '--dsw-alias-bg-layer-2': n(20, sat * 0.6),
            '--dsw-alias-bg-overlay': n(18, sat * 0.6),
            '--dsw-alias-border-l1': n(26, sat * 0.5),
            '--dsw-alias-border-l2': n(34, sat * 0.55),
            '--dsw-alias-brand-primary': n(65, sat),
            '--dsw-alias-label-primary': n(92, sat * 0.4),
            '--dsw-alias-label-secondary': n(66, sat * 0.3),
            '--dsw-alias-state-error-primary': '#f07a7a',
            '--dsw-alias-state-success-primary': '#54c491',
            '--dsw-alias-state-warn-primary': '#eab05c',
            '--dsw-specific-sidebar-fill': n(13, sat * 0.65),
          },
        };
      }

      var KEYWORD_THEMES = [
        { match: ['赛博朋克', '霓虹', 'cyberpunk', 'neon'], hue: 300, sat: 70, name: '赛博朋克霓虹' },
        { match: ['抹茶', '日式', '茶', 'matcha'], hue: 90, sat: 42, name: '日式抹茶' },
        { match: ['胶片', '复古', '怀旧', 'retro', 'vintage'], hue: 35, sat: 55, name: '复古胶片' },
        { match: ['樱花', '粉', '少女', 'sakura', 'pink'], hue: 340, sat: 60, name: '樱花粉' },
        { match: ['深海', '海洋', '蓝', 'blue', 'ocean', '天空', '青空'], hue: 210, sat: 60, name: '深海蓝' },
        { match: ['森林', '自然', '绿', 'green', 'forest'], hue: 140, sat: 45, name: '森林绿' },
        { match: ['日落', '黄昏', '暖', '橙', 'orange', 'sunset'], hue: 25, sat: 70, name: '暖阳橙' },
        { match: ['薰衣草', '紫', 'lavender', 'purple'], hue: 265, sat: 50, name: '薰衣草紫' },
        { match: ['薄荷', '清爽', 'mint'], hue: 155, sat: 40, name: '薄荷绿' },
        { match: ['莓果', '红', 'berry', 'red', '热情'], hue: 0, sat: 60, name: '莓果红' },
        { match: ['柠檬', '黄', '明亮', 'lemon', 'yellow'], hue: 55, sat: 75, name: '柠檬黄' },
        { match: ['拿铁', '咖啡', '棕', '奶油', 'coffee', 'latte', 'brown'], hue: 32, sat: 45, name: '奶油拿铁' },
        { match: ['极光', '青', 'aurora', 'teal', 'cyan'], hue: 185, sat: 55, name: '极光青' },
        { match: ['石墨', '灰', '高级', '简约', '黑白', '极简', 'graphite', 'gray', 'grey', 'mono'], hue: 220, sat: 8, name: '石墨灰' },
        { match: ['暗黑', '黑夜', '墨', '黑', 'dark', '深夜'], hue: 230, sat: 30, name: '暗夜黑' },
      ];

      function paletteFromText(text) {
        var t = String(text || '').trim();
        if (t === '') return null;
        var lower = t.toLowerCase();
        for (var i = 0; i < KEYWORD_THEMES.length; i++) {
          var th = KEYWORD_THEMES[i];
          for (var j = 0; j < th.match.length; j++) {
            if (lower.indexOf(th.match[j].toLowerCase()) !== -1) {
              var skin = makePalette(th.hue, th.sat);
              skin.name = th.name;
              return skin;
            }
          }
        }
        var skin2 = makePalette(textToHue(t), 55);
        skin2.name = t.slice(0, 12);
        return skin2;
      }

      // 图片取色：Canvas 采样，按饱和度加权做色相直方图，取主导彩色
      function extractPaletteFromImage(img) {
        if (typeof document === 'undefined') return null;
        var size = 64;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var g = canvas.getContext('2d');
        if (!g) return null;
        try { g.drawImage(img, 0, 0, size, size); } catch (e) { return null; }
        var data;
        try { data = g.getImageData(0, 0, size, size).data; } catch (e) { return null; }
        var bins = new Array(36), satSums = new Array(36), counts = new Array(36);
        for (var i = 0; i < 36; i++) { bins[i] = 0; satSums[i] = 0; counts[i] = 0; }
        for (var j = 0; j < data.length; j += 4) {
          if (data[j + 3] < 128) continue;
          var r = data[j] / 255, gg = data[j + 1] / 255, b = data[j + 2] / 255;
          var max = Math.max(r, gg, b), min = Math.min(r, gg, b);
          var l = (max + min) / 2;
          var d = max - min;
          var s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
          if (s < 0.18) continue;
          if (l < 0.15 || l > 0.9) continue;
          var h;
          if (d === 0) h = 0;
          else if (max === r) h = 60 * (((gg - b) / d) % 6);
          else if (max === gg) h = 60 * ((b - r) / d + 2);
          else h = 60 * ((r - gg) / d + 4);
          if (h < 0) h += 360;
          var bin = Math.floor(h / 10) % 36;
          bins[bin] += s * (0.3 + l);
          satSums[bin] += s;
          counts[bin]++;
        }
        var best = 0;
        for (var k = 1; k < 36; k++) if (bins[k] > bins[best]) best = k;
        if (bins[best] === 0) return null;
        var hue = Math.round(best * 10 + 5);
        var sat = counts[best] > 0 ? Math.round((satSums[best] / counts[best]) * 100) : 55;
        sat = Math.max(25, Math.min(85, sat));
        return { hue: hue, sat: sat };
      }

      // 预设皮肤，或 'nl:<描述>' / 'img:<色相>:<饱和度>' 生成的皮肤
      function getSkin(id) {
        if (!id || id === 'default') return null;
        if (SKINS[id] !== undefined) return SKINS[id];
        if (typeof id === 'string' && id.indexOf('nl:') === 0) return paletteFromText(id.slice(3));
        if (typeof id === 'string' && id.indexOf('img:') === 0) {
          var p = id.split(':');
          var hue = parseInt(p[1], 10);
          var sat = parseInt(p[2], 10);
          if (isFinite(hue) && isFinite(sat)) {
            var s3 = makePalette(hue, sat);
            s3.name = '图片取色';
            return s3;
          }
        }
        return null;
      }

      function readStored() {
        try {
          var v = localStorage.getItem(STORE_KEY);
          if (v === 'default') return 'default';
          if (v && SKINS[v]) return v;
          if (typeof v === 'string' && (v.indexOf('nl:') === 0 || v.indexOf('img:') === 0)) return v;
        } catch (e) {}
        return 'default';
      }
      function writeStored(id) {
        try { localStorage.setItem(STORE_KEY, id); } catch (e) {}
      }

      var disposeTokens = null;
      var CURRENT_SKIN_ID = null;

      function activeScheme() {
        if (theme === undefined) return 'light';
        try { return theme.getTheme().active.colorScheme || 'light'; } catch (e) { return 'light'; }
      }

      function currentTokenValue(varName) {
        if (CURRENT_SKIN_ID === null || CURRENT_SKIN_ID === 'default') return undefined;
        var skin = getSkin(CURRENT_SKIN_ID);
        if (skin === null || skin === undefined) return undefined;
        var s = skin[activeScheme()];
        return s === undefined ? undefined : s[varName];
      }

      // 界面控件联动：应用除 13 个别名令牌外还消费一批派生令牌
      // （输入框 --dsw-specific-input-major、气泡 --dsw-specific-bubble、
      //  按钮 --dsw-alias-button-*、状态渐变 --dsw-static-deepseek-* 等）。
      // 用 inline !important 直接写 html/body，与令牌层双保险，必生效。
      function applyDerivedCss() {
        if (typeof document === 'undefined') return;
        var els = [];
        if (document.documentElement) els.push(document.documentElement);
        if (document.body) els.push(document.body);
        var layer1 = currentTokenValue('--dsw-alias-bg-layer-1');
        var layer2 = currentTokenValue('--dsw-alias-bg-layer-2');
        var base = currentTokenValue('--dsw-alias-bg-base');
        var brand = currentTokenValue('--dsw-alias-brand-primary');
        var scheme = activeScheme();
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (layer1 !== undefined) {
            el.style.setProperty('--dsw-specific-input-major', layer1, 'important');
            el.style.setProperty('--dsw-specific-login-input', layer1, 'important');
          } else {
            el.style.removeProperty('--dsw-specific-input-major');
            el.style.removeProperty('--dsw-specific-login-input');
          }
          if (brand !== undefined && layer1 !== undefined) {
            el.style.setProperty('--dsw-specific-bubble', 'color-mix(in srgb, ' + brand + ' 10%, ' + layer1 + ')', 'important');
          } else {
            el.style.removeProperty('--dsw-specific-bubble');
          }
          if (brand !== undefined) {
            el.style.setProperty('--dsw-specific-bubble-highlight', brand, 'important');
          } else {
            el.style.removeProperty('--dsw-specific-bubble-highlight');
          }
          if (layer2 !== undefined) {
            el.style.setProperty('--dsw-specific-selector', layer2, 'important');
            el.style.setProperty('--dsw-specific-tip', layer2, 'important');
          } else {
            el.style.removeProperty('--dsw-specific-selector');
            el.style.removeProperty('--dsw-specific-tip');
          }
          if (brand !== undefined && layer1 !== undefined) {
            el.style.setProperty('--dsw-alias-button-elevated-fill', 'color-mix(in srgb, ' + brand + ' 20%, ' + layer1 + ')', 'important');
          } else {
            el.style.removeProperty('--dsw-alias-button-elevated-fill');
          }
          if (brand !== undefined) {
            el.style.setProperty('--dsw-alias-button-info-fill', brand, 'important');
            el.style.setProperty('--dsw-alias-button-info-hover', brand, 'important');
            el.style.setProperty('--dsw-alias-button-primary-hover', brand, 'important');
            el.style.setProperty('--dsw-alias-state-business-primary', brand, 'important');
            el.style.setProperty('--dsw-static-deepseek-500', brand, 'important');
            el.style.setProperty('--dsw-static-deepseek-200', brand, 'important');
          } else {
            el.style.removeProperty('--dsw-alias-button-info-fill');
            el.style.removeProperty('--dsw-alias-button-info-hover');
            el.style.removeProperty('--dsw-alias-button-primary-hover');
            el.style.removeProperty('--dsw-alias-state-business-primary');
            el.style.removeProperty('--dsw-static-deepseek-500');
            el.style.removeProperty('--dsw-static-deepseek-200');
          }
          if (layer1 !== undefined && base !== undefined) {
            if (scheme === 'dark') {
              el.style.setProperty('--dsw-alias-bg-base', 'color-mix(in srgb, ' + base + ' 92%, #8f9098 8%)', 'important');
            } else {
              el.style.setProperty('--dsw-alias-bg-base', 'color-mix(in srgb, ' + layer1 + ' 35%, ' + base + ')', 'important');
            }
          } else {
            el.style.removeProperty('--dsw-alias-bg-base');
          }
        }
      }

      function clearDerivedCss() {
        if (typeof document === 'undefined') return;
        var els = [];
        if (document.documentElement) els.push(document.documentElement);
        if (document.body) els.push(document.body);
        var names = [
          '--dsw-specific-input-major', '--dsw-specific-login-input',
          '--dsw-specific-bubble', '--dsw-specific-bubble-highlight',
          '--dsw-specific-selector', '--dsw-specific-tip',
          '--dsw-alias-button-elevated-fill',
          '--dsw-alias-button-info-fill', '--dsw-alias-button-info-hover',
          '--dsw-alias-button-primary-hover', '--dsw-alias-state-business-primary',
          '--dsw-static-deepseek-500', '--dsw-static-deepseek-200',
          '--dsw-alias-bg-base'
        ];
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          for (var n = 0; n < names.length; n++) {
            el.style.removeProperty(names[n]);
          }
        }
      }

      function applySkin(id) {
        if (disposeTokens) {
          try { disposeTokens(); } catch (e) {}
          disposeTokens = null;
        }
        clearDerivedCss();
        var skin = getSkin(id);
        CURRENT_SKIN_ID = skin ? id : null;
        if (skin) {
          var tokens = {};
          var keys = Object.keys(skin.light);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            tokens[k] = { light: skin.light[k], dark: skin.dark[k] };
          }
          // 派生令牌：输入框背景、状态渐变跟随皮肤
          tokens['--dsw-specific-input-major'] = { light: skin.light['--dsw-alias-bg-layer-1'], dark: skin.dark['--dsw-alias-bg-layer-1'] };
          tokens['--dsw-static-deepseek-500'] = { light: skin.light['--dsw-alias-brand-primary'], dark: skin.dark['--dsw-alias-brand-primary'] };
          tokens['--dsw-static-deepseek-200'] = { light: skin.light['--dsw-alias-brand-primary'], dark: skin.dark['--dsw-alias-brand-primary'] };
          disposeTokens = theme.overrideTokens(SOURCE, tokens);
          applyDerivedCss();
        }
        writeStored(id || 'default');
      }

      // 亮暗切换 / 主题变化时重算界面控件令牌
      ctx.effect(function () {
        return ctx.on('theme/change', function () { applyDerivedCss(); });
      });

      // 启动时恢复上次选择的皮肤
      applySkin(readStored());

      function SkinRow() {
        var openState = React.useState(false);
        var open = openState[0];
        var setOpen = openState[1];
        var activeState = React.useState(readStored());
        var active = activeState[0];
        var setActive = activeState[1];
        var textState = React.useState('');
        var text = textState[0];
        var setText = textState[1];

        var generate = function () {
          var t = text.replace(/^\s+|\s+$/g, '');
          if (t === '') return;
          choose('nl:' + t);
          setText('');
        };
        var imgUrlState = React.useState('');
        var imgUrl = imgUrlState[0];
        var setImgUrl = imgUrlState[1];
        var hintState = React.useState('');
        var hint = hintState[0];
        var setHint = hintState[1];

        var applyFromImage = function (img) {
          var pal = extractPaletteFromImage(img);
          if (!pal) { setHint('未能从图片提取颜色（可能跨域受限或图片无彩色）'); return; }
          setHint('');
          choose('img:' + pal.hue + ':' + pal.sat);
        };
        var handleFile = function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function () {
            var img = document.createElement('img');
            img.onload = function () { applyFromImage(img); };
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        };
        var loadUrl = function () {
          var u = imgUrl.replace(/^\s+|\s+$/g, '');
          if (u === '') return;
          var img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          img.onload = function () { applyFromImage(img); };
          img.onerror = function () { setHint('图片加载失败（可能跨域受限）'); };
          img.src = u;
        };

        var choose = function (id) {
          applySkin(id);
          setActive(id);
          if (connection) {
            connection.rpc.call('/dsh-skin-picker', 'config', { op: 'set', active: id }).catch(function () {});
          }
        };

        // 挂载时从服务器拉取皮肤选择，跨设备同步（localStorage 仅作即时缓存）
        React.useEffect(function () {
          if (!connection) return;
          var cancelled = false;
          connection.rpc.call('/dsh-skin-picker', 'config', { op: 'get' }).then(function (res) {
            if (cancelled) return;
            var serverActive = res && res.ok && res.value ? res.value.active : undefined;
            if (serverActive && getSkin(serverActive) && serverActive !== readStored()) {
              applySkin(serverActive);
              setActive(serverActive);
            }
          }).catch(function () {});
          return function () { cancelled = true; };
        }, []);

        var activeSkin = getSkin(active);
        var current = activeSkin ? activeSkin.name : '默认';

        var swatches = [];
        for (var i = 0; i < ORDER.length; i++) {
          var id = ORDER[i];
          var s = SKINS[id];
          swatches.push(el('button', {
            key: id,
            type: 'button',
            className: 'dshsp-swatch' + (active === id ? ' active' : ''),
            onClick: function (sid) { return function () { choose(sid); }; }(id),
            title: s.name,
          },
            el('span', { className: 'dshsp-dot', style: { background: s.light['--dsw-alias-brand-primary'] } }),
            el('span', { className: 'dshsp-sname' }, s.name),
          ));
        }
        swatches.push(el('button', {
          key: 'default',
          type: 'button',
          className: 'dshsp-swatch' + (active === 'default' ? ' active' : ''),
          onClick: function () { choose('default'); },
          title: '恢复默认',
        },
          el('span', { className: 'dshsp-dot dshsp-dot-default' }),
          el('span', { className: 'dshsp-sname' }, '恢复默认'),
        ));

        return el('div', { className: 'dshsp-row' },
          el('button', {
            className: 'dshsp-head',
            type: 'button',
            onClick: function () { setOpen(!open); },
            'aria-expanded': open,
          },
            el('span', { className: 'dshsp-label' }, '皮肤'),
            el('span', { className: 'dshsp-value' }, current),
            el('span', { className: 'dshsp-chev' + (open ? ' open' : '') }, '▾'),
          ),
          open
            ? el('div', { className: 'dshsp-body' },
                el('div', { className: 'dshsp-nl' },
                  el('input', {
                    className: 'dshsp-nl-input',
                    type: 'text',
                    value: text,
                    placeholder: '描述配色，如「赛博朋克霓虹」「日式抹茶」…',
                    onChange: function (e) { setText(e.target.value); },
                    onKeyDown: function (e) { if (e.key === 'Enter') generate(); },
                  }),
                  el('button', { className: 'dshsp-nl-btn', type: 'button', onClick: generate }, '生成'),
                ),
                el('div', { className: 'dshsp-img' },
                  el('label', { className: 'dshsp-img-btn' },
                    '选择图片',
                    el('input', {
                      type: 'file',
                      accept: 'image/*',
                      style: { display: 'none' },
                      onChange: handleFile,
                    }),
                  ),
                  el('input', {
                    className: 'dshsp-nl-input',
                    type: 'text',
                    value: imgUrl,
                    placeholder: '或粘贴图片 URL',
                    onChange: function (e) { setImgUrl(e.target.value); },
                    onKeyDown: function (e) { if (e.key === 'Enter') loadUrl(); },
                  }),
                  el('button', { className: 'dshsp-nl-btn', type: 'button', onClick: loadUrl }, '取色'),
                ),
                hint ? el('div', { className: 'dshsp-hint' }, hint) : null,
                el('div', { className: 'dshsp-grid' }, swatches),
              )
            : null,
        );
      }

      slots.inject('settings.general.item', function () {
        return slots.register(
          { name: 'settings.general.item', id: 'skin-picker', order: 16, label: '皮肤' },
          function () { return el(SkinRow); },
        );
      });
    }

    exports.apply = apply;
    exports.inject = ['slots', 'theme'];
    return module.exports;
  },
});

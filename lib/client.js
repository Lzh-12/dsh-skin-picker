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

      function readStored() {
        try {
          var v = localStorage.getItem(STORE_KEY);
          if (v && SKINS[v]) return v;
        } catch (e) {}
        return 'default';
      }
      function writeStored(id) {
        try { localStorage.setItem(STORE_KEY, id); } catch (e) {}
      }

      var disposeTokens = null;
      function applySkin(id) {
        if (disposeTokens) {
          try { disposeTokens(); } catch (e) {}
          disposeTokens = null;
        }
        var skin = SKINS[id];
        if (skin) {
          var tokens = {};
          var keys = Object.keys(skin.light);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            tokens[k] = { light: skin.light[k], dark: skin.dark[k] };
          }
          disposeTokens = theme.overrideTokens(SOURCE, tokens);
        }
        writeStored(id || 'default');
      }

      // 启动时恢复上次选择的皮肤
      applySkin(readStored());

      function SkinRow() {
        var openState = React.useState(false);
        var open = openState[0];
        var setOpen = openState[1];
        var activeState = React.useState(readStored());
        var active = activeState[0];
        var setActive = activeState[1];

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
            if (serverActive && SKINS[serverActive] && serverActive !== readStored()) {
              applySkin(serverActive);
              setActive(serverActive);
            }
          }).catch(function () {});
          return function () { cancelled = true; };
        }, []);

        var current = SKINS[active] ? SKINS[active].name : '默认';

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

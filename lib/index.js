// dsh-skin-picker host half：跨设备同步的持久化通道。
// 1. 在用户设置文档注册 `skin-picker` 命名空间（settings.yaml 的 `skin-picker` 段），
//    作为进程内/跨设备持久化通道；
// 2. 注册配置 RPC 通道 `/dsh-skin-picker`（endpoint `config`），供客户端插件读写皮肤选择。
//    走 connection 服务的自定义通道而不是 settings 网关——当前版本的 settings 网关
//    只对硬编码白名单内的命名空间开放，第三方命名空间会被 `settings-not-exposed` 拒绝。
import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";

/** 插件显示名（诊断信息中标识插件）。 */
export const name = "dsh-skin-picker";

/** 设置命名空间（小写 kebab-case）。 */
const SKIN_NAMESPACE = settingsNamespace("skin-picker");

/** 持久化皮肤设置：active 为皮肤 id（'default' 表示官方默认）。 */
const SkinSettingsSchema = z.object({
  active: z.string().default("default"),
});

/** 归一化一份设置片段（容忍手改设置文档产生的脏数据）。 */
function normalizeSection(section) {
  return { active: typeof section?.active === "string" ? section.active : "default" };
}

/** RPC 错误响应构造。 */
function rpcError(code, message) {
  return { ok: false, error: { code, message, details: {} } };
}

export function apply(ctx) {
  let scope;

  ctx.inject(["settings"], (settingsCtx) => {
    scope = settingsCtx.settings.register(SKIN_NAMESPACE, SkinSettingsSchema);
  });

  ctx.inject(["connection"], (connCtx) => {
    connCtx.effect(() => connCtx.connection.rpc.handle("/dsh-skin-picker", async (endpoint, payload) => {
      if (endpoint !== "config") {
        return rpcError("not-found", `dsh-skin-picker: unknown endpoint "${endpoint}"`);
      }
      if (scope === void 0) {
        return rpcError("service-unavailable", "dsh-skin-picker: settings service is not mounted");
      }
      if (payload?.op === "get") {
        return { ok: true, value: normalizeSection(scope.get()) };
      }
      if (payload?.op === "set") {
        const current = normalizeSection(scope.get());
        const active = typeof payload.active === "string" ? payload.active : current.active;
        try {
          await scope.replace({ active });
        } catch (error) {
          return rpcError("rejected", error instanceof Error ? error.message : String(error));
        }
        return { ok: true, value: normalizeSection(scope.get()) };
      }
      return rpcError("bad-request", 'dsh-skin-picker: op must be "get" or "set"');
    }, {}), "dsh-skin-picker: config rpc channel");
  });
}

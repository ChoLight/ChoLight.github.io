import type {
	BookConfig,
	BookFallbackKind,
	BookProvider,
	BookSourceKind,
	ResolvedBookOptions,
} from "../types/bookConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";
/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shirone 书单页面配置（由animeConfig改造而来）
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * - 本地模式 (local)：完全离线，直接使用 `src/data/books.ts`，零网络请求；
 * - 所有书籍条目可配置豆瓣读书链接 `doubanUrl`，点击跳转豆瓣读书详情页；
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 【常用配置场景】
 * ─────────────────────────────────────────────────────────────────────────────
 * 场景 A：本地手写书单（推荐，稳定）
 *   ```ts
 *   source: { kind: "local" }
 *   ```
 */
export const booksConfig: BookConfig = withUserConfig("books", {
	/** 是否启用书单页；false 时导航入口同步隐藏，访问 /books/ 跳转 404 */
	enable: true,
	title: "$t:books",
	description: "$t:booksBanner",
	/** 主数据源选择 */
	source: {
		kind: "local",
	},
	/** 异常降级策略 */
	fallback: {
		kind: "local",
	},
	/** 外部数据源（目前仅预留，Shirone原生没有豆瓣抓取脚本，只能local手动写） */
	providers: {
		douban: {
			enable: false,
		},
	},
	/** 快照存储（预留，暂时不用） */
	snapshot: {
		directory: "src/data/book-snapshots",
		staleAfterDays: 30,
		keepLastValid: true,
	},
});
const SAFE_FILENAME_PATTERN = /^[a-zA-Z0-9_-]+\.json$/;
/**
 * 校验并解析 Book 配置，返回只读的标准选项
 */
export function resolveBookOptions(config: BookConfig): ResolvedBookOptions {
	const enable = Boolean(config.enable);
	const fallback: BookFallbackKind =
		config.fallback?.kind === "empty" ? "empty" : "local";
	const directory =
		typeof config.snapshot?.directory === "string" &&
		config.snapshot.directory.trim() &&
		!config.snapshot.directory.includes("..")
			? config.snapshot.directory.trim().replace(/[\\/]+$/, "")
			: "src/data/book-snapshots";
	const staleAfterDays =
		typeof config.snapshot?.staleAfterDays === "number" &&
		Number.isFinite(config.snapshot.staleAfterDays) &&
		config.snapshot.staleAfterDays > 0
			? Math.floor(config.snapshot.staleAfterDays)
			: 30;
	const keepLastValid = config.snapshot?.keepLastValid ?? true;
	const rawKind = config.source?.kind;
	let kind: BookSourceKind = "local";
	let provider: BookProvider | undefined;
	let file: string | undefined;
	if (rawKind === "snapshot") {
		const rawProvider = config.source?.provider;
		if (rawProvider === "douban") {
			provider = rawProvider;
		}
		const rawFile = config.source?.file?.trim();
		if (
			rawFile &&
			SAFE_FILENAME_PATTERN.test(rawFile)
		) {
			file = rawFile;
		} else if (provider) {
			file = `${provider}.json`;
		}
		const fetchOnDev = config.source?.fetchOnDev ?? true;
		if (file) {
			kind = "snapshot";
		}
		return Object.freeze({
			enable,
			source: Object.freeze({
				kind,
				...(provider ? { provider } : {}),
				...(file ? { file } : {}),
				fetchOnDev,
			}),
			fallback,
			snapshot: Object.freeze({
				directory,
				staleAfterDays,
				keepLastValid,
			}),
		});
	}
	return Object.freeze({
		enable,
		source: Object.freeze({
			kind,
			...(provider ? { provider } : {}),
			...(file ? { file } : {}),
			fetchOnDev: config.source?.fetchOnDev ?? true,
		}),
		fallback,
		snapshot: Object.freeze({
			directory,
			staleAfterDays,
			keepLastValid,
		}),
	});
}
export const resolvedBookOptions: ResolvedBookOptions =
	resolveBookOptions(booksConfig);

import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/cat2.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "常寂光",
	bio: "生命不息，创作不止。",
	links: [
		{
			name: "QQ",
			icon: "fa7-brands:qq", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://h5.qzone.qq.com/mqzone/profile?hostuin=1072069114",
		},
		{
			name: "Weibo",
			icon: "mdi:sina-weibo",
			url: "https://weibo.com/u/7831446631",
		},
		{
			name: "Ao3",
			icon: "cib:archive-of-our-own",
			url: "https://archiveofourown.org/users/Cho_Light",
		},
		{
			name: "Xiaohongshu",
			icon: "simple-icons:xiaohongshu",
			url: "https://www.xiaohongshu.com/user/profile/635e23b7000000001901cca4",
		},
	],
});

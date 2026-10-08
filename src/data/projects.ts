/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "hui-fan-bi-an-hua",
		title: "回返彼岸花",
		summary:
			"最终幻想十四武士中心图文合志。
			负责作品：《风光大葬》",
		category: "theme",
		phase: "shipped",
		technologies: ["同人", "合志"],
		cover: "/assets/images/00184f15-5f85-482b-bf53-5e6981a9aa27.webp",
		coverAlt: "封面替代文本", 
		featured: true,
		repository: "https://www.allcpp.cn/d/863720.do#tabType=2",
		year: "2024",
	}
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}

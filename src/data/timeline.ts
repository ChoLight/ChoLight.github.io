/**
 * 时间线页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/timelineConfig.ts 控制。
 */
import type { TimelineItem } from "@/types/timelineConfig";

export const timelineData: TimelineItem[] = [
	{
		title: "建立了我的第一个博客",
		date: "2026.10.8",
		category: "milestone",
		highlights: [
			"添加了目前已有的文章、系列、项目",
  ],
  tags: ["博客网站"],
	}
];

/** 获取所有时间线数据列表 */
export function getTimelineList(): TimelineItem[] {
	return timelineData;
}

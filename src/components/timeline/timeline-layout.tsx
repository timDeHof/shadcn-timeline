"use client";

import React from "react";
import {
	Timeline,
	TimelineItem,
} from "@/components/timeline/timeline";
import { TimelineElement } from "@/app/data";

interface TimelineLayoutProps {
	items: TimelineElement[];
	size?: "sm" | "md" | "lg";
	iconColor?: "primary" | "secondary" | "muted" | "accent";
	customIcon?: React.ReactNode;
	animate?: boolean;
    connectorColor?: "primary" | "secondary" | "muted" | "accent";
    className?: string;
}
export const TimelineLayout = ({
	items,
	size = "md",
	iconColor,
	customIcon,
	animate = true,
    connectorColor,
    className,
}: TimelineLayoutProps) => {
	return (
		<Timeline size={size} className={className}>
			{[...items].reverse().map((item, index) => (
				<TimelineItem
					key={index}
					date={item.date}
					title={item.title}
						description={item.description}
						icon={item.icon || customIcon}
						iconColor={item.color as typeof iconColor || iconColor}
						connectorColor={item.color as typeof connectorColor || connectorColor}
						showConnector={index !== items.length - 1}
						initial={animate ? { opacity: 0, y: 20 } : undefined}
						animate={animate ? { opacity: 1, y: 0 } : undefined}
						transition={{
							duration: 0.5,
							delay: index * 0.1,
							ease: "easeOut"
						}}
				/>
			))}
		</Timeline>
	);
};

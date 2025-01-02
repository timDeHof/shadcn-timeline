"use client";

import React from "react";
import {
	Timeline,
	TimelineItem,
} from "@/components/timeline/timeline";
import { TimelineElement } from "@/app/data";
import { motion } from "framer-motion";

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
				<motion.div
					initial={animate ? { opacity: 0, y: 20 } : false}
					animate={animate ? { opacity: 1, y: 0 } : false}
					transition={{
						duration: 0.5,
						delay: index * 0.1,
						ease: "easeOut"
					}}>
					<TimelineItem
						key={index}
						date={item.date}
						title={item.title}
						description={item.description}
						icon={item.icon || customIcon}
						iconColor={(item.color || iconColor) as "primary" | "secondary" | "muted" | "accent" | undefined}
						connectorColor={(item.color || connectorColor) as "primary" | "secondary" | "muted" | "accent" | undefined}
						showConnector={index !== items.length - 1}
					/>
				</motion.div>
			))}
		</Timeline>
	);
};

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const timelineVariants = cva("flex flex-col", {
	variants: {
		size: {
			sm: "gap-4",
			md: "gap-6",
			lg: "gap-8",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface TimelineProps
	extends React.HTMLAttributes<HTMLOListElement>,
		VariantProps<typeof timelineVariants> {
	iconsize?: "sm" | "md" | "lg";
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
	({ className, iconsize, children, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				timelineVariants({ className }),
				"flex min-h-80 w-full justify-center items-center",
			)}
			{...props}>
			{React.Children.map(children, (child, index) => {
				if (
					React.isValidElement(child) &&
					typeof child.type !== "string" &&
					"displayName" in child.type &&
					child.type.displayName === "TimelineItem"
				) {
					return React.cloneElement(child, {
						iconsize,
					} as any);
				}
				return child;
			})}
		</ol>
	),
);
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
	HTMLLIElement,
	Omit<HTMLMotionProps<"li">, "ref"> & {
		date?: string;
		title?: string;
		description?: string;
		icon?: React.ReactNode;
		iconColor?: "primary" | "secondary" | "muted" | "accent";
		status?: "completed" | "in-progress" | "pending";
		connectorColor?: "primary" | "secondary" | "muted" | "accent";
		showConnector?: boolean;
		iconsize?: "sm" | "md" | "lg";
	}
>(
	(
		{
			className,
			date,
			title,
			description,
			icon,
			iconColor,
			status,
			connectorColor,
			showConnector = true,
			iconsize,
			initial,
			animate,
			transition,
			...props
		},
		ref,
	) => {
		const commonClassName = cn(
			"relative",
			" rounded-lg transition-colors duration-200",
			"w-fit",
			className,
		);

		const content = (
			<div className='grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4'>
				{/* Date */}
				<TimelineTime className="text-right pr-4">{date}</TimelineTime>

				{/* Timeline dot and connector */}
				<div className='mx-3 flex flex-col h-full w-6 items-center justify-start gap-y-2'>
					<TimelineIcon
						icon={icon}
						color={iconColor}
						status={status}
						iconSize={iconsize}
					/>

					{showConnector && (
						<TimelineConnector
							status={status}
							color={connectorColor}
							className='h-full'
						/>
					)}
				</div>

				{/* Content */}
				<TimelineContent>
					<TimelineHeader>
						<TimelineTitle>{title}</TimelineTitle>
					</TimelineHeader>
					<TimelineDescription>{description}</TimelineDescription>
				</TimelineContent>
			</div>
		);

		return animate ? (
			<motion.li
				ref={ref}
				className={commonClassName}
				initial={initial}
				animate={animate}
				transition={transition}
				{...props}>
				{content}
			</motion.li>
		) : (
			<li
				ref={ref}
				className={commonClassName}
				{...(() => {
					const {
						style,
						onDrag,
						onDragStart,
						onDragEnd,
						onAnimationStart,
						onAnimationComplete,
						transformTemplate,
						whileHover,
						whileTap,
						whileDrag,
						whileFocus,
						whileInView,
						...filteredProps
					} = props;
					return filteredProps;
				})()}>
				{content}
			</li>
		);
	},
);
TimelineItem.displayName = "TimelineItem";

const TimelineTime = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn(
			"text-sm font-medium tracking-tight text-muted-foreground",
			className,
		)}
		{...props}
	/>
));
TimelineTime.displayName = "TimelineTime";

const TimelineConnector = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		status?: "completed" | "in-progress" | "pending";
		color?: "primary" | "secondary" | "muted" | "accent";
	}
>(({ className, status = "completed", color, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"w-0.5",
			{
				"bg-primary": color === "primary" || (!color && status === "completed"),
				"bg-muted": color === "muted" || (!color && status === "pending"),
				"bg-secondary": color === "secondary",
				"bg-accent": color === "accent",
				"bg-gradient-to-b from-primary to-muted":
					!color && status === "in-progress",
			},
			className,
		)}
		{...props}
	/>
));
TimelineConnector.displayName = "TimelineConnector";

const TimelineHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center gap-4", className)}
		{...props}
	/>
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"font-semibold leading-none tracking-tight text-secondary-foreground",
			className,
		)}
		{...props}>
		{children}
	</h3>
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineIcon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		icon?: React.ReactNode;
		color?: "primary" | "secondary" | "muted" | "accent";
		status?: "completed" | "in-progress" | "pending";
		iconSize?: "sm" | "md" | "lg";
	}
>(
	(
		{ className, icon, color, status = "completed", iconSize, ...props },
		ref,
	) => (
		<div
			ref={ref}
			className={cn(
				"relative flex items-center justify-center rounded-full",
				"ring-8 ring-background aspect-square",
				{
					"bg-primary":
						(!color && status === "completed") || color === "primary",
					"bg-muted": (!color && status === "pending") || color === "muted",
					"bg-secondary": color === "secondary",
					"bg-accent": color === "accent",
					"h-6 w-6": iconSize === "sm" || !iconSize,
					"h-8 w-8": iconSize === "md",
					"h-10 w-10": iconSize === "lg",
				},
				className,
			)}
			{...props}>
			<div
				className={cn(
					"flex items-center justify-center text-primary-foreground",
					{
						"h-4 w-4": iconSize === "sm" || !iconSize,
						"h-5 w-5": iconSize === "md",
						"h-6 w-6": iconSize === "lg",
					},
				)}>
				{icon}
			</div>
		</div>
	),
);
TimelineIcon.displayName = "TimelineIcon";

const TimelineDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground max-w-sm", className)}
		{...props}
	/>
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col gap-2 pl-2", className)}
		{...props}
	/>
));
TimelineContent.displayName = "TimelineContent";

export {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
};

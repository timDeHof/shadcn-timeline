"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";

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

/**
 * Timeline component props interface
 * @interface TimelineProps
 * @extends {React.HTMLAttributes<HTMLOListElement>}
 * @extends {VariantProps<typeof timelineVariants>}
 */
interface TimelineProps
	extends React.HTMLAttributes<HTMLOListElement>,
		VariantProps<typeof timelineVariants> {
	/** Size of the timeline icons */
	iconsize?: "sm" | "md" | "lg";
}

/**
 * Timeline component for displaying a vertical list of events or items
 * @component
 */
const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
	({ className, iconsize, size, children, ...props }, ref) => {
		const items = React.Children.toArray(children);

		if (items.length === 0) {
			return <TimelineEmpty />;
		}

		return (
			<ol
				ref={ref}
				aria-label="Timeline"
				className={cn(
					timelineVariants({ size, className }),
					"flex min-h-80 w-full justify-center items-center"
				)}
				{...props}
			>
				{React.Children.map(children, (child, index) => {
					if (
						React.isValidElement(child) &&
						typeof child.type !== "string" &&
						"displayName" in child.type &&
						child.type.displayName === "TimelineItem"
					) {
						return React.cloneElement(child, {
							iconsize,
							showConnector: index !== items.length - 1,
						} as React.ComponentProps<typeof TimelineItem>);
					}
					return child;
				})}
			</ol>
		);
	}
);
Timeline.displayName = "Timeline";

/**
 * TimelineItem component props interface
 * @interface TimelineItemProps
 * @extends {Omit<HTMLMotionProps<"li">, "ref">}
 */
interface TimelineItemProps extends Omit<HTMLMotionProps<"li">, "ref"> {
	/** Date string for the timeline item */
	date?: string;
	/** Title of the timeline item */
	title?: string;
	/** Description text */
	description?: string;
	/** Custom icon element */
	icon?: React.ReactNode;
	/** Color theme for the icon */
	iconColor?: "primary" | "secondary" | "muted" | "accent";
	/** Current status of the item */
	status?: "completed" | "in-progress" | "pending";
	/** Color theme for the connector line */
	connectorColor?: "primary" | "secondary" | "muted" | "accent";
	/** Whether to show the connector line */
	showConnector?: boolean;
	/** Size of the icon */
	iconsize?: "sm" | "md" | "lg";
	/** Loading state */
	loading?: boolean;
	/** Error message */
	error?: string;
}

const TimelineItem = React.forwardRef<
	HTMLLIElement,
	TimelineItemProps
>(({
	className,
	date,
	title,
	description,
	icon,
	iconColor,
	status = "completed",
	connectorColor,
	showConnector = true,
	iconsize,
	loading,
	error,
	initial,
	animate,
	transition,
	...props
}, ref) => {
	const commonClassName = cn(
		"relative rounded-lg transition-colors duration-200 w-fit",
		className
	);

	// Loading State
	if (loading) {
		return (
			<motion.li
				ref={ref}
				className={commonClassName}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				role="status"
				{...props}
			>
				<div className="grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4">
					<div className="text-right pr-4">
						<div className="h-4 w-16 bg-muted rounded animate-pulse" />
					</div>

					<div className="mx-3 flex flex-col items-center justify-start gap-y-2">
						<div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-8 ring-background animate-pulse">
							<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
						</div>
						{showConnector && (
							<div className="h-full w-0.5 bg-muted animate-pulse" />
						)}
					</div>

					<div className="flex flex-col gap-2 pl-2">
						<div className="space-y-2">
							<div className="h-4 w-24 bg-muted rounded animate-pulse" />
							<div className="h-3 w-48 bg-muted rounded animate-pulse" />
						</div>
					</div>
				</div>
			</motion.li>
		);
	}

	// Error State
	if (error) {
		return (
			<motion.li
				ref={ref}
				className={cn(commonClassName, "border border-destructive/50 bg-destructive/10")}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				role="alert"
				{...props}
			>
				<div className="grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4">
					<div className="text-right pr-4">
						<TimelineTime className="text-destructive">{date}</TimelineTime>
					</div>

					<div className="mx-3 flex flex-col items-center justify-start gap-y-2">
						<div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 ring-8 ring-background">
							<AlertCircle className="h-4 w-4 text-destructive" />
						</div>
						{showConnector && (
							<TimelineConnector status="pending" className="h-full" />
						)}
					</div>

					<div className="flex flex-col gap-2 pl-2">
						<TimelineHeader>
							<TimelineTitle className="text-destructive">{title || "Error"}</TimelineTitle>
						</TimelineHeader>
						<TimelineDescription className="text-destructive">
							{error}
						</TimelineDescription>
					</div>
				</div>
			</motion.li>
		);
	}

	const content = (
		<div className='grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4'
			{...(status === 'in-progress' ? { 'aria-current': 'step' } : {})}>
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

	// Filter out Framer Motion specific props
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

	return (
		<li
			ref={ref}
			className={commonClassName}
			{...filteredProps}
		>
			{content}
		</li>
	);
});
TimelineItem.displayName = "TimelineItem";

interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
	/** Date string, Date object, or timestamp */
	date?: string | Date | number;
	/** Optional format for displaying the date (defaults to localized string) */
	format?: string | Intl.DateTimeFormatOptions;
}

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
	({ className, date, format, children, ...props }, ref) => {
		const [mounted, setMounted] = React.useState(false);

		// First useMemo hook
		const formattedDate = React.useMemo(() => {
			if (!date) return '';
			const dateObj = new Date(date);
			return dateObj.toLocaleDateString();
		}, [date]);

		// Then useEffect hook
		React.useEffect(() => {
			setMounted(true);
		}, []);

		if (!mounted) {
			return (
				<time
					ref={ref}
					dateTime={date ? new Date(date).toISOString() : undefined}
					className={cn(
						"text-sm font-medium tracking-tight text-muted-foreground",
						className,
					)}
					{...props}
				>
					{children || (date ? new Date(date).toISOString() : '')}
				</time>
			);
		}

		return (
			<time
				ref={ref}
				dateTime={date ? new Date(date).toISOString() : undefined}
				className={cn(
					"text-sm font-medium tracking-tight text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children || formattedDate}
			</time>
		);
	}
);
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
				"p-2.5 aspect-square",
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

const TimelineEmpty = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-col items-center justify-center p-8 text-center",
			className
		)}
		{...props}
	>
		<p className="text-sm text-muted-foreground">
			{children || "No timeline items to display"}
		</p>
	</div>
));
TimelineEmpty.displayName = "TimelineEmpty";

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
	TimelineEmpty,
};

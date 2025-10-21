import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { HTMLMotionProps } from 'framer-motion';
import { ClassValue } from 'clsx';

type TimelineSize = 'sm' | 'md' | 'lg';
type TimelineStatus = 'completed' | 'in-progress' | 'pending';
type TimelineColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
type TimelineElement = {
    id: number;
    date: string;
    title: string;
    description: string;
    icon?: ReactNode | (() => ReactNode);
    status?: TimelineStatus;
    color?: TimelineColor;
    size?: TimelineSize;
    loading?: boolean;
    error?: string;
};
type TimelineProps$1 = {
    items: TimelineElement[];
    size?: TimelineSize;
    animate?: boolean;
    iconColor?: TimelineColor;
    connectorColor?: TimelineColor;
    className?: string;
};

declare const timelineVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
/**
 * Timeline component props interface
 * @interface TimelineProps
 * @extends {React.HTMLAttributes<HTMLOListElement>}
 * @extends {VariantProps<typeof timelineVariants>}
 */
interface TimelineProps extends React.HTMLAttributes<HTMLOListElement>, VariantProps<typeof timelineVariants> {
    /** Size of the timeline icons */
    iconSize?: 'sm' | 'md' | 'lg';
}
/**
 * Timeline component for displaying a vertical list of events or items
 * @component
 */
declare const Timeline: React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLOListElement>>;
/**
 * TimelineItem component props interface
 * @interface TimelineItemProps
 * @extends {Omit<HTMLMotionProps<"li">, "ref">}
 */
interface TimelineItemProps extends Omit<HTMLMotionProps<'li'>, 'ref'> {
    /** Date string for the timeline item */
    date?: string;
    /** Title of the timeline item */
    title?: string;
    /** Description text */
    description?: string;
    /** Custom icon element */
    icon?: React.ReactNode | React.ElementType;
    /** Color theme for the icon */
    iconColor?: TimelineColor;
    /** Current status of the item */
    status?: 'completed' | 'in-progress' | 'pending';
    /** Color theme for the connector line */
    connectorColor?: TimelineColor;
    /** Whether to show the connector line */
    showConnector?: boolean;
    /** Size of the icon */
    iconSize?: 'sm' | 'md' | 'lg';
    /** Loading state */
    loading?: boolean;
    /** Error message */
    error?: string;
}
declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLLIElement>>;
interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
    /** Date string, Date object, or timestamp */
    date?: string | Date | number;
    /** Optional format for displaying the date */
    format?: Intl.DateTimeFormatOptions;
}
declare const TimelineTime: React.ForwardRefExoticComponent<TimelineTimeProps & React.RefAttributes<HTMLTimeElement>>;
declare const TimelineConnector: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    status?: "completed" | "in-progress" | "pending";
    color?: "primary" | "secondary" | "muted" | "accent";
} & React.RefAttributes<HTMLDivElement>>;
declare const TimelineHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const TimelineIcon: ({ icon, color, status, iconSize, }: {
    icon?: React.ReactNode | React.ElementType;
    color?: "primary" | "secondary" | "muted" | "accent" | "destructive";
    status?: "completed" | "in-progress" | "pending" | "error";
    iconSize?: "sm" | "md" | "lg";
}) => react_jsx_runtime.JSX.Element;

declare const TimelineDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const TimelineContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineEmpty: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type TimelineLayoutProps = {
    items: TimelineElement[];
    size?: 'sm' | 'md' | 'lg';
    iconColor?: 'primary' | 'secondary' | 'muted' | 'accent';
    customIcon?: React__default.ReactNode;
    animate?: boolean;
    connectorColor?: 'primary' | 'secondary' | 'muted' | 'accent';
    className?: string;
};
declare const TimelineLayout: ({ items, size, iconColor, customIcon, animate, connectorColor, className, }: TimelineLayoutProps) => react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { Timeline, type TimelineColor, TimelineConnector, TimelineContent, TimelineDescription, type TimelineElement, TimelineEmpty, TimelineHeader, TimelineIcon, TimelineItem, TimelineLayout, type TimelineProps$1 as TimelineProps, type TimelineSize, type TimelineStatus, TimelineTime, TimelineTitle, cn };

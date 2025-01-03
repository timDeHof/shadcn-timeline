import { ReactNode } from 'react';

export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineStatus = 'completed' | 'in-progress' | 'pending';
export type TimelineColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';

export interface TimelineElement {
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
}

export interface TimelineProps {
  items: TimelineElement[];
  size?: TimelineSize;
  animate?: boolean;
  iconColor?: TimelineColor;
  connectorColor?: TimelineColor;
  className?: string;
}

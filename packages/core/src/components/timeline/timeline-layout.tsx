'use client';

import React from 'react';
import { Timeline, TimelineItem } from './timeline';
import { TimelineElement, TimelineColor } from '../../types';


type TimelineLayoutProps = {
  items: TimelineElement[];
  size?: 'sm' | 'md' | 'lg';
  iconColor?: 'primary' | 'secondary' | 'muted' | 'accent';
  customIcon?: React.ReactNode;
  animate?: boolean;
  connectorColor?: 'primary' | 'secondary' | 'muted' | 'accent';
  className?: string;
}

export const TimelineLayout = ({
  items,
  size = 'md',
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
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          date={item.date}
          title={item.title}
          description={item.description ?? ''}
          icon={(() => {
            try {
              if (typeof item.icon === 'function') {
                return (item.icon as () => React.ReactNode)();
              }
              return item.icon ?? customIcon;
            } catch (error) {
              console.error('Timeline icon function failed:', error);
              return customIcon;
            }
          })()}
          iconColor={(['primary', 'secondary', 'muted', 'accent', 'destructive'] as const).includes(item.color as TimelineColor) ? item.color : iconColor}
          connectorColor={(['primary', 'secondary', 'muted', 'accent', 'destructive'] as const).includes(item.color as TimelineColor) ? item.color : connectorColor}
          showConnector={index !== items.length - 1}
        />
      ))}
    </Timeline>
  );
};

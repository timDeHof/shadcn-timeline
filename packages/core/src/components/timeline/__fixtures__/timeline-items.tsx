import { Check, GitPullRequest, GitBranch, Calendar, Star, AlertTriangle } from 'lucide-react';
import type { TimelineElement } from '@/types';
import React from 'react';

// Basic timeline items
export const defaultItems: TimelineElement[] = [
  {
    id: 1,
    date: '2024-01-01',
    title: 'First event',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <Check />,
    status: 'completed',
    color: 'primary',
  },
  {
    id: 2,
    date: '2024-02-01',
    title: 'Second event',
    description: 'Aut eius excepturi ex recusandae eius est minima molestiae.',
    icon: <GitPullRequest />,
    status: 'in-progress',
    color: 'secondary',
  },
  {
    id: 3,
    date: '2024-03-01',
    title: 'Third event',
    description: 'Sit culpa quas ex nulla animi qui deleniti minus.',
    icon: <GitBranch />,
    status: 'pending',
    color: 'muted',
  },
];

// Items with different states
export const stateItems: TimelineElement[] = [
  {
    id: 4,
    date: '2024-01-15',
    title: 'Completed Task',
    description: 'This task has been completed successfully.',
    icon: <Check />,
    status: 'completed',
    color: 'primary',
  },
  {
    id: 5,
    date: '2024-01-16',
    title: 'In Progress Task',
    description: 'This task is currently in progress.',
    icon: <GitPullRequest />,
    status: 'in-progress',
    color: 'secondary',
  },
  {
    id: 6,
    date: '2024-01-17',
    title: 'Pending Task',
    description: 'This task is pending start.',
    icon: <Calendar />,
    status: 'pending',
    color: 'muted',
  },
];

// Items with different sizes
export const sizedItems: Record<'sm' | 'md' | 'lg', TimelineElement[]> = {
  sm: defaultItems.map(item => ({ ...item, size: 'sm' })),
  md: defaultItems.map(item => ({ ...item, size: 'md' })),
  lg: defaultItems.map(item => ({ ...item, size: 'lg' })),
};

// Items for loading state
export const loadingItems: TimelineElement[] = Array.from({ length: 3 }, (_, index) => ({
  id: 7 + index,
  date: new Date(Date.now() + index * 86400000).toISOString().split('T')[0],
  title: 'Loading...',
  description: 'Content is loading...',
  status: 'pending',
  loading: true,
}));

// Items for error state
export const errorItems: TimelineElement[] = [
  {
    id: 10,
    date: new Date().toISOString().split('T')[0],
    title: 'Error State',
    description: 'An error occurred while loading this item.',
    icon: <AlertTriangle data-testid="warning-icon" />,
    status: 'pending',
    error: 'Failed to load item',
    color: 'destructive',
  },
];

// Helper function to create custom items
export const createCustomItems = (count: number, options: Partial<TimelineElement> = {}): TimelineElement[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: 100 + index,
    date: new Date(Date.now() + index * 86400000).toISOString().split('T')[0],
    title: `Custom Event ${index + 1}`,
    description: `Custom description for event ${index + 1}`,
    icon: <Star />,
    status: 'completed',
    color: 'primary',
    ...options,
  }));
};

// Export all fixtures
export const timelineFixtures = {
  default: defaultItems,
  states: stateItems,
  sized: sizedItems,
  loading: loadingItems,
  error: errorItems,
  createCustom: createCustomItems,
} as const;

export const edgeCaseItems = [
  {
    title: '',
    description: '',
    date: null,
  },
  {
    title: 'No Description',
    date: new Date(),
  },
  {
    title: 'Custom Format',
    date: '2024-01-01',
    dateFormat: 'yyyy-MM-dd',
  },
] as const;

// Add these to your existing tests
export const timelineItems = [...defaultItems, ...edgeCaseItems];
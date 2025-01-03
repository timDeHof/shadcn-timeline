import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline, TimelineItem, TimelineTime } from '../timeline';
import { TimelineLayout } from '../timeline-layout';
import { Check, GitPullRequest, AlertTriangle } from 'lucide-react';
import type { TimelineElement } from '@/types';

const mockItems: TimelineElement[] = [
  {
    id: 1,
    date: '2024-01-01',
    title: 'Test Event',
    description: 'Test Description',
    icon: <Check />,
    status: 'completed',
    color: 'primary',
  },
  {
    id: 2,
    date: '2024-01-02',
    title: 'In Progress Event',
    description: 'Test Description 2',
    icon: <GitPullRequest />,
    status: 'in-progress',
    color: 'secondary',
  },
];

describe('TimelineTime', () => {
  it('renders date in ISO format by default', () => {
    const { container } = render(<TimelineTime date="2024-01-01" />);
    const timeElement = container.querySelector('time');
    expect(timeElement).toHaveAttribute('dateTime', '2024-01-01T00:00:00.000Z');
  });

  it('renders children if provided', () => {
    render(<TimelineTime date="2024-01-01">Custom Date</TimelineTime>);
    expect(screen.getByText('Custom Date')).toBeInTheDocument();
  });
});

describe('Timeline', () => {
  it('renders empty state when no items provided', () => {
    render(<Timeline />);
    expect(screen.getByText('No timeline items to display')).toBeInTheDocument();
  });

  it('renders timeline items correctly', () => {
    render(
      <Timeline>
        <TimelineItem
          date="2024-01-01"
          title="Test Event"
          description="Test Description"
          icon={<Check />}
          status="completed"
          iconColor="primary"
        />
      </Timeline>,
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(
      <Timeline>
        <TimelineItem loading />
      </Timeline>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(1);
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Test error message';
    render(
      <Timeline>
        <TimelineItem
          error={errorMessage}
          title="Error Event"
          date="2024-01-01"
          icon={<AlertTriangle />}
        />
      </Timeline>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Error Event')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { container } = render(
      <Timeline size="lg">
        <TimelineItem date="2024-01-01" title="Test Event" />
      </Timeline>,
    );

    expect(container.firstChild).toHaveClass('gap-8');
  });

  it('handles different icon sizes', () => {
    const { container } = render(
      <Timeline iconsize="lg">
        <TimelineItem date="2024-01-01" title="Test Event" icon={<Check />} />
      </Timeline>,
    );

    const iconContainer = container.querySelector(
      '[class*="relative flex items-center justify-center rounded-full"]',
    );
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('h-12', 'w-12');
  });
});

describe('TimelineLayout', () => {
  it('renders all timeline items in reverse order', () => {
    render(<TimelineLayout items={mockItems} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('In Progress Event');
    expect(items[1]).toHaveTextContent('Test Event');
  });

  it('applies custom colors correctly', () => {
    const { container } = render(
      <TimelineLayout
        items={mockItems.map(item => ({ ...item, color: undefined }))}
        iconColor="accent"
        connectorColor="accent"
      />,
    );

    const iconContainer = container.querySelector('.text-destructive-foreground');
    expect(iconContainer).toBeInTheDocument();
  });

  it('handles animation prop', () => {
    const { container } = render(<TimelineLayout items={mockItems} animate={false} />);

    const motionDivs = container.querySelectorAll('[style*="transform"]');
    expect(motionDivs.length).toBe(0);
  });

  it('renders with different sizes', () => {
    const { container } = render(<TimelineLayout items={mockItems} size="sm" />);

    expect(container.firstChild).toHaveClass('gap-4');
  });
});

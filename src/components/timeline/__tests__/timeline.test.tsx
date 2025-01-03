import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline, TimelineItem } from '../timeline';
import { Check } from 'lucide-react';

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
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Test error message';
    render(
      <Timeline>
        <TimelineItem error={errorMessage} />
      </Timeline>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { container } = render(
      <Timeline size="lg">
        <TimelineItem date="2024-01-01" title="Test Event" />
      </Timeline>,
    );

    expect(container.firstChild).toHaveClass('flex-col', 'gap-8');
  });

  it('handles different icon sizes', () => {
    const { container } = render(
      <Timeline iconsize="lg">
        <TimelineItem date="2024-01-01" title="Test Event" icon={<Check />} />
      </Timeline>,
    );

    const iconContainer = container.querySelector(
      '.relative.flex.items-center.justify-center.rounded-full',
    );
    expect(iconContainer).toHaveClass('h-10', 'w-10');
  });
});

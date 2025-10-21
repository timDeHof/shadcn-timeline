import { render, screen } from '@testing-library/react'
import { Timeline, TimelineItem } from '../timeline'
import * as React from 'react'
import '@testing-library/jest-dom'

describe('Timeline', () => {
  it('should render successfully with default props', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Test Item 1" />
      </Timeline>
    )
    expect(container).toBeTruthy()
  })
})

describe('TimelineItem', () => {
  it('should render successfully with title prop', () => {
    render(
      <Timeline>
        <TimelineItem title="Test Item 2" />
      </Timeline>
    )
    expect(screen.getByText('Test Item 2')).toBeInTheDocument()
  })
})

describe('Timeline Component', () => {
  it('should render TimelineEmpty when no children are provided', () => {
    const { getByText } = render(<Timeline />);
    expect(getByText('No timeline items to display')).toBeInTheDocument();
  });

  it('should render loading state with skeleton elements', () => {
    render(
      <Timeline>
        <TimelineItem title="Loading Test" loading />
      </Timeline>
    );
    // Verify loading container with role="status" exists
    const loadingContainer = screen.getByRole('status');
    expect(loadingContainer).toBeInTheDocument();

    // Check for skeleton elements (4 total in loading state)
    const skeletonElements = loadingContainer.querySelectorAll('.animate-pulse');
    expect(skeletonElements).toHaveLength(4);
  });

  it('should render error state with AlertCircle icon', () => {
    render(
      <Timeline>
        <TimelineItem title="Error Test" error="Something went wrong" />
      </Timeline>
    );

    // Verify title and error message
    expect(screen.getByText('Error Test')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Verify destructive styling
    const errorItem = screen.getByText('Error Test').closest('li');
    expect(errorItem).toHaveClass('border-destructive/50', 'bg-destructive/10');

    // Verify AlertCircle icon exists by checking for SVG with specific classes
    const icon = errorItem?.querySelector('svg.h-4.w-4.text-destructive');
    expect(icon).toBeInTheDocument();
  });

  it('should apply correct connector colors based on status', () => {
    render(
      <Timeline>
        <TimelineItem title="In Progress" status="in-progress" />
        <TimelineItem title="Pending" status="pending" />
      </Timeline>
    );

    // Get the first timeline item (which has the connector)
    const inProgressItem = screen.getByText('In Progress').closest('li');
    // Within the first timeline item, find the connector
    const connector = inProgressItem?.querySelector('div.h-16.w-0\\.5');

    // Verify connector has the gradient class for in-progress
    expect(connector).toHaveClass('bg-gradient-to-b');

    // The second item should not have a connector (it's the last item)
    const pendingItem = screen.getByText('Pending').closest('li');
    const pendingConnector = pendingItem?.querySelector('div.h-16.w-0\\.5');
    expect(pendingConnector).toBeNull();
  });

  it('should override connector color with connectorColor prop', () => {
    render(
      <Timeline>
        <TimelineItem title="Custom Connector" status="in-progress" connectorColor="accent" />
        <TimelineItem title="Next Item" />
      </Timeline>
    );
    const inProgressItem = screen.getByText('Custom Connector').closest('li');
    const connector = inProgressItem?.querySelector('div.h-16.w-0\\.5');
    expect(connector).toHaveClass('bg-accent');
  });

  it('should render custom icon when provided', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
    render(
      <Timeline>
        <TimelineItem title="Custom Icon Test" icon={<CustomIcon />} />
      </Timeline>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should apply correct icon sizes', () => {
    render(
      <Timeline>
        <TimelineItem title="Size Test" iconSize="lg" />
      </Timeline>
    );
    const icons = screen.getAllByTestId('timeline-icon');
    expect(icons[0]).toHaveClass('h-12', 'w-12');
  });
});

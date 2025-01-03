import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TimelineLayout } from './timeline-layout';
import {
  defaultItems,
  stateItems,
  sizedItems,
  loadingItems,
  errorItems,
  timelineFixtures,
} from './__fixtures__/timeline-items';

const meta = {
  title: 'Components/Timeline',
  component: TimelineLayout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A beautiful, accessible timeline component that supports various states, sizes, and customizations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The size of the timeline component',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      table: {
        type: { summary: 'string' },
      },
    },
    iconColor: {
      description: 'The color of the timeline icons',
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      defaultValue: 'primary',
      table: {
        type: { summary: 'string' },
      },
    },
    connectorColor: {
      description: 'The color of the connector lines',
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      defaultValue: 'primary',
      table: {
        type: { summary: 'string' },
      },
    },
    animate: {
      description: 'Whether to animate the timeline items',
      control: 'boolean',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
      },
    },
    items: {
      description: 'Array of timeline items',
      control: 'object',
      table: {
        type: { summary: 'TimelineElement[]' },
      },
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof TimelineLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonClasses = 'min-h-[600px] w-full max-w-2xl mx-auto p-8 flex items-center justify-center';

export const Default: Story = {
  args: {
    items: defaultItems.map(item => ({ ...item, color: undefined })),
    size: 'md',
    animate: true,
    iconColor: 'primary',
    connectorColor: 'primary',
    className: commonClasses,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if all timeline items are rendered
    const items = await canvas.findAllByRole('listitem');
    expect(items).toHaveLength(defaultItems.length);

    // Check if titles are rendered correctly
    defaultItems.forEach(async (item) => {
      expect(await canvas.findByText(item.title)).toBeInTheDocument();
    });

    // Check if dates are rendered
    defaultItems.forEach(async (item) => {
      expect(await canvas.findByText(item.date)).toBeInTheDocument();
    });

    // Check if descriptions are rendered
    defaultItems.forEach(async (item) => {
      expect(await canvas.findByText(item.description)).toBeInTheDocument();
    });
  },
};

export const CustomColors: Story = {
  args: {
    items: defaultItems.map((item) => ({ ...item, color: undefined })),
    size: 'md',
    animate: true,
    iconColor: 'accent',
    connectorColor: 'accent',
    className: commonClasses,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Increase wait time to ensure elements are rendered
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if items are rendered
    const items = canvas.getAllByRole('listitem');
    expect(items).toHaveLength(defaultItems.length);

    // Check for any timeline item with accent color
    const timelineItems = canvasElement.querySelectorAll('li');
    let hasAccentColor = false;

    timelineItems.forEach((item) => {
      if (
        item.querySelector('[class*="text-accent"]') ||
        item.querySelector('[class*="after:bg-accent"]')
      ) {
        hasAccentColor = true;
      }
    });

    expect(hasAccentColor).toBeTruthy();
  },
};

export const States: Story = {
  args: {
    items: stateItems,
    animate: true,
    iconColor: 'primary',
    connectorColor: 'primary',
    className: commonClasses,
  },
};

export const Small: Story = {
  args: {
    items: sizedItems.sm,
    size: 'sm',
    animate: true,
    className: commonClasses,
  },
};

export const Loading: Story = {
  args: {
    items: loadingItems,
    animate: false,
    className: commonClasses,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for loading elements to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check for loading skeletons
    const loadingItems = canvas.getAllByRole('listitem');
    expect(loadingItems.length).toBeGreaterThan(0);

    // Check for loading state indicators
    const loadingTexts = canvas.getAllByText('Loading...');
    expect(loadingTexts.length).toBeGreaterThan(0);

    // Check for "Content is loading..." text
    const loadingDescriptions = canvas.getAllByText('Content is loading...');
    expect(loadingDescriptions.length).toBeGreaterThan(0);
  },
};

export const Error: Story = {
  args: {
    items: errorItems,
    animate: false,
    className: commonClasses,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for elements to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if error items are rendered
    const items = canvas.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);

    // Check for error styling
    const errorIcon = canvasElement.querySelector('[class*="bg-destructive"]');
    expect(errorIcon).toBeTruthy();

    // Check for error content
    const errorTitle = canvas.getByText('Error State');
    expect(errorTitle).toBeInTheDocument();

    const errorDescription = canvas.getByText('An error occurred while loading this item.');
    expect(errorDescription).toBeInTheDocument();

    const warningIcon = canvasElement.querySelector('[data-testid="warning-icon"]');
    expect(warningIcon).toBeTruthy();
  },
};

export const CustomGenerated: Story = {
  args: {
    items: timelineFixtures.createCustom(5, { color: 'accent' }),
    animate: true,
    className: commonClasses,
  },
};

export const EdgeCases: Story = {
  args: {
    items: [
      // Test empty case
      {
        id: 1,
        date: '',
        title: '',
        description: '',
      },
      // Test minimal case
      {
        id: 2,
        date: '',
        title: '',
        description: '',
        size: 'sm',
      },
      // Test all color variants
      {
        id: 3,
        date: '2024-01-01',
        title: 'Primary Color',
        description: 'Testing primary color',
        color: 'primary',
      },
      {
        id: 4,
        date: '2024-01-02',
        title: 'Secondary Color',
        description: 'Testing secondary color',
        color: 'secondary',
      },
      {
        id: 5,
        date: '2024-01-03',
        title: 'Accent Color',
        description: 'Testing accent color',
        color: 'accent',
      },
      // Test all status variants
      {
        id: 6,
        date: '2024-01-04',
        title: 'Completed Status',
        description: 'Testing completed status',
        status: 'completed',
      },
      {
        id: 7,
        date: '2024-01-05',
        title: 'In Progress Status',
        description: 'Testing in-progress status',
        status: 'in-progress',
      },
      {
        id: 8,
        date: '2024-01-06',
        title: 'Pending Status',
        description: 'Testing pending status',
        status: 'pending',
      },
    ],
    animate: false,
    className: commonClasses,
  },
};

// Add test for custom connector colors
export const CustomConnectors: Story = {
  args: {
    items: [
      {
        id: 1,
        date: '2024-01-01',
        title: 'Custom Connector',
        description: 'Item with custom connector',
        color: 'accent',
      },
      {
        id: 2,
        date: '2024-01-02',
        title: 'No Connector',
        description: 'Item without connector',
      },
      {
        id: 3,
        date: '2024-01-03',
        title: 'Last Item',
        description: 'Final item in timeline',
      },
    ],
    connectorColor: 'accent',
    className: commonClasses,
  },
};

// Add test for custom icons
export const CustomIcons: Story = {
  args: {
    items: [
      {
        id: 1,
        date: '2024-01-01',
        title: 'Custom Icon',
        description: 'Item with custom icon',
        icon: <span data-testid="custom-icon">★</span>,
      },
    ],
    className: commonClasses,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Timeline, TimelineItem } from './timeline';
import { TimelineLayout } from './timeline-layout';
import { Check, GitPullRequest, GitBranch } from 'lucide-react';

const meta = {
  title: 'Components/Timeline',
  component: TimelineLayout,
  render: (args) => (
    <Timeline size={args.size} className={args.className}>
      {[...args.items].reverse().map((item, index) => (
        <TimelineItem
          key={index}
          date={item.date}
          title={item.title}
          description={item.description}
          icon={item.icon || args.customIcon}
          iconColor={
            (item.color || args.iconColor) as
              | 'primary'
              | 'secondary'
              | 'muted'
              | 'accent'
              | undefined
          }
          connectorColor={
            (item.color || args.connectorColor) as
              | 'primary'
              | 'secondary'
              | 'muted'
              | 'accent'
              | undefined
          }
          showConnector={index !== args.items.length - 1}
          initial={args.animate ? { opacity: 0, y: 20 } : undefined}
          animate={args.animate ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </Timeline>
  ),
  parameters: {
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
    },
    iconColor: {
      description: 'The color of the timeline icons',
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      defaultValue: 'primary',
    },
    connectorColor: {
      description: 'The color of the connector lines',
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      defaultValue: 'primary',
    },
    animate: {
      description: 'Whether to animate the timeline items',
      control: 'boolean',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof TimelineLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 1,
    date: '2022-01-01',
    title: 'First event',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.',
    icon: <Check />,
  },
  {
    id: 2,
    date: '2022-02-01',
    title: 'Second event',
    description:
      'Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit.',
    icon: <GitPullRequest />,
  },
  {
    id: 3,
    date: '2022-03-01',
    title: 'Third event',
    description:
      'Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae.',
    icon: <GitBranch />,
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    size: 'md',
    animate: true,
    iconColor: 'primary',
    connectorColor: 'primary',
    className: 'min-h-[600px] px-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default timeline view with animated items.',
      },
    },
  },
};

export const NoAnimation: Story = {
  args: {
    items: defaultItems,
    animate: false,
    iconColor: 'primary',
    connectorColor: 'primary',
    className: 'min-h-[600px] px-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline without animation effects.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    items: defaultItems,
    size: 'lg',
    animate: true,
    iconColor: 'primary',
    connectorColor: 'primary',
    className: 'min-h-[600px] px-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the timeline with bigger spacing.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      color: 'secondary',
    })),
    iconColor: 'secondary',
    connectorColor: 'secondary',
    className: 'min-h-[600px] px-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with custom colors for icons and connectors.',
      },
    },
  },
};

export const WithInteractions: Story = {
  args: {
    items: defaultItems,
    animate: true,
    iconColor: 'primary',
    className: 'min-h-[600px] px-4',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if all timeline items are rendered
    const timelineItems = await canvas.findAllByRole('listitem');
    expect(timelineItems).toHaveLength(3);

    // Check if titles are rendered correctly
    expect(await canvas.findByText('First event')).toBeInTheDocument();
    expect(await canvas.findByText('Second event')).toBeInTheDocument();
    expect(await canvas.findByText('Third event')).toBeInTheDocument();

    // Verify dates are present
    expect(await canvas.findByText('2022-01-01')).toBeInTheDocument();
    expect(await canvas.findByText('2022-02-01')).toBeInTheDocument();
    expect(await canvas.findByText('2022-03-01')).toBeInTheDocument();
  },
};

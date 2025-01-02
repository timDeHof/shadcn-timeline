# Shadcn Timeline Component

A beautiful, accessible, and customizable timeline component built with React and Tailwind CSS.

## Demo & Documentation

- 🔗 [View Storybook Documentation](https://timdehof.github.io/shadcn-timeline/)
- 🔗 [Live Demo](https://shadcn-timeline.vercel.app/)

## Features

- 🎨 Customizable appearance with different sizes and colors
- ♿️ Fully accessible with ARIA attributes
- 🔄 Loading and error states
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design
- 🎯 TypeScript support
- 🌐 SSR Compatible
- 📚 Full Storybook documentation and examples

## Installation

```bash
# Clone the repository
git clone https://github.com/timDeHof/shadcn-timeline.git

# Install dependencies
npm install

# Run Storybook locally
npm run storybook
```

## Usage

```tsx
import { Timeline, TimelineItem } from '@/components/timeline'
import { Check } from 'lucide-react'

export default function Example() {
  return (
    <Timeline>
      <TimelineItem
        date={new Date("2024-01-01")}
        title="Feature Released"
        description="New timeline component is now available"
        icon={<Check />}
        status="completed"
      />
      <TimelineItem
        date={new Date("2024-01-02")}
        title="In Progress"
        description="Working on documentation"
        status="in-progress"
      />
      <TimelineItem
        date={new Date("2024-01-03")}
        title="Upcoming"
        description="Planning future updates"
        status="pending"
      />
    </Timeline>
  )
}
```

## Props

### Timeline

| Prop     | Type                | Default | Description           |
|----------|--------------------|---------|-----------------------|
| size     | 'sm' \| 'md' \| 'lg' | 'md'    | Size of the timeline |
| iconsize | 'sm' \| 'md' \| 'lg' | 'md'    | Size of icons        |

### TimelineItem

| Prop           | Type                                        | Default     | Description                |
|----------------|---------------------------------------------|-------------|----------------------------|
| date          | Date \| string \| number                    | -           | Date of the event          |
| title         | string                                      | -           | Title of the event         |
| description   | string                                      | -           | Description of the event   |
| icon          | ReactNode                                   | -           | Custom icon                |
| iconColor     | 'primary' \| 'secondary' \| 'muted' \| 'accent' | 'primary'  | Color theme of the icon    |
| status        | 'completed' \| 'in-progress' \| 'pending'    | 'completed' | Current status            |
| loading       | boolean                                     | false       | Show loading state         |
| error         | string                                      | -           | Show error state          |

### TimelineTime

| Prop           | Type                                   | Default     | Description                |
|----------------|----------------------------------------|-------------|----------------------------|
| date          | Date \| string \| number               | -           | Date to display            |
| format        | string \| Intl.DateTimeFormatOptions   | -           | Date formatting options    |
| className     | string                                 | -           | Additional CSS classes     |

## Server-Side Rendering

The component is fully SSR compatible and handles hydration properly. Date formatting is handled on the client side to prevent hydration mismatches.

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Development

To run Storybook locally:

```bash
npm run storybook
```

This will start Storybook on http://localhost:6006

## Testing

Run the test suite:

```bash
# Run tests
npm run test

# Run Storybook tests
npm run test-storybook

# Run Storybook tests with coverage
npm run test-storybook:coverage
```

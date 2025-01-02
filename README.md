# Shadcn Timeline Component

A beautiful, accessible, and customizable timeline component built with React and Tailwind CSS.

## Features

- 🎨 Customizable appearance with different sizes and colors
- ♿️ Fully accessible with ARIA attributes
- 🔄 Loading and error states
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design
- 🎯 TypeScript support
- 🌐 SSR Compatible

## Installation

```bash
# Clone the repository
git clone https://github.com/timDeHof/shadcn-timeline.git

# Install dependencies
npm install
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

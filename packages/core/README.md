# @shadcn-timeline/core

Beautiful, accessible timeline components built on top of shadcn/ui with React and Tailwind CSS.

## Installation

```bash
npm install @shadcn-timeline/core
# or
pnpm add @shadcn-timeline/core
# or
yarn add @shadcn-timeline/core
```

## Usage

```tsx
import { Timeline, TimelineItem } from '@shadcn-timeline/core';
import { Check } from 'lucide-react';

export default function Example() {
  return (
    <Timeline>
      <TimelineItem
        date={new Date('2024-01-01')}
        title="Feature Released"
        description="New timeline component is now available"
        icon={<Check />}
        status="completed"
      />
      <TimelineItem
        date={new Date('2024-01-02')}
        title="In Progress"
        description="Working on documentation"
        status="in-progress"
      />
    </Timeline>
  );
}
```

## Components

- `Timeline` - Main timeline container
- `TimelineItem` - Individual timeline items
- `TimelineTime` - Date/time display component
- `TimelineLayout` - Layout wrapper with animations

## Features

- 🎨 Customizable appearance with different sizes and colors
- ♿️ Fully accessible with ARIA attributes
- 🔄 Loading and error states
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design
- 🎯 TypeScript support

## License

MIT
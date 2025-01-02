# shadcn-timeline

<div align="center">
A clean and customizable timeline component for your React projects. Features include custom icons, animations, and different sizes.

Built on top of shadcn/ui and Framer Motion.

<a href='#Preview'>Preview</a> <a href='#Features'>Features</a> <a href='#Usage'>Usage</a> <a href='#Installation'>Installation</a> <a href='#Tech Stack'>Tech Stack</a>
</div>

## Preview

![shadcn_timeline_laptop](https://github.com/timDeHof/shadcn-timeline/assets/2568193/a710af62-36b6-4ea8-b8ba-130f913561dd)

## Features
- 🎨 Clean, modern design
- 📱 Responsive layout
- ✨ Smooth animations
- 🎯 Custom icons support
- 📏 Multiple sizes (sm, md, lg)
- 🎨 Customizable colors
- 🔌 Easy to integrate

## Usage
Import the timeline components into your NextJS project:

```tsx
import { TimelineLayout } from "@/components/timeline/timeline-layout";

export default function MyTimeline() {
  return (
    <TimelineLayout
      items={timelineData}
      size="md"
      iconColor="primary"
      connectorColor="primary"
      customIcon={<CalendarIcon />}
      animate={true}
    />
  );
}
```

Copy these components to your project:
```bash
/src/components/timeline/timeline-layout.tsx
/src/components/timeline/timeline.tsx
```

## Installation
To try out the demo locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/timDeHof/shadcn-timeline.git
   ```
2. Open the folder:
   ```bash
   cd shadcn-timeline
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Go to [localhost](http://localhost:3000) and start exploring!

## Tech stack
- [NextJS](https://nextjs.org/) - React Framework for the web
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components built using Radix UI and Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

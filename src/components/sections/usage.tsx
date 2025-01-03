import React from 'react';
import { CodeBlock } from '@/components/code-block';

const usageCode = `# Add to your component:
import { TimelineLayout } from "@/components/timeline/timeline-layout";

# Copy the timeline components to:
#   /src/components/timeline/timeline-layout.tsx
#   /src/components/timeline/timeline.tsx`;

export function Usage() {
  return (
    <section id="usage" className="space-y-4">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
      <div className="overflow-hidden rounded-lg">
        <CodeBlock code={usageCode} />
      </div>
    </section>
  );
}
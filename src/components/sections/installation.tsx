import React from 'react';
import { CodeBlock } from '@/components/code-block';

const installCode = `# 1. Clone the repository
git clone https://github.com/timDeHof/shadcn-timeline.git

# 2. Open the folder
cd shadcn-timeline

# 3. Install dependencies
npm install

# 4. Copy the timeline components to your project
# Copy from:
#   /src/app/components/timeline/timeline-layout.tsx
#   /src/app/components/timeline/timeline.tsx`;

export function Installation() {
  return (
    <section id="installation" className="space-y-4">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Manual Installation</h2>
      <p className="mb-4 text-muted-foreground">
        Copy the timeline components into your project structure:
      </p>
      <div className="overflow-hidden rounded-lg">
        <CodeBlock code={installCode} language="bash" />
      </div>
    </section>
  );
}
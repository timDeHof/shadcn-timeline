import { TimelineLayout } from '@/components/timeline';
import Link from 'next/link';
import { Github, Calendar } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { timelineData } from './data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
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

const usageCode = `# Add to your component:
import { TimelineLayout } from "@/components/timeline/timeline-layout";

# Copy the timeline components to:
#   /src/components/timeline/timeline-layout.tsx
#   /src/components/timeline/timeline.tsx`;

const examples = {
  basic: {
    name: 'Basic',
    code: `<TimelineLayout
	items={timelineData}
	size="md"
	/>`,
    component: <TimelineLayout items={timelineData} size="md" />,
  },
  customIcon: {
    name: 'Custom Icon',
    code: `<TimelineLayout
	items={timelineData}
	size="lg"
	iconColor="primary"
	customIcon={<CalendarIcon />}
	/>`,
    component: (
      <TimelineLayout
        items={timelineData}
        size="lg"
        iconColor="primary"
        customIcon={<Calendar />}
      />
    ),
  },
  animated: {
    name: 'Animated',
    code: `<TimelineLayout
	items={timelineData}
	size="md"
	animate={true}
	/>`,
    component: <TimelineLayout items={timelineData} size="md" animate={true} />,
  },
};



export default function Home() {
  return (
    <div className="container flex min-h-screen w-full flex-col space-y-8 pb-16 pt-6 md:flex-row md:space-x-8 md:space-y-0 md:px-8">
      {/* Sidebar */}
      <aside className="flex-shrink-0 md:w-64">
        <div className="sticky top-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href="#" className="text-2xl font-bold">
                shadcn-timeline
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link
                  href="https://github.com/timDeHof/shadcn-timeline"
                  className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                >
                  <Github className="size-5" />
                </Link>
              </div>
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="#installation" className="text-muted-foreground hover:text-foreground">
                Installation
              </Link>
              <Link href="#usage" className="text-muted-foreground hover:text-foreground">
                Usage
              </Link>
              <Link href="#examples" className="text-muted-foreground hover:text-foreground">
                Examples
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-12">
        {/* Hero section */}
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Timeline</h1>
          <p className="text-lg text-muted-foreground">
            A customizable timeline component for displaying chronological events.
          </p>
        </div>

        {/* Installation section */}
        <section id="installation" className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Manual Installation</h2>
          <p className="mb-4 text-muted-foreground">
            Copy the timeline components into your project structure:
          </p>
          <div className="overflow-hidden rounded-lg">
            <CodeBlock code={installCode} language="bash" />
          </div>
        </section>

        {/* Usage section */}
        <section id="usage" className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h2>
          <div className="overflow-hidden rounded-lg">
            <CodeBlock code={usageCode} />
          </div>
        </section>

        {/* Examples section */}
        <section id="examples" className="space-y-6">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
          <div className="grid gap-6">
            {Object.entries(examples).map(([key, example]) => (
              <Card key={key} id={example.name}>
                <CardHeader>
                  <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {example.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="group relative my-4 flex flex-col space-y-2 [&_input]:max-w-xs">
                  <Tabs defaultValue="preview" className="mr-auto w-full">
                    <TabsList className="inline-flex h-9 w-full items-center justify-start rounded-none border-b bg-transparent p-0 text-muted-foreground">
                      <TabsTrigger
                        value="preview"
                        className="relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                      >
                        Preview
                      </TabsTrigger>
                      <TabsTrigger
                        value="code"
                        className="relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none"
                      >
                        Code
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="preview"
                      className="relative mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="w-full">
                        <div className="flex min-h-[350px] w-full items-center justify-center">
                          {example.component}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="code"
                      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <CodeBlock code={example.code} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

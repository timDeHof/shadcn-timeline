import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';

interface ExampleCardProps {
  name: string;
  code: string;
  component: React.ReactNode;
}

export function ExampleCard({ name, code, component }: ExampleCardProps) {
  return (
    <Card id={name}>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="group relative my-4 flex flex-col space-y-2">
        <Tabs defaultValue="preview" className="mr-auto w-full">
          <TabsList className="inline-flex h-9 w-full items-center justify-start rounded-none border-b bg-transparent p-0 text-muted-foreground">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
            >
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="preview"
            className="relative mt-2 min-h-[350px] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex h-full w-full items-center justify-center">
              {component}
            </div>
          </TabsContent>

          <TabsContent
            value="code"
            className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <CodeBlock code={code} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
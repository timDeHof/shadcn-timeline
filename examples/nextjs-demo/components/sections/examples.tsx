"use client"
import React from 'react';
import { TimelineLayout } from '@shadcn-timeline/core';
import { Calendar } from 'lucide-react';
import { timelineData } from '@/app/data';
import { ExampleCard } from './example-card';

const examples = {
  basic: {
    name: 'Basic',
    code: `<TimelineLayout items={timelineData} size="md" iconColor="accent" customIcon={null} connectorColor="accent" className="" />`,
    component: <TimelineLayout items={timelineData} size="md" iconColor="accent" customIcon={null} connectorColor="accent" className="" />,
  },
  customIcon: {
    name: 'Custom Icon',
    code: `<TimelineLayout items={timelineData} size="lg" iconColor="primary" customIcon={<Calendar />} connectorColor="accent" className="" />`,
    component: (
      <TimelineLayout
        items={timelineData}
        size="lg"
        iconColor="primary"
        customIcon={<Calendar />}
        connectorColor="accent"
        className=""
      />
    ),
  },
  animated: {
    name: 'Animated',
    code: `<TimelineLayout items={timelineData} size="md" animate={true} iconColor="accent" customIcon={null} connectorColor="accent" className="" />`,
    component: <TimelineLayout items={timelineData} size="md" animate={true} iconColor="accent" customIcon={null} connectorColor="accent" className="" />,
  },
};

export function Examples() {
  return (
    <section id="examples" className="space-y-6">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
      <div className="grid gap-6">
        {Object.entries(examples).map(([key, example]) => (
          <ExampleCard key={key} {...example} />
        ))}
      </div>
    </section>
  );
}
